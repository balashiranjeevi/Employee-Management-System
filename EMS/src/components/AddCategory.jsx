import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style.css";

const AddCategory = () => {
  const [category, setCategory] = useState();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/auth/add_category", { category })
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/category");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="add-category-wrapper">
      <div className="add-category-card">
        <h2>Add Category</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="Category">
              <strong>Category:</strong>
            </label>
            <input
              type="text"
              id="Category"
              name="Category"
              autoComplete="off"
              placeholder="Enter category name"
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
          <button type="submit">Add Category</button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
