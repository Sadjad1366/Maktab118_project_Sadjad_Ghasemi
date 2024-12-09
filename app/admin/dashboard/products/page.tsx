// src/pages/admin/ProductPage.tsx
"use client";

import { deleteProductById, getAllProductsReq } from "@/apis/product.service";
import { getAllCategories } from "@/apis/product.service"; // Import the category service
import DeleteModal from "@/components/modals/deleteModal";
import { className } from "@/utils/classNames";
import React from "react";
import toast from "react-hot-toast";
import { FaSort } from "react-icons/fa";

const ProductPage: React.FC = () => {
  const [products, setProducts] = React.useState<IProduct[]>([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [categoriesMap, setCategoriesMap] = React.useState<
    Record<string, string>
  >({});
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [productToDelete, setProductToDelete] = React.useState<IProduct | null>(
    null
  );

  //======== Modal handling functions =============
  const openDeleteModal = (product: IProduct) => {
    setProductToDelete(product);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setProductToDelete(null);
  };

  const confirmDelete = async () => {
    if (productToDelete) {
      await deleteProduct(productToDelete._id);
      closeDeleteModal();
    }
  };

  //============================ fetch categories
  const fetchCategories = async () => {
    try {
      const categories = await getAllCategories();
      const map: Record<string, string> = {};
      categories.forEach((category: ICategory) => {
        map[category._id] = category.name;
      });
      setCategoriesMap(map);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  //============================ fetch products
  const fetchProducts = async (currentPage: number) => {
    try {
      const response = await getAllProductsReq(currentPage, 6);
      setProducts(response.data.products);
      setTotalPages(response.total_pages);
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };

  //=================== delete product function =======
  const deleteProduct = async (id: string) => {
    try {
      const response = await deleteProductById(id);
      toast.success("حذف با موفقیت انجام گردید");
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id)
      );
      fetchProducts(currentPage);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  //================================================ pagination handling
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  React.useEffect(() => {
    fetchCategories();
    fetchProducts(currentPage);
  }, [currentPage]);

  return (

    <div className="overflow-x-auto sm:rounded-lg bg-slate-300 lg:w-[800px] p-3">
      <div className={isModalOpen ? "filter blur-sm" : ""}>
      <div className="flex justify-between py-3 px-2">
        <h2 className="text-slate-600 font-semibold text-xl">مدیریت کالا</h2>
        <button className="bg-gray-600 hover:bg-gray-700 text-white p-2 rounded-lg">
          افزودن کالا
        </button>
      </div>

      <table
        className={className(
          "w-full text-sm text-left",
          "rtl:text-right text-gray-500 dark:text-gray-400"
        )}
      >
        <thead
          className={className(
            "text-xs text-gray-700 uppercase",
            "bg-gray-200 border-b-2 dark:bg-gray-700 dark:text-gray-400"
          )}
        >
          <tr>
            <th className="px-5">تصاویر</th>
            <th scope="col" className="px-2 py-3">
              نام محصول
            </th>
            <th scope="col" className="px-2 py-3">
              <div className="flex items-center">
                دسته بندی
                <FaSort />
              </div>
            </th>
            <th scope="col" className="px-2 py-3">
              <div className="flex items-center">
                قیمت
                <FaSort />
              </div>
            </th>
            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product: IProduct) => (
            <tr
              key={product._id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <td>
                <img
                  src={`http://localhost:8000/images/products/images/${product.images[0]}`}
                  alt={product.name}
                  width="50px"
                />
              </td>
              <td
                className={className(
                  "flex items-center px-2 py-4",
                  "font-medium text-gray-900 whitespace-nowrap dark:text-white"
                )}
              >
                {product.name}
              </td>
              <td className="px-2 py-4">
                {categoriesMap[product.category] || "Unknown Category"}
              </td>
              <td className="px-2 py-4">
                {Number(product.price).toLocaleString()} تومان
              </td>
              <td className="px-1 py-4 text-right">
                <div className="flex gap-x-2">
                  <button className="font-medium text-blue-800 dark:text-blue-500 hover:underline">
                    ویرایش
                  </button>
                  <button
                    onClick={() => openDeleteModal(product)}
                    className="font-lg px-3 space-x-1 text-red-400 dark:text-blue-500 hover:underline"
                  >
                    حذف
                  </button>
                  {/* Modal */}

                </div>
              </td>
            </tr>
          ))}
          {products.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center py-4">
                هیچ کالایی وجود ندارد.
              </td>
            </tr>
          )}
        </tbody>
      </table>


      <div className="flex justify-between items-center gap-x-5 pt-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          type="button"
          className={className(
            "text-white bg-gray-700 hover:bg-gray-800",
            "rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center",
            "gap-2 flex-row-reverse",
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          )}
        >
          قبلی
        </button>
        <div className="flex items-center space-x-2">
          <span className="text-gray-600 font-semibold">
            صفحه {currentPage} از {totalPages}
          </span>
        </div>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          type="button"
          className={className(
            "text-white bg-gray-700 hover:bg-gray-800",
            "rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center",
            "gap-2 flex-row-reverse",
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          )}
        >
          بعدی
        </button>
      </div>
      </div>
      <DeleteModal
        isOpen={isModalOpen}
        onClose={closeDeleteModal}
        title="تأیید حذف کالا"
        onConfirm={confirmDelete}

      >
        <p>آیا مطمئن هستید که می‌خواهید "{productToDelete?.name}" را حذف کنید؟</p>
      </DeleteModal>
    </div>
  );
};

export default ProductPage;
