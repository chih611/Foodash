import moment from "moment";
import { Form } from "react-bootstrap";

export const CustomInput = ({
  keyInput,
  index,
  value,
  readOnlyFields,
  dateTimeFields,
}) => {
  return (
    <>
      <Form.Label key={`label-${index}`} className="fw-bold">
        {keyInput}
      </Form.Label>
      <Form.Control
        key={`input-${index}`}
        type="text"
        aria-describedby="order"
        defaultValue={
          dateTimeFields?.includes(keyInput)
            ? moment(value).format("yyyy-MM-DD")
            : value
        }
        plaintext={readOnlyFields?.includes(keyInput)}
        size="sm"
      />
    </>
  );
};
