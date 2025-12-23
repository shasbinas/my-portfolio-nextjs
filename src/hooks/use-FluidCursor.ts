/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, RefObject } from "react";

const useFluidCursor = (canvasRef: RefObject<HTMLCanvasElement | null>) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Canvas is guaranteed to be non-null here
    const canvasElement = canvas;

    //try to adjust settings
    const config = {
      SIM_RESOLUTION: 128,
      DYE_RESOLUTION: 1440,
      CAPTURE_RESOLUTION: 512,
      DENSITY_DISSIPATION: 3.5,
      VELOCITY_DISSIPATION: 2,
      PRESSURE: 0.1,
      PRESSURE_ITERATIONS: 20,
      CURL: 3,
      SPLAT_RADIUS: 0.2,
      SPLAT_FORCE: 6000,
      SHADING: true,
      COLOR_UPDATE_SPEED: 10,
      PAUSED: false,
      BACK_COLOR: { r: 0.5, g: 0, b: 0 },
      TRANSPARENT: true,
    };

    interface Pointer {
      id: number;
      texcoordX: number;
      texcoordY: number;
      prevTexcoordX: number;
      prevTexcoordY: number;
      deltaX: number;
      deltaY: number;
      down: boolean;
      moved: boolean;
      color: number[] | { r: number; g: number; b: number };
    }

    function createPointer(): Pointer {
      return {
        id: -1,
        texcoordX: 0,
        texcoordY: 0,
        prevTexcoordX: 0,
        prevTexcoordY: 0,
        deltaX: 0,
        deltaY: 0,
        down: false,
        moved: false,
        color: [0, 0, 0],
      };
    }

    const pointers: Pointer[] = [];
    pointers.push(createPointer());

    // Helper functions that don't need gl
    function scaleByPixelRatio(input: number): number {
      const pixelRatio = window.devicePixelRatio || 1;
      return Math.floor(input * pixelRatio);
    }

    function resizeCanvas(): boolean {
      const width = scaleByPixelRatio(canvasElement.clientWidth);
      const height = scaleByPixelRatio(canvasElement.clientHeight);
      if (canvasElement.width != width || canvasElement.height != height) {
        canvasElement.width = width;
        canvasElement.height = height;
        return true;
      }
      return false;
    }

    function getWebGLContext(canvas: HTMLCanvasElement): any {
      const params = {
        alpha: true,
        depth: false,
        stencil: false,
        antialias: false,
        preserveDrawingBuffer: false,
      };

      let gl = canvas.getContext("webgl2", params) as
        | WebGLRenderingContext
        | WebGL2RenderingContext
        | null;
      const isWebGL2 = !!gl;
      if (!isWebGL2)
        gl = (canvas.getContext("webgl", params) ||
          canvas.getContext(
            "experimental-webgl",
            params
          )) as WebGLRenderingContext | null;

      if (!gl) {
        console.error("WebGL not supported");
        return { gl: null, ext: null };
      }

      let halfFloat: OES_texture_half_float | null = null;
      let supportLinearFiltering:
        | OES_texture_float_linear
        | OES_texture_half_float_linear
        | null = null;
      if (isWebGL2) {
        gl.getExtension("EXT_color_buffer_float");
        supportLinearFiltering = gl.getExtension("OES_texture_float_linear");
      } else {
        halfFloat = gl.getExtension("OES_texture_half_float");
        supportLinearFiltering = gl.getExtension(
          "OES_texture_half_float_linear"
        );
      }

      gl.clearColor(0.0, 0.0, 0.0, 1.0);

      const halfFloatTexType = isWebGL2
        ? (gl as WebGL2RenderingContext).HALF_FLOAT
        : halfFloat?.HALF_FLOAT_OES || 0;
      let formatRGBA;
      let formatRG;
      let formatR;

      const gl2 = gl as WebGL2RenderingContext;
      const gl1 = gl as WebGLRenderingContext;

      if (isWebGL2) {
        formatRGBA = getSupportedFormat(
          gl,
          gl2.RGBA16F,
          gl2.RGBA,
          halfFloatTexType
        );
        formatRG = getSupportedFormat(gl, gl2.RG16F, gl2.RG, halfFloatTexType);
        formatR = getSupportedFormat(gl, gl2.R16F, gl2.RED, halfFloatTexType);
      } else {
        formatRGBA = getSupportedFormat(
          gl,
          gl1.RGBA,
          gl1.RGBA,
          halfFloatTexType
        );
        formatRG = getSupportedFormat(gl, gl1.RGBA, gl1.RGBA, halfFloatTexType);
        formatR = getSupportedFormat(gl, gl1.RGBA, gl1.RGBA, halfFloatTexType);
      }

      return {
        gl,
        ext: {
          formatRGBA,
          formatRG,
          formatR,
          halfFloatTexType,
          supportLinearFiltering,
        },
      };
    }

    // Initialize WebGL context FIRST, before any functions that use gl
    resizeCanvas();
    const webGLContext = getWebGLContext(canvasElement);
    const gl = webGLContext.gl;
    const ext = webGLContext.ext;

    if (!gl || !ext) {
      console.error("WebGL initialization failed");
      return;
    }

    if (!ext.supportLinearFiltering) {
      config.DYE_RESOLUTION = 256;
      config.SHADING = false;
    }

    function getSupportedFormat(
      gl: any,
      internalFormat: number,
      format: number,
      type: number
    ): any {
      if (!supportRenderTextureFormat(gl, internalFormat, format, type)) {
        switch (internalFormat) {
          case gl.R16F:
            return getSupportedFormat(gl, gl.RG16F, gl.RG, type);
          case gl.RG16F:
            return getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, type);
          default:
            return null;
        }
      }

      return {
        internalFormat,
        format,
      };
    }

    function supportRenderTextureFormat(
      gl: any,
      internalFormat: number,
      format: number,
      type: number
    ): boolean {
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        internalFormat,
        4,
        4,
        0,
        format,
        type,
        null
      );

      const fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(
        gl.FRAMEBUFFER,
        gl.COLOR_ATTACHMENT0,
        gl.TEXTURE_2D,
        texture,
        0
      );

      const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
      return status == gl.FRAMEBUFFER_COMPLETE;
    }

    class Material {
      vertexShader: WebGLShader;
      fragmentShaderSource: string;
      programs: any[];
      activeProgram: WebGLProgram | null;
      uniforms: any;

      constructor(vertexShader: WebGLShader, fragmentShaderSource: string) {
        this.vertexShader = vertexShader;
        this.fragmentShaderSource = fragmentShaderSource;
        this.programs = [];
        this.activeProgram = null;
        this.uniforms = [];
      }

      setKeywords(keywords: string[]) {
        let hash = 0;
        for (let i = 0; i < keywords.length; i++) hash += hashCode(keywords[i]);

        let program = this.programs[hash];
        if (program == null) {
          const fragmentShader = compileShader(
            gl.FRAGMENT_SHADER,
            this.fragmentShaderSource,
            keywords
          );
          program = createProgram(this.vertexShader, fragmentShader);
          this.programs[hash] = program;
        }

        if (program == this.activeProgram) return;

        this.uniforms = getUniforms(program);
        this.activeProgram = program;
      }

      bind() {
        gl.useProgram(this.activeProgram);
      }
    }

    class Program {
      uniforms: any;
      program: WebGLProgram;

      constructor(vertexShader: WebGLShader, fragmentShader: WebGLShader) {
        this.uniforms = {};
        this.program = createProgram(vertexShader, fragmentShader);
        this.uniforms = getUniforms(this.program);
      }

      bind() {
        gl.useProgram(this.program);
      }
    }

    function createProgram(
      vertexShader: WebGLShader,
      fragmentShader: WebGLShader
    ): WebGLProgram {
      const program = gl.createProgram();
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);

      if (!gl.getProgramParameter(program, gl.LINK_STATUS))
        console.trace(gl.getProgramInfoLog(program));

      return program;
    }

    function getUniforms(program: WebGLProgram): any {
      const uniforms: any = [];
      const uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
      for (let i = 0; i < uniformCount; i++) {
        const uniformName = gl.getActiveUniform(program, i)?.name;
        uniforms[uniformName] = gl.getUniformLocation(program, uniformName);
      }
      return uniforms;
    }

    function compileShader(
      type: number,
      source: string,
      keywords: string[] | null
    ): WebGLShader {
      source = addKeywords(source, keywords);

      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
        console.trace(gl.getShaderInfoLog(shader));

      return shader;
    }

    function addKeywords(source: string, keywords: string[] | null): string {
      if (keywords == null) return source;
      let keywordsString = "";
      keywords.forEach((keyword) => {
        keywordsString += "#define " + keyword + "\n";
      });

      return keywordsString + source;
    }

    const baseVertexShader = compileShader(
      gl.VERTEX_SHADER,
      `
         precision highp float;
     
         attribute vec2 aPosition;
         varying vec2 vUv;
         varying vec2 vL;
         varying vec2 vR;
         varying vec2 vT;
         varying vec2 vB;
         uniform vec2 texelSize;
     
         void main () {
             vUv = aPosition * 0.5 + 0.5;
             vL = vUv - vec2(texelSize.x, 0.0);
             vR = vUv + vec2(texelSize.x, 0.0);
             vT = vUv + vec2(0.0, texelSize.y);
             vB = vUv - vec2(0.0, texelSize.y);
             gl_Position = vec4(aPosition, 0.0, 1.0);
         }
     `,
      null
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const blurVertexShader = compileShader(
      gl.VERTEX_SHADER,
      `
         precision highp float;
     
         attribute vec2 aPosition;
         varying vec2 vUv;
         varying vec2 vL;
         varying vec2 vR;
         uniform vec2 texelSize;
     
         void main () {
             vUv = aPosition * 0.5 + 0.5;
             float offset = 1.33333333;
             vL = vUv - texelSize * offset;
             vR = vUv + texelSize * offset;
             gl_Position = vec4(aPosition, 0.0, 1.0);
         }
     `,
      null
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const blurShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
         precision mediump float;
         precision mediump sampler2D;
     
         varying vec2 vUv;
         varying vec2 vL;
         varying vec2 vR;
         uniform sampler2D uTexture;
     
         void main () {
             vec4 sum = texture2D(uTexture, vUv) * 0.29411764;
             sum += texture2D(uTexture, vL) * 0.35294117;
             sum += texture2D(uTexture, vR) * 0.35294117;
             gl_FragColor = sum;
         }
     `,
      null
    );

    const copyShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
         precision mediump float;
         precision mediump sampler2D;
     
         varying highp vec2 vUv;
         uniform sampler2D uTexture;
     
         void main () {
             gl_FragColor = texture2D(uTexture, vUv);
         }
     `,
      null
    );

    const clearShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
         precision mediump float;
         precision mediump sampler2D;
     
         varying highp vec2 vUv;
         uniform sampler2D uTexture;
         uniform float value;
     
         void main () {
             gl_FragColor = value * texture2D(uTexture, vUv);
         }
     `,
      null
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const colorShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
         precision mediump float;
     
         uniform vec4 color;
     
         void main () {
             gl_FragColor = color;
         }
     `,
      null
    );

    const displayShaderSource = `
         precision highp float;
         precision highp sampler2D;
     
         varying vec2 vUv;
         varying vec2 vL;
         varying vec2 vR;
         varying vec2 vT;
         varying vec2 vB;
         uniform sampler2D uTexture;
         uniform sampler2D uDithering;
         uniform vec2 ditherScale;
         uniform vec2 texelSize;
     
         vec3 linearToGamma (vec3 color) {
             color = max(color, vec3(0));
             return max(1.055 * pow(color, vec3(0.416666667)) - 0.055, vec3(0));
         }
     
         void main () {
             vec3 c = texture2D(uTexture, vUv).rgb;
     
         #ifdef SHADING
             vec3 lc = texture2D(uTexture, vL).rgb;
             vec3 rc = texture2D(uTexture, vR).rgb;
             vec3 tc = texture2D(uTexture, vT).rgb;
             vec3 bc = texture2D(uTexture, vB).rgb;
     
             float dx = length(rc) - length(lc);
             float dy = length(tc) - length(bc);
     
             vec3 n = normalize(vec3(dx, dy, length(texelSize)));
             vec3 l = vec3(0.0, 0.0, 1.0);
     
             float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);
             c *= diffuse;
         #endif
     
             float a = max(c.r, max(c.g, c.b));
             gl_FragColor = vec4(c, a);
         }
     `;

    const splatShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
         precision highp float;
         precision highp sampler2D;
     
         varying vec2 vUv;
         uniform sampler2D uTarget;
         uniform float aspectRatio;
         uniform vec3 color;
         uniform vec2 point;
         uniform float radius;
     
         void main () {
             vec2 p = vUv - point.xy;
             p.x *= aspectRatio;
             vec3 splat = exp(-dot(p, p) / radius) * color;
             vec3 base = texture2D(uTarget, vUv).xyz;
             gl_FragColor = vec4(base + splat, 1.0);
         }
     `,
      null
    );

    const advectionShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
         precision highp float;
         precision highp sampler2D;
     
         varying vec2 vUv;
         uniform sampler2D uVelocity;
         uniform sampler2D uSource;
         uniform vec2 texelSize;
         uniform vec2 dyeTexelSize;
         uniform float dt;
         uniform float dissipation;
     
         vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
             vec2 st = uv / tsize - 0.5;
     
             vec2 iuv = floor(st);
             vec2 fuv = fract(st);
     
             vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
             vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
             vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
             vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);
     
             return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
         }
     
         void main () {
         #ifdef MANUAL_FILTERING
             vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
             vec4 result = bilerp(uSource, coord, dyeTexelSize);
         #else
             vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
             vec4 result = texture2D(uSource, coord);
         #endif
             float decay = 1.0 + dissipation * dt;
             gl_FragColor = result / decay;
         }`,
      ext.supportLinearFiltering ? null : ["MANUAL_FILTERING"]
    );

    const divergenceShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
         precision mediump float;
         precision mediump sampler2D;
     
         varying highp vec2 vUv;
         varying highp vec2 vL;
         varying highp vec2 vR;
         varying highp vec2 vT;
         varying highp vec2 vB;
         uniform sampler2D uVelocity;
     
         void main () {
             float L = texture2D(uVelocity, vL).x;
             float R = texture2D(uVelocity, vR).x;
             float T = texture2D(uVelocity, vT).y;
             float B = texture2D(uVelocity, vB).y;
     
             vec2 C = texture2D(uVelocity, vUv).xy;
             if (vL.x < 0.0) { L = -C.x; }
             if (vR.x > 1.0) { R = -C.x; }
             if (vT.y > 1.0) { T = -C.y; }
             if (vB.y < 0.0) { B = -C.y; }
     
             float div = 0.5 * (R - L + T - B);
             gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
         }
     `,
      null
    );

    const curlShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
         precision mediump float;
         precision mediump sampler2D;
     
         varying highp vec2 vUv;
         varying highp vec2 vL;
         varying highp vec2 vR;
         varying highp vec2 vT;
         varying highp vec2 vB;
         uniform sampler2D uVelocity;
     
         void main () {
             float L = texture2D(uVelocity, vL).y;
             float R = texture2D(uVelocity, vR).y;
             float T = texture2D(uVelocity, vT).x;
             float B = texture2D(uVelocity, vB).x;
             float vorticity = R - L - T + B;
             gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
         }
     `,
      null
    );

    const vorticityShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
         precision highp float;
         precision highp sampler2D;
     
         varying vec2 vUv;
         varying vec2 vL;
         varying vec2 vR;
         varying vec2 vT;
         varying vec2 vB;
         uniform sampler2D uVelocity;
         uniform sampler2D uCurl;
         uniform float curl;
         uniform float dt;
     
         void main () {
             float L = texture2D(uCurl, vL).x;
             float R = texture2D(uCurl, vR).x;
             float T = texture2D(uCurl, vT).x;
             float B = texture2D(uCurl, vB).x;
             float C = texture2D(uCurl, vUv).x;
     
             vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
             force /= length(force) + 0.0001;
             force *= curl * C;
             force.y *= -1.0;
     
             vec2 velocity = texture2D(uVelocity, vUv).xy;
             velocity += force * dt;
             velocity = min(max(velocity, -1000.0), 1000.0);
             gl_FragColor = vec4(velocity, 0.0, 1.0);
         }
     `,
      null
    );

    const pressureShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
         precision mediump float;
         precision mediump sampler2D;
     
         varying highp vec2 vUv;
         varying highp vec2 vL;
         varying highp vec2 vR;
         varying highp vec2 vT;
         varying highp vec2 vB;
         uniform sampler2D uPressure;
         uniform sampler2D uDivergence;
     
         void main () {
             float L = texture2D(uPressure, vL).x;
             float R = texture2D(uPressure, vR).x;
             float T = texture2D(uPressure, vT).x;
             float B = texture2D(uPressure, vB).x;
             float C = texture2D(uPressure, vUv).x;
             float divergence = texture2D(uDivergence, vUv).x;
             float pressure = (L + R + B + T - divergence) * 0.25;
             gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
         }
     `,
      null
    );

    const gradientSubtractShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
         precision mediump float;
         precision mediump sampler2D;
     
         varying highp vec2 vUv;
         varying highp vec2 vL;
         varying highp vec2 vR;
         varying highp vec2 vT;
         varying highp vec2 vB;
         uniform sampler2D uPressure;
         uniform sampler2D uVelocity;
     
         void main () {
             float L = texture2D(uPressure, vL).x;
             float R = texture2D(uPressure, vR).x;
             float T = texture2D(uPressure, vT).x;
             float B = texture2D(uPressure, vB).x;
             vec2 velocity = texture2D(uVelocity, vUv).xy;
             velocity.xy -= vec2(R - L, T - B);
             gl_FragColor = vec4(velocity, 0.0, 1.0);
         }
     `,
      null
    );

    const blit = (() => {
      gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]),
        gl.STATIC_DRAW
      );
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(
        gl.ELEMENT_ARRAY_BUFFER,
        new Uint16Array([0, 1, 2, 0, 2, 3]),
        gl.STATIC_DRAW
      );
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(0);

      return (target: any, clear = false) => {
        if (target == null) {
          gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
          gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        } else {
          gl.viewport(0, 0, target.width, target.height);
          gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
        }
        if (clear) {
          gl.clearColor(0.0, 0.0, 0.0, 1.0);
          gl.clear(gl.COLOR_BUFFER_BIT);
        }
        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
      };
    })();

    let dye: any;
    let velocity: any;
    let divergence: any;
    let curl: any;
    let pressure: any;

    const copyProgram = new Program(baseVertexShader, copyShader);
    const clearProgram = new Program(baseVertexShader, clearShader);
    const splatProgram = new Program(baseVertexShader, splatShader);
    const advectionProgram = new Program(baseVertexShader, advectionShader);
    const divergenceProgram = new Program(baseVertexShader, divergenceShader);
    const curlProgram = new Program(baseVertexShader, curlShader);
    const vorticityProgram = new Program(baseVertexShader, vorticityShader);
    const pressureProgram = new Program(baseVertexShader, pressureShader);
    const gradienSubtractProgram = new Program(
      baseVertexShader,
      gradientSubtractShader
    );

    const displayMaterial = new Material(baseVertexShader, displayShaderSource);

    function initFramebuffers(): void {
      const simRes = getResolution(config.SIM_RESOLUTION);
      const dyeRes = getResolution(config.DYE_RESOLUTION);

      const texType = ext.halfFloatTexType;
      const rgba = ext.formatRGBA;
      const rg = ext.formatRG;
      const r = ext.formatR;
      const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;

      gl.disable(gl.BLEND);

      if (dye == null)
        dye = createDoubleFBO(
          dyeRes.width,
          dyeRes.height,
          rgba.internalFormat,
          rgba.format,
          texType,
          filtering
        );
      else
        dye = resizeDoubleFBO(
          dye,
          dyeRes.width,
          dyeRes.height,
          rgba.internalFormat,
          rgba.format,
          texType,
          filtering
        );

      if (velocity == null)
        velocity = createDoubleFBO(
          simRes.width,
          simRes.height,
          rg.internalFormat,
          rg.format,
          texType,
          filtering
        );
      else
        velocity = resizeDoubleFBO(
          velocity,
          simRes.width,
          simRes.height,
          rg.internalFormat,
          rg.format,
          texType,
          filtering
        );

      divergence = createFBO(
        simRes.width,
        simRes.height,
        r.internalFormat,
        r.format,
        texType,
        gl.NEAREST
      );
      curl = createFBO(
        simRes.width,
        simRes.height,
        r.internalFormat,
        r.format,
        texType,
        gl.NEAREST
      );
      pressure = createDoubleFBO(
        simRes.width,
        simRes.height,
        r.internalFormat,
        r.format,
        texType,
        gl.NEAREST
      );
    }

    function createFBO(
      w: number,
      h: number,
      internalFormat: number,
      format: number,
      type: number,
      param: number
    ): any {
      gl.activeTexture(gl.TEXTURE0);
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        internalFormat,
        w,
        h,
        0,
        format,
        type,
        null
      );

      const fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(
        gl.FRAMEBUFFER,
        gl.COLOR_ATTACHMENT0,
        gl.TEXTURE_2D,
        texture,
        0
      );
      gl.viewport(0, 0, w, h);
      gl.clear(gl.COLOR_BUFFER_BIT);

      const texelSizeX = 1.0 / w;
      const texelSizeY = 1.0 / h;

      return {
        texture,
        fbo,
        width: w,
        height: h,
        texelSizeX,
        texelSizeY,
        attach(id: number) {
          gl.activeTexture(gl.TEXTURE0 + id);
          gl.bindTexture(gl.TEXTURE_2D, texture);
          return id;
        },
      };
    }

    function createDoubleFBO(
      w: number,
      h: number,
      internalFormat: number,
      format: number,
      type: number,
      param: number
    ): any {
      let fbo1 = createFBO(w, h, internalFormat, format, type, param);
      let fbo2 = createFBO(w, h, internalFormat, format, type, param);

      return {
        width: w,
        height: h,
        texelSizeX: fbo1.texelSizeX,
        texelSizeY: fbo1.texelSizeY,
        get read() {
          return fbo1;
        },
        set read(value) {
          fbo1 = value;
        },
        get write() {
          return fbo2;
        },
        set write(value) {
          fbo2 = value;
        },
        swap() {
          const temp = fbo1;
          fbo1 = fbo2;
          fbo2 = temp;
        },
      };
    }

    function resizeFBO(
      target: any,
      w: number,
      h: number,
      internalFormat: number,
      format: number,
      type: number,
      param: number
    ): any {
      const newFBO = createFBO(w, h, internalFormat, format, type, param);
      copyProgram.bind();
      gl.uniform1i(copyProgram.uniforms.uTexture, target.attach(0));
      blit(newFBO);
      return newFBO;
    }

    function resizeDoubleFBO(
      target: any,
      w: number,
      h: number,
      internalFormat: number,
      format: number,
      type: number,
      param: number
    ): any {
      if (target.width == w && target.height == h) return target;
      target.read = resizeFBO(
        target.read,
        w,
        h,
        internalFormat,
        format,
        type,
        param
      );
      target.write = createFBO(w, h, internalFormat, format, type, param);
      target.width = w;
      target.height = h;
      target.texelSizeX = 1.0 / w;
      target.texelSizeY = 1.0 / h;
      return target;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function createTextureAsync(url: string) {
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGB,
        1,
        1,
        0,
        gl.RGB,
        gl.UNSIGNED_BYTE,
        new Uint8Array([255, 255, 255])
      );

      const obj = {
        texture,
        width: 1,
        height: 1,
        attach(id: number) {
          gl.activeTexture(gl.TEXTURE0 + id);
          gl.bindTexture(gl.TEXTURE_2D, texture);
          return id;
        },
      };

      const image = new Image();
      image.onload = () => {
        obj.width = image.width;
        obj.height = image.height;
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.RGB,
          gl.RGB,
          gl.UNSIGNED_BYTE,
          image
        );
      };
      image.src = url;

      return obj;
    }

    function updateKeywords(): void {
      const displayKeywords: string[] = [];
      if (config.SHADING) displayKeywords.push("SHADING");
      displayMaterial.setKeywords(displayKeywords);
    }

    function getResolution(resolution: number) {
      let aspectRatio = gl.drawingBufferWidth / gl.drawingBufferHeight;
      if (aspectRatio < 1) aspectRatio = 1.0 / aspectRatio;

      const min = Math.round(resolution);
      const max = Math.round(resolution * aspectRatio);

      if (gl.drawingBufferWidth > gl.drawingBufferHeight)
        return { width: max, height: min };
      else return { width: min, height: max };
    }

    function hashCode(s: string): number {
      if (s.length == 0) return 0;
      let hash = 0;
      for (let i = 0; i < s.length; i++) {
        hash = (hash << 5) - hash + s.charCodeAt(i);
        hash |= 0; // Convert to 32bit integer
      }
      return hash;
    }

    function generateColor(): { r: number; g: number; b: number } {
      const c = HSVtoRGB(Math.random(), 1.0, 1.0);
      c.r *= 0.15;
      c.g *= 0.15;
      c.b *= 0.15;
      return c;
    }

    function HSVtoRGB(h: number, s: number, v: number) {
      let r = 0;
      let g = 0;
      let b = 0;
      const i = Math.floor(h * 6);
      const f = h * 6 - i;
      const p = v * (1 - s);
      const q = v * (1 - f * s);
      const t = v * (1 - (1 - f) * s);

      switch (i % 6) {
        case 0:
          r = v;
          g = t;
          b = p;
          break;
        case 1:
          r = q;
          g = v;
          b = p;
          break;
        case 2:
          r = p;
          g = v;
          b = t;
          break;
        case 3:
          r = p;
          g = q;
          b = v;
          break;
        case 4:
          r = t;
          g = p;
          b = v;
          break;
        case 5:
          r = v;
          g = p;
          b = q;
          break;
      }

      return {
        r,
        g,
        b,
      };
    }

    function wrap(value: number, min: number, max: number): number {
      const range = max - min;
      if (range == 0) return min;
      return ((value - min) % range) + min;
    }

    function updatePointerDownData(
      pointer: Pointer,
      id: number,
      posX: number,
      posY: number
    ): void {
      pointer.id = id;
      pointer.down = true;
      pointer.moved = false;
      pointer.texcoordX = posX / canvasElement.width;
      pointer.texcoordY = 1.0 - posY / canvasElement.height;
      pointer.prevTexcoordX = pointer.texcoordX;
      pointer.prevTexcoordY = pointer.texcoordY;
      pointer.deltaX = 0;
      pointer.deltaY = 0;
      pointer.color = generateColor();
    }

    function updatePointerMoveData(
      pointer: Pointer,
      posX: number,
      posY: number,
      color: any
    ): void {
      pointer.prevTexcoordX = pointer.texcoordX;
      pointer.prevTexcoordY = pointer.texcoordY;
      pointer.texcoordX = posX / canvasElement.width;
      pointer.texcoordY = 1.0 - posY / canvasElement.height;
      pointer.deltaX = correctDeltaX(pointer.texcoordX - pointer.prevTexcoordX);
      pointer.deltaY = correctDeltaY(pointer.texcoordY - pointer.prevTexcoordY);
      pointer.moved =
        Math.abs(pointer.deltaX) > 0 || Math.abs(pointer.deltaY) > 0;
      pointer.color = color;
    }

    function updatePointerUpData(pointer: Pointer): void {
      pointer.down = false;
    }

    function correctDeltaX(delta: number) {
      const aspectRatio = canvasElement.width / canvasElement.height;
      if (aspectRatio < 1) delta *= aspectRatio;
      return delta;
    }

    function correctDeltaY(delta: number) {
      const aspectRatio = canvasElement.width / canvasElement.height;
      if (aspectRatio > 1) delta /= aspectRatio;
      return delta;
    }

    function splatPointer(pointer: any) {
      const dx = pointer.deltaX * config.SPLAT_FORCE;
      const dy = pointer.deltaY * config.SPLAT_FORCE;
      splat(pointer.texcoordX, pointer.texcoordY, dx, dy, pointer.color);
    }

    function clickSplat(pointer: any) {
      const color = generateColor();
      color.r *= 10.0;
      color.g *= 10.0;
      color.b *= 10.0;
      const dx = 10 * (Math.random() - 0.5);
      const dy = 30 * (Math.random() - 0.5);
      splat(pointer.texcoordX, pointer.texcoordY, dx, dy, color);
    }

    function splat(
      x: number,
      y: number,
      dx: number,
      dy: number,
      color: any
    ): void {
      splatProgram.bind();
      gl.uniform1i(splatProgram.uniforms.uTarget, velocity.read.attach(0));
      gl.uniform1f(
        splatProgram.uniforms.aspectRatio,
        canvasElement.width / canvasElement.height
      );
      gl.uniform2f(splatProgram.uniforms.point, x, y);
      gl.uniform3f(splatProgram.uniforms.color, dx, dy, 0.0);
      gl.uniform1f(
        splatProgram.uniforms.radius,
        correctRadius(config.SPLAT_RADIUS / 100.0)
      );
      blit(velocity.write);
      velocity.swap();

      gl.uniform1i(splatProgram.uniforms.uTarget, dye.read.attach(0));
      gl.uniform3f(splatProgram.uniforms.color, color.r, color.g, color.b);
      blit(dye.write);
      dye.swap();
    }

    function correctRadius(radius: number) {
      const aspectRatio = canvasElement.width / canvasElement.height;
      if (aspectRatio > 1) radius *= aspectRatio;
      return radius;
    }

    function updateColors(dt: number): void {
      colorUpdateTimer += dt * config.COLOR_UPDATE_SPEED;
      if (colorUpdateTimer >= 1) {
        colorUpdateTimer = wrap(colorUpdateTimer, 0, 1);
        pointers.forEach((p) => {
          p.color = generateColor();
        });
      }
    }

    function applyInputs(): void {
      pointers.forEach((p) => {
        if (p.moved) {
          p.moved = false;
          splatPointer(p);
        }
      });
    }

    function step(dt: number): void {
      gl.disable(gl.BLEND);

      curlProgram.bind();
      gl.uniform2f(
        curlProgram.uniforms.texelSize,
        velocity.texelSizeX,
        velocity.texelSizeY
      );
      gl.uniform1i(curlProgram.uniforms.uVelocity, velocity.read.attach(0));
      blit(curl);

      vorticityProgram.bind();
      gl.uniform2f(
        vorticityProgram.uniforms.texelSize,
        velocity.texelSizeX,
        velocity.texelSizeY
      );
      gl.uniform1i(
        vorticityProgram.uniforms.uVelocity,
        velocity.read.attach(0)
      );
      gl.uniform1i(vorticityProgram.uniforms.uCurl, curl.attach(1));
      gl.uniform1f(vorticityProgram.uniforms.curl, config.CURL);
      gl.uniform1f(vorticityProgram.uniforms.dt, dt);
      blit(velocity.write);
      velocity.swap();

      divergenceProgram.bind();
      gl.uniform2f(
        divergenceProgram.uniforms.texelSize,
        velocity.texelSizeX,
        velocity.texelSizeY
      );
      gl.uniform1i(
        divergenceProgram.uniforms.uVelocity,
        velocity.read.attach(0)
      );
      blit(divergence);

      clearProgram.bind();
      gl.uniform1i(clearProgram.uniforms.uTexture, pressure.read.attach(0));
      gl.uniform1f(clearProgram.uniforms.value, config.PRESSURE);
      blit(pressure.write);
      pressure.swap();

      pressureProgram.bind();
      gl.uniform2f(
        pressureProgram.uniforms.texelSize,
        velocity.texelSizeX,
        velocity.texelSizeY
      );
      gl.uniform1i(pressureProgram.uniforms.uDivergence, divergence.attach(0));
      for (let i = 0; i < config.PRESSURE_ITERATIONS; i++) {
        gl.uniform1i(
          pressureProgram.uniforms.uPressure,
          pressure.read.attach(1)
        );
        blit(pressure.write);
        pressure.swap();
      }

      gradienSubtractProgram.bind();
      gl.uniform2f(
        gradienSubtractProgram.uniforms.texelSize,
        velocity.texelSizeX,
        velocity.texelSizeY
      );
      gl.uniform1i(
        gradienSubtractProgram.uniforms.uPressure,
        pressure.read.attach(0)
      );
      gl.uniform1i(
        gradienSubtractProgram.uniforms.uVelocity,
        velocity.read.attach(1)
      );
      blit(velocity.write);
      velocity.swap();

      advectionProgram.bind();
      gl.uniform2f(
        advectionProgram.uniforms.texelSize,
        velocity.texelSizeX,
        velocity.texelSizeY
      );
      if (!ext.supportLinearFiltering)
        gl.uniform2f(
          advectionProgram.uniforms.dyeTexelSize,
          velocity.texelSizeX,
          velocity.texelSizeY
        );
      const velocityId = velocity.read.attach(0);
      gl.uniform1i(advectionProgram.uniforms.uVelocity, velocityId);
      gl.uniform1i(advectionProgram.uniforms.uSource, velocityId);
      gl.uniform1f(advectionProgram.uniforms.dt, dt);
      gl.uniform1f(
        advectionProgram.uniforms.dissipation,
        config.VELOCITY_DISSIPATION
      );
      blit(velocity.write);
      velocity.swap();

      if (!ext.supportLinearFiltering)
        gl.uniform2f(
          advectionProgram.uniforms.dyeTexelSize,
          dye.texelSizeX,
          dye.texelSizeY
        );
      gl.uniform1i(
        advectionProgram.uniforms.uVelocity,
        velocity.read.attach(0)
      );
      gl.uniform1i(advectionProgram.uniforms.uSource, dye.read.attach(1));
      gl.uniform1f(
        advectionProgram.uniforms.dissipation,
        config.DENSITY_DISSIPATION
      );
      blit(dye.write);
      dye.swap();
    }

    function render(target: any): void {
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      gl.enable(gl.BLEND);
      drawDisplay(target);
    }

    function drawDisplay(target: any) {
      const width = target == null ? gl.drawingBufferWidth : target.width;
      const height = target == null ? gl.drawingBufferHeight : target.height;

      displayMaterial.bind();
      if (config.SHADING)
        gl.uniform2f(
          displayMaterial.uniforms.texelSize,
          1.0 / width,
          1.0 / height
        );
      gl.uniform1i(displayMaterial.uniforms.uTexture, dye.read.attach(0));
      blit(target);
    }

    updateKeywords();
    initFramebuffers();

    let lastUpdateTime = Date.now();
    let colorUpdateTimer = 0.0;
    let animationFrameId: number | null = null;

    function calcDeltaTime() {
      const now = Date.now();
      let dt = (now - lastUpdateTime) / 1000;
      dt = Math.min(dt, 0.016666);
      lastUpdateTime = now;
      return dt;
    }

    function update() {
      if (config.PAUSED) {
        animationFrameId = requestAnimationFrame(update);
        return;
      }

      const dt = calcDeltaTime();
      if (resizeCanvas()) initFramebuffers();
      updateColors(dt);
      applyInputs();
      step(dt);
      render(null);
      animationFrameId = requestAnimationFrame(update);
    }

    // Event handlers
    const handleMouseDown = (e: MouseEvent) => {
      const pointer = pointers[0];
      const posX = scaleByPixelRatio(e.clientX);
      const posY = scaleByPixelRatio(e.clientY);
      updatePointerDownData(pointer, -1, posX, posY);
      clickSplat(pointer);
    };

    const handleFirstMouseMove = (e: MouseEvent) => {
      const pointer = pointers[0];
      const posX = scaleByPixelRatio(e.clientX);
      const posY = scaleByPixelRatio(e.clientY);
      const color = generateColor();

      update();
      updatePointerMoveData(pointer, posX, posY, color);

      document.body.removeEventListener("mousemove", handleFirstMouseMove);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const pointer = pointers[0];
      const posX = scaleByPixelRatio(e.clientX);
      const posY = scaleByPixelRatio(e.clientY);
      const color = pointer.color;

      updatePointerMoveData(pointer, posX, posY, color);
    };

    const handleFirstTouchStart = (e: TouchEvent) => {
      const touches = e.targetTouches;
      const pointer = pointers[0];

      for (let i = 0; i < touches.length; i++) {
        const posX = scaleByPixelRatio(touches[i].clientX);
        const posY = scaleByPixelRatio(touches[i].clientY);

        update();
        updatePointerDownData(pointer, touches[i].identifier, posX, posY);
      }

      document.body.removeEventListener("touchstart", handleFirstTouchStart);
    };

    const handleTouchStart = (e: TouchEvent) => {
      const touches = e.targetTouches;
      const pointer = pointers[0];
      for (let i = 0; i < touches.length; i++) {
        const posX = scaleByPixelRatio(touches[i].clientX);
        const posY = scaleByPixelRatio(touches[i].clientY);
        updatePointerDownData(pointer, touches[i].identifier, posX, posY);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touches = e.targetTouches;
      const pointer = pointers[0];
      for (let i = 0; i < touches.length; i++) {
        const posX = scaleByPixelRatio(touches[i].clientX);
        const posY = scaleByPixelRatio(touches[i].clientY);
        updatePointerMoveData(pointer, posX, posY, pointer.color);
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touches = e.changedTouches;
      const pointer = pointers[0];

      for (let i = 0; i < touches.length; i++) {
        updatePointerUpData(pointer);
      }
    };

    // Add event listeners
    window.addEventListener("mousedown", handleMouseDown);
    document.body.addEventListener("mousemove", handleFirstMouseMove);
    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("touchstart", handleFirstTouchStart);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    // Start animation loop
    animationFrameId = requestAnimationFrame(update);

    // Cleanup function
    return () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
      window.removeEventListener("mousedown", handleMouseDown);
      document.body.removeEventListener("mousemove", handleFirstMouseMove);
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("touchstart", handleFirstTouchStart);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [canvasRef]);
};

export default useFluidCursor;
