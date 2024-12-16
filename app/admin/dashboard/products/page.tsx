"use client";

import React from "react";
import toast from "react-hot-toast";
import { FaSort } from "react-icons/fa";
import UpdateModal from "@/components/modals/updateModal";
import DeleteModal from "@/components/modals/deleteModal";
import {
  createNewProduct,
  deleteProductById,
  getAllProductsReq,
  updateProductById,
} from "@/apis/product.service";
import { getAllCategories, getAllSubCategories } from "@/apis/product.service";
import { className } from "@/utils/classNames";
import CreateModal from "@/components/modals/createModal";

const ProductPage: React.FC = () => {
  const [products, setProducts] = React.useState<IProduct[]>([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [categoriesMap, setCategoriesMap] = React.useState<
    Record<string, string>
  >({});
  const [subCategoriesMap, setSubCategoriesMap] = React.useState<
  Record<string, { _id: string; name: string }[]>
>({});


  const [subCatMap, setSubCatMap] = React.useState<
  Record<string, string>
>({});
  const [isUpdateModalOpen, setIsUpdateModalOpen] = React.useState(false);
  const [productToUpdate, setProductToUpdate] = React.useState<IProduct | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [productToDelete, setProductToDelete] = React.useState<IProduct | null>(
    null
  );
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
  const [productToCreate, setProductToCreate] = React.useState<IProduct | null>(
    null
  );

  // Open and close create modal
  const openCreateModal = () => {
    setIsCreateModalOpen(true);
    // setProductToCreate(null); // Explicitly pass null if no initial value is needed
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
    // setProductToCreate(null);
  };

  // Open and close update modal
  const openUpdateModal = (product: IProduct) => {
    setProductToUpdate(product);
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setProductToUpdate(null);
  };

  // Open and close delete modal
  const openDeleteModal = (product: IProduct) => {
    setProductToDelete(product);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setProductToDelete(null);
  };

  // Fetch products
  const fetchProducts = async (page: number) => {
    try {
      const response = await getAllProductsReq(page, 6);
      setProducts(response.data.products);
      setTotalPages(response.total_pages);
    } catch (error) {
      toast.error("خطا در دریافت لیست کالاها");
    }
  };

  // Fetch categories and subcategories
  const fetchCategories = async () => {
    try {
      const categories = await getAllCategories();
      const map: Record<string, string> = {};
      categories.forEach((category: ICategory) => {
        map[category._id] = category.name;
      });
      setCategoriesMap(map);
    } catch (error) {
      console.error("خطا در دریافت دسته‌بندی‌ها:", error);
    }
  };

  const fetchSubCategories = async () => {
    try {
      const subCategories = await getAllSubCategories();

      const map: Record<string, { _id: string; name: string }[]> = {};
      const flatMap: Record<string, string> = {}; // For ID -> Name mapping

      subCategories.forEach((subcategory: ISubCategory) => {
        // Populate `subCategoriesMap` for category-to-subcategories
        if (!map[subcategory.category]) {
          map[subcategory.category] = [];
        }
        map[subcategory.category].push({
          _id: subcategory._id,
          name: subcategory.name,
        });

        // Populate `subCatMap` for ID-to-name mapping
        flatMap[subcategory._id] = subcategory.name;
      });

      setSubCategoriesMap(map);
      setSubCatMap(flatMap); // Ensure this is populated
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };


  // create product
  const createProduct = async (formData: FormData) => {
    try {
      await createNewProduct(formData);
      toast.success("محصول با موفقیت ایجاد گردید");
      fetchProducts(currentPage); // Refresh product list
      closeCreateModal(); // Close the modal
    } catch (error) {
      toast.error("خطا در ایجاد کالا");
      console.error(error);
    }
  };

  // Update product
  const updateProduct = async (id: string, formData: FormData) => {
    try {
      await updateProductById(id, formData);
      toast.success("محصول با موفقیت بروزرسانی شد");
      fetchProducts(currentPage); // Refresh product list
      closeUpdateModal(); // Close the modal
    } catch (error) {
      toast.error("خطا در بروزرسانی کالا");
      console.error(error);
    }
  };
  // Delete product
  const deleteProduct = async (id: string) => {
    try {
      await deleteProductById(id);
      toast.success("حذف با موفقیت انجام شد");

      // Temporarily filter the product list to simulate deletion
      const updatedProducts = products.filter((product) => product._id !== id);

      // If the page becomes empty and it's not the first page, go to the previous page
      if (updatedProducts.length === 0 && currentPage > 1) {
        setCurrentPage((prev) => prev - 1); // Navigate to the previous page
      } else {
        setProducts(updatedProducts); // Update product list without navigating
      }

      fetchProducts(currentPage); // Refresh product list
      closeDeleteModal(); // Close the modal
    } catch (error: any) {
      toast.error(error.message || "خطا در حذف کالا");
    }
  };

  // Pagination handling
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  React.useEffect(() => {
    fetchProducts(currentPage);
    fetchCategories();
    fetchSubCategories();
  }, [currentPage]);

  return (
    <div className="overflow-x-auto sm:rounded-lg bg-slate-300 lg:w-[800px] p-3">
      <div className={isModalOpen ? "filter blur-sm" : ""}>
        <div className="flex justify-between py-3 px-2">
          <h2 className="text-slate-600 font-semibold text-xl">مدیریت کالا</h2>
          <button
            onClick={openCreateModal}
            className="bg-gray-600 hover:bg-gray-700 text-white p-2 rounded-lg"
          >
            افزودن کالا
          </button>
        </div>

        {/* Product Table */}
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
                دسته‌بندی
              </th>
              <th scope="col" className="px-2 py-3">
                زیر دسته‌بندی
              </th>
              <th scope="col" className="px-2 py-3">
                قیمت
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
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
                <td className="px-2 py-4">{product.name}</td>
                <td className="px-2 py-4">{categoriesMap[product.category]}</td>
                <td className="px-2 py-4">
                  {subCatMap[product.subcategory]}
                </td>

                <td className="px-2 py-4">
                  {Number(product.price).toLocaleString()} تومان
                </td>
                <td className="px-2 py-4 text-right flex gap-x-2">
                  <button
                    onClick={() => openUpdateModal(product)}
                    className="text-blue-500 hover:underline"
                  >
                    ویرایش
                  </button>
                  <button
                    onClick={() => openDeleteModal(product)}
                    className="text-red-500 hover:underline"
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-4">
                  هیچ کالایی وجود ندارد.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center gap-x-5 pt-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-gray-700 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            قبلی
          </button>
          <span>
            صفحه {currentPage} از {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-gray-700 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            بعدی
          </button>
        </div>
      </div>

      {/* Modals */}
      <DeleteModal
        isOpen={isModalOpen}
        onClose={closeDeleteModal}
        title="حذف کالا"
        onConfirm={() => deleteProduct(productToDelete?._id || "")}
      >
        <p>
          آیا مطمئن هستید که می‌خواهید "{productToDelete?.name}" را حذف کنید؟
        </p>
      </DeleteModal>

      <UpdateModal
        isOpen={isUpdateModalOpen}
        product={productToUpdate}
        categories={categoriesMap}
        subcategories={subCategoriesMap}
        onClose={closeUpdateModal}
        onUpdate={updateProduct}
      />
      <CreateModal
        isOpen={isCreateModalOpen}
        product={productToCreate}
        categories={categoriesMap}
        subcategories={subCategoriesMap}
        onClose={closeCreateModal}
        onCreate={createProduct}
      />
    </div>
  );
};

export default ProductPage;
