import moment from "moment";
import { Form, Placeholder } from "react-bootstrap";

const CustomInput = ({
  title,
  index,
  value,
  readOnlyFields,
  dateTimeFields,
  statusFetching,
  setShowSaveBtn,
  setOrderData,
  setOrderChanges,
}) => {
  const handleChange = (e) => {
    setShowSaveBtn(true);

    if (title !== "Full Name") {
      setOrderChanges((prevChanges) => ({
        ...prevChanges,
        [title]: e.target.value,
      }));
    }
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
          <Form.Control
            key={`input-${index}`}
            type="text"
            aria-describedby="order"
            placeholder={
              value
                ? dateTimeFields?.includes(title)
                  ? moment(value).format("yyyy-MM-DD")
                  : value
                : "-"
            }
            plaintext={readOnlyFields?.includes(title)}
            readOnly={readOnlyFields?.includes(title)}
            onChange={handleChange}
            size="sm"
          />
        </>
      )}
    </>
  );
};
export default CustomInput;
