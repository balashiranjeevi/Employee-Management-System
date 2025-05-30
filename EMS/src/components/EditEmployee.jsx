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
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-body p-4">
              <h3 className="text-center mb-4 fw-bold text-success">
                Edit Employee
              </h3>
              <form
                onSubmit={handleSubmit}
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
                    placeholder="Enter full name"
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
                <div className="mb-4">
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
                    {category.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-success fw-semibold py-2 rounded-3"
                  >
                    Save Changes
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

export default EditEmployee;
