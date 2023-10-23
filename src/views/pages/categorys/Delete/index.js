import { removeCategory } from "api/category";
import React, { useEffect, useState } from "react";
// reactstrap components
import { Button, Modal } from "reactstrap";

function DeleteCategoryModal({
  isOpenModalDelete,
  dataUpdate,
  handleAddCateSuccess,
  handleCancelModal,
}) {
  const [id, setId] = useState(dataUpdate?.id);
  const [name, setName] = useState(dataUpdate?.name);
  const onFinish = async () => {
    const res = await removeCategory(id);
    handleAddCateSuccess();
    handleCancelModal(false);
    // setOpen(false);
  };
  useEffect(() => {
    setId(dataUpdate?.id);
    setName(dataUpdate?.name);
  }, [isOpenModalDelete]);
  return (
    <>
      <Modal
        className="modal-dialog-centered"
        isOpen={isOpenModalDelete}
        toggle={() => handleCancelModal(false)}
      >
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            Xóa danh mục
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
          <h5>
            Bạn có chắc muốn xóa <strong>{name}</strong>
          </h5>
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
            Xóa
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default DeleteCategoryModal;
