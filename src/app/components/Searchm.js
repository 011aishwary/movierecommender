
"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Searchm({ data = [], onSearch, defaultValue = "" }) {
  const [searchTerm, setSearchTerm] = useState(defaultValue);
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (defaultValue) {
      setSearchTerm(defaultValue);
    }
  }, [defaultValue]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const filtered = data
        .filter((item) => item.toLowerCase().includes(searchTerm.toLowerCase()))
        .slice(0, 8); // Limit suggestions
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm, data]);

  const handleInputChange = (e) => setSearchTerm(e.target.value);

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setIsFocused(false);
    if (onSearch) onSearch(suggestion);
  };

  const handleClear = () => {
    setSearchTerm("");
    setSuggestions([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch && searchTerm) onSearch(searchTerm);
  };

  return (
    <div className="relative w-full z-50" ref={containerRef}>
      <form onSubmit={handleSubmit} 
        className={`relative flex items-center w-full h-14 rounded-full border transition-all duration-300 ${
          isFocused
            ? "border-blue-500 bg-slate-900/80 shadow-[0_0_20px_rgba(59,130,246,0.3)]"
            : "border-slate-700 bg-slate-900/40 hover:border-slate-500 hover:bg-slate-900/60"
        } backdrop-blur-md`}
      >
        <Search className="absolute left-4 w-5 h-5 text-gray-400" />
        <input
          type="text"
          className="w-full h-full pl-12 pr-12 bg-transparent text-white placeholder-gray-500 outline-none text-lg font-light rounded-full"
          placeholder="Search for a movie..."
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
        />
        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-4 p-1 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </form>

      <AnimatePresence>
        {isFocused && suggestions.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 py-2 bg-[#020617] border border-slate-700 rounded-2xl shadow-xl z-[100] max-h-60 overflow-y-auto"
          >
            {suggestions.map((suggestion, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-6 py-3 text-slate-300 hover:bg-slate-800 hover:text-blue-400 cursor-pointer transition-colors flex items-center justify-between group"
              >
                <span>{suggestion}</span>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

