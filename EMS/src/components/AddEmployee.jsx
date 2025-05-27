import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const [categories, setCategories] = useState([]);
  const [employeeData, setEmployeeData] = useState({
    name: "",
    email: "",
    password: "",
    salary: "",
    address: "",
    category_id: "", // Renamed from 'category' to 'category_id'
    image: null,
  });

  const navigate = useNavigate();

  // Fetch categories from backend
  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/category")
      .then((res) => {
        if (res.data.Status) {
          setCategories(res.data.Result);
        } else {
          alert(res.data.Error);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({ ...employeeData, [name]: value });
  };

  // Handle image change
  const handleImageChange = (e) => {
    setEmployeeData({ ...employeeData, image: e.target.files[0] });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Use FormData for file upload
    const formData = new FormData();
    // Append all employee data to formData
    Object.keys(employeeData).forEach((key) => {
      formData.append(key, employeeData[key]);
    });

    // You can console.log formData entries for debugging if needed:
    // for (let pair of formData.entries()) {
    //     console.log(pair[0]+ ': ' + pair[1]);
    // }

    axios
      .post("http://localhost:3000/auth/add_employee", formData)
      .then((res) => {
        if (res.data.Status) {
          navigate("/dashboard/employees");
        } else {
          alert(res.data.Error);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center h-100">
      <div className="p-4 rounded w-50 border">
        <h2>Add Employee</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {/* Name */}
          <div className="mb-3">
            <label htmlFor="name">
              <strong>Name</strong>
            </label>
            <input
              type="text"
              name="name"
              value={employeeData.name}
              onChange={handleChange}
              className="form-control rounded-0"
              placeholder="Enter name"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              name="email"
              value={employeeData.email}
              onChange={handleChange}
              className="form-control rounded-0"
              placeholder="Enter email"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              name="password"
              value={employeeData.password}
              onChange={handleChange}
              className="form-control rounded-0"
              placeholder="Enter password"
              required
            />
          </div>

          {/* Salary */}
          <div className="mb-3">
            <label htmlFor="salary">
              <strong>Salary</strong>
            </label>
            <input
              type="number"
              name="salary"
              value={employeeData.salary}
              onChange={handleChange}
              className="form-control rounded-0"
              placeholder="Enter salary"
              required
            />
          </div>

          {/* Address */}
          <div className="mb-3">
            <label htmlFor="address">
              <strong>Address</strong>
            </label>
            <textarea
              name="address"
              value={employeeData.address}
              onChange={handleChange}
              className="form-control rounded-0"
              placeholder="Enter address"
              rows="3"
              required
            ></textarea>
          </div>

          {/* Category */}
          <div className="mb-3">
            <label htmlFor="category_id">
              {" "}
              {/* Changed htmlFor to category_id */}
              <strong>Category</strong>
            </label>
            <select
              name="category_id" // Changed name to category_id to match SQL table
              value={employeeData.category_id} // Updated to employeeData.category_id
              onChange={handleChange}
              className="form-control rounded-0"
              required
            >
              <option value="">-- Select Category --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {" "}
                  {/* Changed value to cat.id */}
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Image Upload */}
          <div className="mb-3">
            <label htmlFor="image">
              <strong>Select Image</strong>
            </label>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              accept="image/*"
              className="form-control rounded-0"
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-100 rounded-0">
            Add Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
