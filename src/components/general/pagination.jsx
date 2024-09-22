const pagination = ({ handlePageChange, totalPages, currentPage }) => {
  return (
    <div className="flex justify-center my-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-300 text-black rounded-l w-24"
      >
        Previous
      </button>
      <span className="px-4 py-2 bg-gray-100 text-black">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="px-4 py-2 bg-gray-300 text-black rounded-r w-24"
      >
        Next
      </button>
    </div>
  );
};

export default pagination;
