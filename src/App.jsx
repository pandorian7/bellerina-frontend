import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/employees")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);
  console.log(users);

  return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Job</th>
          <th>Email</th>
          <th>Hire Date</th>
          <th>Contact</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.employee_id}>
            <td>{user.employee_id}</td>
            <td>
              {user.first_name} {user.last_name}
            </td>
            <td>{user.job_title}</td>
            <td>{user.email}</td>
            <td>{user.hire_date}</td>
            <td>{user.phone}</td>
            <td></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default App;
