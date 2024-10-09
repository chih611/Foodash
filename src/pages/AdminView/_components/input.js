import moment from "moment";
import { Form, Placeholder } from "react-bootstrap";

export const CustomInput = ({
  keyInput,
  index,
  value,
  readOnlyFields,
  dateTimeFields,
  statusFetching,
}) => {
  return (
    <>
      {statusFetching === "loading" ? (
        <>
          <Placeholder as="div" animation="glow">
            <Placeholder lg={3} size="sm" />
          </Placeholder>
          <Placeholder as="div" animation="glow">
            <Placeholder lg={2} size="lg" />
          </Placeholder>
        </>
      ) : (
        <>
          <Form.Label key={`label-${index}`} className="fw-bold">
            {keyInput}
          </Form.Label>
          <Form.Control
            key={`input-${index}`}
            type="text"
            aria-describedby="order"
            value={
              value
                ? dateTimeFields?.includes(keyInput)
                  ? moment(value).format("yyyy-MM-DD")
                  : value
                : "-"
            }
            plaintext={readOnlyFields?.includes(keyInput)}
            size="sm"
          />
        </>
      )}
    </>
  );
};
