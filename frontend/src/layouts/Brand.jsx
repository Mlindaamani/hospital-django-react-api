import React from "react";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import sound from "../assets/svg/sound.svg";

export const Brand = () => {
  return (
    <>
      <Link
        className="navbar-brand d-flex gap-2 justify-content-start align-items-center fw-bold fs-4 mt-2"
        to="/"
      >
        <Image src={sound} className="brand-icon" />
        HMS
      </Link>
      <hr className="brand-divider" />
    </>
  );
};
