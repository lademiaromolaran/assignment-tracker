"use client"; // Mark the component as a client component

import { useState } from "react";
import styles from "./page.module.css";

const initialAssignments = [
  {
    id: 1,
    name: "Math Homework",
    class: "Mathematics",
    dueDate: "2024-09-10T14:00",
    points: 100,
    completed: false,
  },
  {
    id: 2,
    name: "Science Project",
    class: "Science",
    dueDate: "2024-09-12T16:00",
    points: 50,
    completed: false,
  },
  {
    id: 3,
    name: "History Essay",
    class: "History",
    dueDate: "2024-09-07T18:00", // Example due date for today
    points: 75,
    completed: false,
  },
];

export default function Home() {
  const [assignments, setAssignments] = useState(initialAssignments);
  const [sortBy, setSortBy] = useState("dueDate");
  const [newAssignment, setNewAssignment] = useState({
    name: "",
    class: "",
    dueDate: "",
    points: "",
  });
  const [editAssignmentId, setEditAssignmentId] = useState(null);
  const [tab, setTab] = useState("pending");
  const [showAddAssignment, setShowAddAssignment] = useState(false);

  const toggleCompletion = (id) => {
    setAssignments((prevAssignments) =>
      prevAssignments.map((assignment) =>
        assignment.id === id
          ? { ...assignment, completed: !assignment.completed }
          : assignment
      )
    );
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleInputChange = (event) => {
    setNewAssignment({
      ...newAssignment,
      [event.target.name]: event.target.value,
    });
  };

  const handleAddAssignment = () => {
    const newAssignmentId = assignments.length + 1;
    const newAssignmentData = {
      id: newAssignmentId,
      ...newAssignment,
      completed: false,
    };
    setAssignments([...assignments, newAssignmentData]);
    setNewAssignment({
      name: "",
      class: "",
      dueDate: "",
      points: "",
    });
    setShowAddAssignment(false);
  };

  const handleEditAssignment = (assignment) => {
    setNewAssignment(assignment);
    setEditAssignmentId(assignment.id);
    setShowAddAssignment(true);
  };

  const handleUpdateAssignment = () => {
    setAssignments((prevAssignments) =>
      prevAssignments.map((assignment) =>
        assignment.id === editAssignmentId ? { ...newAssignment, id: editAssignmentId } : assignment
      )
    );
    setNewAssignment({
      name: "",
      class: "",
      dueDate: "",
      points: "",
    });
    setEditAssignmentId(null);
    setShowAddAssignment(false);
  };

  const handleDeleteAssignment = (id) => {
    setAssignments(assignments.filter((assignment) => assignment.id !== id));
  };

  const sortedAssignments = [...assignments].sort((a, b) => {
    if (sortBy === "dueDate") {
      return new Date(a.dueDate) - new Date(b.dueDate);
    } else if (sortBy === "points") {
      return a.points - b.points;
    } else if (sortBy === "completed") {
      return Number(a.completed) - Number(b.completed);
    }
    return 0;
  });

  const filteredAssignments = sortedAssignments.filter((assignment) =>
    tab === "completed" ? assignment.completed : !assignment.completed
  );

  const upcomingAssignments = sortedAssignments.filter((assignment) => !assignment.completed);

  // Get today's date for comparison
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set time to midnight for accurate comparison

  // Filter assignments due today
  const dueTodayAssignments = assignments.filter((assignment) => {
    const dueDate = new Date(assignment.dueDate);
    return (
      dueDate.getFullYear() === today.getFullYear() &&
      dueDate.getMonth() === today.getMonth() &&
      dueDate.getDate() === today.getDate()
    );
  });

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Assignments Tracker</h1>

      {/* Section for assignments due today */}
      {dueTodayAssignments.length > 0 && (
        <div className={styles.dueTodayAssignments}>
          <h2>Assignments Due Today</h2>
          <table className={styles.assignmentTable}>
            <thead>
              <tr>
                <th>Assignment Name</th>
                <th>Class</th>
                <th>Due Date</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {dueTodayAssignments.map((assignment) => (
                <tr key={assignment.id}>
                  <td>{assignment.name}</td>
                  <td>{assignment.class}</td>
                  <td>{new Date(assignment.dueDate).toLocaleString()}</td>
                  <td>{assignment.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className={styles.upcomingAssignments}>
        <h2>Upcoming Assignments</h2>
        <table className={styles.assignmentTable}>
          <thead>
            <tr>
              <th>Assignment Name</th>
              <th>Class</th>
              <th>Due Date</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {upcomingAssignments.slice(0, 3).map((assignment) => (
              <tr key={assignment.id}>
                <td>{assignment.name}</td>
                <td>{assignment.class}</td>
                <td>{new Date(assignment.dueDate).toLocaleString()}</td>
                <td>{assignment.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.sortOptions}>
        <label htmlFor="sort">Sort by:</label>
        <select id="sort" value={sortBy} onChange={handleSortChange}>
          <option value="dueDate">Due Date</option>
          <option value="points">Points</option>
          <option value="completed">Completion Status</option>
        </select>
      </div>

      {showAddAssignment && (
        <div className={styles.addAssignment}>
          <h2>{editAssignmentId ? "Edit Assignment" : "Add Assignment"}</h2>
          <input
            type="text"
            name="name"
            placeholder="Assignment Name"
            value={newAssignment.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="class"
            placeholder="Class"
            value={newAssignment.class}
            onChange={handleInputChange}
          />
          <input
            type="datetime-local"
            name="dueDate"
            placeholder="Due Date"
            value={newAssignment.dueDate}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="points"
            placeholder="Points"
            value={newAssignment.points}
            onChange={handleInputChange}
          />
          {editAssignmentId ? (
            <button onClick={handleUpdateAssignment}>Update Assignment</button>
          ) : (
            <button onClick={handleAddAssignment}>Add Assignment</button>
          )}
        </div>
      )}
      {!showAddAssignment && (
        <button className={styles.addAssignmentButton} onClick={() => setShowAddAssignment(true)}>
          Add Assignment
        </button>
      )}
      <div className={styles.tabs}>
        <button onClick={() => setTab("pending")} className={tab === "pending" ? styles.activeTab : ""}>
          Pending Assignments
        </button>
        <button onClick={() => setTab("completed")} className={tab === "completed" ? styles.activeTab : ""}>
          Completed Assignments
        </button>
      </div>
      <table className={styles.assignmentTable}>
        <thead>
          <tr>
            <th>Assignment Name</th>
            <th>Class</th>
            <th>Due Date</th>
            <th>Points</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAssignments.map((assignment) => (
            <tr key={assignment.id} className={assignment.completed ? styles.completed : ""}>
              <td>{assignment.name}</td>
              <td>{assignment.class}</td>
              <td>{new Date(assignment.dueDate).toLocaleString()}</td>
              <td>{assignment.points}</td>
              <td>
                <input
                  type="checkbox"
                  checked={assignment.completed}
                  onChange={() => toggleCompletion(assignment.id)}
                />
              </td>
              <td>
                <button onClick={() => handleEditAssignment(assignment)}>Edit</button>
                <button onClick={() => handleDeleteAssignment(assignment.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}