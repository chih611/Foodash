import moment from "moment";
import { Button, Form, Placeholder, Spinner, Table } from "react-bootstrap";
import DeleteIcon from "@mui/icons-material/Delete";

const CustomTable = ({
  headers,
  records,
  handleRecordDoubleClick,
  handleRemoveSingleClick,
  customFields,
  statusFetching,
}) => {
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
        <Table striped hover size="sm" responsive className="rounded-start-2">
          <thead>
            <tr>
              {Array.from({ length: 1 }).map((_, index) =>
                headers[0]?.map((header) => (
                  <th className=" bg-pressed-color text-light text-center text-nowrap">
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
            {records?.map((e, i) => (
              <tr key={i}>
                {Array.from({ length: 1 }).map((_, index) =>
                  Object.entries(e).map(([key, value], j) => (
                    <td key={j} className=" text-center">
                      <Button
                        variant="link"
                        onDoubleClick={() =>
                          handleRecordDoubleClick && handleRecordDoubleClick(e)
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
      )}
    </>
  );
};
export default CustomTable;
