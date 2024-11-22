"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ArtAppraisals() {
  const [formData, setFormData] = useState({
    inquiryType: "",
    description: "",
    medium: "",
    itemsList: "",
  });
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    // Append form fields
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    // Append files
    selectedFiles.forEach((file) => {
      formDataToSend.append("files", file);
    });

    try {
      const response = await fetch("/api/art-appraisals", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        // Handle success
        console.log("Form submitted successfully");
      } else {
        // Handle error
        console.error("Form submission failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    // Validate file size and count
    const validFiles = files.filter((file) => file.size <= 10 * 1024 * 1024); // 10MB limit
    if (validFiles.length + selectedFiles.length > 20) {
      alert("Maximum 20 files allowed");
      return;
    }
    setSelectedFiles((prev) => [...prev, ...validFiles]);
  };

  const handleFileRemove = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <Link
        href="/"
        className="text-blue-600 hover:text-blue-800 transition-colors mb-4 inline-block"
      >
        ← Back to Home
      </Link>
      <h1 className="text-3xl font-bold mb-6">Art Appraisal Request</h1>
      <div className="bg-gray-100 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">
          Tell Us About Your Work
        </h2>
        <p className="mb-4 text-sm text-gray-700">
          For potential auction material only, not for insurance purposes or for
          items that do not meet our requirements.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="inquiryType"
              className="block mb-2 font-semibold text-gray-800"
            >
              You are inquiring about: <span className="text-red-500">*</span>
            </label>
            <select
              id="inquiryType"
              name="inquiryType"
              value={formData.inquiryType}
              onChange={handleChange}
              className="w-full p-2 border rounded text-gray-800"
              required
            >
              <option value="">Select an option</option>
              <option value="painting">Painting</option>
              <option value="sculpture">Sculpture</option>
              <option value="photograph">Photograph</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block mb-2 font-semibold text-gray-800"
            >
              Brief Description: <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded text-gray-800"
              placeholder="e.g., Artist name, etc."
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="medium"
              className="block mb-2 font-semibold text-gray-800"
            >
              Medium:
            </label>
            <input
              type="text"
              id="medium"
              name="medium"
              value={formData.medium}
              onChange={handleChange}
              className="w-full p-2 border rounded text-gray-800"
              placeholder="e.g., oil on canvas, silver, pottery, bronze, etc."
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="itemsList"
              className="block mb-2 font-semibold text-gray-800"
            >
              List of Items or highlights:{" "}
              <span className="text-red-500">*</span>
            </label>
            <textarea
              id="itemsList"
              name="itemsList"
              value={formData.itemsList}
              onChange={handleChange}
              className="w-full p-2 border rounded text-gray-800"
              rows={4}
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <p className="font-semibold mb-2 text-gray-800">
              Upload photos: (10MB max file size per photo and up to 20 photos)
            </p>
            <div className="border-2 border-dashed border-gray-300 p-8 text-center">
              <div className="mb-4">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <p className="text-gray-600">Drag and drop images here or</p>
              <input
                type="file"
                id="file-input"
                className="hidden"
                multiple
                accept="image/*"
                onChange={handleFileSelect}
              />
              <label
                htmlFor="file-input"
                className="mt-2 text-blue-600 hover:text-blue-800 cursor-pointer"
              >
                Select some files
              </label>

              {/* Preview selected files */}
              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${index}`}
                      width={128}
                      height={128}
                      className="w-full h-32 object-cover rounded"
                    />
                    <button
                      onClick={() => handleFileRemove(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Submit Appraisal Request
          </button>
        </form>
      </div>
    </main>
  );
}
