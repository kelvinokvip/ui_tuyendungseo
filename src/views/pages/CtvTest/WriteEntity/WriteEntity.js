import React, { useEffect, useState } from "react";
import SimpleHeader from "components/Headers/SimpleHeader.js";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Label,
  Row,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useTimer } from "react-timer-hook";
import ReactBSAlert from "react-bootstrap-sweetalert";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { startPost } from "api/post";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import moment from "moment";
import { finishPost } from "api/post";
import { toast } from "react-toastify";
import "./styles.scss";
import { getRandomEntity } from "api/orderEntity";
import { startPostEntity } from "api/post";

const WriteEntity = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState();
  const [isStart, setIsStart] = useState(true);
  const [timer, setTimer] = useState();
  const [editorContent, setEditorContent] = useState(
    localStorage.getItem("content")
  );
  const [title, setTitle] = useState(localStorage.getItem("title"));
  const [expires, setExpires] = useState(false);

  const handleGetData = async () => {
    const res = await getRandomEntity();
    console.log("res?.data", res?.data);
    if (!res.success && res?.data) {
      toast.error(res.message);
      // navigate("/admin/my-test");
    }
    setPost(res?.data);
    //check expires
    if (res?.data?.receive?.deadline) {
      if (moment().isAfter(moment(res?.data?.receive?.deadline))) {
        setExpires(true);
        navigate("/admin/my-test");
      }
      setTimer(new Date(res?.data?.receive?.deadline));
      setIsStart(true);
    } else {
      setIsStart(false);
    }
  };

  const handleStartPost = async () => {
    const res = await startPostEntity(post._id);
    if (res.success) {
      setTimer(new Date(res?.post?.receive?.deadline));
      setIsStart(true);
    }
  };

  function MyTimer({ expiryTimestamp }) {
    const { seconds, minutes, hours } = useTimer({
      expiryTimestamp,
      onExpire: () => handleFinish(true),
    });

    return (
      <div style={{ textAlign: "center" }}>
        <div>
          <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
        </div>
      </div>
    );
  }

  const handleFinish = async () => {
    const dataReq = {
      content: editorContent,
      title: title,
    };
    const res = await finishPost(post._id, dataReq);
    if (res?.success) {
      toast.success(
        "Nộp bài thành công! Vui lòng chờ quản trị viên duyệt bài!"
      );
      localStorage.removeItem("content");
      localStorage.removeItem("title");
      navigate("/admin/my-test");
    } else {
      if (res.expires) {
        navigate("/admin/my-test");
      }
      toast.error(res?.message);
    }
  };

  useEffect(() => {
    handleGetData();
  }, []);

  return (
    <>
      <SimpleHeader name="Bài viết entity " parentName="Viết bài entity" />
      <div className="main-wite-post my-3">
        <Container fluid>
          <Row>
            <Card className="card-frame" style={{ width: "100%" }}>
              <CardBody>
                <div>
                  <Label>Tiêu đề:</Label>
                  {isStart ? <strong className="ml-4">{post?.title}</strong> : <></>}
                </div>
                <div>
                  <Label>Link entity:</Label>
                  {isStart ? <strong className="ml-4">{post?.description}</strong> : <></>}
                </div>
              </CardBody>
            </Card>
          </Row>
          <Row>
            <Col lg={9}>
              <Row>
                <Col className="col-12">
                  <Label>Tiêu đề</Label>
                  <br />
                  <Input
                    type="text"
                    value={title}
                    onChange={(e) => {
                      localStorage.setItem("title", e.target.value);
                      setTitle(e.target.value);
                    }}
                  />
                </Col>
                <Col className="col-12 mt-4">
                  <Label>Nội dung</Label>
                  <CKEditor
                    editor={Editor}
                    plugins={["WordCount"]}
                    data={editorContent}
                    config={{ height: 500 }}
                    onReady={(editor) => {
                      // You can store the "editor" and use when it is needed.
                      editor.plugins
                        .get("WordCount")
                        .on("update", (evt, stats) => {
                          // Prints the current content statistics.
                          let countTitle =
                            title
                              ?.toString()
                              ?.replace(/(\s+|-|\n)+/g, " ")
                              ?.trim()
                              .split(/[\s/-]/)
                              .filter(
                                (item) =>
                                  ![
                                    "",
                                    ",",
                                    ".",
                                    "–",
                                    "-",
                                    "''",
                                    "…",
                                    "…–",
                                  ].includes(item.trim())
                              ).length || 0;
                        });
                    }}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setEditorContent(data);
                      localStorage.setItem("content", data);
                    }}
                  />
                </Col>
              </Row>
            </Col>
            <Col
              lg={3}
              style={{
                position: "fixed",
                height: "10rem",
                right: 0,
                width: "21%",
              }}
            >
              <Card>
                <CardBody style={{ width: "100%" }}>
                  <div className="d-flex">
                    <Label>Hết hạn:</Label>
                    <strong className="ml-4">
                      <MyTimer expiryTimestamp={timer} />
                    </strong>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <Button
                type="primary"
                color="primary"
                onClick={() => handleFinish(false)}
              >
                Nộp bài
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
      {!isStart && (
        <ReactBSAlert
          warning
          title="Bấm ok để viết bài, bạn có thời hạn 2 tiếng để hoàn thành bài!"
          onConfirm={handleStartPost}
        />
      )}
    </>
  );
};
export default WriteEntity;
