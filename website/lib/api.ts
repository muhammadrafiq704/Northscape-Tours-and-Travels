import { GalleryPhoto } from "@/data/gallery-data";
import { RentCar } from "@/data/rent-data";
import axios from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

interface GalleryApiResponse {
  photos: GalleryPhoto[];
  total: number;
  currentPage: number;
  pages: number;
}

// Custom error types
export class NetworkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NetworkError";
  }
}

export class ApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ApiError";
  }
}

function isAxiosError(error: any): boolean {
  return error && error.isAxiosError === true;
}

export async function fetchTours() {
  try {
    const res = await axios.get<ApiResponse<any[]>>(`${BASE_URL}/tours`, {
      withCredentials: true,
    });
    if (res.data && res.data.success) {
      return res.data.data;
    } else {
      throw new ApiError(res.data?.message || "Failed to fetch tours");
    }
  } catch (error) {
    const err = error as any;
    if (isAxiosError(err)) {
      throw new NetworkError(
        err.response?.data?.message ||
          err.message ||
          "Network error while fetching tours"
      );
    }
    throw new ApiError("Unexpected error while fetching tours");
  }
}

export async function fetchTourById(id: string) {
  try {
    const res = await axios.get<ApiResponse<any>>(`${BASE_URL}/tours/${id}`, {
      withCredentials: true,
    });
    if (res.data && res.data.success) {
      return res.data.data;
    } else {
      throw new ApiError(res.data?.message || "Failed to fetch tour");
    }
  } catch (error) {
    const err = error as any;
    if (isAxiosError(err)) {
      throw new NetworkError(
        err.response?.data?.message ||
          err.message ||
          "Network error while fetching tour"
      );
    }
    throw new ApiError("Unexpected error while fetching tour");
  }
}

export async function fetchRelatedTours(id: string) {
  try {
    const res = await axios.get<ApiResponse<any[]>>(
      `${BASE_URL}/tours/${id}/related`,
      { withCredentials: true }
    );
    if (res.data && res.data.success) {
      return res.data.data;
    } else {
      throw new ApiError(res.data?.message || "Failed to fetch related tours");
    }
  } catch (error) {
    const err = error as any;
    if (isAxiosError(err)) {
      throw new NetworkError(
        err.response?.data?.message ||
          err.message ||
          "Network error while fetching related tours"
      );
    }
    throw new ApiError("Unexpected error while fetching related tours");
  }
}

export async function fetchTourCategories() {
  try {
    const res = await axios.get<ApiResponse<any[]>>(
      `${BASE_URL}/tours/categories`,
      { withCredentials: true }
    );
    if (res.data && res.data.success) {
      return res.data.data;
    } else {
      throw new ApiError(
        res.data?.message || "Failed to fetch tour categories"
      );
    }
  } catch (error) {
    const err = error as any;
    if (isAxiosError(err)) {
      throw new NetworkError(
        err.response?.data?.message ||
          err.message ||
          "Network error while fetching tour categories"
      );
    }
    throw new ApiError("Unexpected error while fetching tour categories");
  }
}

export async function fetchGalleryPhotos(
  page = 1,
  limit = 20
): Promise<GalleryApiResponse> {
  try {
    const query = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });

    const res = await axios.get<GalleryApiResponse>(
      `${BASE_URL}/gallery?${query}`,
      {
        withCredentials: true,
      }
    );

    const data = res.data;

    if (data?.photos && Array.isArray(data.photos)) {
      const photos = data.photos.map((photo: any) => ({
        ...photo,
        id: photo._id,
      }));

      return {
        photos,
        total: data.total,
        currentPage: data.currentPage,
        pages: data.pages,
      };
    }

    // fallback in case no photos returned
    return { photos: [], total: 0, currentPage: 1, pages: 1 };
  } catch (error) {
    console.error("Error loading gallery:", error);
    return { photos: [], total: 0, currentPage: 1, pages: 1 };
  }
}

export async function fetchPhotoById(id: string) {
  try {
    const res = await axios.get<ApiResponse<GalleryPhoto>>(`${BASE_URL}/gallery/${id}`, {
      withCredentials: true,
    });
    const photoData = res.data?.data;

    if (photoData && photoData._id) {
      return { ...photoData, id: photoData._id };
    }

    console.log('Fetched photo data is missing or malformed:', res.data);
    return null;
  } catch (error) {
    console.error("Error fetching photo by ID:", error);
    return null;
  }
}
export async function fetchRentalCar() {
  try {
    const res = await axios.get<ApiResponse<RentCar>>(`${BASE_URL}/rent/`);
    const rentCarData = res?.data;

    console.log('Fetched cars:', rentCarData);
    return rentCarData;
  } catch (error) {
    console.error("Error fetching cars:", error);
    return null;
  }
}

