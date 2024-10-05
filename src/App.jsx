import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

import { PageNav as Nav } from "./page/navs";
import { EditSVG, DeleteSVG } from "./page/svg";
import EditModel from "./page/addEditModel";

import {
  Table,
  Button,
  Modal,
  ButtonGroup,
  Form,
  Row,
  Col,
  InputGroup,
} from "react-bootstrap";
[];
function DeleteBtn({ user, onDelete }) {
  return (
    <Button
      variant="danger"
      onClick={() => onDelete(user)}
      disabled={user.pending}
    >
      <DeleteSVG />
    </Button>
  );
}

function EditBtn({ user, onEdit }) {
  return (
    <Button
      variant="warning"
      onClick={() => onEdit(user)}
      disabled={user.pending}
    >
      <EditSVG />
    </Button>
  );
}

function Page() {
  const [users, setUsers] = useState([]);
  const [formUserId, setFormUserId] = useState(null);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const update = () =>
    fetch("/api/employees")
      .then((res) => res.json())
      .then((data) => setUsers(data));

  const markPending = (employee_id) => {
    setUsers(
      users.map((usr) =>
        usr.employee_id != employee_id ? usr : { ...usr, pending: true }
      )
    );
    update();
  };

  useEffect(() => {
    update();
  }, []);

  const handleDelete = (user) => {
    markPending(user.employee_id);
    fetch(`/api/employees/${user.employee_id}`, { method: "DELETE" }).then(
      update
    );
  };

  const handleChange = (e) => {
    let updated = {};
    updated[e.target.name] = e.target.value;
    setFormUser({ ...formUser, ...updated });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClose();

    const prepareData = () => {
      const data = { ...formUser };
      // delete data.employee_id;
      // if (data.manager_id === "NO_MANAGER_NULL") {
      //   data.manager_id = null;
      // } else {
      //   data.manager_id = Number(data.manager_id);
      // }
      console.log(data);
    };

    prepareData();

    // const submitData = formUser;
    // if (!submitData.employee_id) {
    //   submitData.employee_id = `a${users.length + 1}`;
    // }
    // setUsers([
    //   ...users.filter((usr) => usr.employee_id != submitData.employee_id),
    //   { ...submitData, pending: true },
    // ]);
    // fetch("/api/employees/addEmployee", {
    //   method: "POST",
    //   body: JSON.stringify(submitData),
    // }).then(update());
  };

  return (
    <>
      <EditModel
        isVisible={show}
        hide={handleClose}
        defaultUserId={formUserId}
        users={users}
        onChange={handleChange}
        onSubmit={handleSubmit}
        update={update}
      />
      <Nav />
      <Container className="mt-2">
        <Navbar className="rounded bg-secondary-subtle">
          <Container>
            <Navbar.Brand></Navbar.Brand>
            <Button
              onClick={() => {
                setFormUserId(null);
                setShow(true);
              }}
            >
              Add +
            </Button>
          </Container>
        </Navbar>
        <Table
          className="mt-2"
          style={{ verticalAlign: "middle" }}
          bordered
          striped
        >
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
              <tr
                key={user.employee_id}
                style={{ opacity: user.pending ? 0.4 : 1 }}
              >
                <td>{user.employee_id}</td>
                <td>
                  {user.first_name} {user.last_name}
                </td>
                <td>{user.job_title}</td>
                <td>{user.email}</td>
                <td>{user.hire_date}</td>
                <td>{user.phone}</td>
                <td>
                  <ButtonGroup className="d-flex ">
                    <DeleteBtn onDelete={handleDelete} user={user} />
                    <EditBtn
                      onEdit={(user) => {
                        setShow(true);
                        setFormUserId(user.employee_id);
                      }}
                      user={user}
                    />
                  </ButtonGroup>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

function App() {
  const [users, setUsers] = useState([]);
  const [updateRequired, setUpdateRequired] = useState(true);
  const update = () => setUpdateRequired(!updateRequired);
  useEffect(() => {
    fetch("/api/employees")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, [updateRequired]);

  // return <BasicPage users={users} />;
  return <Page users={users} setUsers={setUsers} update={update} />;
}

export default App;
