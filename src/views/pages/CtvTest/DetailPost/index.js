import React, { useState } from "react";

// reactstrap components
import { Button, Modal, Row, Col } from "reactstrap";

//moment
import moment from "moment";
import ConfirmReceivePost from "./ConfirmReceivePost";

const DetailPost = ({
  isOpenDetailPost,
  detailPostData,
  handleCloseModalDetailPost,
}) => {
  const [isOpenModalReceivePost, setIsOpenModalReceivePost] = useState(false);

  const handleClickOke = () => {
    setIsOpenModalReceivePost(true);
  };
  const handleClose = () => {
    handleCloseModalDetailPost();
    setIsOpenModalReceivePost(false);
  };
  return (
    <>
      <Modal
        fullscreen="true"
        className="modal-dialog-centered"
        isOpen={isOpenDetailPost}
        toggle={() => handleCloseModalDetailPost()}
      >
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            Chi tiết bài viết
          </h5>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => handleCloseModalDetailPost()}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className="modal-body">
          <Row>
            <Col xs="12" className="d-flex ">
              <p>
                Tiêu đề: <strong className="h2">{detailPostData?.title}</strong>
              </p>
            </Col>
            <Col xs="12">
              <p style={{ overflow: "auto" }}>
                Mô tả:{" "}
                <strong className="h4">{detailPostData?.description}</strong>
              </p>
            </Col>
            <Col xs="12">
              <p className="mb-0">Từ khóa chính:</p>
              {detailPostData?.keywords?.map((item) => (
                <p className="h4">{item}</p>
              ))}
            </Col>
            <Col xs="12">
              <p>
                Số từ: <strong className="h4">{detailPostData?.words}</strong>
              </p>
            </Col>
            <Col xs="12">
              <p>
                Ngày hết hạn:{" "}
                <strong className="h4">
                  {moment(detailPostData?.expiresDate).format("DD/MM/YYYY")}
                </strong>
              </p>
            </Col>
          </Row>
        </div>
        <div className="modal-footer">
          <Button
            color="primary"
            data-dismiss="modal"
            type="button"
            onClick={() => handleClickOke()}
          >
            Nhận bài viết
          </Button>
          <Button
            color="secondary"
            data-dismiss="modal"
            type="button"
            onClick={() => handleCloseModalDetailPost()}
          >
            Đóng
          </Button>
        </div>
      </Modal>
      <ConfirmReceivePost
        isOpenModalReceivePost={isOpenModalReceivePost}
        handleClose={handleClose}
        idDetailPostData={detailPostData?.id}
      />
    </>
  );
};

export default DetailPost;
