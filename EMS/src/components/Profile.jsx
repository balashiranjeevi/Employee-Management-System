import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/admin_profile", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.Status) {
          setAdmin(res.data.Result);
          setError("");
        } else {
          setError(res.data.Error || "Failed to load profile");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Network error");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-4">
      <div className="card shadow-sm p-4">
        <div className="d-flex align-items-center mb-3">
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            className="rounded-circle me-4"
            style={{ width: 100, height: 100, objectFit: "cover" }}
          />
          <div>
            <h4>{admin.name}</h4>
            <p className="text-muted mb-0">{admin.email}</p>
            <span className="badge bg-primary mt-2">Admin</span>
          </div>
        </div>
        <hr />
        <div>
          <h6>Admin ID</h6>
          <p>{admin.admin_id}</p>
        </div>
        {/* You can add more profile fields here */}
        <div className="text-end mt-3">
          <button className="btn btn-outline-secondary" disabled>
            Edit Profile (Coming Soon)
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
