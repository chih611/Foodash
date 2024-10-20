const ConfirmationAlert = ({ Id, elementName }) => {
  return (
    <>
      <span>
        Do you want to remove {elementName} {Id} out of the list?
      </span>
    </>
  );
};
export default ConfirmationAlert;
