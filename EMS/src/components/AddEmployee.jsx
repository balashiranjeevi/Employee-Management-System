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

    axios
      .post("http://localhost:3000/auth/add_employee", formData)
      .then((res) => {
        if (res.data.Status) {
          navigate("/dashboard/employee");
        } else {
          alert(res.data.Error);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-body p-4">
              <h3 className="text-center mb-4 fw-bold text-success">
                Add New Employee
              </h3>
              <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                className="needs-validation"
                noValidate
              >
                {/* Name */}
                <div className="mb-3">
                  <label htmlFor="name" className="form-label fw-semibold">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={employeeData.name}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter name"
                    required
                  />
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-semibold">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={employeeData.email}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter email"
                    required
                  />
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label fw-semibold">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={employeeData.password}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter password"
                    required
                  />
                </div>

                {/* Salary */}
                <div className="mb-3">
                  <label htmlFor="salary" className="form-label fw-semibold">
                    Salary
                  </label>
                  <input
                    type="number"
                    name="salary"
                    value={employeeData.salary}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter salary"
                    required
                  />
                </div>

                {/* Address */}
                <div className="mb-3">
                  <label htmlFor="address" className="form-label fw-semibold">
                    Address
                  </label>
                  <textarea
                    name="address"
                    value={employeeData.address}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter address"
                    rows="3"
                    required
                  ></textarea>
                </div>

                {/* Category */}
                <div className="mb-3">
                  <label
                    htmlFor="category_id"
                    className="form-label fw-semibold"
                  >
                    Category
                  </label>
                  <select
                    name="category_id"
                    value={employeeData.category_id}
                    onChange={handleChange}
                    className="form-select"
                    required
                  >
                    <option value="">-- Select Category --</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Image */}
                <div className="mb-4">
                  <label htmlFor="image" className="form-label fw-semibold">
                    Upload Profile Image
                  </label>
                  <input
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                    accept="image/*"
                    className="form-control"
                    required
                  />
                </div>

                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-success fw-semibold py-2 rounded-3"
                  >
                    Add Employee
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
