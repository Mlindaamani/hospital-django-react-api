import React from "react";
import { Image } from "react-bootstrap";
import more from "../assets/svg/more.svg";

export const ActionMenu = () => {
  return (
    <div className="dropdown rounded-4">
      <Image
        src={more}
        className="dropdown-toggle bg-light-subtle rounded-circle p-1"
        aria-expanded="false"
        data-bs-toggle="dropdown"
        style={{ cursor: "pointer" }}
      />
      <ul className="dropdown-menu rounded-2">
        <li>
          <button className="dropdown-item" type="button">
            Update
          </button>
        </li>
        <li>
          <button className="dropdown-item" type="button">
            Diactive
          </button>
        </li>
        <li>
          <button className="dropdown-item  btn-danger" type="button">
            Delete
          </button>
        </li>
      </ul>
    </div>
  );
};
