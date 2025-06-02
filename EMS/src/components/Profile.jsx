import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    // Fetch current admin info
    axios
      .get("http://localhost:3000/auth/admin_records", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.Status && res.data.Result.length > 0) {
          setAdmin(res.data.Result[0]); // Assuming only one admin is logged in
        } else {
          alert("Failed to fetch admin details");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong");
      });
  }, []);

  return (
    <div className="container mt-5">
      <div
        className="card shadow border-0 mx-auto"
        style={{ maxWidth: "500px" }}
      >
        <div className="card-body text-center">
          <img
            src={"/images/image.png"}
            alt="Profile"
            className="rounded-circle mb-3"
            width="120"
            height="120"
          />
          {admin ? (
            <>
              <h4 className="card-title">{admin.email.split("@")[0]}</h4>
              <p className="card-text text-muted mb-1">{admin.email}</p>
              <span className="badge bg-primary">Administrator</span>
            </>
          ) : (
            <div className="text-muted">Loading admin profile...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
