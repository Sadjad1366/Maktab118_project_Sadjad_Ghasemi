"use client";
import React from "react";

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
  const [formData, setFormData] = React.useState({
    name: "",
    category: "",
    price: 0,
    subcategory: "",
    quantity: 0,
    brand: "",
    description: "",
    images: [],
  });
  const [imageFile, setImageFile] = React.useState<File | null>(null);

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
      setImageFile(e.target.files[0]); // Save the selected file
    }
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
    if (imageFile) {
      form.append("images", imageFile);
    }
    // for (const [key, value] of form.entries()) {
    //   console.log(`${key}: ${value}`); // Log all fields
    // }
    onCreate(form); // Pass id and formData
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-slate-200 p-8 rounded-md shadow-lg max-w-lg w-full">
        <h2 className="text-xl font-semibold text-gray-700 mb-6">
          ایجاد محصول
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
                <option value="" disabled>
                  انتخاب کنید
                </option>
                {Object.entries(categories).map(([id, name]) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </select>
              {/* {formData.category} */}
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
                <option value="" disabled>
                  انتخاب کنید
                </option>
                {Object.entries(subcategories).map(([id, name]) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </select>
              {/* {formData.subcategory} */}
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
          <div className="flex justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700 p-1">
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
              <label className="text-sm font-medium text-gray-700 p-1">
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
            <input
              required
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full border-gray-300 rounded-md shadow-sm p-2"
            />
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

export default CreateModal;
