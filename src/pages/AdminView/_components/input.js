import { Form } from "react-bootstrap";

export const CustomInput = ({ keyInput, index, value, readOnlyFields }) => {
  return (
    <>
      <Form.Label key={`label-${index}`} className="fw-bold">
        {keyInput}
      </Form.Label>
      <Form.Control
        key={`input-${index}`}
        type="text"
        aria-describedby="order"
        value={value}
        plaintext={readOnlyFields.includes(keyInput)}
      />
    </>
  );
};
