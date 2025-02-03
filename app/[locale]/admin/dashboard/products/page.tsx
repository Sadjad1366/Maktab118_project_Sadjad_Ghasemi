"use client";

import React from "react";
import toast from "react-hot-toast";
import UpdateModal from "@/components/modals/updateModal";
import DeleteModal from "@/components/modals/deleteModal";
import {
  createNewProduct,
  deleteProductById,
  getAllProductsReq,
  updateProductById,
} from "@/apis/product.service";
import { getAllCategories, getAllSubCategories } from "@/apis/category.service";
import { className } from "@/utils/classNames";
import CreateModal from "@/components/modals/createModal";
import { useTranslations } from "next-intl";
import { useCallback } from "react";
import Image from "next/image";

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

  const [subCatMap, setSubCatMap] = React.useState<Record<string, string>>({});
  const [isUpdateModalOpen, setIsUpdateModalOpen] = React.useState(false);
  const [productToUpdate, setProductToUpdate] = React.useState<IProduct | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [productToDelete, setProductToDelete] = React.useState<IProduct | null>(
    null
  );
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);

  // Open and close create modal
  const openCreateModal = () => setIsCreateModalOpen(true);

  const closeCreateModal = () => setIsCreateModalOpen(false);

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
  const t = useTranslations("ProductManagement");
  const t1 = useTranslations("DeleteModal");

  // Fetch products
  const fetchProducts = useCallback(
    async (page: number) => {
      try {
        const response = await getAllProductsReq(page, 6);
        setProducts(response.data.products);
        setTotalPages(response.total_pages);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error(`${t("notifications.fetch_error")}`);
      }
    },
    [t]
  );

  // Fetch categories and subcategories
  const fetchCategories = useCallback(async () => {
    try {
      const categories = await getAllCategories();
      const map: Record<string, string> = {};
      categories.forEach((category: ICategory) => {
        map[category._id] = category.name;
      });
      setCategoriesMap(map);
    } catch (error) {
      console.error(`${t("notifications.fetch_categories_error")}`, error);
    }
  }, [t]);

  const fetchSubCategories = useCallback(async () => {
    try {
      const subCategories = await getAllSubCategories();
      const map: Record<string, { _id: string; name: string }[]> = {};
      const flatMap: Record<string, string> = {};
      subCategories.forEach((subcategory: ISubCategory) => {
        if (!map[subcategory.category]) {
          map[subcategory.category] = [];
        }
        map[subcategory.category].push({
          _id: subcategory._id,
          name: subcategory.name,
        });
        flatMap[subcategory._id] = subcategory.name;
      });

      setSubCategoriesMap(map);
      setSubCatMap(flatMap);
    } catch (error) {
      console.error(`${t("notifications.fetch_subcategories_error")}`, error);
    }
  }, [t]);

  // create product
  const createProduct = async (formData: FormData) => {
    try {
      await createNewProduct(formData);
      toast.success(`${t("notifications.create_success")}`);
      fetchProducts(currentPage);
      closeCreateModal();
    } catch (error) {
      toast.error(`${t("notifications.create_error")}`);
      console.error(error);
    }
  };

  // Update product
  const updateProduct = async (id: string, formData: FormData) => {
    try {
      await updateProductById(id, formData);
      toast.success(`${t("notifications.update_success")}`);
      fetchProducts(currentPage);
      closeUpdateModal();
    } catch (error) {
      toast.error(`${t("notifications.update_error")}`);
      console.error(error);
    }
  };
  // Delete product
  const deleteProduct = async (id: string) => {
    try {
      await deleteProductById(id);
      toast.success(`${t("notifications.delete_success")}`);

      const updatedProducts = products.filter((product) => product._id !== id);

      if (updatedProducts.length === 0 && currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      } else {
        setProducts(updatedProducts);
      }

      fetchProducts(currentPage);
      closeDeleteModal();
    } catch (error: unknown) {
      const errMessage =
        (error as Error).message || t("notifications.delete_error");
      toast.error(errMessage);
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
  }, [currentPage, fetchProducts, fetchCategories, fetchSubCategories]);

  return (
    <div className="overflow-x-auto sm:rounded-lg bg-slate-300 lg:w-[800px] p-3">
      <div className={isModalOpen ? "filter blur-sm" : ""}>
        <div className="flex justify-between py-3 px-2">
          <h2 className="text-slate-600 font-semibold text-xl">{t("title")}</h2>
          <button
            onClick={openCreateModal}
            className="bg-gray-600 hover:bg-gray-700 text-white p-2 rounded-lg"
          >
            {t("add_product")}
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
              <th className="px-5"> {t("table.image")}</th>
              <th scope="col" className="px-2 py-3">
                {t("table.name")}
              </th>
              <th scope="col" className="px-2 py-3">
                {t("table.category")}
              </th>
              <th scope="col" className="px-2 py-3">
                {t("table.subcategory")}
              </th>
              <th scope="col" className="px-2 py-3">
                {t("table.price")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("table.actions")}
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td>
                  <Image
                    src={`http://localhost:8000/images/products/images/${product.images[0]}`}
                    alt={product.name}
                    width={50} 
                    height={50}
                  />
                </td>
                <td className="px-2 py-4">{product.name}</td>
                <td className="px-2 py-4">{categoriesMap[product.category]}</td>
                <td className="px-2 py-4">{subCatMap[product.subcategory]}</td>

                <td className="px-2 py-4">
                  {Number(product.price).toLocaleString()} {t("currency")}
                </td>
                <td className="px-2 py-4 text-right flex gap-x-2">
                  <button
                    onClick={() => openUpdateModal(product)}
                    className="text-blue-500 hover:underline"
                  >
                    {t("table.edit")}
                  </button>
                  <button
                    onClick={() => openDeleteModal(product)}
                    className="text-red-500 hover:underline"
                  >
                    {t("table.delete")}
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-4">
                  {t("table.no_products")}
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
            {t("pagination.previous")}
          </button>
          <span>{t("pagination.page_info", { currentPage, totalPages })}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-gray-700 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {t("pagination.next")}
          </button>
        </div>
      </div>

      {/* Modals */}
      <DeleteModal
        isOpen={isModalOpen}
        onClose={closeDeleteModal}
        title={t1("title")}
        confirmText={t1("confirm_text")}
        cancelText={t1("cancel_text")}
        onConfirm={() => deleteProduct(productToDelete?._id || "")}
      >
        <p>
          {t("delete_modal.message", { productName: productToDelete?.name })}
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
        // product={productToCreate}
        categories={categoriesMap}
        subcategories={subCategoriesMap}
        onClose={closeCreateModal}
        onCreate={createProduct}
      />
    </div>
  );
};

export default ProductPage;
