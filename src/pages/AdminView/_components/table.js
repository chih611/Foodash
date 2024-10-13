import moment from "moment";
import {
  Button,
  FloatingLabel,
  Form,
  Navbar,
  Pagination,
  Placeholder,
  Table,
} from "react-bootstrap";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

const CustomTable = ({
  headers,
  records,
  handleRecordDoubleClick,
  handleRemoveSingleClick,
  customFields,
  statusFetching,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredData = records?.filter((item) =>
    Object.values(item)
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData?.slice(indexOfFirstItem, indexOfLastItem);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const totalPages = Math.ceil(filteredData?.length / itemsPerPage);
  const paginationItems = [];
  const showEllipsis = (start, end) => {
    for (let i = 1; i <= totalPages; i++) {
      paginationItems.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => handlePageChange(i)}
          linkClassName={
            i === currentPage ? " bg-pressed-color text-light" : ""
          }
        >
          {i}
        </Pagination.Item>
      );
    }
  };
  // Display first, last and current range with ellipses
  if (totalPages <= 5) {
    showEllipsis(1, totalPages);
  } else {
    // Show first 2 pages
    showEllipsis(1, 2);

    // Show ellipsis if current page > 4
    if (currentPage > 4) {
      paginationItems.push(<Pagination.Ellipsis key="start-ellipsis" />);
    }

    // Show range around current page
    const startPage = Math.max(3, currentPage - 1);
    const endPage = Math.min(totalPages - 2, currentPage + 1);
    showEllipsis(startPage, endPage);

    // Show ellipsis if current page is not near the end
    if (currentPage < totalPages - 3) {
      paginationItems.push(<Pagination.Ellipsis key="end-ellipsis" />);
    }

    // Show last 2 pages
    showEllipsis(totalPages - 1, totalPages);
  }
  return (
    <>
      {statusFetching === "loading" ? (
        <Table
          striped
          bordered
          hover
          size="sm"
          responsive
          className="rounded-start-2 "
        >
          <thead>
            <tr>
              <th className=" bg-pressed-color text-light">
                <Placeholder as="p" animation="glow">
                  <Placeholder xs={6} />
                </Placeholder>
              </th>
              <th className=" bg-pressed-color text-light">
                <Placeholder as="p" animation="glow">
                  <Placeholder xs={6} />
                </Placeholder>
              </th>
              <th className=" bg-pressed-color text-light">
                <Placeholder as="p" animation="glow">
                  <Placeholder xs={6} />
                </Placeholder>
              </th>
              <th className=" bg-pressed-color text-light">
                <Placeholder as="p" animation="glow">
                  <Placeholder xs={6} />
                </Placeholder>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Placeholder as="p" animation="glow">
                  <Placeholder xs={6} />
                </Placeholder>
              </td>
              <td>
                <Placeholder as="p" animation="glow">
                  <Placeholder xs={8} />
                </Placeholder>
              </td>
              <td>
                <Placeholder as="p" animation="glow">
                  <Placeholder xs={10} />
                </Placeholder>
              </td>
              <td>
                <Placeholder as="p" animation="glow">
                  <Placeholder xs={7} />
                </Placeholder>
              </td>
            </tr>
          </tbody>
        </Table>
      ) : (
        <>
          <Navbar className="bg-body-tertiary">
            <FloatingLabel controlId="floatingInput" label="Search ...">
              <Form.Control
                type="text"
                placeholder="Search ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </FloatingLabel>
          </Navbar>

          <Table striped hover size="sm" responsive className="rounded-start-2">
            <thead>
              <tr>
                {Array.from({ length: 1 }).map((_, index) =>
                  headers[0]?.map((header, j) => (
                    <th
                      key={j}
                      className=" bg-pressed-color text-light text-center text-nowrap"
                    >
                      {header}
                    </th>
                  ))
                )}
                {handleRemoveSingleClick ? (
                  <th className=" bg-pressed-color text-light text-center text-nowrap">
                    <DeleteIcon />
                  </th>
                ) : null}
              </tr>
            </thead>
            <tbody>
              {currentItems?.map((e, i) => (
                <tr key={i}>
                  {Array.from({ length: 1 }).map((_, index) =>
                    Object.entries(e).map(([key, value], j) => (
                      <td key={j} className=" text-center">
                        <Button
                          variant="link"
                          onDoubleClick={() =>
                            handleRecordDoubleClick &&
                            handleRecordDoubleClick(e)
                          }
                          className="text-decoration-none text-pressed-color text-nowrap"
                        >
                          {value
                            ? customFields?.includes(key)
                              ? moment(value).format("yyyy-MM-DD")
                              : value
                            : "-"}
                        </Button>
                      </td>
                    ))
                  )}
                  {handleRemoveSingleClick ? (
                    <td className="text-decoration-none text-pressed-color text-nowrap text-center">
                      {" "}
                      <Button
                        className="text-decoration-none bg-pressed-color text-nowrap text-white"
                        onClick={() => handleRemoveSingleClick(e)}
                      >
                        <DeleteIcon />
                      </Button>
                    </td>
                  ) : null}
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination>
            <Pagination.First
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
            />
            <Pagination.Prev
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />
            {paginationItems}
            <Pagination.Next
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
            <Pagination.Last
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </>
      )}
    </>
  );
};
export default CustomTable;
