import React from "react";

const UnorderedList = ({ data }) => {
  return (
    <ul>
      {data.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
};

export default UnorderedList;
