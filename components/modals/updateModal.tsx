"use client";
import { className } from "@/utils/classNames";
import React, { useState, useEffect } from "react";
import { FiUpload } from "react-icons/fi";

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
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null); // For previewing the image

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

      // Set the current image as the preview
      setImagePreview(
        `http://localhost:8000/images/products/images/${product.images[0]}` // Update URL as per your backend setup
      );
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
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file); // Save the selected file
      setImagePreview(URL.createObjectURL(file)); // Create a preview for the new image
    }
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
    if (imageFile) {
      form.append("images", imageFile);
    }
    // for (const [key, value] of form.entries()) {
    //   console.log(`${key}: ${value}`); // Log all fields
    // }

    onUpdate(product._id, form); // Pass id and formData
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-slate-200 p-8 rounded-md shadow-lg max-w-lg w-full">
        <h2 className="text-xl font-semibold text-gray-700 mb-6">
          ویرایش محصول
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 p-1">
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
          <div className="flex gap-x-3">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 p-1">
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
              <label className="block text-sm font-medium text-gray-700 p-1">
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
          <div>
            <label className="block text-sm font-medium text-gray-700 p-1">
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
          {/* <div>
            <label className="block text-sm font-medium text-gray-700 p-1">
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
          <div>
            <label className="block text-sm font-medium text-gray-700 p-1">
              تعداد
            </label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md shadow-sm p-2"
            />
          </div> */}
          <div>
            <label className="block text-sm font-medium text-gray-700 p-1">
              توضیحات
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 p-1">
              تصویر
            </label>
            <div className="flex gap-x-6 items-center">
              <div className="flex items-center bg-grey-lighter">
                <label
                  className={className(
                    "w-48 h-16 flex flex-col items-center px-4 py-1",
                    "bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border",
                    "border-blue cursor-pointer hover:bg-blue"
                  )}
                >
                  <FiUpload />
                  <span className="mt-2 text-base leading-normal">
                    یک عکس انتخاب کنید
                  </span>
                  <input
                    required
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
              <div className="flex justify-center items-center">
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-center gap-x-8">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-md shadow hover:bg-gray-600 transition"
          >
            لغو
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition"
          >
            ذخیره
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;
