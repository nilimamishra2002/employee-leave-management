import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

function ManagerDashboard() {
  const [leaves, setLeaves] = useState([]);
  const [comment, setComment] = useState("");
  const [approvedLeaves, setApprovedLeaves] = useState([]);

  const fetchPendingLeaves = async () => {
    const res = await api.get("/leaves/pending");
    setLeaves(res.data);
  };

  const fetchApprovedLeaves = async () => {
    const res = await api.get("/leaves/approved");
    setApprovedLeaves(res.data);
  };

  useEffect(() => {
    fetchPendingLeaves();
    fetchApprovedLeaves();
  }, []);

  const approveLeave = async (id) => {
    await api.put(`/leaves/${id}/approve`, { comment });
    fetchPendingLeaves();
    fetchApprovedLeaves();
  };

  const rejectLeave = async (id) => {
    await api.put(`/leaves/${id}/reject`, { comment });
    fetchPendingLeaves();
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "900px" }}>
      <Navbar />

      <h2 className="mb-4">Manager Dashboard</h2>

      {leaves.length === 0 ? (
        <p>No pending leave requests.</p>
      ) : (
        <div className="row">
          {leaves.map((leave) => (
            <div key={leave._id} className="col-md-12 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title mb-2">{leave.employee.name}</h5>

                  <p className="mb-1">
                    <strong>Type:</strong> {leave.leaveType}
                  </p>

                  <p className="mb-3">
                    <strong>Duration:</strong> {leave.startDate.slice(0, 10)} →{" "}
                    {leave.endDate.slice(0, 10)}
                  </p>
                  {/* LEAVE REASON */}
                  {leave.reason && (
                    <p className="mb-3">
                      <strong>Reason:</strong>{" "}
                      <span className="text-muted">{leave.reason}</span>
                    </p>
                  )}

                  <div className="mb-3">
                    <label className="form-label">
                      Manager Comment (optional)
                    </label>
                    <textarea
                      className="form-control"
                      rows="2"
                      placeholder="Add a comment if necessary"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </div>

                  <button
                    className="btn btn-success me-2"
                    onClick={() => approveLeave(leave._id)}
                  >
                    Approve
                  </button>

                  <button
                    className="btn btn-danger"
                    onClick={() => rejectLeave(leave._id)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <hr />

      <h3 className="mb-3">Approved Leaves (Tracking)</h3>

      {approvedLeaves.length === 0 ? (
        <p>No approved leaves yet.</p>
      ) : (
        <div className="row">
          {approvedLeaves.map((leave) => (
            <div key={leave._id} className="col-md-12 mb-2">
              <div className="card border-light">
                <div className="card-body py-2">
                  <strong>{leave.employee.name}</strong> | {leave.leaveType} |{" "}
                  {leave.startDate.slice(0, 10)} → {leave.endDate.slice(0, 10)}
                  {leave.managerComment && (
                    <div className="text-muted mt-1">
                      <small>
                        <strong>Comment:</strong> {leave.managerComment}
                      </small>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ManagerDashboard;
