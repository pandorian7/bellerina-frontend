function EditModel({ isVisible, hide, user, users, onChange, onSubmit }) {
  return (
    <Modal show={isVisible} onHide={hide}>
      <Form onSubmit={onSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{user ? "Edit" : "Add"} Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>First name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="First name"
                name="first_name"
                defaultValue={user?.first_name}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Last name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Last name"
                name="last_name"
                defaultValue={user?.last_name}
                onChange={onChange}
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
                defaultValue={user?.email}
                required
                onChange={onChange}
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
                defaultValue={user?.job_title}
                required
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Phone"
                name="phone"
                defaultValue={user?.phone}
                required
                onChange={onChange}
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
                defaultValue={user?.hire_date}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Manager</Form.Label>
              {console.log(user ? user.manager_id : null)}
              <Form.Select
                required
                name="manager_id"
                defaultValue={user ? user.manager_id : null}
                onChange={onChange}
              >
                <option value="NO_MANAGER_NULL">None</option>
                {users
                  .filter((usr) => usr.employee_id != user?.employee_id)
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
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            // onClick={() => {
            //   onSubmit();
            //   hide();
            // }}
            type="submit"
          >
            Submit
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
