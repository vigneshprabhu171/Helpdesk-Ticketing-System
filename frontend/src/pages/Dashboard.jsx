import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";

function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [feedbackCount, setFeedbackCount] = useState(0);
  const role = localStorage.getItem("role");
  const fullName = localStorage.getItem("fullName");

  useEffect(() => {
    fetchTickets();
    fetchFeedbackStats();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await api.get("/api/tickets");
      setTickets(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchFeedbackStats = async () => {
    try {
      const avgResponse = await api.get("/api/feedback/average-rating");

      const countResponse = await api.get("/api/feedback/count");

      setAverageRating(avgResponse.data);
      setFeedbackCount(countResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  const totalTickets = tickets.length;

  const openTickets = tickets.filter(
    (ticket) => ticket.status === "OPEN" || ticket.status === "IN_PROGRESS",
  ).length;

  const closedTickets = tickets.filter(
    (ticket) => ticket.status === "CLOSED",
  ).length;

  const reopenedTickets = tickets.filter(
    (ticket) => ticket.status === "REOPENED",
  ).length;

  return (
    <Layout>
      <div className="container-fluid">
        <div className="mb-4">
          <h2>Welcome {fullName} 👋</h2>

          <p className="text-muted">{role} Dashboard</p>
        </div>

        <div className="row">
          {/* Total Tickets */}
          <div className="col-md-3 mb-4">
            <Link to="/tickets" className="text-decoration-none">
              <div
                className="card border-0 shadow h-100"
                style={{
                  borderRadius: "20px",
                  minHeight: "120px",
                }}
              >
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between">
                    <div>
                      <p className="text-muted mb-1">Total Tickets</p>

                      <h2>{totalTickets}</h2>
                    </div>

                    <div
                      style={{
                        fontSize: "40px",
                      }}
                    >
                      🎫
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Open Tickets */}
          <div className="col-md-3 mb-4">
            <Link to="/tickets" className="text-decoration-none">
              <div
                className="card border-0 shadow h-100"
                style={{
                  borderRadius: "20px",
                  minHeight: "120px",
                }}
              >
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between">
                    <div>
                      <p className="text-muted mb-1">Open Tickets</p>

                      <h2>{openTickets}</h2>
                    </div>

                    <div
                      style={{
                        fontSize: "40px",
                      }}
                    >
                      📂
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Closed Tickets */}
          <div className="col-md-3 mb-4">
            <Link to="/tickets" className="text-decoration-none">
              <div
                className="card border-0 shadow h-100"
                style={{
                  borderRadius: "20px",
                  minHeight: "120px",
                }}
              >
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between">
                    <div>
                      <p className="text-muted mb-1">Closed Tickets</p>

                      <h2>{closedTickets}</h2>
                    </div>

                    <div
                      style={{
                        fontSize: "40px",
                      }}
                    >
                      ✅
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Reopened Tickets */}
          <div className="col-md-3 mb-4">
            <Link to="/tickets" className="text-decoration-none">
              <div
                className="card border-0 shadow h-100"
                style={{
                  borderRadius: "20px",
                  minHeight: "120px",
                }}
              >
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between">
                    <div>
                      <p
                        className="text-muted mb-1"
                        style={{
                          whiteSpace: "nowrap",
                        }}
                      >
                        Reopened Tickets
                      </p>

                      <h2>{reopenedTickets}</h2>
                    </div>

                    <div
                      style={{
                        fontSize: "40px",
                      }}
                    >
                      🔄
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Average Rating */}
          <div className="col-md-3 mb-4">
            <div
              className="card border-0 shadow h-100"
              style={{
                borderRadius: "20px",
                minHeight: "120px",
              }}
            >
              <div className="card-body p-4">
                <div className="d-flex justify-content-between">
                  <div>
                    <p className="text-muted mb-1">Average Rating</p>

                    <h2>⭐ {averageRating.toFixed(1)}</h2>
                  </div>

                  <div
                    style={{
                      fontSize: "40px",
                    }}
                  >
                    ⭐
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Total Feedback */}
          <div className="col-md-3 mb-4">
            <div
              className="card border-0 shadow h-100"
              style={{
                borderRadius: "20px",
                minHeight: "120px",
              }}
            >
              <div className="card-body p-4">
                <div className="d-flex justify-content-between">
                  <div>
                    <p className="text-muted mb-1">Total Feedback</p>

                    <h2>{feedbackCount}</h2>
                  </div>

                  <div
                    style={{
                      fontSize: "40px",
                    }}
                  >
                    💬
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}

        <div className="card border-0 shadow-sm mt-4">
          <div className="card-body">
            <h4 className="mb-3">Recent Tickets</h4>

            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Ticket</th>
                  <th>Status</th>
                  <th>Priority</th>
                </tr>
              </thead>

              <tbody>
                {tickets.slice(0, 5).map((ticket) => (
                  <tr key={ticket.id}>
                    <td>
                      <Link
                        to={`/tickets/${ticket.id}`}
                        className="text-decoration-none"
                      >
                        <div className="fw-bold text-primary">
                          {ticket.ticketNumber}
                        </div>

                        <small className="text-dark">{ticket.title}</small>
                      </Link>
                    </td>

                    <td>
                      <span
                        className={
                          ticket.status === "OPEN"
                            ? "badge bg-primary"
                            : ticket.status === "IN_PROGRESS"
                              ? "badge bg-warning text-dark"
                              : ticket.status === "CLOSED"
                                ? "badge bg-success"
                                : "badge bg-secondary"
                        }
                      >
                        {ticket.status}
                      </span>
                    </td>

                    <td>
                      <span
                        className={
                          ticket.priority === "CRITICAL"
                            ? "badge bg-danger"
                            : ticket.priority === "HIGH"
                              ? "badge bg-warning text-dark"
                              : ticket.priority === "MEDIUM"
                                ? "badge bg-info"
                                : "badge bg-success"
                        }
                      >
                        {ticket.priority}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
