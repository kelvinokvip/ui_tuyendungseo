// export default UpdateCategory;
import { createCategory } from "api/category";
import { updateCategory } from "api/category";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
// reactstrap components
import { Button, FormGroup, Form, Input, Modal } from "reactstrap";

const UpdateCategory = ({
  title,
  dataUpdate,
  isOpenModal,
  handleCancelModal,
  handleAddCateSuccess,
}) => {
  const [open, setOpen] = useState(isOpenModal);
  // const [form] = Form.useForm();
  const [name, setName] = useState(dataUpdate?.name);
  const [description, setDescription] = useState(dataUpdate?.description);

  useEffect(() => {
    setOpen(isOpenModal);
    setName(dataUpdate?.name);
    setDescription(dataUpdate?.description);
  }, [isOpenModal]);
  //   //logic
  const onFinish = async () => {
    if (!name || !description) {
      toast.error("Các trường không được để trống");
      return;
    }
    const data = {
      name,
      description,
    };
    if (Object.keys(dataUpdate)?.length) {
      const res = await updateCategory(dataUpdate?.id, data);
      toast.success(`Cập nhật thành công`);
    } else {
      const res = await createCategory(data);
      toast.success(`Tạo thành công`);
    }
    handleAddCateSuccess();
    handleCancelModal(false);
    setOpen(false);
  };
  return (
    <>
      <Modal
        className="modal-dialog-centered"
        isOpen={open}
        toggle={() => handleCancelModal(false)}
      >
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            {title}
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
          <Form>
            <FormGroup>
              <label
                className="form-control-label"
                htmlFor="example-text-input"
              >
                Tên
              </label>
              <Input
                defaultValue={dataUpdate?.name}
                id="example-text-input"
                type="text"
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <label
                className="form-control-label"
                htmlFor="example-text-input"
              >
                Mô tả
              </label>
              <Input
                defaultValue={dataUpdate?.description}
                id="example-text-input"
                type="text"
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormGroup>
          </Form>
        </div>
        <div className="modal-footer">
          <Button
            color="secondary"
            data-dismiss="modal"
            type="button"
            onClick={() => handleCancelModal(false)}
          >
            Hủy bỏ
          </Button>
          <Button color="primary" type="button" onClick={onFinish}>
            {title}
          </Button>
        </div>
      </Modal>
    </>
  );
};
export default UpdateCategory;
