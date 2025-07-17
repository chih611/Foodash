import React from "react";

const LinkMessage = ({ linkText, linkUrl }) => {
  return (
    <a
      href={linkUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        color: "#f38b3c",
        textDecoration: "underline",
        fontWeight: "bold",
      }}
    >
      {linkText}
    </a>
  );
};

export default LinkMessage;
