import React, { useState } from "react";
import { createNewBookApi } from "../../../utils/ENE_Api";

const CreateBook = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    description: "",
    price: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const response = await createNewBookApi(formData);
    const data = await response.json();

    if (response.status === 201) {
      alert(data.message);
      // Optionally reset the form
      setFormData({
        title: "",
        author: "",
        category: "",
        description: "",
        price: "",
      });
    } else {
      alert("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 w-full">
      <div className="shadow-lg rounded-lg p-8 w-full max-w-lg ">
        <h2 className="text-3xl text-gray-500 font-light mb-4 text-center">
          Create Book
        </h2>
        <form onSubmit={handleFormSubmit}>
          {/* Title */}
          <div className="mb-4">
            <label className="block font-medium mb-2" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              className="w-full px-3 py-2 input input-bordered"
              placeholder="Enter book title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Author */}
          <div className="mb-4">
            <label className="block font-medium mb-2" htmlFor="author">
              Author
            </label>
            <input
              type="text"
              id="author"
              className="w-full px-3 py-2 input input-bordered"
              placeholder="Enter author name"
              value={formData.author}
              onChange={handleChange}
              required
            />
          </div>

          {/* Category */}
          <div className="mb-4">
            <label className="block font-medium mb-2" htmlFor="category">
              Category
            </label>
            <input
              type="text"
              id="category"
              className="w-full px-3 py-2 input input-bordered"
              placeholder="Enter category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block font-medium mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              className="w-full px-3 py-2 input input-bordered"
              rows="4"
              placeholder="Enter book description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          {/* Price */}
          <div className="mb-4">
            <label className="block font-medium mb-2" htmlFor="price">
              Price
            </label>
            <input
              type="number"
              id="price"
              className="w-full px-3 py-2 input input-bordered rounded-md"
              placeholder="Enter price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button type="submit" className="w-full btn btn-primary">
              Create Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBook;
