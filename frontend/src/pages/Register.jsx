import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("TENANT");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", {
        fullName,
        email,
        password,
        role,
      });

      alert("Registration Successful");

      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Registration Failed");
    }
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        {/* Left Side */}

        <div
          className="col-md-7 d-flex flex-column justify-content-center text-white"
          style={{
            background: "linear-gradient(135deg,#2563eb,#1e293b)",
            padding: "60px",
          }}
        >
          <h1
            style={{
              fontSize: "3rem",
              fontWeight: "bold",
            }}
          >
            Helpdesk Management System
          </h1>

          <p
            className="mt-3"
            style={{
              fontSize: "1.2rem",
            }}
          >
            Create your account and start managing tickets.
          </p>
        </div>

        {/* Right Side */}

        <div className="col-md-5 d-flex justify-content-center align-items-center">
          <div
            className="card shadow border-0"
            style={{
              width: "450px",
              borderRadius: "20px",
            }}
          >
            <div className="card-body p-5">
              <h2 className="mb-4 text-center">Register</h2>

              <form onSubmit={handleRegister}>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>

                  <input
                    type="text"
                    className="form-control"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>

                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>

                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {/* <div className="mb-4">
                  <label className="form-label">Role</label>

                  <select
                    className="form-select"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="TENANT">TENANT</option>

                    <option value="STAFF">STAFF</option>
                  </select>
                </div> */}

                <button type="submit" className="btn btn-primary w-100">
                  Register
                </button>

                <div className="text-center mt-3">
                  Already have an account?
                  <Link to="/" className="ms-2">
                    Login
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
