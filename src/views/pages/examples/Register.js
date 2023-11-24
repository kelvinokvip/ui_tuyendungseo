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
import Select2 from "react-select2-wrapper";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
  const navigate = useNavigate();
  const { signup, loginWithGoogle } = useContext(AuthContext);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isUser, setIsUser] = React.useState(0);

  const [focusedName, setfocusedName] = React.useState(false);
  const [focusedEmail, setfocusedEmail] = React.useState(false);
  const [focusedPassword, setfocusedPassword] = React.useState(false);

  //logic signup with account
  const handleSignup = async () => {
    const data = {
      firstName,
      lastName,
      username,
      password,
      isUser,
    };
    const res = await signup(data);
    if (res?.success) {
      toast.success("tạo tài khoản thành công vui lòng đăng nhập")
      navigate("/auth/login");
    } else {
      toast.error(res?.message || "tạo tài khoản không hành công")
    }
  };

  // logic login with google
  const loginGoogle = useGoogleLogin({
    scope:
      "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email openid",
    onSuccess: (token) => loginWithGoogle(token.access_token, isUser),
    overrideScope: true,
  });

  const optionsUser = [
    { id: "0", text: "CTV content" },
    { id: "1", text: "CTV entity" },
  ]

  return (
    <>
      <AuthHeader
        title="Create an account"
        lead="Use these awesome forms to login or create new account in your project for free."
      />
      <Container className="mt--8 pb-5">
        <Row className="justify-content-center">
          <Col lg="6" md="8">
            <Card className="bg-secondary border-0">
              <CardHeader className="bg-transparent pb-5">
                <div className="text-muted text-center mt-2 mb-4">
                  <small>Đăng kí nhanh với</small>
                </div>
                <div className="text-center">
                  {/* <Button
                    className="btn-neutral btn-icon mr-4"
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
                    className={classnames({
                      focused: focusedName,
                    })}
                  >
                    <InputGroup className="input-group-merge input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-hat-3" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Họ"
                        type="text"
                        onFocus={() => setfocusedName(true)}
                        onBlur={() => setfocusedName(false)}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup
                    className={classnames({
                      focused: focusedName,
                    })}
                  >
                    <InputGroup className="input-group-merge input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-hat-3" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Tên"
                        type="text"
                        onFocus={() => setfocusedName(true)}
                        onBlur={() => setfocusedName(false)}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup
                    className={classnames({
                      focused: focusedEmail,
                    })}
                  >
                    <InputGroup className="input-group-merge input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <BiUser />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Ten đăng nhập"
                        type="text"
                        onFocus={() => setfocusedEmail(true)}
                        onBlur={() => setfocusedEmail(false)}
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
                        onBlur={() => setfocusedPassword(false)}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup
                    className={classnames({
                      focused: focusedPassword,
                    })}
                  >
                    <InputGroup className="input-group-merge input-group-alternative">
                      <Select2
                        className="form-control"
                        defaultValue={isUser}
                        data={optionsUser}
                        options={{
                          placeholder: isUser === 0 ? "CTV content" : isUser,
                        }}
                        onChange={(e) => {
                          setIsUser(e.target.value)
                        }
                        }
                      />
                    </InputGroup>
                  </FormGroup>
                  {/* <div className="text-muted font-italic">
                    <small>
                      password strength:{" "}
                      <span className="text-success font-weight-700">
                        strong
                      </span>
                    </small>
                  </div> */}
                  {/* <Row className="my-4">
                    <Col xs="12">
                      <div className="custom-control custom-control-alternative custom-checkbox">
                        <input
                          className="custom-control-input"
                          id="customCheckRegister"
                          type="checkbox"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="customCheckRegister"
                        >
                          <span className="text-muted">
                            I agree with the{" "}
                            <a
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Privacy Policy
                            </a>
                          </span>
                        </label>
                      </div>
                    </Col>
                  </Row> */}
                  <div className="text-center">
                    <Button
                      className="mt-4"
                      color="info"
                      type="button"
                      onClick={handleSignup}
                    >
                      Tạo tài khoản
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
            <Row className="mt-3">
              <Col xs="6">
                {/* <a
                  className="text-light"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  <small>Quên mật khẩu</small>
                </a> */}
              </Col>
              <Col className="text-right" xs="6">
                <small>Bạn đã có tài khoản? </small>
                <a
                  className="text-light"
                  href="/auth/login"
                // onClick={(e) => e.preventDefault()}
                >
                  <small>Đăng nhập</small>
                </a>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Register;
