"use client";
import { useRef } from "react";
import useFluidCursor from "@/hooks/use-FluidCursor";

const FluidCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useFluidCursor(canvasRef);

  return (
    <div className="fixed top-0 left-0 z-0 pointer-events-none">
      <canvas ref={canvasRef} className="w-screen h-screen" />
    </div>
  );
};

export default FluidCursor;
