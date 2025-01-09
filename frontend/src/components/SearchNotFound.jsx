import React from "react";

export const SearchNotFound = ({ colSpan, message }) => {
  return (
    <tr>
      <td colSpan={colSpan} className="text-center">
        {message}
      </td>
    </tr>
  );
};

export const CustomNotFound = ({message}) => {
  <div>
    {message}
  </div>
}
