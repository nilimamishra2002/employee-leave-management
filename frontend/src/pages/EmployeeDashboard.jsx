import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

// yearly leave policy (can be changed easily)
const TOTAL_LEAVES = {
  vacation: 36,
  sick: 12,
};

function EmployeeDashboard() {
  const [leaves, setLeaves] = useState([]);
  const [balance, setBalance] = useState(null);

  const [leaveType, setLeaveType] = useState("vacation");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");

  // fetch employee leaves
  const fetchLeaves = async () => {
    const res = await api.get("/leaves/my");
    setLeaves(res.data);
  };

  // fetch remaining balance from backend
  const fetchBalance = async () => {
    try {
      const res = await api.get("/auth/me");
      console.log("ME RESPONSE:", res.data);
      setBalance(res.data.leaveBalance || null);
    } catch (err) {
      console.error("Failed to fetch balance", err);
      setBalance(null);
    }
  };

  useEffect(() => {
    fetchLeaves();
    fetchBalance();
  }, []);

  // apply leave
  const applyLeave = async (e) => {
    e.preventDefault();

    await api.post("/leaves/apply", {
      leaveType,
      startDate,
      endDate,
      reason,
    });

    fetchLeaves();
    fetchBalance();

    setStartDate("");
    setEndDate("");
    setReason("");
  };

  // calculate used leaves
  const usedLeaves = balance
    ? {
        vacation: TOTAL_LEAVES.vacation - balance.vacation,
        sick: TOTAL_LEAVES.sick - balance.sick,
      }
    : null;

  return (
    <div className="container mt-4" style={{ maxWidth: "900px" }}>
      <Navbar />

      <h2 className="mb-4">Employee Dashboard</h2>

      {/* LEAVE SUMMARY */}
      <div className="card mb-4">
        <div className="card-body">
          <h4 className="card-title mb-3">Yearly Leave Summary</h4>

          {balance === null ? (
            <p>Loading leave summary...</p>
          ) : (
            <div className="row">
              <div className="col-md-6">
                <h6>Vacation</h6>
                <p className="mb-1">Total: {TOTAL_LEAVES.vacation} days</p>
                <p className="mb-1">
                  Used: {TOTAL_LEAVES.vacation - balance.vacation} days
                </p>
                <p className="fw-bold">Remaining: {balance.vacation} days</p>
              </div>

              <div className="col-md-6">
                <h6>Sick</h6>
                <p className="mb-1">Total: {TOTAL_LEAVES.sick} days</p>
                <p className="mb-1">
                  Used: {TOTAL_LEAVES.sick - balance.sick} days
                </p>
                <p className="fw-bold">Remaining: {balance.sick} days</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* APPLY LEAVE */}
      <div className="card mb-4">
        <div className="card-body">
          <h4 className="card-title mb-3">Apply for Leave</h4>

          <form onSubmit={applyLeave}>
            <div className="mb-3">
              <label className="form-label">Leave Type</label>
              <select
                className="form-select"
                value={leaveType}
                onChange={(e) => setLeaveType(e.target.value)}
              >
                <option value="vacation">Vacation</option>
                <option value="sick">Sick</option>
              </select>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Start Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">End Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Reason</label>
              <textarea
                className="form-control"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Optional"
              />
            </div>

            <button type="submit" className="btn btn-success">
              Apply Leave
            </button>
          </form>
        </div>
      </div>

      {/* LEAVE HISTORY */}
      <div className="card mb-4">
        <div className="card-body">
          <h4 className="card-title mb-3">My Leave Requests</h4>

          {leaves.length === 0 ? (
            <p>No leave requests yet.</p>
          ) : (
            <ul className="list-group">
              {leaves.map((leave) => (
                <li key={leave._id} className="list-group-item">
                  <strong>{leave.leaveType}</strong> |{" "}
                  {leave.startDate.slice(0, 10)} → {leave.endDate.slice(0, 10)}{" "}
                  | <span className="text-muted">{leave.status}</span>
                  {leave.managerComment && (
                    <div className="mt-1 text-muted">
                      <strong>Manager Comment:</strong> {leave.managerComment}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* APPROVED LEAVE CALENDAR */}
      <div className="card mb-4">
        <div className="card-body">
          <h4 className="card-title mb-3">Approved Leave Calendar</h4>

          {leaves.filter((l) => l.status === "approved").length === 0 ? (
            <p>No approved leaves yet.</p>
          ) : (
            <ul className="list-group">
              {leaves
                .filter((l) => l.status === "approved")
                .map((l) => (
                  <li key={l._id} className="list-group-item">
                    📅 {l.startDate.slice(0, 10)} → {l.endDate.slice(0, 10)} (
                    {l.leaveType})
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default EmployeeDashboard;
