import { body } from "express-validator";

//---------- Tour Validation ----------
export const tourValidation = [
  body().custom((value, { req }) => {
    let tourData;
    // Accept both form-data (tourData) and raw JSON
    if (req.body.tourData) {
      try {
        tourData = JSON.parse(req.body.tourData);
      } catch (error) {
        throw new Error("Invalid tour data format");
      }
    } else {
      tourData = req.body;
    }

    if (!tourData.name) throw new Error("Name is required");
    if (!tourData.category) throw new Error("Category is required");
    if (!tourData.location) throw new Error("Location is required");
    if (!tourData.days && !tourData.duration)
      throw new Error("Days or duration is required");
    if (!tourData.groupSize) throw new Error("Group size is required");
    if (!tourData.difficulty) throw new Error("Difficulty is required");
    if (tourData.price === undefined || tourData.price < 0)
      throw new Error("Valid price is required");
    if (!tourData.bestTime) throw new Error("Best time is required");
    if (!tourData.shortDescription && !tourData.longDescription)
      throw new Error(
        "At least one description (shortDescription or longDescription) is required"
      );
    if (!tourData.itineraries || !tourData.itineraries.length)
      throw new Error("At least one itinerary is required");

    // Validate each itinerary
    tourData.itineraries.forEach((itinerary, index) => {
      if (!itinerary.day)
        throw new Error(`Day number is required for itinerary ${index + 1}`);
      if (!itinerary.title)
        throw new Error(`Title is required for itinerary ${index + 1}`);
      if (!itinerary.description)
        throw new Error(`Description is required for itinerary ${index + 1}`);
    });

    return true;
  }),
];

// import { body } from "express-validator";

//---------- Blog Validation ----------
export const blogValidation = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 100 })
    .withMessage("Title must be less than 100 characters"),

  body("summary")
    .optional()
    .isLength({ max: 300 })
    .withMessage("Summary must be less than 300 characters"),

  body("author").notEmpty().withMessage("Author is required"),

  body("category").notEmpty().withMessage("Category is required"),

  body("tags")
    .optional()
    .isArray()
    .withMessage("Tags should be an array of strings"),

  body("tags.*").optional().isString().withMessage("Each tag must be a string"),

  body("sections")
    .isArray({ min: 1 })
    .withMessage("At least one section is required"),

  body("sections.*.heading")
    .optional()
    .isString()
    .withMessage("Section heading must be a string"),

  body("sections.*.paragraph")
    .notEmpty()
    .withMessage("Each section must have a paragraph"),

  body("sections.*.hasImage")
    .optional()
    .isBoolean()
    .withMessage("hasImage must be a boolean"),

  body("sections.*.image")
    .optional()
    .isString()
    .withMessage("Image must be a string path"),

  body("coverImage")
    .optional()
    .isString()
    .withMessage("Cover image must be a string path"),
];

//---------- Inquiry Validation ----------
export const inquiryValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("subject").notEmpty().withMessage("Subject is required"),
  body("message").notEmpty().withMessage("Message is required"),
];

//---------- Contact Validation ----------
export const contactValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("message").notEmpty().withMessage("Message is required"),
];

//---------- Gallery Validation ----------
export const galleryValidation = [
  body("title").notEmpty().withMessage("Title is required"),
  body("category").notEmpty().withMessage("Category is required"),
  body().custom((value, { req }) => {
    // Check for files uploaded via multer
    if (req.files && req.files.src && req.files.src.length > 0) {
      return true;
    }
    // Check for URLs in body (for non-file uploads)
    let src = req.body.src;
    if (typeof src === "string") src = [src];
    if (Array.isArray(src) && src.length > 0) {
      return true;
    }
    throw new Error("At least one image is required");
  }),
  body("location").optional().isString(),
  body("date").optional().isString(),
  body("description").optional().isString(),
  body("photographer").optional().isString(),
];
