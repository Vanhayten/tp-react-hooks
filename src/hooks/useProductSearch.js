import { useState, useEffect, useCallback } from "react";

const useProductSearch = (searchTerm, itemsPerPage) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

     const fetchProducts = useCallback(async () => {
       setLoading(true);
       setError(null);
       try {
         const skip = (currentPage - 1) * itemsPerPage;
         const url = searchTerm
           ? `https://dummyjson.com/products/search?q=${encodeURIComponent(
               searchTerm
             )}&limit=${itemsPerPage}&skip=${skip}`
           : `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${skip}`;

         const response = await fetch(url);
         if (!response.ok) throw new Error("Erreur réseau");

         const data = await response.json();
         setProducts(data.products);
         setTotalPages(Math.ceil(data.total / itemsPerPage));
       } catch (err) {
         setError(err.message);
       } finally {
         setLoading(false);
       }
     }, [searchTerm, currentPage, itemsPerPage]);

      useEffect(() => {
        fetchProducts();
      }, [fetchProducts]);

     const reloadProducts = () => {
       setCurrentPage(1);
       fetchProducts();
     };

     const nextPage = () => {
       if (currentPage < totalPages) {
         setCurrentPage(currentPage + 1);
       }
     };

     const previousPage = () => {
       if (currentPage > 1) {
         setCurrentPage(currentPage - 1);
       }
     };

  return {
    products,
    loading,
    error,
    currentPage,
    totalPages,
    nextPage,
    previousPage,
    reloadProducts,
  };
};

export default useProductSearch;