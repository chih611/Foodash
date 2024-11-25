import moment from "moment";
import {
  Badge,
  Button,
  Col,
  FloatingLabel,
  Form,
  Image,
  Pagination,
  Placeholder,
  Row,
  Table,
} from "react-bootstrap";
import { useMemo, useState } from "react";
import { SwapVertRounded } from "@mui/icons-material";
import NewProduct from "./inputProduct";
const CustomTable = (props) => {
  const {
    headers,
    records,
    handleRecordDoubleClick,
    onCreateClick,
    showCreateButton = false, // Default to false
    datetimeFields,
    objectFields,
    statusFetching,
    showPagination,
    customTableColor,
    showSpecialButton = false,
    handleRecordSingleClick,
    actionCol,
    customCols = [],
    showAddCustomer,
    handleCloseAddCustomer,
    showOderCreateBtn,
    handleShowAddCustomer,
    imgFields = [""],
  } = props;

  const [show, setShow] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const filteredData = records?.filter((item) =>
    Object.values(item)
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  //sort data
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = useMemo(() => {
    let sortableItems = [...filteredData];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredData, sortConfig]);

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData?.slice(indexOfFirstItem, indexOfLastItem);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const totalPages = Math.ceil(filteredData?.length / itemsPerPage);
  const paginationItems = [];
  const showEllipsis = (start, end) => {
    for (let i = start; i <= end; i++) {
      paginationItems.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => handlePageChange(i)}
          linkClassName={i === currentPage ? "bg-pressed-color text-light" : ""}
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
    showEllipsis(1, 2);
    if (currentPage > 4) {
      paginationItems.push(<Pagination.Ellipsis key="start-ellipsis" />);
    }

    const startPage = Math.max(3, currentPage - 1);
    const endPage = Math.min(totalPages - 2, currentPage + 1);
    showEllipsis(startPage, endPage);

    if (currentPage < totalPages - 3) {
      paginationItems.push(<Pagination.Ellipsis key="end-ellipsis" />);
    }

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
          style={{ borderRadius: "20px", overflow: "hidden" }}
        >
          <thead>
            <tr>
              <th className={customTableColor}>
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
            </tr>
          </tbody>
        </Table>
      ) : (
        <>
          <Row className="mb-2">
            <Col xs={showOderCreateBtn || showCreateButton ? 11 : 12}>
              <FloatingLabel controlId="floatingInput" label="Search ...">
                <Form.Control
                  type="text"
                  placeholder="Search ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="rounded-4"
                />
              </FloatingLabel>
            </Col>
            <Col xs={1} className=" justify-content-center d-flex">
              {showOderCreateBtn && (
                <>
                  <Button
                    variant="primary"
                    className={`admin_bg_btn align-self-center`}
                    onClick={handleShowAddCustomer}
                  >
                    Add Item
                  </Button>
                  <NewProduct
                    show={showAddCustomer}
                    onHide={handleCloseAddCustomer}
                    backdrop="static"
                    keyboard={false}
                  />
                </>
              )}

              {showCreateButton && ( // Conditional rendering of the "Create" button
                <Button
                  className={`admin_bg_btn align-self-center`}
                  onClick={onCreateClick}
                >
                  Create Admin
                </Button>
              )}
            </Col>
          </Row>

          <Table
            hover
            size="sm"
            responsive
            style={{
              borderRadius: "15px",
              overflow: "hidden",
            }}
          >
            <thead>
              <tr>
                {showSpecialButton && (
                  <th className={customTableColor}>{actionCol}</th>
                )}
                {Array.from({ length: 1 }).map((_, index) =>
                  headers[0]?.map((header, j) => (
                    <th key={j} className={customTableColor + "text-nowrap"}>
                      {header}
                      <Button
                        variant="link"
                        className={customTableColor + "text-center text-nowrap"}
                        onClick={() => handleSort(header)}
                      >
                        <SwapVertRounded />
                      </Button>
                    </th>
                  ))
                )}
              </tr>
            </thead>
            <tbody>
              {currentItems?.map((e, i) => (
                <tr key={i}>
                  {Object.entries(e).map(([key, value], j) => (
                    <td key={j} className="text-center">
                      <Button
                        variant={
                          customCols.length > 0
                            ? customCols.map((col) =>
                                key.includes(col) ? "primary" : "link"
                              )
                            : "link"
                        }
                        onDoubleClick={() =>
                          customCols.length > 0
                            ? customCols.map((col) => {
                                !key.includes(col) &&
                                  handleRecordDoubleClick &&
                                  handleRecordDoubleClick(e);
                              })
                            : handleRecordDoubleClick &&
                              handleRecordDoubleClick(e)
                        }
                        onClick={() =>
                          customCols.map((col) => {
                            key.includes(col) &&
                              handleRecordSingleClick &&
                              handleRecordSingleClick(e);
                          })
                        }
                        className={
                          customCols.length > 0
                            ? customCols.map((col) =>
                                key.includes(col)
                                  ? "admin_bg_btn"
                                  : "text-decoration-none text-dark text-nowrap"
                              )
                            : "text-decoration-none text-dark text-nowrap"
                        }
                      >
                        {value ? (
                          datetimeFields?.includes(key) ? (
                            moment(value).format("yyyy-MM-DD")
                          ) : objectFields && objectFields?.includes(key) ? (
                            Object.entries(value).map(([key, vl], k) => (
                              <>
                                <span>{vl && key + " : " + vl}</span>
                                <br />
                              </>
                            ))
                          ) : imgFields?.includes(key) ? (
                            <Image
                              src={value}
                              thumbnail
                              width={30}
                              height={30}
                            />
                          ) : (
                            value
                          )
                        ) : (
                          "-"
                        )}
                      </Button>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
          {showPagination && (
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
          )}
        </>
      )}
    </>
  );
};

export default CustomTable;
