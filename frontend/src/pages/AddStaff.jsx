import { useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";

function AddStaff() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/api/auth/register", {
        fullName,
        email,
        password,
        role: "STAFF",
      });

      alert("Staff Added Successfully");

      setFullName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error(error);
      alert("Failed to add staff");
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="card shadow border-0">
          <div className="card-body p-4">
            <h3>Add Staff Member</h3>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label>Full Name</label>

                <input
                  type="text"
                  className="form-control"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label>Email</label>

                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label>Password</label>

                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Create Staff
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AddStaff;
