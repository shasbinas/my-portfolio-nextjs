"use client";

import { useState, useEffect } from "react";
import { USER_NAMES } from "../constants/data";
import { MdOutlineArrowOutward, MdArrowForward } from "react-icons/md";
import { SiHashnode } from "react-icons/si";
import Link from "next/link";

// =============================================
// CONSTANTS & TYPES
// =============================================
const HASHNODE_API = "https://gql.hashnode.com/";
const HASHNODE_URL = `https://${USER_NAMES.hashnodeUsername}.hashnode.dev`;

interface Blog {
  title: string;
  brief: string;
  coverImage: string | null;
  slug: string;
  publishedAt: string;
  readTimeInMinutes: number;
}

interface PostNode {
  node: {
    title: string;
    brief: string;
    coverImage: { url: string } | null;
    slug: string;
    publishedAt: string;
    readTimeInMinutes: number;
  };
}

// =============================================
// API & UTILITY FUNCTIONS
// =============================================
const fetchBlogs = async (): Promise<Blog[]> => {
  const query = `{
    user(username: "${USER_NAMES.hashnodeUsername}") {
      publications(first: 1) {
        edges {
          node {
            posts(first: 3) {
              edges {
                node { 
                  title 
                  brief 
                  coverImage { url } 
                  slug 
                  publishedAt 
                  readTimeInMinutes 
                }
              }
            }
          }
        }
      }
    }
  }`;

  try {
    const response = await fetch(HASHNODE_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });
    const data = await response.json();

    const posts: PostNode[] =
      data?.data?.user?.publications?.edges?.[0]?.node?.posts?.edges || [];
    return posts.map((post: PostNode) => ({
      title: post.node.title,
      brief: post.node.brief,
      coverImage: post.node.coverImage?.url || null,
      slug: post.node.slug,
      publishedAt: post.node.publishedAt,
      readTimeInMinutes: post.node.readTimeInMinutes,
    }));
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
};

const useBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs()
      .then(setBlogs)
      .finally(() => setLoading(false));
  }, []);

  return { blogs, loading };
};

// =============================================
// MAIN COMPONENT
// =============================================

const BlogSection = () => {
  
  const { blogs, loading } = useBlogs();
  if (!USER_NAMES.hashnodeUsername || USER_NAMES.hashnodeUsername.trim() === "") {
    return null;
  }

  return (
    <section className="py-5" id="blog">
      <h2 className="text-xl font-semibold mb-4">latest blogs.</h2>

      <div className="mb-4 flex items-center gap-1">
        <Link
          href={HASHNODE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-link text-sm font-mono font-medium text-muted-foreground transition-colors flex items-center gap-1"
        >
          <SiHashnode
            className="inline-block align-middle mr-1 text-blue-500"
            size={16}
          />
          {USER_NAMES.hashnodeUsername}
          <MdOutlineArrowOutward className="inline-block w-4 h-4 ml-1" />
        </Link>
      </div>

      {loading ? (
        <div className="text-center text-muted-foreground py-8 text-base animate-pulse">
          Loading Hashnode blogs...
        </div>
      ) : blogs.length === 0 ? (
        <div className="text-center text-muted-foreground py-8 text-base">
          No blogs found.
        </div>
      ) : (
        <div className="space-y-6">
          {blogs.map((blog) => (
            <div
              key={blog.slug}
              className="box bg-background border border-border p-4"
            >
              <div className="flex flex-col gap-1">
                <a
                  href={`${HASHNODE_URL}/${blog.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-base text-foreground transition-colors w-fit"
                >
                  {blog.title}
                </a>
                <p className="text-sm leading-tight text-muted-foreground line-clamp-2">
                  {blog.brief}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>
                      {new Date(blog.publishedAt).toLocaleDateString()}
                    </span>
                    <span>•</span>
                    <span>{blog.readTimeInMinutes} min read</span>
                  </div>
                  <a
                    href={`${HASHNODE_URL}/${blog.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-link font-medium transition"
                  >
                    Read More
                    <MdArrowForward className="inline-block w-4 h-4 ml-1" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default BlogSection;
