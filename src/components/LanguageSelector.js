import React, { useContext } from "react";
import { ThemeContext, LanguageContext } from "../App";
import useLocalStorage from "../hooks/useLocalStorage";

const LanguageSelector = () => {
  const { isDarkTheme } = useContext(ThemeContext);
  const { language, setLanguage } = useContext(LanguageContext);
  const [storedLanguage, setStoredLanguage] = useLocalStorage(
    "language",
    language
  );

  const handleLanguageChange = (e) => {
    const newLanguage = storedLanguage === "en" ? "fr" : "en";
    setLanguage(newLanguage);
    setStoredLanguage(newLanguage);
    e.target.blur();
  };

  return (
    <input
      type="text"
      className={`form-control form-control-sm ${
        isDarkTheme ? "bg-dark text-light" : ""
      }`}
      value={storedLanguage === "en" ? "EN" : "FR"}
      onClick={handleLanguageChange}
      readOnly
      style={{ width: "50px", textAlign: "center", cursor: "pointer" }}
    />
  );
};

export default LanguageSelector;
