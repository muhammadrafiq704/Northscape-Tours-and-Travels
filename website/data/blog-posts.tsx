import Image from "next/image";
import type { ReactNode } from "react";

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: ReactNode;
  image: string;
  date: string;
  author: string;
  category: string;
  tags?: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Ultimate Guide to Trekking Everest Base Camp",
    excerpt: "Everything you need to know for an unforgettable trek to Everest Base Camp.",
    content: (
      <>
        <p>Everest Base Camp is one of the world's most iconic trekking destinations. In this guide, we'll cover everything from preparation and packing to the best routes and tips for a safe, memorable journey.</p>
        <Image src="/images/mountain.jpg" alt="Everest Base Camp" width={800} height={400} className="rounded-xl my-8" />
        <h2>Preparation</h2>
        <p>Start training at least 3 months in advance. Focus on cardio, strength, and hiking with a loaded backpack.</p>
        <h2>Best Time to Go</h2>
        <p>Spring (March-May) and Autumn (September-November) offer the best weather and views.</p>
      </>
    ),
    image: "/placeholder.svg?height=600&width=1200",
    date: "2024-05-01",
    author: "Jane Doe",
    category: "Trekking",
    tags: ["Nepal", "Trekking", "Adventure"],
  },
  {
    id: 2,
    title: "Safari Adventures in Kenya",
    excerpt: "A first-timer's guide to experiencing the magic of a Kenyan safari.",
    content: (
      <>
        <p>Kenya is home to some of Africa's most famous national parks and wildlife reserves. Learn what to expect, what to pack, and how to make the most of your safari adventure.</p>
        <Image src="/images/sunset.jpg" alt="Kenya Safari" width={800} height={400} className="rounded-xl my-8" />
        <h1>Top Parks</h1>
        <ul>
          <li>Masai Mara</li>
          <li>Amboseli</li>
          <li>Tsavo</li>
        </ul>
      </>
    ),
    image: "/placeholder.svg?height=600&width=1200",
    date: "2024-04-15",
    author: "John Smith",
    category: "Wildlife",
    tags: ["Kenya", "Safari", "Wildlife"],
  },
  {
    id: 3,
    title: "Luxury Trekking in the Himalayas",
    excerpt: "Discover the ultimate adventure in the Himalayas with this comprehensive guide.",
    content: (
      <>
        <p>The Himalayas are home to some of the world's most breathtaking landscapes and diverse wildlife. In this guide, we'll cover everything from trekking routes to accommodations and local customs.</p>
        <h2>Trekking Routes</h2>
        <ul>
          <li>Everest Base Camp</li>
          <li>Langtang Valley</li>
          <li>Annapurna Circuit</li>
        </ul>
      </>
    ),
    image: "/placeholder.svg?height=600&width=1200",
    date: "2024-03-25",
    author: "Jane Doe",
    category: "Trekking",
    tags: ["Nepal", "Trekking", "Adventure"],
  },
  {
    id: 4,
    title: "Cultural Tours in Japan",
    excerpt: "Discover the unique cultural experiences in Japan with this guide.",
    content: (
      <>
        <p>Japan is a country with a rich cultural heritage, with influences from China, Korea, and the Ryukyu Islands. In this guide, we'll cover everything from traditional festivals to local cuisine.</p>
        <h2>Top Cultural Sites</h2>
        <ul>
          <li>Tokyo Tower</li>
          <li>Kyoto Garden</li>
          <li>Fushimi Inari Shrine</li>
        </ul>
      </>
    ),
    image: "/placeholder.svg?height=600&width=1200",
    date: "2024-02-15",
    author: "John Smith",
    category: "Culture",
    tags: ["Japan", "Culture", "Travel"],
  },
  {
    id: 5,
    title: "Luxury Lodging in the Caribbean",
    excerpt: "Discover the ultimate luxury in the Caribbean with this guide.",
    content: (
      <>
        <p>The Caribbean is a tropical paradise with a rich cultural heritage. In this guide, we'll cover everything from beach resorts to luxury villas.</p>
        <h2>Top Beach Resorts</h2>
        <ul>
          <li>Bali</li>
          <li>Cancun</li>
          <li>Miami Beach</li>
        </ul>
      </>
    ),
    image: "/placeholder.svg?height=600&width=1200",
    date: "2024-01-01",
    author: "Jane Doe",
    category: "Luxury",
    tags: ["Caribbean", "Luxury", "Travel"],
  },
  {
    id: 6,
    title: "Ultimate Guide to Trekking Everest Base Camp",
    excerpt: "Everything you need to know for an unforgettable trek to Everest Base Camp.",
    content: (
      <>
        <p>Everest Base Camp is one of the world's most iconic trekking destinations. In this guide, we'll cover everything from preparation and packing to the best routes and tips for a safe, memorable journey.</p>
        <Image src="/images/marsur-rock.jpg" alt="Everest Base Camp" width={800} height={400} className="rounded-xl my-8" />
        <h2>Preparation</h2>
        <p>Start training at least 3 months in advance. Focus on cardio, strength, and hiking with a loaded backpack.</p>
        <h2>Best Time to Go</h2>
        <p>Spring (March-May) and Autumn (September-November) offer the best weather and views.</p>
      </>
    ),
    image: "/placeholder.svg?height=600&width=1200",
    date: "2024-05-01",
    author: "Jane Doe",
    category: "Trekking",
    tags: ["Nepal", "Trekking", "Adventure"],
  },
  {
    id: 7,
    title: "Safari Adventures in Kenya",
    excerpt: "A first-timer's guide to experiencing the magic of a Kenyan safari.",
    content: (
      <>
        <p>Kenya is home to some of Africa's most famous national parks and wildlife reserves. Learn what to expect, what to pack, and how to make the most of your safari adventure.</p>
        <Image src="/placeholder.svg?height=600&width=1200" alt="Kenya Safari" width={800} height={400} className="rounded-xl my-8" />
        <h2>Top Parks</h2>
        <ul>
          <li>Masai Mara</li>
          <li>Amboseli</li>
          <li>Tsavo</li>
        </ul>
      </>
    ),
    image: "/placeholder.svg?height=600&width=1200",
    date: "2024-04-15",
    author: "John Smith",
    category: "Wildlife",
    tags: ["Kenya", "Safari", "Wildlife"],
  },
  {
    id: 8,
    title: "Luxury Trekking in the Himalayas",
    excerpt: "Discover the ultimate adventure in the Himalayas with this comprehensive guide.",
    content: (
      <>
        <p>The Himalayas are home to some of the world's most breathtaking landscapes and diverse wildlife. In this guide, we'll cover everything from trekking routes to accommodations and local customs.</p>
        <h2>Trekking Routes</h2>
        <ul>
          <li>Everest Base Camp</li>
          <li>Langtang Valley</li>
          <li>Annapurna Circuit</li>
        </ul>
      </>
    ),
    image: "/placeholder.svg?height=600&width=1200",
    date: "2024-03-25",
    author: "Jane Doe",
    category: "Trekking",
    tags: ["Nepal", "Trekking", "Adventure"],
  },
  {
    id: 9,
    title: "Cultural Tours in Japan",
    excerpt: "Discover the unique cultural experiences in Japan with this guide.",
    content: (
      <>
        <p>Japan is a country with a rich cultural heritage, with influences from China, Korea, and the Ryukyu Islands. In this guide, we'll cover everything from traditional festivals to local cuisine.</p>
        <h2>Top Cultural Sites</h2>
        <ul>
          <li>Tokyo Tower</li>
          <li>Kyoto Garden</li>
          <li>Fushimi Inari Shrine</li>
        </ul>
      </>
    ),
    image: "/placeholder.svg?height=600&width=1200",
    date: "2024-02-15",
    author: "John Smith",
    category: "Culture",
    tags: ["Japan", "Culture", "Travel"],
  },
  {
    id: 10,
    title: "Luxury Lodging in the Caribbean",
    excerpt: "Discover the ultimate luxury in the Caribbean with this guide.",
    content: (
      <>
        <p>The Caribbean is a tropical paradise with a rich cultural heritage. In this guide, we'll cover everything from beach resorts to luxury villas.</p>
        <h2>Top Beach Resorts</h2>
        <ul>
          <li>Bali</li>
          <li>Cancun</li>
          <li>Miami Beach</li>
        </ul>
      </>
    ),
    image: "/placeholder.svg?height=600&width=1200",
    date: "2024-01-01",
    author: "Jane Doe",
    category: "Luxury",
    tags: ["Caribbean", "Luxury", "Travel"],
  }
]; 