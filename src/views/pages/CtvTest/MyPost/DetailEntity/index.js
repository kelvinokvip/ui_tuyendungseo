import { getPostById } from "api/post";
import moment from "moment";
import { useState } from "react";
import { Button, Col, Modal, Row } from "reactstrap";
import "./styles.scss"
import { CalculateTime } from "function/calculateTime";

const DetailEntity = ({ id, refresh }) => {
  const [data, setData] = useState();
  const [dataLink, setDataLink] = useState();
  const [show, setShow] = useState(false);

  const handleGetData = async () => {
    if (id) {
      const res = await getPostById(id);
      if (res.success) {
        setData(res.data);
        setDataLink(res?.data.description.split('\n'))
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
      >
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            Chi tiết bài entity
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
                Mô tả:
                {
                  dataLink?.map((item, index) => {
                    return (
                      <p className="margin-p" key={index}>
                        <strong className="h4">{item}</strong>
                      </p>
                    )
                  })
                }
              </p>

            </Col>
            <Col xs="12" className="d-flex ">
              <p>
                Thời gian làm bài: <strong className="h2">{CalculateTime(data.receive?.receiveTime, data.receive?.finishTime)}</strong>
              </p>
            </Col>
            <Col xs="12" className="d-flex ">
              <p>
                Thời gian nộp bài: <strong className="h2">{moment(data.receive?.finishTime).format('HH:mm:ss, DD-MM-YYYY')}</strong>
              </p>
            </Col>
            <Col xs="12">
              <p style={{ overflow: "auto" }}>
                Nội dung: <strong className="h4 content-entity" dangerouslySetInnerHTML={{ __html: data?.receive?.content }}></strong>
              </p>
            </Col>
            <Col xs="12">
              <p>
                Ngày hết hạn:{" "}
                <strong className="h4">
                  {moment(data?.expiresDate).format("DD/MM/YYYY")}
                </strong>
              </p>
            </Col>
          </Row>
        </div>
        <div className="modal-footer">
          <Row className="w-100">
            <Col className="col-12 text-center px-0">
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
export default DetailEntity;
