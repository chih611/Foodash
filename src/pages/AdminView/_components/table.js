import { Button, Table } from "react-bootstrap";
import CustomModal from "./modal";
import { useState } from "react";

const CustomTable = ({ headers, records, children }) => {
  const [show, setShow] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleRecordClick = (id) => {
    setSelectedId(id);
    setShow(true);
  };
  return (
    <>
      <Table
        striped
        bordered
        hover
        size="sm"
        responsive
        className="rounded-start-2"
      >
        <thead>
          <tr>
            {Array.from({ length: 1 }).map((_, index) =>
              headers?.map((header) => (
                <th className=" bg-pressed-color text-light">{header}</th>
              ))
            )}
          </tr>
        </thead>
        <tbody>
          {records?.map((e, i) => (
            <tr key={i}>
              {Array.from({ length: 1 }).map((_, index) =>
                Object.values(e).map((value, j) => (
                  <td key={j}>
                    <Button
                      variant="link"
                      onClick={() => handleRecordClick(e.ORDER_ID)}
                      className="text-decoration-none text-pressed-color"
                    >
                      {value}
                    </Button>
                  </td>
                ))
              )}
            </tr>
          ))}
        </tbody>
      </Table>
      <CustomModal setShow={setShow} show={show} selectedId={selectedId}>
        {children}
      </CustomModal>
    </>
  );
};
export default CustomTable;
