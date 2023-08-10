import ReactPaginate from "react-paginate";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Paginate = ({ pages, isAdmin = false, keyword = "" }) => {
  const navigate = useNavigate();

  const onPageChange = (selectedPage) => {
    // Transforming from zero-based index to one-based index

    navigate(
      !isAdmin
        ? keyword
          ? `/search/${keyword}/page/${selectedPage}`
          : `/page/${selectedPage}`
        : `/admin/productlist/page/${selectedPage}`
    );

    // if (isAdmin) {
    //   navigate("/admin/productlist/page/" + selectedPage);
    // } else {
    //   navigate("/page/" + selectedPage);
    // }
  };

  const handlePageChange = (selectedPage) => {
    // Transforming from one-based index to zero-based index
    onPageChange(Number(selectedPage.selected + 1));
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
          onPageChange={(e) => handlePageChange(e)}
        />
      </div>
    )
  );
};

export default Paginate;
