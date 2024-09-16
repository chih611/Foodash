import { Input } from "@nextui-org/input";

const CustomInput = ({ label, value, onChange, type = "text", ...props }) => {
  return (
    <Input
      type={type}
      label={label}
      value={value}
      onChange={onChange}
      style={{
        border: "2px solid #90B4CE",
        borderColor: "#90B4CE",
        borderRadius: "10px",
        ...props.style,  // Allows additional styles to be passed
      }}
      {...props}
    />
  );
};

export default CustomInput;
