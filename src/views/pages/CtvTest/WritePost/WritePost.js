//react
import React, { useEffect, useState } from "react";
//Component
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
//CK-Editor
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useLocation, useNavigate } from "react-router-dom";
import { useTimer } from "react-timer-hook";
import { getPostById } from "api/post";
import ReactBSAlert from "react-bootstrap-sweetalert";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { startPost } from "api/post";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import moment from "moment";
import { finishPost } from "api/post";
import { toast } from "react-toastify";
import "./styles.scss";
const WritePost = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.pathname.split("/")[3];
  const [post, setPost] = useState();
  const [isStart, setIsStart] = useState(true);
  const [timer, setTimer] = useState();
  const [editorContent, setEditorContent] = useState(
    localStorage.getItem("content")
  );
  const [wordCount, setWordCount] = useState(0);
  const [title, setTitle] = useState(localStorage.getItem("title"));
  const [expires, setExpires] = useState(false);
  const handleGetData = async () => {
    const res = await getPostById(id);
    if (!res.success) {
      navigate("/admin/my-test");
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
  useEffect(() => {
    handleGetData();
  }, []);

  const handleStartPost = async () => {
    const res = await startPost(id);
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

  const handleFinish = async (isExpires = false) => {
    const dataReq = {
      content: editorContent,
      title: title,
      word: wordCount,
      expires: isExpires,
    };
    if (!isExpires) {
      if (wordCount < post?.word) {
        toast.warning("Bài viết của bạn chưa đạt đủ số từ bài viết!");
        return;
      }
    }
    const res = await finishPost(id, dataReq);
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
  return (
    <>
      <SimpleHeader name="Bài viết" parentName="Viết bài" />
      <div className="main-wite-post my-3">
        <Container fluid>
          <Row>
            <Card className="card-frame" style={{ width: "100%" }}>
              <CardBody>
                <div>
                  <Label>Tiêu đề:</Label>
                  <strong className="ml-4">{post?.title}</strong>
                </div>
                <div>
                  <Label>Chuyên mục:</Label>
                  <strong className="ml-4">{post?.category}</strong>
                </div>
                <div>
                  <Label>Từ khóa:</Label>
                  <strong className="ml-4">
                    {post?.keywords?.map((item) => item).toString()}
                  </strong>
                </div>
                <div>
                  <Label>Số từ tối thiểu:</Label>
                  <strong className="ml-4">{post?.word}</strong>
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

                          setWordCount(stats.words + countTitle);
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
                  <div>
                    <Label>Từ khóa:</Label>
                    <strong className="ml-4">
                      {post?.keywords?.map((item) => item).toString()}
                    </strong>
                  </div>

                  <Label>Số từ: </Label>
                  <strong className="ml-4">{wordCount}</strong>
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
          title="Bấm ok để viết bài, bạn có thời hạn 3 tiếng để hoàn thành bài!"
          onConfirm={handleStartPost}
        />
      )}
    </>
  );
};
export default WritePost;
