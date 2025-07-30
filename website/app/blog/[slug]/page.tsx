import { blogPosts, BlogPost } from "@/data/blog-posts";
import NotFound from "@/app/not-found";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Twitter, Facebook, Linkedin } from "lucide-react";
import { ReactNode } from "react";
import { generateSlug } from "@/lib/slug";

// Helper: Extract text from ReactNode
function extractText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join(" ");
  if (
    typeof node === "object" &&
    node !== null &&
    "props" in node &&
    (node as any).props &&
    (node as any).props.children
  ) {
    return extractText((node as any).props.children);
  }
  return "";
}

// Helper: Calculate estimated read time (200 words/minute)
function getReadTime(content: ReactNode) {
  const text = extractText(content);
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

// Helper: Get related posts (same category or tags, not self)
function getRelatedPosts(
  post: BlogPost,
  allPosts: BlogPost[],
  limit = 3
): BlogPost[] {
  if (!post.tags) return [];
  return allPosts
    .filter(
      (p: BlogPost) =>
        p.slug !== post.slug &&
        (p.category === post.category ||
          (p.tags && p.tags.some((tag: string) => post.tags!.includes(tag))))
    )
    .slice(0, limit);
}

// Helper: Get previous/next post
function getPrevNext(post: BlogPost, allPosts: BlogPost[]) {
  const idx = allPosts.findIndex((p: BlogPost) => p.slug === post.slug);
  return {
    prev: idx > 0 ? allPosts[idx - 1] : null,
    next: idx < allPosts.length - 1 ? allPosts[idx + 1] : null,
  };
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.image }],
    },
  };
}

export default function BlogDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return <NotFound />;
  // Ensure content is always defined for type safety
  const content = post.content ?? <></>;
  const readTime = getReadTime(content);
  const related = getRelatedPosts(post, blogPosts);
  const { prev, next } = getPrevNext(post, blogPosts);

  return (
    <div className="pb-16">
      {/* Breadcrumbs */}
      <nav
        className="max-w-3xl mx-auto pt-6 pb-2 text-sm text-gray-500 flex gap-2 mt-16"
        aria-label="Breadcrumb"
      >
        <Link href="/" className="hover:text-green-600">
          Home
        </Link>
        <span>/</span>
        <Link href="/blog" className="hover:text-green-600">
          Blog
        </Link>
        <span>/</span>
        <span className="text-orange-600 font-semibold">{post.title}</span>
      </nav>

      {/* Hero Banner */}
      <div className="relative w-full h-80 md:h-96 mb-8">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover w-full h-full rounded-xl"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent rounded-xl" />
        <div className="absolute bottom-0 left-0 p-8 text-white">
          <div className="flex flex-wrap gap-3 items-center mb-2">
            <span className="bg-orange-600/90 px-3 py-1 rounded-full text-xs font-semibold">
              {post.category}
            </span>
            <span className="text-xs">
              {new Date(post.date).toLocaleDateString()}
            </span>
            <span className="text-xs">by {post.author}</span>
            <span className="text-xs">{readTime} min read</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold drop-shadow-lg mb-2 max-w-2xl">
            {post.title}
          </h1>
        </div>
      </div>

      {/* Article Content */}
      <article className="prose mx-auto max-w-3xl">
        <div>{content}</div>
        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog?tag=${encodeURIComponent(tag)}`}
                className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-xs border border-orange-200 hover:bg-orange-100"
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}
        {/* Social Share */}
        <div className="mt-8 flex gap-4 items-center">
          <span className="text-sm text-gray-500">Share:</span>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              post.title
            )}&url=${encodeURIComponent(
              typeof window !== "undefined" ? window.location.href : ""
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on Twitter"
            className="hover:text-green-500 transition-colors"
          >
            <Twitter className="w-5 h-5" />
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              typeof window !== "undefined" ? window.location.href : ""
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on Facebook"
            className="hover:text-green-700 transition-colors"
          >
            <Facebook className="w-5 h-5" />
          </a>
          <a
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
              typeof window !== "undefined" ? window.location.href : ""
            )}&title=${encodeURIComponent(post.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on LinkedIn"
            className="hover:text-green-800 transition-colors"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
      </article>

      {/* Author Section */}
      <div className="max-w-3xl mx-auto mt-16 flex items-center gap-4 bg-slate-50 rounded-xl p-6 border border-slate-200">
        <div className="w-16 h-16 rounded-full bg-orange-200 flex items-center justify-center text-2xl font-bold text-orange-700">
          {post.author[0]}
        </div>
        <div>
          <div className="font-semibold text-slate-800">{post.author}</div>
          <div className="text-sm text-gray-500">Travel Writer & Explorer</div>
          <div className="text-xs text-gray-400 mt-1">
            This is a placeholder author bio. Add real bios for your authors
            here.
          </div>
        </div>
      </div>

      {/* Prev/Next Navigation */}
      <div className="max-w-3xl mx-auto mt-12 flex justify-between items-center">
        {prev ? (
          <Link
            href={`/blog/${prev.slug}`}
            className="text-orange-600 hover:underline"
          >
            ← {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/blog/${next.slug}`}
            className="text-orange-600 hover:underline"
          >
            {next.title} →
          </Link>
        ) : (
          <span />
        )}
      </div>

      {/* Related Posts */}
      {related.length > 0 && (
        <div className="max-w-3xl mx-auto mt-16">
          <h3 className="text-xl font-bold mb-6 text-slate-800">
            Related Posts
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {related.map((rel: BlogPost) => (
              <Link
                key={rel.slug}
                href={`/blog/${generateSlug(rel.title)}`}
                className="block bg-white border border-slate-200 rounded-xl p-4 hover:shadow-lg transition"
              >
                <div className="font-semibold text-orange-600 text-xs mb-1">
                  {rel.category}
                </div>
                <div className="font-bold text-slate-800 mb-1 line-clamp-2">
                  {rel.title}
                </div>
                <div className="text-xs text-gray-500 mb-2">
                  {new Date(rel.date).toLocaleDateString()}
                </div>
                <div className="text-xs text-gray-500 line-clamp-2">
                  {rel.excerpt}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Back to Blog */}
      <div className="max-w-3xl mx-auto mt-12">
        <Link
          href="/blog"
          className="text-orange-600 hover:underline font-semibold"
        >
          ← Back to Blog
        </Link>
      </div>
    </div>
  );
}
