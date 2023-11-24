import { updateOrderEntity } from "api/orderEntity";
import { createOrderEntity } from "api/orderEntity";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, FormGroup, Form, Input, Modal, Spinner } from "reactstrap";

const ModalOrderEntity = ({
    title,
    dataUpdate,
    isOpenModal,
    handleCancelModal,
    handleGetAllOrderEntity
}) => {
    const [open, setOpen] = useState(isOpenModal);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        content: "",
    });
    //logic
    const onFinish = async () => {
        if (loading) return;
        console.log(formData);
        if (!formData.title || !formData.content) {
            toast.error("Các trường không được để trống");
            return;
        }
        setLoading(true)
        if (Object.keys(dataUpdate)?.length) {
            const res = await updateOrderEntity(dataUpdate?._id, formData);
            if (res.success) {
                handleGetAllOrderEntity()
                toast.success(`Cập nhập thành công`);
                setFormData({
                    title: "",
                    content: "",
                })
            }
        } else {
            const res = await createOrderEntity(formData);
            if (res.success) {
                handleGetAllOrderEntity()
                toast.success(`Tạo thành công`);
                setFormData({
                    title: "",
                    content: "",
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

    useEffect(() => {
        setFormData({
            title: dataUpdate?.title,
            content: dataUpdate?.content,
        })
    }, [dataUpdate])

    useEffect(() => {
        setOpen(isOpenModal);
    }, [isOpenModal]);
    return (
        <>
            <Modal
                className="modal-dialog-centered"
                isOpen={open}
                toggle={() => handleCancelModal(false)}
                style={{ maxWidth: 700 }}
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
                                defaultValue={dataUpdate?.title}
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
                                htmlFor="content"
                            >
                                Nội dung
                            </label>
                            <Input
                                defaultValue={dataUpdate?.content}
                                id="content"
                                name="content"
                                type="textarea"
                                value={formData.content}
                                style={{ height: 100 }}
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
                        {loading ? <Spinner /> : title}
                    </Button>
                </div>
            </Modal>
        </>
    );
};

export default ModalOrderEntity;