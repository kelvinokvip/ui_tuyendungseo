import React, { useState } from "react";
import { Button } from "reactstrap";
import DetailTestEntity from "./DetailTestEntity";

function CtvTestEntity() {
  const [isOpenDetailPost, setIsOpenDetailPost] = useState(false);
  const handleCloseModalDetailPost = () => {
    setIsOpenDetailPost(false);
  };
  return (
    <>
      <div className="test-entity">
        <div className="container-test-entity">
          <div className="container-test-entity-title">
            <strong>User vui lòng đọc kỹ hướng dẫn và yêu cầu bài test trước khi nhấn nút "Bắt đầu làm test". Lưu ý: Mỗi tài khoản CTV chỉ được làm test một lần, nếu chưa sẵn sàng vui lòng trở về trang chủ.</strong>
          </div>
          <div>
            <p>Thông tin cần nắm rõ trước khi làm test: </p>
            <p>1. Bài test yêu cầu user tạo 10 link social (gồm có 4 loại chính: Chèn link cụ thể, chèn link trên bio, dùng thẻ {`<a href="link web">anchor text</a>`}, link rút gọn).</p>
            <p>2. User phải bấm quay màn hình trong toàn bộ quá trình làm test. Sau khi hoàn thành, user cần gửi lại: Link file thành phẩm (mở quyền xem) + link drive có clip quay màn hình.</p>
            <p>3. Kết quả bài test được trả sau 2 ngày qua phần thông báo.</p>
            <p>Chúc các bạn thành công!</p>
          </div>
        </div>
        <div className="sub-test">
          <Button
            color="primary"
            data-dismiss="modal"
            type="button"
            onClick={() => {
              setIsOpenDetailPost(true);
            }}
          >
            Yêu cầu bài test
          </Button>
        </div>
      </div>
      <DetailTestEntity
        isOpenDetailPost={isOpenDetailPost}
        handleCloseModalDetailPost={handleCloseModalDetailPost}
      />
    </>
  );
}

export default CtvTestEntity;
