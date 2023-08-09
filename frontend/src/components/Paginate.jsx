import ReactPaginate from "react-paginate";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Paginate = ({ pages, onProductList = false, onPageChange }) => {
  const handlePageChange = (selectedPage, onProductList) => {
    // Transforming from one-based index to zero-based index
    onPageChange(Number(selectedPage.selected + 1), onProductList);
  };

  return (
    pages > 1 && (
      <div className="container relative select-none text-gray-600">
        <ReactPaginate
          breakLabel="..."
          nextLabel={<FaArrowRight />}
          previousLabel={<FaArrowLeft />}
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          pageCount={pages}
          renderOnZeroPageCount={null}
          containerClassName="paginate-contain"
          pageClassName="pg-num"
          activeClassName="pg-active"
          previousClassName="prev"
          nextClassName="next"
          disabledClassName="dis-corner"
          onPageChange={(e) => handlePageChange(e, onProductList)}
        />
      </div>
    )
  );
};

export default Paginate;
