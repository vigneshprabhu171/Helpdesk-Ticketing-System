import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);

      localStorage.setItem("fullName", response.data.fullName);

      localStorage.setItem("email", response.data.email);

      localStorage.setItem("role", response.data.role);

      localStorage.setItem("userId", response.data.id);

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Login Failed");
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
            Helpdesk Ticket Management System
          </h1>

          <p
            className="mt-3"
            style={{
              fontSize: "1.2rem",
            }}
          >
            Manage support tickets, monitor requests, and streamline issue
            resolution.
          </p>
        </div>

        {/* Right Side */}

        <div className="col-md-5 d-flex justify-content-center align-items-center">
          <div
            className="card shadow border-0"
            style={{
              width: "420px",
              borderRadius: "20px",
            }}
          >
            <div className="card-body p-5">
              <h2 className="mb-4 text-center">Login</h2>

              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label className="form-label">Email</label>

                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">Password</label>

                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Login
                </button>
                <div className="text-center mt-3">
                  Don't have an account?
                  <Link to="/register" className="ms-2">
                    Register
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

export default Login;
