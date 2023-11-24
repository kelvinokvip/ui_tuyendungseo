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
          <p>1. User vui lòng đọc kỹ hướng dẫn và yêu cầu bài test, sau khi sẵn sàng hãy bấm đăng ký làm test entity.</p>
          <p>2. User có 5 phút chuẩn bị, đọc yêu cầu và bắt đầu tiến hành tạo 10 link social (random link từ 4 nhóm)</p>
          <p>3. User phải bấm quay màn hình trong toàn bộ quá trình làm test. Sau khi hoàn thành, user cần gửi lại: Link file thành phẩm (mở quyền xem) + link drive có clip quay màn hình</p>
          <p>4. Kết quả bài test được trả sau 2 ngày qua phần thông báo</p>
          <p>5. Mỗi tài khoản chỉ được làm bài test một lần</p>
          <p>Chúc các bạn thành công!</p>
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
            Làm bài test
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
