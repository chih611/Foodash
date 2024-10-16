const ConfirmationAlert = ({ Id, elementName }) => {
  return (
    <>
      <p>
        Do you want to remove {elementName} {Id} out of the list?
      </p>
    </>
  );
};
export default ConfirmationAlert;
