import moment from "moment";
import {
  Badge,
  Button,
  FloatingLabel,
  Form,
  Pagination,
  Placeholder,
  Table,
} from "react-bootstrap";
import { useMemo, useState } from "react";
import { SwapVertRounded } from "@mui/icons-material";
import styles from "../../../styles/styles";
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
  const itemsPerPage = 5;

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
          <FloatingLabel controlId="floatingInput" label="Search ...">
            <Form.Control
              type="text"
              placeholder="Search ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rounded-4 mb-2 mt-4"
            />
          </FloatingLabel>

          {showCreateButton && ( // Conditional rendering of the "Create" button
            <Button
              className={`${styles.btn} mt-3 align-self-end`}
              onClick={onCreateClick}
            >
              Create Admin
            </Button>
          )}

          <Table
            striped
            hover
            size="sm"
            responsive
            style={{
              borderRadius: "20px",
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
                    <th
                      key={j}
                      className={
                        customTableColor + " text-light text-center text-nowrap"
                      }
                    >
                      {header}
                      <Button
                        variant="link"
                        className={
                          customTableColor +
                          "text-light text-center text-nowrap"
                        }
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
                        variant={customCols.map((col) =>
                          key.includes(col) ? "primary" : "link"
                        )}
                        onDoubleClick={() =>
                          customCols.map((col) => {
                            !key.includes(col) &&
                              handleRecordDoubleClick &&
                              handleRecordDoubleClick(e);
                          })
                        }
                        onClick={() =>
                          customCols.map((col) => {
                            key.includes(col) &&
                              handleRecordSingleClick &&
                              handleRecordSingleClick(e);
                          })
                        }
                        className="text-decoration-none text-dark text-nowrap"
                      >
                        {value
                          ? datetimeFields?.includes(key)
                            ? moment(value).format("yyyy-MM-DD")
                            : objectFields?.includes(key)
                            ? Object.entries(value).map(([key, vl], k) =>
                                vl === true ? (
                                  <>
                                    <span>{key}</span>
                                    <br />
                                  </>
                                ) : null
                              )
                            : value
                          : "-"}
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
      {/* <CustomModal
        setOpen={setShow}
        open={show}
        selectedId={selectedId}
        headerTitle="Order"
        customTableColor="bg-pressed-color text-light"
      >
        <OrderDetails
          // {...props}
          customTableColor="bg-pressed-color text-light"
        />
      </CustomModal> */}
    </>
  );
};

export default CustomTable;
