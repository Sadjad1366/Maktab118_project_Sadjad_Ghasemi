"use client";
import React, { useState } from "react";
import { FiUpload, FiX } from "react-icons/fi";

interface ICreateModal {
  isOpen: boolean;
  product: IProduct | null;
  categories: Record<string, string>;
  subcategories: Record<string, string>;
  onClose: () => void;
  onCreate: (createdProduct: FormData) => void; // Expecting FormData for file upload
}

const CreateModal: React.FC<ICreateModal> = ({
  isOpen,
  product,
  categories,
  subcategories,
  onClose,
  onCreate,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: 0,
    subcategory: "",
    quantity: 0,
    brand: "",
    description: "",
    images: [],
  });
  const [imageFiles, setImageFiles] = useState<File[]>([]); // Store multiple files
  const [imagePreviews, setImagePreviews] = useState<string[]>([]); // Store image previews

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
      const newFiles = [...imageFiles, ...files];
      const newPreviews = [...imagePreviews, ...files.map((file) => URL.createObjectURL(file))];

      setImageFiles(newFiles); // Add new files to the state
      setImagePreviews(newPreviews); // Add new previews
    }
  };

  const handleRemoveImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index)); // Remove the file
    setImagePreviews((prev) => prev.filter((_, i) => i !== index)); // Remove the preview
  };

  const handleSubmit = () => {
    const form = new FormData();
    form.append("name", formData.name);
    form.append("category", formData.category);
    form.append("subcategory", formData.subcategory);
    form.append("brand", formData.brand);
    form.append("quantity", formData.quantity.toString());
    form.append("price", formData.price.toString());
    form.append("description", formData.description);
    imageFiles.forEach((file) => form.append("images", file)); // Append all selected images

    onCreate(form); // Pass formData to onCreate callback
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-start items-start bg-black bg-opacity-50 z-50 p-6">
      <div className="bg-slate-200 p-6 rounded-lg shadow-lg w-full max-w-sm mx-auto mt-1">
        <h2 className="text-lg font-bold text-gray-700 mb-4 text-center">
          ایجاد محصول
        </h2>
        <div className="space-y-3">
          {/* Product Name */}
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
                <option value="" disabled>
                  انتخاب کنید
                </option>
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
                <option value="" disabled>
                  انتخاب کنید
                </option>
                {Object.entries(subcategories).map(([id, name]) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* Brand */}
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
                className="w-full border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm p-2"
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
              {/* Display Uploaded Images */}
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative">
                  <img
                    src={preview}
                    alt={`Uploaded ${index}`}
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
                انتخاب فایل
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

export default CreateModal;
