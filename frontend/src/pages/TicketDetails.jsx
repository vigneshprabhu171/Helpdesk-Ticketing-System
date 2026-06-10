import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import Layout from "../components/Layout";

function TicketDetails() {
  const { id } = useParams();

  const [ticket, setTicket] = useState(null);
  const [history, setHistory] = useState([]);
  const [feedbackList, setFeedbackList] = useState([]);
  const [rating, setRating] = useState(5);
  const [comments, setComments] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchTicket();
    fetchHistory();
    fetchFeedback();
    checkFeedbackExists();
  }, []);

  const fetchTicket = async () => {
    try {
      const response = await api.get(`/api/tickets/${id}`);
      setTicket(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchHistory = async () => {
    try {
      const response = await api.get(`/api/tickets/${id}/history`);

      setHistory(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchFeedback = async () => {
    try {
      const response = await api.get(`/api/feedback/ticket/${id}`);

      setFeedbackList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateStatus = async (status) => {
    try {
      await api.put(`/api/tickets/${id}/status`, {
        status,
        remarks: `Updated to ${status}`,
      });

      fetchTicket();
      fetchHistory();

      alert("Status Updated");
    } catch (error) {
      console.error(error);
    }
  };

  const closeTicket = async () => {
    try {
      await api.put(`/api/tickets/${id}/close`);

      fetchTicket();
      fetchHistory();

      alert("Ticket Closed");
    } catch (error) {
      console.error(error);
    }
  };

  const reopenTicket = async () => {
    try {
      await api.put(`/api/tickets/${id}/reopen`);

      fetchTicket();
      fetchHistory();

      alert("Ticket Reopened");
    } catch (error) {
      console.error(error);
    }
  };

  const submitFeedback = async () => {
    try {
      await api.post("/api/feedback", {
        rating,
        comments,
        ticketId: ticket.id,
        userId: Number(localStorage.getItem("userId")),
      });

      alert("Feedback Submitted");

      setComments("");
      setRating(5);
      setFeedbackSubmitted(true);
      fetchFeedback();
    } catch (error) {
      console.error(error);
      alert("Failed to submit feedback");
    }
  };

  const checkFeedbackExists = async () => {
    try {
      const response = await api.get(`/api/feedback/exists/${id}`);

      setFeedbackSubmitted(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!ticket) {
    return <h2>Loading...</h2>;
  }

  return (
    <Layout>
      <div className="container-fluid">
        <div className="mb-4">
          <h2>Ticket Details</h2>

          <p className="text-muted">View and manage ticket information</p>
        </div>

        {/* Ticket Information */}

        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body p-4">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h3>{ticket.title}</h3>

                <p className="text-muted mb-0">{ticket.ticketNumber}</p>
              </div>

              <div>
                <span
                  className={
                    ticket.status === "OPEN"
                      ? "badge bg-primary me-2"
                      : ticket.status === "IN_PROGRESS"
                        ? "badge bg-warning text-dark me-2"
                        : ticket.status === "CLOSED"
                          ? "badge bg-success me-2"
                          : "badge bg-secondary me-2"
                  }
                  style={{ fontSize: "14px" }}
                >
                  {ticket.status}
                </span>

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
                  style={{ fontSize: "14px" }}
                >
                  {ticket.priority}
                </span>
              </div>
            </div>

            <hr />

            <h6>Description</h6>

            <p>{ticket.description}</p>

            <hr />

            <div className="row mt-3">
              <div className="col-md-4">
                <h6 className="text-muted">Created By</h6>

                <p className="fw-semibold">
                  👤 {ticket.createdBy?.fullName} (
                  {ticket.createdBy?.role === "TENANT"
                    ? "TEN"
                    : ticket.createdBy?.role === "STAFF"
                      ? "STF"
                      : "ADM"}
                  -{String(ticket.createdBy?.id).padStart(4, "0")})
                </p>
              </div>

              <div className="col-md-4">
                <h6 className="text-muted">Created On</h6>

                <p className="fw-semibold">
                  {new Date(ticket.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="col-md-4">
                <h6 className="text-muted">Category</h6>

                <p className="fw-semibold">{ticket.category?.name}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Ticket Actions */}

        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body">
            <h5 className="mb-3">Ticket Actions</h5>

            {role === "STAFF" && (
              <>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => updateStatus("IN_PROGRESS")}
                >
                  IN_PROGRESS
                </button>

                <button
                  className="btn btn-info me-2"
                  onClick={() => updateStatus("RESOLVED")}
                >
                  RESOLVED
                </button>

                <button className="btn btn-success me-2" onClick={closeTicket}>
                  CLOSE
                </button>

                <button className="btn btn-secondary" onClick={reopenTicket}>
                  REOPEN
                </button>
              </>
            )}

            {role === "TENANT" && ticket.status === "CLOSED" && (
              <button className="btn btn-secondary" onClick={reopenTicket}>
                REOPEN TICKET
              </button>
            )}
          </div>
        </div>

        {/* Ticket History */}

        <div className="card border-0 shadow-sm">
          <div className="card-body">
            <h5 className="mb-4">Ticket History</h5>

            <ul className="list-group">
              {history.length > 0 ? (
                history.map((item) => (
                  <li key={item.id} className="list-group-item">
                    <strong>{item.oldStatus}</strong>

                    {" → "}

                    <strong>{item.newStatus}</strong>

                    <br />

                    <small className="text-muted">{item.remarks}</small>
                  </li>
                ))
              ) : (
                <li className="list-group-item">No history available</li>
              )}
            </ul>
          </div>
        </div>

        <div className="card shadow mt-4">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="mb-0">Customer Feedback</h3>

              <span className="badge bg-primary">
                {feedbackList.length} Feedback
              </span>
            </div>

            {feedbackList.length === 0 ? (
              <p className="text-muted">No feedback submitted yet.</p>
            ) : (
              feedbackList.map((feedback) => (
                <div
                  key={feedback.id}
                  className="card border-0 shadow-sm mb-3"
                  style={{
                    borderRadius: "15px",
                  }}
                >
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div
                        style={{
                          fontSize: "22px",
                        }}
                      >
                        <div className="fw-bold text-primary">
                          Rating: {feedback.rating}/5
                        </div>
                      </div>

                      <small className="text-muted">
                        {new Date(feedback.createdAt).toLocaleString()}
                      </small>
                    </div>

                    <p
                      className="mb-3"
                      style={{
                        fontSize: "16px",
                      }}
                    >
                      "{feedback.comments}"
                    </p>

                    <hr />

                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <div className="fw-bold">{feedback.user?.fullName}</div>

                        <small className="text-muted">
                          {feedback.user?.role === "TENANT"
                            ? "TEN"
                            : feedback.user?.role === "STAFF"
                              ? "STF"
                              : "ADM"}
                          -{String(feedback.user?.id).padStart(4, "0")}
                        </small>
                      </div>

                      <div>
                        <div className="fw-bold text-primary">
                          🎫 {feedback.ticket?.ticketNumber}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {role === "TENANT" &&
          ticket.status === "CLOSED" &&
          !feedbackSubmitted && (
            <div className="card border-0 shadow-sm mt-4">
              <div className="card-body">
                <h5 className="mb-3">Rate Support Experience</h5>

                <div className="row">
                  {/* Rating Card */}

                  <div className="col-md-4">
                    <div
                      className="card border-0 shadow-sm h-100"
                      style={{
                        borderRadius: "20px",
                      }}
                    >
                      <div className="card-body p-4">
                        <h5 className="fw-bold mb-2">Service Quality</h5>

                        <p
                          className="text-muted"
                          style={{
                            fontSize: "13px",
                          }}
                        >
                          How would you rate the support experience?
                        </p>

                        <div className="mt-4">
                          <div className="d-flex justify-content-between mb-2">
                            {[1, 2, 3, 4, 5].map((value) => (
                              <div key={value} className="text-center">
                                <input
                                  type="radio"
                                  className="btn-check"
                                  name="rating"
                                  id={`rating-${value}`}
                                  checked={rating === value}
                                  onChange={() => setRating(value)}
                                />

                                <label
                                  htmlFor={`rating-${value}`}
                                  className={`btn ${
                                    rating === value
                                      ? "btn-primary"
                                      : "btn-outline-secondary"
                                  } rounded-circle`}
                                  style={{
                                    width: "45px",
                                    height: "45px",
                                    lineHeight: "30px",
                                  }}
                                >
                                  {value}
                                </label>
                              </div>
                            ))}
                          </div>

                          <div
                            className="d-flex justify-content-between text-muted mt-3"
                            style={{
                              fontSize: "11px",
                            }}
                          >
                            <span>Very Poor</span>
                            <span>Poor</span>
                            <span>Average</span>
                            <span>Good</span>
                            <span>Excellent</span>
                          </div>
                        </div>

                        <hr className="my-4" />

                        <div className="row text-center">
                          <div className="col-6">
                            <div
                              className="text-muted"
                              style={{
                                fontSize: "12px",
                              }}
                            >
                              Current Rating
                            </div>

                            <div className="fw-bold">{rating}/5</div>
                          </div>

                          <div className="col-6">
                            <div
                              className="text-muted"
                              style={{
                                fontSize: "12px",
                              }}
                            >
                              Satisfaction
                            </div>

                            <div className="fw-bold text-primary">
                              {rating === 1
                                ? "Very Poor"
                                : rating === 2
                                  ? "Poor"
                                  : rating === 3
                                    ? "Average"
                                    : rating === 4
                                      ? "Good"
                                      : "Excellent"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Comments Card */}

                  <div className="col-md-8">
                    <div
                      className="card border-0 shadow-sm h-100"
                      style={{
                        borderRadius: "20px",
                      }}
                    >
                      <div className="card-body">
                        <h5>Your Experience</h5>

                        <p className="text-muted small">
                          Share additional comments.
                        </p>

                        <textarea
                          className="form-control"
                          rows="6"
                          value={comments}
                          onChange={(e) => setComments(e.target.value)}
                        />

                        <div className="text-end mt-3">
                          <button
                            className="btn btn-primary"
                            onClick={submitFeedback}
                          >
                            Submit Feedback
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        {feedbackSubmitted && (
          <div className="alert alert-success mt-4">
            <h5 className="mb-2">✅ Feedback Submitted</h5>

            <p className="mb-0">Thank you for sharing your experience.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default TicketDetails;
