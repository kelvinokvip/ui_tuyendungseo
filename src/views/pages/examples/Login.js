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
import React, { useContext } from "react";

// nodejs library that concatenates classes
import classnames from "classnames";

//react-icon
import { BiUser } from "react-icons/bi";

//Context Provider
import { AuthContext } from "context/authContext";

//google login
import { useGoogleLogin } from "@react-oauth/google";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";
// core components
import AuthHeader from "components/Headers/AuthHeader.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const { login, loginWithGoogle } = useContext(AuthContext);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [focusedEmail, setfocusedEmail] = React.useState(false);
  const [focusedPassword, setfocusedPassword] = React.useState(false);
  // logic login with account
  const handleLogin = async () => {
    const data = {
      username,
      password,
    };
    const res = await login(data);
    if (res.success) {
      navigate("/admin/test-post");
    } else {
      toast.warning(res.message || "Sai tài khoản hoặc mật khẩu");
    }
  };
  // logic login with google
  const loginGoogle = useGoogleLogin({
    scope:
      "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email openid",
    onSuccess: (token) => loginWithGoogle(token.access_token),
    overrideScope: true,
  });
  const EnterHelper = (key, run) => {
    if (key.keyCode === 13) {
      run();
    }
  };

  return (
    <>
      <AuthHeader
        title="Welcome!"
        lead="Đăng nhập để tham gia vào cộng đồng freelancer OKVIP."
      />
      <Container
        className="mt--8 pb-5"
        onKeyUp={(e) => {
          EnterHelper(e, handleLogin);
        }}
      >
        <Row className="justify-content-center">
          <Col lg="5" md="7">
            <Card className="bg-secondary border-0 mb-0">
              <CardHeader className="bg-transparent pb-5">
                <div className="text-muted text-center mt-2 mb-3">
                  <small>Đăng nhập bằng</small>
                </div>
                <div className="btn-wrapper text-center">
                  {/* <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  <span className="btn-inner--icon mr-1">
                    <img
                      alt="..."
                      src={
                        require("assets/img/icons/common/github.svg").default
                      }
                    />
                  </span>
                  <span className="btn-inner--text">Github</span>
                </Button> */}
                  <Button
                    className="btn-neutral btn-icon w-100"
                    color="default"
                    href="#pablo"
                    onClick={(e) => {
                      e.preventDefault();
                      loginGoogle();
                    }}
                  >
                    <span className="btn-inner--icon mr-1">
                      <img
                        alt="..."
                        src={
                          require("assets/img/icons/common/google.svg").default
                        }
                      />
                    </span>
                    <span className="btn-inner--text">Google</span>
                  </Button>
                </div>
              </CardHeader>
              <CardBody className="px-lg-5 py-lg-5">
                <div className="text-center text-muted mb-4">
                  <small>Hoặc</small>
                </div>
                <Form role="form">
                  <FormGroup
                    className={classnames("mb-3", {
                      focused: focusedEmail,
                    })}
                  >
                    <InputGroup className="input-group-merge input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <BiUser />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Tên đăng nhập"
                        type="text"
                        onFocus={() => setfocusedEmail(true)}
                        onBlur={() => setfocusedEmail(true)}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup
                    className={classnames({
                      focused: focusedPassword,
                    })}
                  >
                    <InputGroup className="input-group-merge input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-lock-circle-open" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Password"
                        type="password"
                        onFocus={() => setfocusedPassword(true)}
                        onBlur={() => setfocusedPassword(true)}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </InputGroup>
                  </FormGroup>
                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <input
                      className="custom-control-input"
                      id=" customCheckLogin"
                      type="checkbox"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor=" customCheckLogin"
                    >
                      <span className="text-muted">Remember me</span>
                    </label>
                  </div>
                  <div className="text-center">
                    <Button
                      className="my-4"
                      color="info"
                      type="button"
                      onClick={handleLogin}
                    >
                      Đăng nhập
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
            <Row className="mt-3">
              <Col xs="6">
                <a
                  className="text-light"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  <small>Quên mật khẩu</small>
                </a>
              </Col>
              <Col className="text-right" xs="6">
                <a
                  className="text-light"
                  href="/auth/register"
                // onClick={(e) => e.preventDefault()}
                >
                  <small>Tạo tài khoản mới</small>
                </a>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Login;