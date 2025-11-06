import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) {
    return null;
  }

  const pageNumbers = [];
  const pagesToShow = 5;
  let startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + pagesToShow - 1);
  if (endPage - startPage + 1 < pagesToShow) {
    startPage = Math.max(1, endPage - pagesToShow + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <nav aria-label="Pagination" className="flex justify-center items-center space-x-2 mt-12">
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        &larr; Previous
      </button>

      {startPage > 1 && (
        <>
            <button onClick={() => onPageChange(1)} className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 transition-colors">1</button>
            {startPage > 2 && <span className="px-4 py-2 text-gray-500">...</span>}
        </>
      )}

      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`px-4 py-2 border rounded-md transition-colors ${
            currentPage === number
              ? 'bg-primary text-white border-primary shadow-md'
              : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-100'
          }`}
        >
          {number}
        </button>
      ))}

      {endPage < totalPages && (
         <>
            {endPage < totalPages - 1 && <span className="px-4 py-2 text-gray-500">...</span>}
            <button onClick={() => onPageChange(totalPages)} className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 transition-colors">{totalPages}</button>
        </>
      )}

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Next &rarr;
      </button>
    </nav>
  );
};

export default Pagination;