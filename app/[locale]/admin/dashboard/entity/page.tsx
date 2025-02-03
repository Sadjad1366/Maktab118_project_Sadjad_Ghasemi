"use client";
import { getAllProductsReq, updateProductById } from "@/apis/product.service";
import { className } from "@/utils/classNames";
import { useTranslations } from "next-intl";
import React from "react";
import toast from "react-hot-toast";
import { useCallback } from "react";
import Image from "next/image";

export default function EntityPage() {
  const [products, setProducts] = React.useState<IProduct[]>([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [updates, setUpdates] = React.useState<
    Record<string, { price: number; quantity: number }>
  >({});
  const perPage = 6;
  const t = useTranslations("Inventory");

  const isSaveDisabled = React.useMemo(() => {
    return !Object.entries(updates).some(([id, update]) => {
      const product = products.find((p) => p._id === id);
      return (
        product &&
        (update.price !== product.price || update.quantity !== product.quantity)
      );
    });
  }, [updates, products]);

  const fetchProducts = useCallback(
    async (currentPage: number) => {
      try {
        const response = await getAllProductsReq(currentPage, perPage);
        setProducts(response.data.products);
        setTotalPages(response.total_pages);

        setUpdates(
          response.data.products.reduce(
            (
              acc: Record<string, { price: number; quantity: number }>,
              product: IProduct
            ) => ({
              ...acc,
              [product._id]: {
                price: product.price,
                quantity: product.quantity,
              },
            }),
            {}
          )
        );
      } catch (error) {
        console.log(`${t("messages.fetch_error")}`, error);
      }
    },
    [t]
  ); // ✅ Include `t` to avoid missing dependency warning

  const handlePageChange = (pageNumber: number) => {
    // Check for unsaved changes
    if (!isSaveDisabled) {
      toast.error(`${t("messages.fetch_error")}`);
      return;
    }

    // Allow page change if no unsaved changes
    setCurrentPage(pageNumber);
  };

  const handleInputChange = (
    id: string,
    field: "price" | "quantity",
    value: number
  ) => {
    setUpdates((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const handleSave = async () => {
    const updatePromises: Promise<IProduct>[] = Object.entries(updates)
      .filter(([id, update]) => {
        const product = products.find((p) => p._id === id);
        return (
          update.price !== product?.price ||
          update.quantity !== product?.quantity
        );
      })
      .map(([id, update]) => {
        const formData = new FormData();
        formData.append("price", update.price.toString());
        formData.append("quantity", update.quantity.toString());

        return updateProductById(id, formData);
      });

    try {
      await Promise.all(updatePromises);
      toast.success(`${t("messages.save_success")}`);
      fetchProducts(currentPage);
      setUpdates({});
    } catch (error) {
      console.error("Error saving updates:", error);
      toast.error(`${t("messages.save_error")}`);
    }
  };

  React.useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage, fetchProducts]);

  return (
    <div className="overflow-x-auto sm:rounded-lg bg-slate-300 lg:w-[800px] p-3">
      <div className="flex justify-between py-3 px-2">
        <h2 className="text-slate-600 font-semibold text-xl">{t("title")} </h2>
        <button
          onClick={handleSave}
          disabled={isSaveDisabled}
          className={className(
            "bg-gray-600 text-white px-4 py-2 rounded-lg",
            isSaveDisabled ? "opacity-50 cursor-not-allowed" : ""
          )}
        >
          {t("save_button")}
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
            "text-xs text-gray-700 bg-gray-200",
            "border-y-2 dark:bg-gray-700 dark:text-gray-400"
          )}
        >
          <tr>
            <th scope="col" className="px-2 py-3">
              {t("table.image")}{" "}
            </th>
            <th scope="col" className="px-2 py-3">
              {t("table.name")}{" "}
            </th>
            <th scope="col" className="px-2 py-3">
              <div className="flex items-center">{t("table.price")} </div>
            </th>
            <th scope="col" className="px-2 py-3">
              <div className="flex items-center">{t("table.quantity")} </div>
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
                  src={`http://backend-6us4acis1-sadjad1366s-projects.vercel.app/images/products/images/${product.images[0]}`}
                  alt={product.name}
                  width={50}
                  height={50}
                />
              </td>
              <td className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {product.name}
              </td>
              <td className="px-2 py-4">
                <input
                  type="number"
                  value={
                    updates[product._id]?.price !== undefined
                      ? updates[product._id]?.price
                      : product.price
                  }
                  onChange={(e) =>
                    handleInputChange(
                      product._id,
                      "price",
                      Number(e.target.value)
                    )
                  }
                  className="w-full border-gray-300 rounded-md shadow-sm p-1"
                />
              </td>
              <td className="px-2 py-4">
                <input
                  type="number"
                  value={
                    updates[product._id]?.quantity !== undefined
                      ? updates[product._id]?.quantity
                      : product.quantity
                  }
                  onChange={(e) =>
                    handleInputChange(
                      product._id,
                      "quantity",
                      Number(e.target.value)
                    )
                  }
                  className="w-full border-gray-300 rounded-md shadow-sm p-1"
                />
              </td>
            </tr>
          ))}
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
            "dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-blue-800",
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          )}
        >
          {t("pagination.previous")}{" "}
        </button>
        <div className="flex items-center space-x-2">
          <span className="text-gray-600 font-semibold">
            {t("pagination.page_info", { currentPage, totalPages })}
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
            "dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-blue-800",
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          )}
        >
          {t("pagination.next")}
        </button>
      </div>
    </div>
  );
}
