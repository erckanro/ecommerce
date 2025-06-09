import React from "react";

type SearchInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
};

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
}) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full md:w-1/2 px-4 py-2 border-2 border-lime-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-600 placeholder-gray-400 transition ${className}`}
    />
  );
};

export default SearchInput;
