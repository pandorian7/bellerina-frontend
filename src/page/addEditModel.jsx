import { useState, useEffect } from "react";

import { Modal, Button, Row, Col, Form } from "react-bootstrap";

function ModalBody({ data, onChange, users, defaultUserId, loading }) {
  return (
    <>
      <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Label>First name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="First Name"
            name="first_name"
            onChange={onChange}
            value={data.first_name}
            disabled={loading}
          />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Last name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Last Name"
            name="last_name"
            onChange={onChange}
            value={data.last_name}
            disabled={loading}
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Label>E-Mail</Form.Label>
          <Form.Control
            type="email"
            placeholder="E-mail"
            name="email"
            required
            onChange={onChange}
            value={data.email}
            disabled={loading}
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Label>Job Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Job Title"
            name="job_title"
            value={data.job_title}
            required
            onChange={onChange}
            disabled={loading}
          />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            placeholder="Phone"
            name="phone"
            value={data.phone}
            required
            onChange={onChange}
            disabled={loading}
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Label>Hire Date</Form.Label>
          <Form.Control
            type="date"
            required
            name="hire_date"
            value={data.hire_date}
            onChange={onChange}
            disabled={loading}
          />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Manager</Form.Label>
          <Form.Select
            required
            name="manager_id"
            value={data.manager_id}
            onChange={onChange}
            disabled={loading}
          >
            <option value={-1}>None</option>
            {users
              .filter((usr) => usr.employee_id != defaultUserId)
              .map((usr) => (
                <option
                  value={usr.employee_id}
                  key={"manager" + usr.employee_id}
                >
                  {usr.first_name} {usr.last_name}
                </option>
              ))}
          </Form.Select>
        </Form.Group>
      </Row>
    </>
  );
}

export default function EditModel({
  isVisible,
  hide,
  defaultUserId,
  users,
  update,
}) {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);

  const emptyData = {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    hire_date: "",
    manager_id: -1,
    job_title: "",
  };
  useEffect(() => {
    if (defaultUserId) {
      const defaultUserData = {
        ...users.find((usr) => usr.employee_id == defaultUserId),
      };
      delete defaultUserData.employee_id;
      if (defaultUserData.manager_id == null) {
        defaultUserData.manager_id = -1;
      }
      setFormData(defaultUserData);
    } else {
      setFormData(emptyData);
    }
  }, [defaultUserId]);

  const handleChange = (e) => {
    let updated = {};
    const name = e.target.name;
    let value = e.target.value;

    if (name == "manager_id") {
      value = Number(value);
    }

    updated[name] = value;
    setFormData({ ...formData, ...updated });
  };

  const handleSubmit = () => {
    setLoading(true);
    const submitData = { ...formData };
    if (submitData.manager_id == -1) {
      submitData.manager_id = null;
    }
    if (defaultUserId) {
      submitData.employee_id = defaultUserId;
    }
    let endpoint, method;
    if (!defaultUserId) {
      endpoint = "/api/employees/addEmployee";
      method = "POST";
    } else {
      endpoint = "/api/employees/updateEmployee";
      method = "PUT";
    }
    fetch(endpoint, {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submitData),
    })
      .then(() => update())
      .finally(() => {
        setLoading(false);
        hide();
      });
  };

  return (
    <Modal show={isVisible} onHide={hide}>
      <Modal.Header closeButton>
        <Modal.Title>Employee</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {formData ? (
          <ModalBody
            data={formData}
            onChange={handleChange}
            users={users}
            defaultUserId={defaultUserId}
            loading={loading}
          />
        ) : (
          <span />
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSubmit} disabled={loading}>
          {loading ? "Loading" : "Submit"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
