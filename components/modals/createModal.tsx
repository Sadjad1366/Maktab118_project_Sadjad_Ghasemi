"use client";

import React, { useState, useEffect } from "react";
import { FiUpload, FiX } from "react-icons/fi";
import { z } from "zod";

// Zod Validation Schema
const addProductValidationSchema = z.object({
  category: z.string().min(3, "لطفا یک دسته بندی را انتخاب کنید").trim(),
  subcategory: z.string().min(1, "لطفاً یک زیر دسته‌بندی انتخاب کنید").trim(),
  name: z.string().min(3, "حداقل سه کاراکتر وارد کنید").trim(),
  price: z.coerce.number().min(1, "قیمت باید بیشتر از صفر باشد"),
  quantity: z.coerce.number().min(1, "تعداد باید بیشتر از صفر باشد"),
  brand: z.string().min(3, "حداقل سه کاراکتر وارد کنید").trim(),
  description: z.string().min(3, "حداقل سه کاراکتر وارد کنید").trim(),
  images: z
    .array(z.instanceof(File))
    .min(1, "حداقل یک عکس لازم است"),
});

interface ICreateModal {
  isOpen: boolean;
  categories: Record<string, string>;
  subcategories: Record<string, { _id: string; name: string }[]>;
  onClose: () => void;
  onCreate: (createdProduct: FormData) => void;
}

const CreateModal: React.FC<ICreateModal> = ({
  isOpen,
  categories,
  subcategories,
  onClose,
  onCreate,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    subcategory: "",
    price: "",
    quantity: "",
    brand: "",
    description: "",
    images: [] as File[],
  });

  const [filteredSubcategories, setFilteredSubcategories] = useState<
    { _id: string; name: string }[]
  >([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  useEffect(() => {
    if (formData.category) {
      setFilteredSubcategories(subcategories[formData.category] || []);
    } else {
      setFilteredSubcategories([]);
    }
  }, [formData.category, subcategories]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...files],
      }));
      setImagePreviews((prev) => [
        ...prev,
        ...files.map((file) => URL.createObjectURL(file)),
      ]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    // Reset previous errors
    setErrors({});
    const validationResult = addProductValidationSchema.safeParse(formData);

    if (!validationResult.success) {
      // Map validation errors
      const newErrors: Record<string, string> = {};
      validationResult.error.errors.forEach((err) => {
        if (err.path) {
          newErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(newErrors);
      return;
    }

    // Prepare FormData for submission
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "images") {
        (value as File[]).forEach((file) => form.append("images", file));
      } else {
        form.append(key, value as string);
      }
    });

    onCreate(form);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 p-6">
      <div className="bg-slate-100 p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-lg font-bold text-gray-700 mb-4 text-center">
          ایجاد محصول
        </h2>
        <div className="space-y-3">
          {/* Product Name */}
          <div>
            <label>نام محصول</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          {/* Category and Subcategory */}
          <div className="flex gap-2">
            <div className="w-1/2">
              <label>دسته‌بندی</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="">انتخاب کنید</option>
                {Object.entries(categories).map(([id, name]) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm">{errors.category}</p>
              )}
            </div>
            <div className="w-1/2">
              <label>زیر دسته‌بندی</label>
              <select
                name="subcategory"
                value={formData.subcategory}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="">انتخاب کنید</option>
                {filteredSubcategories.map((sub) => (
                  <option key={sub._id} value={sub._id}>
                    {sub.name}
                  </option>
                ))}
              </select>
              {errors.subcategory && (
                <p className="text-red-500 text-sm">{errors.subcategory}</p>
              )}
            </div>
          </div>

          {/* Price and Quantity */}
          <div className="flex gap-2">
            <div className="w-1/2">
              <label>قیمت</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              {errors.price && (
                <p className="text-red-500 text-sm">{errors.price}</p>
              )}
            </div>
            <div className="w-1/2">
              <label>تعداد</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              {errors.quantity && (
                <p className="text-red-500 text-sm">{errors.quantity}</p>
              )}
            </div>
          </div>
          <div>
            <label>برند</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            {errors.brand && <p className="text-red-500 text-sm">{errors.brand}</p>}
          </div>
          <div>
            <label>توضیحات</label>
            <textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
          </div>
          {/* Images */}
          <div>
            <label>تصاویر</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="w-full p-2 border"
            />
            {errors.images && (
              <p className="text-red-500 text-sm">{errors.images}</p>
            )}
            <div className="flex flex-wrap gap-2 mt-2">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative">
                  <img
                    src={preview}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-0 left-0 bg-red-500 text-white rounded-full p-1"
                  >
                    <FiX />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-center gap-4">
            <button
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              انصراف
            </button>
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              ایجاد محصول
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateModal;
