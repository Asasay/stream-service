import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

type PaginationProps = {
  entriesPerPage: number;
  totalEntries: number;
  entriesOnCurrentPage: number;
};
function Pagination({
  entriesPerPage,
  totalEntries,
  entriesOnCurrentPage,
}: PaginationProps) {
  const router = useRouter();
  const currentPage = Number(router.query.page);
  const totalPages = totalEntries && Math.ceil(totalEntries / entriesPerPage);

  const prevPage = router.asPath.replace(
    "page=" + currentPage,
    "page=" + (currentPage - 1)
  );
  const nextPage = router.asPath.replace(
    "page=" + currentPage,
    "page=" + (currentPage + 1)
  );

  return (
    <div className="flex flex-col items-center mt-12">
      {/*   Help text  */}
      <span className="text-sm text-gray-700 dark:text-gray-400">
        Showing{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {(currentPage - 1) * entriesPerPage + 1}
        </span>{" "}
        to{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {currentPage == totalPages
            ? (currentPage - 1) * entriesPerPage + entriesOnCurrentPage
            : currentPage * entriesPerPage}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {totalEntries}
        </span>{" "}
        Entries
      </span>
      <div className="inline-flex mt-2 xs:mt-0">
        {/*   Buttons  */}
        <Link
          href={prevPage}
          className={
            "inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" +
            (currentPage == 1 ? " pointer-events-none" : "")
          }
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
          Prev
        </Link>
        <Link
          href={nextPage}
          className={
            "inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" +
            (currentPage == totalPages ? " pointer-events-none" : "")
          }
        >
          Next
          <svg
            aria-hidden="true"
            className="w-5 h-5 ml-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </Link>
      </div>
    </div>
  );
}

Pagination.propTypes = {};

export default Pagination;
