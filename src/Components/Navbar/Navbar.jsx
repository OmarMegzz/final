import React from "react";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <>
      <nav class="navbar navbar-expand-sm navbar-dark bg-primary">
        <a class="navbar-brand" href="#">
          Navbar
        </a>
        <button
          class="navbar-toggler d-lg-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
        ></button>
        <div class="collapse navbar-collapse" id="collapsibleNavId">
          <ul class="navbar-nav me-auto mt-2 mt-lg-0">
            <li class="nav-item">
              <a class="nav-link" href="#">
                Home
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Cart
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Proudcts
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Categories
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Brands
              </a>  
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
