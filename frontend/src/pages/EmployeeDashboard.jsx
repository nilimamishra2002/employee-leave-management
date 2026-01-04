import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";



// yearly leave policy (can be changed easily)
const TOTAL_LEAVES = {
  vacation: 36,
  sick: 12
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
      reason
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
        sick: TOTAL_LEAVES.sick - balance.sick
      }
    : null;

  return (
    
    <div className="container" style={{ width: "700px" }}>
      <Navbar />

      <h2>Employee Dashboard</h2>

      {/* LEAVE SUMMARY */}
{balance === null ? (
  <p>Loading leave summary...</p>
) : (
  <div style={{
    border: "1px solid #ccc",
    padding: "15px",
    marginBottom: "25px",
    width: "400px"
  }}>
    <h3>Yearly Leave Summary</h3>

    <p>
      <strong>Vacation:</strong><br />
      Total: {TOTAL_LEAVES.vacation} days<br />
      Used: {TOTAL_LEAVES.vacation - balance.vacation} days<br />
      Remaining: {balance.vacation} days
    </p>

    <p>
      <strong>Sick:</strong><br />
      Total: {TOTAL_LEAVES.sick} days<br />
      Used: {TOTAL_LEAVES.sick - balance.sick} days<br />
      Remaining: {balance.sick} days
    </p>
  </div>
)}


      <hr />

      {/* APPLY LEAVE */}
      <h3>Apply for Leave</h3>
      <form onSubmit={applyLeave}>
        <label>Leave Type:</label><br />
        <select
          value={leaveType}
          onChange={(e) => setLeaveType(e.target.value)}
        >
          <option value="vacation">Vacation</option>
          <option value="sick">Sick</option>
        </select>

        <br /><br />

        <label>Start Date:</label><br />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />

        <br /><br />

        <label>End Date:</label><br />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />

        <br /><br />

        <label>Reason:</label><br />
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Optional"
        />

        <br /><br />

        <button type="submit">Apply Leave</button>
      </form>

      <hr />

      {/* LEAVE HISTORY */}
      <h3>My Leave Requests</h3>
      {leaves.length === 0 && <p>No leave requests yet.</p>}

      <ul>
        {leaves.map((leave) => (
          <li key={leave._id}>
            {leave.leaveType} |{" "}
            {leave.startDate.slice(0, 10)} →{" "}
            {leave.endDate.slice(0, 10)} |{" "}
            <em>{leave.status}</em>
          </li>
        ))}
      </ul>

      <hr />

      {/* LEAVE CALENDAR */}
      <h3>Approved Leave Calendar</h3>
      {leaves.filter(l => l.status === "approved").length === 0 && (
        <p>No approved leaves yet.</p>
      )}

      <ul>
        {leaves
          .filter(l => l.status === "approved")
          .map(l => (
            <li key={l._id}>
              📅 {l.startDate.slice(0, 10)} → {l.endDate.slice(0, 10)} ({l.leaveType})
            </li>
          ))}
      </ul>
    </div>
  );
}

export default EmployeeDashboard;
