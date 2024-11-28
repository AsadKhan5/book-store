const express = require("express");
const Book = require("../models/Book");

const router = express.Router();

//  * Create a new book
router.post("/books", async (req, res) => {
  try {
    const { title, author, category, description, price } = req.body;
    console.log(req.body);
    // Create a new book document
    const newBook = new Book({ title, author, category, description, price });
    await newBook.save();

    res
      .status(201)
      .json({ message: "Book created successfully", book: newBook });
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(500).json({ error: "Failed to create book" });
  }
});

//  * Get all books
router.get("/books", async (req, res) => {
  try {
    const page = 1;
    const limit = 10;

    const books = await Book.find()
      .sort({ title: 1 })
      .skip((page - 1) * limit)
      .limit(limit);
    res.status(200).json({ books });
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

//  * Search books by title, author, category, or description
router.get("/books/search", async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: "Search query is required" });
  }

  try {
    // Search query prioritizing fields: title > author > category > description
    const books = await Book.find({
      $or: [
        { title: { $regex: q, $options: "i" } },
        { author: { $regex: q, $options: "i" } },
        { category: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
      ],
    })
      .sort({
        title: 1,
        author: 1,
      })
      .limit(20);

    res.status(200).json({ books });
  } catch (error) {
    console.error("Error searching books:", error);
    res.status(500).json({ error: "Failed to search books" });
  }
});

module.exports = router;
