import { useState } from "react";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [attendanceHistory, setAttendanceHistory] = useState([]);

  const addStudent = () => {
    if (name.trim() === "") return;
    setStudents([
      ...students,
      { id: Date.now(), name, status: "Absent" }
    ]);
    setName("");
  };

  const markAttendance = (id, status) => {
    setStudents(
      students.map((s) =>
        s.id === id ? { ...s, status } : s
      )
    );
  };

  const saveAttendance = () => {
    if (students.length === 0) return;

    const today = new Date().toLocaleDateString();

    const dailyRecord = {
      date: today,
      records: students.map((s) => ({
        name: s.name,
        status: s.status
      }))
    };

    setAttendanceHistory([...attendanceHistory, dailyRecord]);

    
    setStudents(students.map((s) => ({ ...s, status: "Absent" })));
  };

  
  const studentCounts = {};

  attendanceHistory.forEach((day) => {
    day.records.forEach((record) => {
      if (!studentCounts[record.name]) {
        studentCounts[record.name] = {
          present: 0,
          absent: 0
        };
      }

      if (record.status === "Present") {
        studentCounts[record.name].present += 1;
      } else {
        studentCounts[record.name].absent += 1;
      }
    });
  });

  return (
    <div className="container">
      <h1>Student Attendance System</h1>

      {/* ADD STUDENT */}
      <div className="input-section">
        <input
          type="text"
          placeholder="Enter student name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={addStudent}>Add Student</button>
      </div>

      
      {students.length > 0 && (
        <>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.id}>
                  <td>{s.name}</td>
                  <td>{s.status}</td>
                  <td>
                    <button
                      className="present"
                      onClick={() =>
                        markAttendance(s.id, "Present")
                      }
                    >
                      Present
                    </button>
                    <button
                      className="absent"
                      onClick={() =>
                        markAttendance(s.id, "Absent")
                      }
                    >
                      Absent
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button className="save-btn" onClick={saveAttendance}>
            Save Today's Attendance
          </button>
        </>
      )}

      
      {attendanceHistory.length > 0 && (
        <>
          <h2>Daily Attendance History</h2>

          {attendanceHistory.map((day, index) => (
            <div key={index} className="history-day">
              <h3>Date: {day.date}</h3>
              <table>
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {day.records.map((r, i) => (
                    <tr key={i}>
                      <td>{r.name}</td>
                      <td>{r.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </>
      )}

      
      {Object.keys(studentCounts).length > 0 && (
        <>
          <h2>Student Attendance Count</h2>
          <table>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Present Days</th>
                <th>Absent Days</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(studentCounts).map(
                ([name, count]) => (
                  <tr key={name}>
                    <td>{name}</td>
                    <td>{count.present}</td>
                    <td>{count.absent}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default App;
