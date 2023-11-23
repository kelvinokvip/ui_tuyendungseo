// export default UpdateCategory;
import { getAllCategoriesList } from "api/category";
import { createCategory } from "api/category";
import { updateCategory } from "api/category";
import { updateOrtherPost } from "api/orderPost";
import { createOrtherPost } from "api/orderPost";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

// reactstrap components
import { Button, FormGroup, Form, Input, Modal, Spinner } from "reactstrap";

const ModalPost = ({
  title,
  dataUpdate,
  isOpenModal,
  handleCancelModal,
  handleGetAllPost
}) => {
  const [open, setOpen] = useState(isOpenModal);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    keywords: '',
    words: 1000,
  });

  useEffect(() => {
    setFormData({
      title: dataUpdate?.require?.title,
      description: dataUpdate?.require?.description,
      category: dataUpdate?.require?.category,
      keywords: dataUpdate?.require?.keywords,
      words: dataUpdate?.require?.words || 1000,
    })
  },[dataUpdate])

  useEffect(() => {
    setOpen(isOpenModal);
  }, [isOpenModal]);

  useEffect(() => {
    (async () => {
      const res = await getAllCategoriesList();
      setCategory(res.data)
    })()
  },[])
  //   //logic
  const onFinish = async () => {
    if(loading) return;

    if (!formData.title || !formData.description || !formData.category || !formData.words || !formData.keywords) {
      toast.error("Các trường không được để trống");
      return;
    }
    setLoading(true)
    if (Object.keys(dataUpdate)?.length) {
      const res = await updateOrtherPost(dataUpdate?._id, formData);
      if(res.success){
        handleGetAllPost()
        toast.success(`Cập nhập thành công`);
        setFormData({
          title: "",
          description: "",
          category: "",
          keywords: '',
          words: 1000,
        })
      }
    } else {
      const res = await createOrtherPost(formData);
      if(res.success){
        handleGetAllPost()
        toast.success(`Tạo thành công`);
        setFormData({
          title: "",
          description: "",
          category: "",
          keywords: '',
          words: 1000,
        })
      }
    
    }

    handleCancelModal(false);
    setOpen(false);
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <>
      <Modal
        className="modal-dialog-centered"
        isOpen={open}
        toggle={() => handleCancelModal(false)}
        style={{maxWidth: 700}}
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
                htmlFor="title"
              >
                Tiêu đề
              </label>
              <Input
                defaultValue={dataUpdate?.name}
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label
                className="form-control-label"
                htmlFor="name"
              >
                Chuyên mục
              </label>
              {category.length > 0 && (
                <Input
                  type="select"
                  name="category"
                  id="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option>Chọn chuyên mục</option>
                  {category.map((item, i) => (
                    <option key={i} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </Input>
              )}
            </FormGroup>
            <FormGroup>
              <label
                className="form-control-label"
                htmlFor="description"
              >
                Mô tả
              </label>
              <Input
                defaultValue={dataUpdate?.description}
                id="description"
                name="description"
                type="textarea"
                value={formData.description}
                style={{height: 100}}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label
                className="form-control-label"
                htmlFor="keywords"
              >
                Từ khóa
              </label>
              <Input
                defaultValue={dataUpdate?.name}
                value={formData.keywords}
                id="keywords"
                name="keywords"
                type="text"
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label
                className="form-control-label"
                htmlFor="words"
              >
                Số từ
              </label>
              <Input
                value={formData.words}
                id="words"
                name="words"
                type="number"
                onChange={handleChange}
              />
            </FormGroup>
          </Form>
        </div>
        <div className="modal-footer">
          <Button
            color="secondary"
            data-dismiss="modal"
            type="button"
            onChange={handleChange}
          >
            Hủy bỏ
          </Button>
          <Button color="primary" type="button" onClick={onFinish}>
            {loading?<Spinner  />: title} 
          </Button>
        </div>
      </Modal>
    </>
  );
};
export default ModalPost;
