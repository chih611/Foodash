import { Form, Placeholder } from "react-bootstrap";

const CustomDropBox = ({
  value,
  title,
  index,
  statusFetching,
  handleChange,
  optionsData = [{}],
}) => {
  const handleSelectChange = (e) => {
    handleChange(title, e.target.value);
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
            size="sm"
            value={value}
          >
            {optionsData.map((datum) => (
              <option key={Object.keys(datum)} value={Object.keys(datum)}>
                {Object.values(datum)}
              </option>
            ))}
          </Form.Select>
        </>
      )}
    </>
  );
};

export default CustomDropBox;
