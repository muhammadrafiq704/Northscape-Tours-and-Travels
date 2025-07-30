import express from 'express';
import {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  searchBlogs,
  getPopularBlogs,
  getRelatedBlogs
} from '../controllers/blogController.js';

import { blogValidation } from '../middlewares/validation.js';
import { handleValidationErrors } from '../middlewares/errorHandler.js';
import upload from '../utils/multerConfig.js'; // for image upload

const router = express.Router();

// ---------- Public Routes ----------

// Get all blogs (with pagination, filter, search)
router.get('/', getAllBlogs);

// Get single blog by ID and increment views
router.get('/:id', getBlogById);

// Search blogs by title/summary/paragraph
router.get('/search', searchBlogs);

// Get popular blogs by views
router.get('/popular', getPopularBlogs);

// Get related blogs by category
router.get('/related/:id', getRelatedBlogs);

// ---------- Protected Routes (optional: add auth middleware) ----------

// Create blog with image handling
router.post(
  '/',
  upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'subheadingImages', maxCount: 10 }
  ]),
  blogValidation,
  handleValidationErrors,
  createBlog
);

// Update blog
router.put(
  '/:id',
  upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'subheadingImages', maxCount: 10 }
  ]),
  blogValidation,
  handleValidationErrors,
  updateBlog
);

// Delete blog
router.delete('/:id', deleteBlog);

// ------------------
// REST Notes:
// GET    /api/blogs           -> list
// GET    /api/blogs/:id       -> detail + track view
// POST   /api/blogs           -> create
// PUT    /api/blogs/:id       -> update
// DELETE /api/blogs/:id       -> delete
// GET    /api/blogs/search/query?q=     -> search
// GET    /api/blogs/popular        -> popular
// GET    /api/blogs/related/:id         -> related
// ------------------

export default router;
