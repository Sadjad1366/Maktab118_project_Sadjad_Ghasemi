import React, { useState, useEffect } from "react";

interface UpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (updatedProduct: IProduct) => void;
  product: IProduct | null;
}

const UpdateModal: React.FC<UpdateModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  product,
}) => {
  const [formData, setFormData] = useState<IProduct>({
      rating: {
            rate: 0,
            count: 0,
          },
          _id:"",
          category: "",
          subcategory: "",
          name: "",
          price: 0,
          quantity: 0,
          brand: "",
          description: "",
          thumbnail: "",
          images: [],
          createdAt: "",
          updatedAt: "",
          slugname: "",
          discount: 0, 
  });

  useEffect(() => {
    if (product) {
      setFormData(product); // Prefill form with the selected product's data
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(formData); // Pass updated product to parent component
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">ویرایش کالا</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">نام</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">قیمت</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">دسته‌بندی</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              required
            >
              {/* Replace with your actual category options */}
              <option value="" disabled>
                انتخاب کنید
              </option>
              <option value="category1">دسته 1</option>
              <option value="category2">دسته 2</option>
            </select>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
            >
              لغو
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
            >
              ذخیره
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateModal;
