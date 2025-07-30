"use client";
import { useState } from "react";
import BlogHero from "./blog-hero";
import BlogGrid from "./blog-grid";
import BlogCategories from "./blog-categories";
import { blogPosts } from "@/data/blog-posts";

export default function BlogPageClient() {
  const [activeCategory, setActiveCategory] = useState("All");

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  const filteredPosts =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeCategory);

  return (
    <>
      <BlogHero />
      <BlogCategories activeCategory={activeCategory} onCategoryChange={handleCategoryChange} posts={blogPosts} />
      <BlogGrid posts={filteredPosts} />
    </>
  );
} 