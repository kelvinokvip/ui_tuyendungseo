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
import React, { useContext, useEffect, useState } from "react";
// nodejs library that concatenates classes
import classnames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";

//Context
import useAuthContext from "utils/useAuthContext";
import { AuthContext } from "context/authContext";
// reactstrap components
import { useNavigate } from "react-router-dom";
import {
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  ListGroupItem,
  ListGroup,
  Media,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  Dropdown,
} from "reactstrap";
import NotificationUI from "components/Notification";
import { getSendNotificationByUserId } from "api/notification";
import { Badge } from "antd";
import { useMemo } from "react";

function AdminNavbar({ theme, sidenavOpen, toggleSidenav }) {
  const navigate = useNavigate;
  const { user } = useAuthContext();
  const { logout } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dataNotification, setDataNotication] = useState([]);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  // function that on mobile devices makes the search open
  // const openSearch = () => {
  //   document.body.classList.add("g-navbar-search-showing");
  //   setTimeout(function () {
  //     document.body.classList.remove("g-navbar-search-showing");
  //     document.body.classList.add("g-navbar-search-show");
  //   }, 150);
  //   setTimeout(function () {
  //     document.body.classList.add("g-navbar-search-shown");
  //   }, 300);
  // };
  // // function that on mobile devices makes the search close
  // const closeSearch = () => {
  //   document.body.classList.remove("g-navbar-search-shown");
  //   setTimeout(function () {
  //     document.body.classList.remove("g-navbar-search-show");
  //     document.body.classList.add("g-navbar-search-hiding");
  //   }, 150);
  //   setTimeout(function () {
  //     document.body.classList.remove("g-navbar-search-hiding");
  //     document.body.classList.add("g-navbar-search-hidden");
  //   }, 300);
  //   setTimeout(function () {
  //     document.body.classList.remove("g-navbar-search-hidden");
  //   }, 500);
  // };
  const countReaded = useMemo(() => {
    const c = dataNotification.filter(item => item.users.find(i => i.id == user.id && i.readed == false)).length;
    return c || 0;
  },[dataNotification, user.id])
  const handleLogout = async () => {
    await logout();
    window.location.href = process.env.REACT_APP_DASHBOARD;
  };


  useEffect(() => {
    if(user?.id){
      fetchApiGetNotificationByUserId();
    }
  }, [user?.id]);

  
  const fetchApiGetNotificationByUserId = async () => {
    try { 
      const res = await getSendNotificationByUserId(user.id);
      setDataNotication(res);
    } catch (error) {
      console.log("error:", error);
    } finally {
     
    }
  };

  return (
    <>
      <Navbar
        className={classnames(
          "navbar-top navbar-expand border-bottom",
          { "navbar-dark bg-info": theme === "dark" },
          { "navbar-light bg-secondary": theme === "light" }
        )}
      >
        <Container fluid>
          <Collapse navbar isOpen={true}>
            <Nav className="align-items-center ml-md-auto" navbar>
              <NavItem className="d-xl-none">
                <div
                  className={classnames(
                    "pr-3 sidenav-toggler",
                    { active: sidenavOpen },
                    { "sidenav-toggler-dark": theme === "dark" }
                  )}
                  onClick={toggleSidenav}
                >
                  <div className="sidenav-toggler-inner">
                    <i className="sidenav-toggler-line" />
                    <i className="sidenav-toggler-line" />
                    <i className="sidenav-toggler-line" />
                  </div>
                </div>
              </NavItem>
            </Nav>
            <Nav className="align-items-center ml-auto ml-md-0" navbar>
              <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle className="nav-link pr-0" color="" tag="a">
                <Badge size="small" count={countReaded}>
                  <Media
                    className="align-items-center"
                    style={{ cursor: "pointer", fontSize: 20 }}
                  >
                    <span className="ni ni-bell-55 text-white"></span>
                  </Media>
                </Badge>
                
                </DropdownToggle>
                <NotificationUI data={dataNotification} fetchApiGetNotificationByUserId={fetchApiGetNotificationByUserId} />
              </Dropdown>
              <UncontrolledDropdown nav>
                <DropdownToggle className="nav-link pr-0" color="" tag="a">
                  <Media
                    className="align-items-center"
                    style={{ cursor: "pointer" }}
                  >
                    <span className="avatar avatar-sm rounded-circle">
                      <img
                        alt="..."
                        src={require("assets/img/theme/team-4.jpg")}
                      />
                    </span>

                    <Media className="ml-2 d-none d-lg-block">
                      <span className="mb-0 text-sm font-weight-bold">
                        {Object.keys(user).length
                          ? `${user?.firstName} ${user?.lastName}`
                          : "Loading..."}
                      </span>
                    </Media>
                  </Media>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem className="noti-title" header tag="div">
                    <h6 className="text-overflow m-0">Welcome!</h6>
                  </DropdownItem>
                  {/* <DropdownItem
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="ni ni-single-02" />
                    <span>Thông tin tài khoản</span>
                  </DropdownItem>
                  <DropdownItem
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="ni ni-settings-gear-65" />
                    <span>Cài đặt</span>
                  </DropdownItem>
                  <DropdownItem
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="ni ni-calendar-grid-58" />
                    <span>Activity</span>
                  </DropdownItem>  */}
                  {/* <DropdownItem
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="ni ni-support-16" />
                    <span>Hỗ trợ</span>
                  </DropdownItem>{" "} */}
                  <DropdownItem divider />
                  <DropdownItem
                    href="#pablo"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLogout();
                    }}
                  >
                    <i className="ni ni-user-run" />
                    <span>Đăng xuất</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

AdminNavbar.defaultProps = {
  toggleSidenav: () => { },
  sidenavOpen: false,
  theme: "dark",
};
AdminNavbar.propTypes = {
  toggleSidenav: PropTypes.func,
  sidenavOpen: PropTypes.bool,
  theme: PropTypes.oneOf(["dark", "light"]),
};

export default AdminNavbar;
