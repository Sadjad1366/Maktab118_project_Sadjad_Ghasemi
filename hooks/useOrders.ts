import { useState } from 'react';


type FilterType = 'all' | 'delivered' | 'pending';

export function useOrders(initialOrders: IOrder[]) {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState<FilterType>('all');
  const ordersPerPage = 6;

  const filteredOrders = initialOrders.filter((order) => {
    switch (filter) {
      case 'delivered':
        return order.deliveryStatus;
      case 'pending':
        return !order.deliveryStatus;
      default:
        return true;
    }
  });

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const startIndex = (currentPage - 1) * ordersPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + ordersPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  return {
    orders: paginatedOrders,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    goToPage,
    filter,
    setFilter,
  };
}
