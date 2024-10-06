import { Button, Form, Table } from "react-bootstrap";

const CustomTable = ({ headers, records, handleRecordDoubleClick }) => {
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
              headers[0]?.map((header) => (
                <th className=" bg-pressed-color text-light text-center text-nowrap">
                  {header.replace(/_/g, " ")}
                </th>
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
                      onDoubleClick={() =>
                        handleRecordDoubleClick && handleRecordDoubleClick(e)
                      }
                      className="text-decoration-none text-pressed-color text-nowrap"
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
    </>
  );
};
export default CustomTable;
