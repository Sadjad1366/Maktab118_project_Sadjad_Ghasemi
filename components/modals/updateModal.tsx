"use client";

import { z } from "zod";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { FiUpload, FiX } from "react-icons/fi";
import { className } from "@/utils/classNames";
import React, { useState, useEffect } from "react";

// Zod Validation Schema
export const updateProductValidationSchema = z.object({
  category: z.string().min(3, "لطفا یک دسته بندی را انتخاب کنید").trim(),
  subcategory: z.string().min(3, "حداقل سه کاراکتر وارد کنید").trim(),
  name: z.string().min(3, "حداقل سه کاراکتر وارد کنید").trim(),
  price: z.coerce.number().min(1, "قیمت باید بیشتر از صفر باشد"),
  quantity: z.coerce.number().min(1, "تعداد باید بیشتر از صفر باشد"),
  brand: z.string().min(3, "حداقل سه کاراکتر وارد کنید").trim(),
  description: z.string().min(3, "حداقل سه کاراکتر وارد کنید").trim(),
  images: z.array(z.instanceof(File)).min(1, "حداقل یک عکس لازم است"),
});

interface IUpdateModal {
  isOpen: boolean;
  product: IProduct | null;
  categories: Record<string, string>;
  subcategories: Record<string, { _id: string; name: string }[]>;
  onClose: () => void;
  onUpdate: (id: string, updatedProduct: FormData) => void;
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
    price: "",
    subcategory: "",
    quantity: "",
    brand: "",
    description: "",
  });

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState<
    { _id: string; name: string }[]
  >([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const t = useTranslations("UpdateModal");

  // Populate subcategories based on category selection
  useEffect(() => {
    if (formData.category) {
      setFilteredSubcategories(subcategories[formData.category] || []);
    } else {
      setFilteredSubcategories([]);
    }
  }, [formData.category, subcategories]);

  // Populate form and images when modal opens
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        category: product.category || "",
        price: product.price?.toString() || "",
        subcategory: product.subcategory || "",
        quantity: product.quantity?.toString() || "",
        brand: product.brand || "",
        description: product.description || "",
      });

      // Populate existing image previews
      setImagePreviews(
        product.images?.map(
          (img) => `http://backend-6us4acis1-sadjad1366s-projects.vercel.app/images/products/images/${img}`
        ) || []
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
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const newPreviews = files.map((file) => URL.createObjectURL(file));

      setImageFiles((prev) => [...prev, ...files]);
      setImagePreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!product) return;

    // Combine formData and image files for validation
    const submissionData = { ...formData, images: imageFiles };

    // Validate using Zod
    const validationResult =
      updateProductValidationSchema.safeParse(submissionData);

    if (!validationResult.success) {
      const newErrors: Record<string, string> = {};
      validationResult.error.errors.forEach((err) => {
        if (err.path) {
          newErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(newErrors);
      return;
    }

    setErrors({}); // Clear errors

    // Prepare FormData
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => form.append(key, value));
    imageFiles.forEach((file) => form.append("images", file));

    onUpdate(product._id, form);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 p-6">
      <div className="bg-slate-200 p-6 rounded-lg shadow-lg w-full max-w-lg max-h-screen overflow-auto">
        <h2 className="text-lg font-bold mb-4 text-center">{t("title")}</h2>

        {/* Name */}
        <div>
          <label>{t("fields.name")}</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
          {errors.name && <p className="text-red-500">{t("errors.name")}</p>}
        </div>

        {/* Category and Subcategory */}
        <div className="flex gap-2 mt-4">
          <div className="w-1/2">
            <label>{t("fields.category")}</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border rounded p-2"
            >
              <option value="">{t("choose")}</option>
              {Object.entries(categories).map(([id, name]) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500">{t("errors.category")}</p>
            )}
          </div>
          <div className="w-1/2">
            <label>{t("fields.subcategory")}</label>
            <select
              name="subcategory"
              value={formData.subcategory}
              onChange={handleChange}
              className="w-full border rounded p-2"
            >
              <option value="">{t("choose")}</option>
              {filteredSubcategories.map((sub) => (
                <option key={sub._id} value={sub._id}>
                  {sub.name}
                </option>
              ))}
            </select>
            {errors.subcategory && (
              <p className="text-red-500">{t("errors.subcategory")}</p>
            )}
          </div>
        </div>

        {/* Price and Quantity */}
        <div className="flex gap-2 mt-4">
          <div className="w-1/2">
            <label>{t("fields.price")}</label>
            <input
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
            {errors.price && (
              <p className="text-red-500">{t("errors.price")}</p>
            )}
          </div>
          <div className="w-1/2">
            <label>{t("fields.quantity")}</label>
            <input
              name="quantity"
              type="number"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
            {errors.quantity && (
              <p className="text-red-500">{t("errors.quantity")}</p>
            )}
          </div>
        </div>
        {/* Brand */}
        <div>
          <label>{t("fields.brand")}</label>
          <input
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
          {errors.brand && <p className="text-red-500">{t("errors.brand")}</p>}
        </div>

        {/* Description */}
        <div className="mt-4">
          <label>{t("fields.description")}</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full border rounded p-2"
          />
          {errors.description && (
            <p className="text-red-500">{t("errors.description")}</p>
          )}
        </div>

        {/* Images */}
        <div className="mt-4 flex gap-x-2">
          <label
            className={className(
              "w-36 h-20 flex flex-col items-center px-4 py-4 bg-white text-blue",
              "rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue"
            )}
          >
            <FiUpload />
            <span>{t("fields.images")}</span>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
          {errors.images && (
            <p className="text-red-500">{t("errors.images")}</p>
          )}
          <div className="flex gap-2 mt-2">
            {imagePreviews.map((src, index) => (
              <div key={index} className="relative">
                <Image
                  src={src}
                  width={64}
                  height={64}
                  alt="Product Image"
                  className="w-16 h-16 object-cover rounded"
                />
                <button
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
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            لغو
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            ذخیره
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;
