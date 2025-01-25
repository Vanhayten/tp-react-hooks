import React, { useContext } from "react";
import { ThemeContext, LanguageContext } from "../App";

const LanguageSelector = () => {
  const { isDarkTheme } = useContext(ThemeContext);
  const { language, setLanguage } = useContext(LanguageContext);

  return (
    <input
      type="text"
      className={`form-control form-control-sm ${
        isDarkTheme ? "bg-dark text-light" : ""
      }`}
      value={language === "en" ? "EN" : "FR"}
      onClick={(e) => {
        const newLanguage = language === "en" ? "fr" : "en";
        setLanguage(newLanguage);
        e.target.blur();
      }}
      readOnly
      style={{ width: "50px", textAlign: "center", cursor: "pointer" }} // Make it narrow and centered
    />
  );
};

export default LanguageSelector;
