import React, { useEffect, useState } from "react";
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
  Modal,
  Row,
  Col,
  Label,
} from "reactstrap";
import Select2 from "react-select2-wrapper";
import { updateCtvStatus } from "api/user";
import { toast } from "react-toastify";
//
const options = [
  { id: "0", text: "Chưa duyệt" },
  { id: "1", text: "Duyệt" },
];
const UpdateCTV = ({
  ctvDataDetail,
  isOpenUpdateModal,
  handleCloseModal,
  handleUpdateSuccess,
}) => {
  const [isOpen, setIsOpen] = useState(isOpenUpdateModal);
  const [status, setStatus] = useState("");
  const [isVerify, setIsVerify] = useState(0);

  const handelStatus = (value) => {
    setStatus(value);
    if (value == 1) {
      //IsVerify tài khoản đã được duyệt không cho ctv login
      setIsVerify(0)
    } else if (value == 0) {
      setIsVerify(1)
    }
  }

  const handleUpdateCtv = async () => {
    try {
      const res = await updateCtvStatus(ctvDataDetail?._id, status, isVerify);
      if (res?.success) {
        toast.success(res?.message);
        handleUpdateSuccess();
        return;
      }
      toast.warning(res?.message);
      return;
    } catch (error) {
      console.log("error:", error);
    } finally {
      handleCloseModal();
    }
  };
  useEffect(() => {
    setIsOpen(isOpenUpdateModal);
    setStatus(ctvDataDetail?.status);
  }, [isOpenUpdateModal]);
  return (
    <>
      <Modal
        className="modal-dialog-centered"
        isOpen={isOpen}
        toggle={() => handleCloseModal()}
      >
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            Cập nhật công tác viên
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
            <Col className="col-12 mb-3">
              <Label>Họ tên</Label>
              <Input disabled value={ctvDataDetail?.username} />
            </Col>
            <Col className="col-12">
              <Label>Trạng thái</Label>
              <Select2
                className="form-control"
                defaultValue={status}
                // options={{
                //   placeholder:
                //     keywordSearch === "all" || keywordSearch === ""
                //       ? "Tổng hợp"
                //       : keywordSearch,
                // }}
                data={options}
                onChange={(e) => handelStatus(e.target.value)}
              />
            </Col>
          </Row>
        </div>
        <div className="modal-footer">
          <Button
            color="secondary"
            data-dismiss="modal"
            type="button"
            onClick={() => handleCloseModal()}
          >
            Đóng
          </Button>
          <Button color="primary" type="button" onClick={handleUpdateCtv}>
            Cập nhật
          </Button>
        </div>
      </Modal>
    </>
  );
};
export default UpdateCTV;