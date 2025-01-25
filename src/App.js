import React, { createContext, useState } from 'react';
import ProductList from './components/ProductList';
import ProductSearch from './components/ProductSearch';
import ThemeToggle from './components/ThemeToggle';
import useProductSearch from "./hooks/useProductSearch";
import LanguageSelector from "./components/LanguageSelector";

export const ThemeContext = createContext();
export const LanguageContext = createContext();

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [language, setLanguage] = useState("en");

  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;

  const {
    products,
    loading,
    error,
    reloadProducts,
    nextPage,
    previousPage,
    currentPage,
    totalPages,
  } = useProductSearch(searchTerm, itemsPerPage);

  return (
    <ThemeContext.Provider value={{ isDarkTheme, setIsDarkTheme }}>
      <LanguageContext.Provider value={{ language, setLanguage }}>
        <div
          className={`container ${
            isDarkTheme ? "bg-dark text-light" : "bg-light"
          }`}
        >
          <header className="my-4">
            <h1 className="text-center">
              {language === "fr"
                ? "Catalogue de Produits"
                : "Product Catalogue"}
            </h1>
            <div className="d-flex justify-content-end gap-2">
              <ThemeToggle />
              <LanguageSelector />
            </div>
          </header>
          <main>
            <ProductSearch onSearch={setSearchTerm} />
            <ProductList
              products={products}
              loading={loading}
              error={error}
              onReload={reloadProducts}
              currentPage={currentPage}
              totalPages={totalPages}
              nextPage={nextPage}
              previousPage={previousPage}
            />
          </main>
        </div>
      </LanguageContext.Provider>
    </ThemeContext.Provider>
  );
};

export default App
