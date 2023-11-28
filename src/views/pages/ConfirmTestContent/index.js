import { getAllCategoriesList } from "api/category";
import { receiveRandomPost } from "api/post";
import SimpleHeader from "components/Headers/SimpleHeader.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Card, CardBody, Col, Container, FormGroup, Input, Label, Row } from "reactstrap";
function ConfirmTestContent() {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();
  const [valueCategory, setValueCategory] = useState("");


  const handleClick  = async () => {
    if(!valueCategory){
      toast.warning("Vui lòng chọn chuyên mục để làm bài")
      return;
    }
    const res = await receiveRandomPost(valueCategory);
    if(res.success){
      toast.success(res.message)
      navigate(`/admin/my-test/${res?.newPost?._id}`);
      localStorage.removeItem("content")
      localStorage.removeItem("title")
    }else {
      toast.warning(res.message)
    }
  }
  useEffect(() => {
     (async () => {
      const res = await getAllCategoriesList();
      setCategory(res.data)
    })()
  },[])
  return (
    <>
      <SimpleHeader
        name="Information"
      />
      <div className="main-wite-post my-3">
        <Container fluid>
          <Row>
            <Card className="card-frame" style={{ width: "100%" }}>
              <CardBody>
                {step == 1 && <div>
                  <Label><strong>JD CTV CONTENT</strong></Label>
                  <div>
                    <strong>CTV Content tại OKVIP cần đáp ứng được các tiêu chí sau:</strong> <br/>
                    - Có kiến thức và khả năng viết bài content chuẩn SEO <br/>
                    - Có tinh thần, trách nhiệm cao <br/>
                    - Hoàn thành bài viết đúng deadline <br/>
                    - Phản hồi tin nhắn công việc đúng thời hạn <br/>
                  </div>
            
                  <Label style={{marginTop: 10}}><strong>QUY ĐỊNH BÀI TEST</strong></Label>
                  <div>
                    1. User nhận và viết bài trên website của chúng tôi <br/>
                    2. User có 5 phút chuẩn bị và 120 phút để hoàn thành bài viết 1000 chữ <br/>
                    3. Kết quả bài test được trả sau 3 - 5 ngày qua phần thông báo <br/>
                    4. Mỗi chuyên mục bạn chỉ được làm bài test 1 lần <br/>
                    5. Chúc các bạn thành công! <br/>
                  </div>
                </div>}
                {step == 2 &&
                
                <FormGroup>
                  <Label for="type">Chọn chuyên mục viết bài</Label>
                  {category.length > 0 && (
                    <Input
                      type="select"
                      name="category"
                      id="category"
                      value={valueCategory}
                      onChange={(e)=> setValueCategory(e.target.value)}
                    >
                      <option value="">Chọn</option>
                      {category.map((item, i) => (
                        <option key={i} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                    </Input>
                  )}
                </FormGroup>
                }
              </CardBody>
            </Card>
          </Row>
          <Row className="mt-4">
            <Col>
            {step == 1 && 
              <Button
                type="primary"
                color="primary"
                onClick={() => setStep(2)}
              >
                Tiến hành Chọn chuyên mục
              </Button>
            }
            {step == 2 && 
              <Button
                type="primary"
                color="primary"
                onClick={() => handleClick()}
              >
                Tiến hành làm bài
              </Button>
            }
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default ConfirmTestContent;
