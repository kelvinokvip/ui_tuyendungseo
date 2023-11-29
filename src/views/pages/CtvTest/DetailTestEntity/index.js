import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Row, Col } from "reactstrap";

const DetailTestEntity = ({
    isOpenDetailPost,
    handleCloseModalDetailPost,
}) => {
    const navigate = useNavigate();
    const handleClickOke = () => {
        navigate(`/admin/my-test-entity`);
    };
    return (
        <>
            <Modal
                size="lg"
                fullscreen="true"
                className="modal-dialog-centered"
                isOpen={isOpenDetailPost}
                toggle={() => handleCloseModalDetailPost()}
            >
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                        Bài test entity tham khảo
                    </h5>
                    <button
                        aria-label="Close"
                        className="close"
                        data-dismiss="modal"
                        type="button"
                        onClick={() => handleCloseModalDetailPost()}
                    >
                        <span aria-hidden={true}>×</span>
                    </button>
                </div>
                <div className="modal-body">
                    <Row>
                        <Col xs="12" className="d-block ">
                            <p className="mb-0">Yêu cầu:</p>
                            <p className="mb-0">1. Yêu cầu toàn bộ link social cần được điền đầy đủ thông tin và stacking cẩn thận.</p>
                            <p className="mb-0">2. Toàn bộ username phải giống hoặc gần giống với domain.</p>
                            <p className="mb-0">3. Mật khẩu bao gồm 12 kí tự, có chữ in hoa, chữ thường, số và thêm kí tự đặc biệt như @). Tuyệt đối không được trùng với username.</p>
                            <p className="mb-0">4. Độ tuổi: Bắt buộc trên 18 tuổi</p>
                            <p className="mb-0">5. Avatar: Yêu cầu đúng kích thước vuông 1:1. Trước khi làm tạo ra 3 kích thước từ hình gốc. 80x80; 500x500, 1500x1500.</p>
                            <p className="mb-0">6. Banner: Yêu cầu đúng kích thước 3:1, kích thước tối ưu 1200x400.</p>
                            <p className="mb-0">7. Hashtag: Trung bình khoảng (3 =&gt; 5 hastag, ko có hastag tiếng việt)</p>
                            <p className="mb-0">8. Gắn hyperlink website, từ khóa chính, social</p>
                            <p className="mb-0">9. Phải tạo đủ các link social để gắn bio trong ngày, sau đó mới tiến hành gắn link</p>
                        </Col>
                        {/* <Col xs="12">
                            <p style={{ overflow: "auto" }}>
                                <span>Link entity: </span>
                                <span className="font-weight-bold">slides.com, speakerdeck.com, audiomack.com</span>
                            </p>
                        </Col> */}
                    </Row>
                </div>
                <div className="modal-footer">
                    <Button
                        color="primary"
                        data-dismiss="modal"
                        type="button"
                        onClick={() => handleClickOke()}
                    >
                        Nhận bài viết
                    </Button>
                    <Button
                        color="secondary"
                        data-dismiss="modal"
                        type="button"
                        onClick={() => handleCloseModalDetailPost()}
                    >
                        Đóng
                    </Button>
                </div>
            </Modal>
        </>
    );
};

export default DetailTestEntity;
