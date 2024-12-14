"use client";
import { className } from "@/utils/classNames";
import React, { useState, useEffect } from "react";
import { FiUpload, FiX } from "react-icons/fi";

interface IUpdateModal {
  isOpen: boolean;
  product: IProduct | null;
  categories: Record<string, string>;
  subcategories: Record<string, string>;
  onClose: () => void;
  onUpdate: (id: string, updatedProduct: FormData) => void; // Expecting FormData for file upload
}

const UpdateModal: React.FC<IUpdateModal> = ({
  isOpen,
  product,
  categories,
  subcategories,
  onClose,
  onUpdate,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: 0,
    subcategory: "",
    quantity: 0,
    brand: "",
    description: "",
  });
  const [imageFiles, setImageFiles] = React.useState<File[]>([]); // Store multiple files
  const [imagePreviews, setImagePreviews] = useState<string[]>([]); // Store multiple previews

  useEffect(() => {
    // Populate formData and set the preview when the modal opens
    if (product) {
      setFormData({
        name: product.name || "",
        category: product.category || "",
        price: product.price || 0,
        subcategory: product.subcategory || "",
        quantity: product.quantity || 0,
        brand: product.brand || "",
        description: product.description || "",
      });

      // Set the current images as the preview
      if (product.images?.length) {
        setImagePreviews(
          product.images.map(
            (img) => `http://localhost:8000/images/products/images/${img}` // Adjust URL based on your backend
          )
        );
      }
    }
  }, [product]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files); // Convert FileList to Array
      const filePreviews = files.map((file) => URL.createObjectURL(file));

      setImageFiles((prev) => [...prev, ...files]); // Add new files to the state
      setImagePreviews((prev) => [...prev, ...filePreviews]); // Add new previews
    }
  };

  const handleRemoveImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index)); // Remove the file
    setImagePreviews((prev) => prev.filter((_, i) => i !== index)); // Remove the preview
  };

  const handleSubmit = () => {
    if (!product) return;

    const form = new FormData();
    form.append("name", formData.name);
    form.append("category", formData.category);
    form.append("subcategory", formData.subcategory);
    form.append("brand", formData.brand);
    form.append("quantity", formData.quantity.toString());
    form.append("price", formData.price.toString());
    form.append("description", formData.description);

    // Append all image files
    imageFiles.forEach((file) => form.append("images", file));

    onUpdate(product._id, form); // Pass id and formData
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-start items-start bg-black bg-opacity-50 z-50 p-6">
      <div className="bg-slate-200 p-6 rounded-lg shadow-lg w-full max-w-sm mx-auto mt-1">
        <h2 className="text-lg font-bold text-gray-700 mb-4 text-center">
          ویرایش محصول
        </h2>
        <div className="space-y-3">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              نام محصول
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm p-2"
            />
          </div>
          {/* Category and Subcategory */}
          <div className="flex gap-2">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">
                دسته‌بندی
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm p-2"
              >
                {Object.entries(categories).map(([id, name]) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">
                زیر دسته‌بندی
              </label>
              <select
                name="subcategory"
                value={formData.subcategory}
                onChange={handleChange}
                className="w-full border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm p-2"
              >
                {Object.entries(subcategories).map(([id, name]) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* Brand Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              برند
            </label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="w-full border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm p-2"
            />
          </div>
          {/* Price and Quantity */}
          <div className="flex gap-2">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">
                قیمت
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm p-2"
              />
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">
                تعداد
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
          </div>
          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              توضیحات
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={2}
              className="w-full border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              تصاویر
            </label>
            <div className="flex flex-wrap gap-3 mt-2">
              {/* Existing Previews */}
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative">
                  <img
                    src={preview}
                    alt={`Preview ${index}`}
                    className="w-16 h-16 object-cover rounded-md shadow"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-0 left-0 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center"
                  >
                    <FiX />
                  </button>
                </div>
              ))}
              {/* File Upload */}
              <label className="flex items-center justify-center px-4 py-2 text-sm text-blue-600 bg-white border border-blue-500 rounded-lg shadow-sm cursor-pointer hover:bg-blue-50">
                <FiUpload className="mr-2" />
                انتخاب فایل‌ها
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  multiple
                />
              </label>
            </div>
          </div>
        </div>
        {/* Actions */}
        <div className="mt-4 flex justify-center gap-4">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
          >
            لغو
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            ذخیره
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;
