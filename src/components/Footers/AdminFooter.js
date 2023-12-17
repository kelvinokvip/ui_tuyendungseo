/*!

=========================================================
* Argon Dashboard PRO React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import React from "react";

// reactstrap components
import { NavItem, NavLink, Nav, Container, Row, Col } from "reactstrap";

function AdminFooter() {
  return (
    <>
      <Container fluid>
        <footer className="footer pt-0">
          <Row className="align-items-center justify-content-lg-between">
            <Col lg="6">
              <div className="copyright text-center text-lg-left text-muted">
                Contact:
                <a
                  className="font-weight-bold ml-1"
                  href="mailto: freelancer@okvip.com"
                  target="_blank"
                >
                  freelancer@okvip.com
                </a>
              </div>
            </Col>
            <Col lg="6">
              <Nav className="nav-footer justify-content-center justify-content-lg-end">
                <NavItem>
                  <NavLink
                    href="https://t.me/dizo911"
                    target="_blank"
                  >
                    Liên hệ admin
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    href="https://t.me/congtacviencom"
                    target="_blank"
                  >
                    Group cộng tác viên
                  </NavLink>
                </NavItem>
              </Nav>
            </Col>
          </Row>
        </footer>
      </Container>
    </>
  );
}

export default AdminFooter;
