import { postSendNotification } from "api/notification";
import { getAllCTV } from "api/user";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { Button, FormGroup, Form, Input, Modal, Label, Spinner  } from "reactstrap";
import Select from 'react-select';
import { getAllCategoriesList } from "api/category";
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
export default function SendNotification({ isOpenModal, handleCancelModal, dataCTV }) {
  const [open, setOpen] = useState(isOpenModal);
  const [loading, setLoading] = useState(isOpenModal);

  const [category, setCategory] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    users: [],
    type: 1,
    category: ""
  });



  const sendNotification = async () => {
    if(loading) return; 
    try {
      setLoading(true);
      const req = {
        title: formData.title,
        message: formData.message,
        type: formData.type,
        users: formData.users,
        category: formData.category
      };
      const res = await postSendNotification(req);
      if (res?.success) {
        toast.success(`Gửi thông báo thành công`);
        handleCancelModal();
        setFormData({
          title: "",
          message: "",
          users: [],
          type: 1,
          category: ""
        });
      } else {
        toast.error(res.message);
      }
      setLoading(false);
    } catch (error) {
      console.log("error:", error);
      toast.error(error.message);
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
  const optionsUser = useMemo(() => {
    if(!dataCTV?.length > 0) return [];
    return dataCTV.map((d) => ({value: d.id, label: d.username}))
  },[dataCTV])

  const getAllCateList = async () => {
    const res = await getAllCategoriesList();
    setCategory(res.data)
    setFormData({...formData,category: res.data[0].name})
  }
  useEffect(() => {
    getAllCateList()
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
              <Label for="type">Loại</Label>
              {typeSend.length > 0 && (
                <Input
                  type="select"
                  name="type"
                  id="type"
                  value={formData.type}
                  onChange={handleChange}
                >
                  {typeSend.map((item, i) => (
                    <option key={i} value={item?.value}>
                      {item?.label}
                    </option>
                  ))}
                </Input>
              )}
            </FormGroup>
            {formData.type == 2 &&
              <FormGroup>
              <Label for="type">Gửi thông báo</Label>
                <Select
                    defaultValue={formData.users}
                    isMulti
                    name="colors"
                    options={optionsUser}
                    onChange={v => formData.users = v}
                  />
            </FormGroup>
            }
            {formData.type == 3 &&
              <FormGroup>
              <Label for="type">Gửi thông báo</Label>
              {category.length > 0 && (
                <Input
                  type="select"
                  name="category"
                  id="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  {category.map((item, i) => (
                    <option key={i} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </Input>
              )}
            </FormGroup>
            }
            <Button type="submit" color="primary">
               {loading?<Spinner  />: "Gửi"} 
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

const typeSend = [
  {
    value: 1,
    label: "Gửi all"
  },
  {
    value: 2,
    label: "Chọn CTV"
  },
  {
    value: 3,
    label: "Chọn CTV chuyên mục"
  },
]