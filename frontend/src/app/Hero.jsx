import React from "react";

const Hero = () => {
  return (
    <header
      class="bg-image"
      style="background-image: url('https://source.unsplash.com/1600x900/?hospital,medical'); height: 100vh; background-size: cover; background-position: center;"
    >
      <div class="container h-100">
        <div class="row h-100 align-items-center">
          <div class="col-lg-7">
            <h1 class="display-3 text-white">
              Welcome to Hospital Management System
            </h1>
            <p class="lead text-white">
              A comprehensive system for managing hospital operations.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

