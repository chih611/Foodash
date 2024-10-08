import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

export const CustomDropBox = ({
  value,
  keyDropbox,
  index,
  status,
  setStatus,
}) => {
  useEffect(() => {}, [value]);
  const handleSelectChange = (event) => {
    setStatus(event.target.value);
  };
  return (
    <>
      <Form.Label key={`label-${index}`} className="fw-bold">
        {keyDropbox}
      </Form.Label>
      <Form.Select
        onChange={(e) => handleSelectChange(e)}
        value={status ? status : value}
        size="sm"
      >
        <option value="Pending">Pending</option>
        <option value="Delivered">Delivered</option>
        <option value="Canceled">Canceled</option>
      </Form.Select>
    </>
  );
};
