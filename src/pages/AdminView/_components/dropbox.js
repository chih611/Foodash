import { Form, Placeholder } from "react-bootstrap";

const CustomDropBox = ({
  value,
  title,
  index,
  switchOptions,
  setSwitchOptions,
  setShowSaveBtn,
  statusFetching,
}) => {
  const handleSelectChange = (event) => {
    setSwitchOptions(event.target.value);
    setShowSaveBtn(true);
  };
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
            {title}
          </Form.Label>
          <Form.Select
            onChange={(e) => handleSelectChange(e)}
            value={switchOptions ? switchOptions : value}
            size="sm"
          >
            <option value="Pending">Pending</option>
            <option value="Delivered">Delivered</option>
            <option value="Canceled">Canceled</option>
          </Form.Select>
        </>
      )}
    </>
  );
};

export default CustomDropBox;
