//react
import React, { useEffect, useRef, useState } from "react";
//alert-bootstrap
import SweetAlert from "react-bootstrap-sweetalert";
//react-router-dom
import { useNavigate } from "react-router-dom";
// react-toast
import { toast } from "react-toastify";
//api
import { getReceivePost } from "api/post";

const ConfirmReceivePost = ({
  isOpenModalReceivePost,
  handleClose,
  idDetailPostData,
}) => {
  const navigate = useNavigate();
  const [isOpenDiv, setIsOpenDiv] = useState(false);
  const onConfirm = async () => {
    const res = await getReceivePost(idDetailPostData);
    if (res?.success) {
      toast.success(res?.message);
      navigate(`/admin/my-test/${res?.newPost?._id}`);
    } else {
      toast.warning(res?.message);
    }
    handleClose();
    setIsOpenDiv(false);
  };
  const onCancel = () => {
    setIsOpenDiv(false);
    handleClose();
  };

  useEffect(() => {
    if (isOpenModalReceivePost) {
      setIsOpenDiv(true);
    }
  }, [isOpenModalReceivePost]);
  return (
    <>
      {isOpenDiv && (
        <div>
          <SweetAlert
            title="Bạn có chắc chắn nhận bài viết này?"
            onConfirm={onConfirm}
            onCancel={onCancel}
            showCancel
            confirmBtnBsStyle="primary"
            confirmBtnText="Nhận"
            cancelBtnBsStyle="danger"
            cancelBtnText="Hủy bỏ"
            reverseButtons={true}
          />
        </div>
      )}
    </>
  );
};
export default ConfirmReceivePost;
