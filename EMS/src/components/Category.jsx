import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:3000/auth/category");
        if (res.data.Status) {
          setCategories(res.data.Result);
        } else {
          setError(res.data.Error);
        }
      } catch (err) {
        setError("Failed to fetch categories.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading)
    return <div className="text-center mt-5">Loading categories...</div>;
  if (error)
    return <div className="alert alert-danger mt-5 text-center">{error}</div>;

  return (
    <div className="px-5 mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Category List</h3>
        <Link to="/dashboard/add_category" className="btn btn-success">
          <i className="bi bi-plus-circle me-2"></i> Add Category
        </Link>
      </div>

      {categories.length === 0 ? (
        <div className="text-center text-muted">No categories found.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped text-center">
            <thead className="table-dark">
              <tr>
                <th>S.no</th>
                <th>Category Name</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((c, index) => (
                <tr key={c.id || index}>
                  <td>{index + 1}</td>
                  <td>{c.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Category;
