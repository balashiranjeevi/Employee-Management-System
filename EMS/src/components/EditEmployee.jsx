import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditEmployee = () => {
  const { id } = useParams();
  const [employeeData, setEmployeeData] = useState({
    name: "",
    email: "",
    salary: "",
    address: "",
    category_id: "",
  });

  const navigate = useNavigate();

  const [category, setCategory] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/category")
      .then((result) => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));

    axios
      .get(`http://localhost:3000/auth/employee/${id}`)
      .then((result) => {
        setEmployeeData((prevData) => ({
          ...prevData,
          name: result.data.Result[0].name,
          email: result.data.Result[0].email,
          address: result.data.Result[0].address,
          salary: result.data.Result[0].salary,
          category_id: result.data.Result[0].category_id,
        }));
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3000/auth/edit_employee/${id}`, employeeData)
      .then((result) => {
        if (result.data.Status) {
          alert("Employee updated successfully");
          navigate("/dashboard/employee");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center h-100">
      <div className="p-4 rounded w-50 border">
        <h2>Edit Employee</h2>
        <form className="col-12" onSubmit={handleSubmit}>
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
              <strong>Category</strong>
            </label>
            <select
              name="category_id"
              value={employeeData.category_id}
              onChange={handleChange}
              className="form-control rounded-0"
              required
            >
              <option value="">-- Select Category --</option>
              {category.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-success w-100 rounded-0">
            Edit Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditEmployee;
