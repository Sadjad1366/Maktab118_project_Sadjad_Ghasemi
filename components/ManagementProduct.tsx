import { posts } from "@/data/posts";

const ManagementProduct: React.FC = () => {
  return (
    <div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              نام کاربر
            </th>
            <th scope="col" className="px-6 py-3">
              مجموع مبلغ
            </th>
            <th scope="col" className="px-6 py-3">
              زمان سفارش
            </th>
            <th scope="col" className="px-6 py-3">
              جزيیات
            </th>
          </tr>
        </thead>
        <tbody>
          {posts.map((el) => (
            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {el.id}
              </th>
              <td className="px-6 py-4">{el.body}</td>
              <td className="px-6 py-4">{el.title}</td>
              <td className="px-6 py-4">
                <a
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  {el.views}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagementProduct;
