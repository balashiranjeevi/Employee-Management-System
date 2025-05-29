import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    <div className="d-flex flex-column justify-content-center align-items-center h-75">
      <div className="p3 rounded w-25 border">
        <h2>Add Category</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="Category">
              <strong>Category:</strong>
            </label>
            <input
              type="Category"
              id="Category"
              name="Category"
              autoComplete="off"
              placeholder="Add Category"
              onChange={(e) => setCategory(e.target.value)}
              className="form-control rounded-0"
              required
            />
          </div>
          <button className="btn btn-success w-100 rounded-0">
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
