import React, { useState } from "react";
import styles from "./Paginator.module.css";
import cn from "classnames"; // функция cn позволяет склеивать стили к одному элементу

type PaginatorPropsType = {
  currentPage: number;
  portionSize?: number;
  pageSize: number;
  setCurrentPage: (p: number) => void;
  totalItemsCount: number;
};
const Paginator = ({
  currentPage,
  portionSize = 10,
  pageSize,
  setCurrentPage,
  totalItemsCount,
}: PaginatorPropsType) => {
  let pagesCount = Math.ceil(totalItemsCount / pageSize);
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }
  let portionCount = Math.ceil(pagesCount / portionSize);
  let [portionNumber, setPortionNumber] = useState(1);
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  let rightPortionPageNumber = portionNumber * portionSize;
  return (
    <div className={styles.pagesCounter}>
      {portionNumber > 1 ? (
        <button
          onClick={() => {
            setPortionNumber(portionNumber - 1);
          }}
        >
          &laquo;&laquo;
        </button>
      ) : (
        <button disabled>&laquo;&laquo;</button>
      )}
      {pages
        .filter(
          (p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber
        )
        .map((p) => {
          return (
            <span
              className={cn(
                { [styles.selectedPage]: currentPage === p },
                styles.pageNumber
              )}
              key={p}
              onClick={() => {
                setCurrentPage(p);
              }}
            >
              {p}
            </span>
          );
        })}
      {portionCount > portionNumber ? (
        <button
          onClick={() => {
            setPortionNumber(portionNumber + 1);
          }}
        >
          &raquo;&raquo;
        </button>
      ) : (
        <button disabled>&raquo;&raquo;</button>
      )}
    </div>
  );
};

export default Paginator;
