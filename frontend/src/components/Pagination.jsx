import { Pagination } from "react-bootstrap";
import { useUserContext } from "../context/UserContext";
import { useState } from "react";

const CustomPagination = () => {
  const { currentPage, setCurrentPage, fetchUsers } = useUserContext();
  //   const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 4; // Assuming 4 pages based on your earlier data

  const handlePageChange = (page) => {
    console.log(`setting page number ${page} in pagi compn`);
    setCurrentPage(page);
    fetchUsers("http://localhost:4000/api/users?page=2&limit=1"); // Fetch users for the selected page
  };

  let items = [];
  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => handlePageChange(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div>
      <Pagination>{items}</Pagination>
    </div>
  );
};

export default CustomPagination;
