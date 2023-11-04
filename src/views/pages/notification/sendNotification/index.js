import { postSendNotificationByUserId } from "api/notification";
import { getAllCTV } from "api/user";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, FormGroup, Form, Input, Modal, Label } from "reactstrap";
// const modules = {
//   toolbar: [
//     [{ header: "1" }, { header: "2" }, { font: [] }],
//     [{ size: [] }],
//     ["bold", "italic", "underline", "strike", "blockquote"],
//     [
//       { list: "ordered" },
//       { list: "bullet" },
//       { indent: "-1" },
//       { indent: "+1" },
//     ],
//     ["link", "image", "video"],
//     ["clean"],
//   ],
//   clipboard: {
//     // toggle to add extra line breaks when pasting HTML:
//     matchVisual: false,
//   },
// };
export default function SendNotification({ isOpenModal, handleCancelModal }) {
  const [open, setOpen] = useState(isOpenModal);
  const [loading, setLoading] = useState(isOpenModal);
  const [dataCTV, setDataCTV] = useState(isOpenModal);
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    userId: "",
  });

  const fetchApiGetAllCTV = async () => {
    try {
      setLoading(true);
      const res = await getAllCTV();
      setDataCTV(res?.data);
    } catch (error) {
      console.log("error:", error);
    } finally {
      setLoading(false);
    }
  };

  const sendNotification = async () => {
    try {
      setLoading(true);
      const req = {
        title: formData.title,
        message: formData.message,
        type: formData?.userId !== "" ? false : true,
      };
      const res = await postSendNotificationByUserId(formData?.userId, req);
      if (res?.success) {
        toast.success(`Gửi thông báo thành công`);
      } else {
        toast.error(`Lỗi gửi thông báo! Vui lòng thử lại.`);
      }
      setLoading(false);
      setFormData({ title: "", message: "", userId: "" });
    } catch (error) {
      console.log("error:", error);
      setLoading(false);
    }
  };

  const onFinish = (e) => {
    e.preventDefault();
    sendNotification();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchApiGetAllCTV();
  }, []);

  useEffect(() => {
    setOpen(isOpenModal);
  }, [isOpenModal]);

  return (
    <>
      <Modal
        className="modal-dialog-centered"
        isOpen={open}
        toggle={() => handleCancelModal(false)}
      >
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            Gửi thông báo
          </h5>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => handleCancelModal(false)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className="modal-body">
          <Form onSubmit={onFinish}>
            <FormGroup>
              <label
                className="form-control-label"
                htmlFor="example-text-input"
              >
                Tiêu đề
              </label>
              <Input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="message">Nội dung</Label>
              <Input
                type="textarea"
                name="message"
                id="message"
                value={formData.message}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="type">Gửi thông báo</Label>
              {dataCTV?.length > 0 && (
                <Input
                  type="select"
                  name="userId"
                  id="userId"
                  value={formData.userId}
                  onChange={handleChange}
                >
                  <option value="">Chọn user</option>
                  {dataCTV?.map((item, i) => (
                    <option key={i} value={item?._id}>
                      {item?.username}
                    </option>
                  ))}
                </Input>
              )}
            </FormGroup>
            <Button type="submit" color="primary">
              Gửi
            </Button>
            <Button
              color="secondary"
              data-dismiss="modal"
              type="button"
              onClick={() => handleCancelModal(false)}
            >
              Hủy bỏ
            </Button>
          </Form>
        </div>
      </Modal>
    </>
  );
}
