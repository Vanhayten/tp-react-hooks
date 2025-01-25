import React, { useState, useContext, useEffect } from "react";
import { ThemeContext, LanguageContext } from "../App";
import useDebounce from "../hooks/useDebounce";

const ProductSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { isDarkTheme } = useContext(ThemeContext);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);
 const { language } = useContext(LanguageContext);

  useEffect(() => {
    if (onSearch) {
      onSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, onSearch]);

  return (
    <div className="mb-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={
          language === "fr"
            ? "Rechercher un produit..."
            : "Search for a product..."
        }
        className={`form-control ${isDarkTheme ? "bg-dark text-light" : ""}`}
      />
    </div>
  );
};

export default ProductSearch;