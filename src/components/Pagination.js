import * as React from "react";
import Pagination from "react-bootstrap/Pagination";

// markup
const Pag = ({
  limit,
  current,
  last,
  productsPerPage,
  setNextDis,
  setPrevDis,
  setCurrentProduct,
  setLastProduct,
  prevDis,
  nextDis,
  currentPage,
  setCurrentPage,
}) => {
  const changePage = (
    limit,
    current,
    type,
    last,
    productsPerPage,
    setNextDis,
    setPrevDis,
    setCurrentProduct,
    setLastProduct
  ) => {
    console.log("function started");
    if (type == "add") {
      setCurrentProduct(current + productsPerPage);
      setLastProduct(current + productsPerPage * 2);
      setCurrentPage(currentPage + 1);
    }
    if (type === "sub") {
      let c = current - productsPerPage;
      if (c < 0) {
        c = 0;
        setCurrentProduct(0);
      } else {
        setCurrentProduct(current - productsPerPage);
      }
      setLastProduct(current);
      setCurrentPage(currentPage - 1);
    }
  };
  return (
    <Pagination style={{ margin: "20px auto" }}>
      {prevDis ? (
        <Pagination.Prev disabled />
      ) : (
        <Pagination.Prev
          onClick={() =>
            changePage(
              limit,
              current,
              "sub",
              last,
              productsPerPage,
              setNextDis,
              setPrevDis,
              setCurrentProduct,
              setLastProduct
            )
          }
        />
      )}

      <Pagination.Item active>{currentPage}</Pagination.Item>

      {nextDis ? (
        <Pagination.Next disabled />
      ) : (
        <Pagination.Next
          onClick={() =>
            changePage(
              limit,
              current,
              "add",
              last,
              productsPerPage,
              setNextDis,
              setPrevDis,
              setCurrentProduct,
              setLastProduct
            )
          }
        />
      )}
      {/* <Pagination.Last /> */}
    </Pagination>
  );
};
export default Pag;
