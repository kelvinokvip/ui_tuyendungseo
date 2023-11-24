import { getPostById } from "api/post";
import { updatePostStatus } from "api/post";
import moment from "moment";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, Col, Input, Label, Modal, Row } from "reactstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";

const DetailPost = ({ id, refresh }) => {
  const [note, setNote] = useState("");
  const [data, setData] = useState();
  const [show, setShow] = useState(false);

  //handle update post
  const handleUpdatePostStatus = async (value) => {
    if (!note?.length) {
      toast.warning("Vui lòng đánh giá bài viết!");
      return;
    }
    try {
      const data = {
        status: value,
        note,
      };
      const res = await updatePostStatus(id, data);
      if (res?.success) {
        toast.success("Cập nhật bài viết thành công.");
        refresh();
      }
    } catch (error) {
      toast.warning("Có lỗi xảy ra vui lòng thử lại sau!");
      console.log("error:", error);
    } finally {
      handleCloseModal();
    }
  };
  const handleGetData = async () => {
    if (id) {
      const res = await getPostById(id);
      if (res.success) {
        setData(res.data);
      }
    }
  };

  const handleShowModal = () => {
    handleGetData();
    setShow(true);
  };
  const handleCloseModal = () => {
    setShow(false);
  };
  return (
    <>
      <i
        class="fa-sharp fa-solid fa-eye"
        onClick={handleShowModal}
        style={{ cursor: "pointer" }}
      >
        {" "}
      </i>

      <Modal
        fullscreen="true"
        className="modal-dialog-centered"
        isOpen={show}
        toggle={() => handleCloseModal()}
        modalTransition={{ timeout: 100 }}
        backdropTransition={{ timeout: 100 }}
        style={{
          maxWidth: [1, -2, 2].includes(data?.status) ? "1100px" : "500px",
          width: "100%",
        }}
      >
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            Chi tiết bài test
          </h5>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => handleCloseModal()}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className="modal-body">
          <Row>
            <Col xs="12" className="d-flex ">
              <p>
                Tiêu đề: <strong className="h2">{data?.title}</strong>
              </p>
            </Col>
            <Col xs="12">
              <p style={{ overflow: "auto" }}>
                Mô tả: <strong className="h4">{data?.description}</strong>
              </p>
            </Col>
            {!data?.isOrder ?
              <>
                <Col xs="12">
                  <p style={{ float: "left" }}>Từ khóa chính:</p>
                  {data?.keywords?.map((item) => (
                    <label className="h4" style={{ marginLeft: "10px" }}>
                      {item}
                    </label>
                  ))}
                </Col>
                {data?.word && (
                  <Col xs="12">
                    <p>
                      Số từ: <strong className="h4">{data?.word}</strong>
                    </p>
                  </Col>
                )}
              </>
              :
              <></>
            }


            <Col xs="12">
              <p>
                Ngày hết hạn:{" "}
                <strong className="h4">
                  {moment(data?.expiresDate).format("HH:mm DD/MM/YYYY")}
                </strong>
              </p>
            </Col>
            <Col xs="12">
              <p>Nội dung</p>
              <CKEditor
                config={{ toolbar: false }}
                disabled
                editor={Editor}
                data={data?.receive?.content}
              />
            </Col>
            <Col className="col-12">
              <Label>Đánh giá bài viết</Label>
              <Input
                disabled={data?.status !== 1}
                defaultValue={data?.censor?.note}
                type="textarea"
                onChange={(e) => setNote(e.target.value)}
              />
            </Col>
          </Row>
        </div>
        <div className="modal-footer">
          <Row className="w-100">
            <Col className="col-6 px-0">
              {data?.status === 1 && (
                <>
                  <Button
                    color="primary"
                    data-dismiss="modal"
                    type="button"
                    onClick={() => handleUpdatePostStatus(2)}
                  >
                    Duyệt
                  </Button>
                  <Button
                    color="danger"
                    data-dismiss="modal"
                    type="button"
                    onClick={() => handleUpdatePostStatus(-2)}
                  >
                    Từ chối
                  </Button>
                </>
              )}
            </Col>
            <Col className="col-6 text-right px-0">
              <Button
                color="secondary"
                data-dismiss="modal"
                type="button"
                onClick={() => handleCloseModal()}
              >
                Đóng
              </Button>
            </Col>
          </Row>
        </div>
      </Modal>
    </>
  );
};
export default DetailPost;
