"use client";
import axios from "axios";
import { BASE_URL } from "@/Var";
import { Tour, Blog, GalleryPhoto, Inquiry, RentCar, BlogAPIResponse, Booking } from "./types";

const inquiriesData: Inquiry[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    subject: "K2 Base Camp Trek Inquiry",
    message:
      "I'm interested in the K2 Base Camp Trek. Can you provide more details?",
    date: "2023-06-15",
    status: "new",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    subject: "Hunza Valley Tour Question",
    message:
      "Hi, I'd like to know if the Hunza Valley Explorer tour is available in September.",
    date: "2023-06-16",
    status: "in-progress",
  },
];

// Simplified data access functions

// ---------- Tours ----------
export async function getTours(): Promise<Tour[]> {
  try {
    const response = await axios.get(`${BASE_URL}/api/tours`);
    // Map _id to id for each tour
    return response.data.data.map((tour: any) => ({
      ...tour,
      id: tour._id,
    }));
  } catch (error) {
    console.error("Failed to fetch tours:", error);
    return [];
  }
}

export async function getTourById(id: string): Promise<Tour | undefined> {
  try {
    const response = await axios.get(`${BASE_URL}/api/tours/${id}`);
    // Map _id to id for the single tour
    const tour = response.data.data;
    return tour ? { ...tour, id: tour._id } : undefined;
  } catch (error) {
    console.error(`Failed to fetch tour with ID ${id}:`, error);
    return undefined;
  }
}

// export async function getTourBySlug(slug: string): Promise<Tour | undefined> {
//   try {
//     const response = await axios.get(`${BASE_URL}/api/tours/${slug}`)
//     console.log("Fetched tour by slug:", response.data.data)
//     return response.data.data // Adjust based on actual API response structure
//   } catch (error) {
//     console.error(`Failed to fetch tour with slug ${slug}:`, error)
//     return undefined
//   }
// }

export async function updateTourById(
  id: string,
  tourData: Partial<Tour>
): Promise<Tour | undefined> {
  try {
    const response = await axios.put(`${BASE_URL}/api/tours/${id}`, tourData);
    console.log("Updated tour:", response.data.data);
    return response.data.data; // Adjust based on actual API response structure
  } catch (error) {
    console.error(`Failed to fetch tour with ID ${id}:`, error);
    return undefined;
  }
}
export async function createTour(
  tour: Omit<Tour, "id">
): Promise<Tour | undefined> {
  try {
    const response = await axios.post(`${BASE_URL}/api/tours`, tour);
    console.log("Created tour:", response.data.data);
    return response.data.data; // Adjust based on actual API response structure
  } catch (error) {
    console.error("Failed to create tour:", error);
    return undefined;
  }
}

export async function deleteTour(id: string): Promise<boolean> {
  try {
    const response = await axios.delete(`${BASE_URL}/api/tours/${id}`);

    if (response.status >= 200 && response.status < 300) {
      console.log("Tour deleted successfully:", id);
      return true;
    } else {
      console.error("Failed to delete tour:", response.statusText);
      return false;
    }
  } catch (error: any) {
    console.error(
      "Error deleting tour:",
      error.response?.data || error.message
    );
    return false;
  }
}

// BLOGS
// Get all blogs with optional filters
export async function getBlogs(query: {
  page?: number;
  limit?: number;
  search?: string;
}) {
  const params = new URLSearchParams();

  if (query.page) params.append("page", query.page.toString());
  if (query.limit) params.append("limit", query.limit.toString());
  if (query.search) params.append("search", query.search);

  const res = await axios.get(`${BASE_URL}/api/blogs?${params.toString()}`);
  return res.data.data; // Return the data property from the response
}

// Get single blog by ID
export const getBlogById = async (id: string): Promise<Blog> => {
  try {
    const res = await axios.get(`${BASE_URL}/api/blogs/${id}`);
    return res.data.data; // Return the data property from the response
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Failed to fetch blog");
  }
};

// Create a new blog
export const createBlog = async (
  formData: FormData
): Promise<BlogAPIResponse> => {
  try {
    const res = await axios.post(`${BASE_URL}/api/blogs`, formData);
    return res.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Failed to create blog");
  }
};

// Update existing blog
export const updateBlog = async (
  id: string,
  formData: FormData
): Promise<BlogAPIResponse> => {
  try {
    const res = await axios.put(`${BASE_URL}/api/blogs/${id}`, formData);
    return res.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Failed to update blog");
  }
};

// Delete a blog
export const deleteBlog = async (id: string): Promise<boolean> => {
  try {
    const res = await axios.delete(`${BASE_URL}/api/blogs/${id}`);
    return res.status === 200;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Failed to delete blog");
  }
};

// Search blogs
export const searchBlogs = async (query: string): Promise<Blog[]> => {
  try {
    const res = await axios.get(`${BASE_URL}/api/blogs/search`, {
      params: { search: query },
    });
    return res.data.blogs;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Failed to search blogs");
  }
};

// Get popular blogs
export const getPopularBlogs = async (): Promise<Blog[]> => {
  try {
    const res = await axios.get(`${BASE_URL}/api/blogs/popular`);
    return res.data.blogs;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Failed to load popular blogs"
    );
  }
};

// Get related blogs (based on category or tags)
export const getRelatedBlogs = async (blogId: string): Promise<Blog[]> => {
  try {
    const res = await axios.get(`${BASE_URL}/api/blogs/related/${blogId}`);
    return res.data.blogs;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Failed to load related blogs"
    );
  }
};

export function getInquiries(): Inquiry[] {
  return inquiriesData;
}

export function getInquiryById(id: string): Inquiry | undefined {
  return inquiriesData.find((inquiry) => inquiry.id === id);
}

export function updateInquiryStatus(
  id: string,
  status: "new" | "in-progress" | "resolved"
): Inquiry | undefined {
  const inquiry = getInquiryById(id);
  if (!inquiry) return undefined;

  // In a real app, we would update this in a database
  console.log("Updating inquiry status:", { ...inquiry, status });
  return { ...inquiry, status };
}

export function deleteInquiry(id: string): boolean {
  // In a real app, we would delete this from a database
  console.log("Deleting inquiry:", id);
  return true;
}

export async function createGalleryPhoto(formData: FormData) {
  try {
    const response = await axios.post(`${BASE_URL}/api/gallery`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Failed to create gallery photo"
    );
  }
}

export async function getGalleryPhotos(params?: {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
}): Promise<GalleryPhoto[]> {
  try {
    const query = new URLSearchParams();
    if (params?.page) query.append("page", String(params.page));
    if (params?.limit) query.append("limit", String(params.limit));
    if (params?.search) query.append("search", params.search);
    if (params?.category) query.append("category", params.category);
    const response = await axios.get(
      `${BASE_URL}/api/gallery${query.toString() ? `?${query.toString()}` : ""}`
    );
    // Map _id to id for each photo
    return {
      ...response.data,
      photos: response.data.photos.map((photo: any) => ({
        ...photo,
        id: photo._id,
      })),
    };
  } catch (error) {
    console.error("Failed to fetch gallery photos:", error);
    return [];
  }
}

export async function getGalleryPhotoById(
  id: string
): Promise<GalleryPhoto | null> {
  try {
    const response = await axios.get(`${BASE_URL}/api/gallery/${id}`);
    const photo = response.data.data;
    return photo ? { ...photo, id: photo._id } : null;
  } catch (error) {
    return null;
  }
}

export async function deleteGalleryPhoto(id: string): Promise<boolean> {
  try {
    const response = await axios.delete(`${BASE_URL}/api/gallery/${id}`);
    if (response.status >= 200 && response.status < 300) {
      console.log("Gallery photo deleted successfully:", id);
      return true;
    } else {
      console.error("Failed to delete gallery photo:", response.statusText);
      return false;
    }
  } catch (error: any) {
    console.error(
      "Error deleting gallery photo:",
      error.response?.data || error.message
    );
    return false;
  }
}

export async function updateGalleryPhoto(id: string, formData: FormData) {
  try {
    const response = await axios.put(
      `${BASE_URL}/api/gallery/${id}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Failed to update gallery photo"
    );
  }
}

// create rent car api
export async function createCarDetails(formData: FormData) {
  try {
    const response = await axios.post(`${BASE_URL}/api/rent/`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    console.log('error', error)
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Failed to create gallery photo"
    );
  }
}
//get all rent cat 
export async function getCar(): Promise<RentCar[]> {
  try {
    const response = await axios.get(`${BASE_URL}/api/rent/`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch rented cars:", error);
    return [];
  }
}
// ✅ Delete car
export async function deleteCar(id: string): Promise<boolean> {
  try {
    await axios.delete(`${BASE_URL}/api/rent/${id}`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to delete car ${id}:`, error);
    return false;
  }
}

// ✅ Update car
export async function updateCar(id: string, formData: FormData): Promise<boolean> {
  try {
    console.log('id', id)
    await axios.put(`${BASE_URL}/api/rent/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return true;
  } catch (error) {
    console.error(`❌ Failed to update car ${id}:`, error);
    return false;
  }
}
// ✅ Get rent car by ID
export async function getCarById(id: string): Promise<RentCar | null> {
  try {
    const res = await axios.get(`${BASE_URL}/api/rent/${id}`);
    return res.data || null;
  } catch (error) {
    console.error(`❌ Failed to fetch car with ID ${id}:`, error);
    return null;
  }
}

//BOOKING APIS
export async function getBookings(query: {
  page?: number;
  limit?: number;
  search?: string;
}) {
  const params = new URLSearchParams();

  if (query.page) params.append("page", query.page.toString());
  if (query.limit) params.append("limit", query.limit.toString());
  if (query.search) params.append("search", query.search);

  const res = await axios.get(`${BASE_URL}/api/bookings?${params.toString()}`);
  return res.data.data; // Return the data bookings from the response
}

export async function getBookingById(id: string): Promise<Booking | null> {
  try {
    const res = await axios.get(`${BASE_URL}/api/bookings/${id}`);
    return res.data || null;
  } catch (error) {
    console.error(`❌ Failed to fetch car with ID ${id}:`, error);
    return null;
  }
}


