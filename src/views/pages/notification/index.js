import React, { useEffect, useState } from "react";
import SimpleHeader from "components/Headers/SimpleHeader.js";
import {
  Button,
  Card,
  CardHeader,
  Col,
  Container,
  Popover,
  PopoverBody,
  PopoverHeader,
  Row,
  Table,
} from "reactstrap";
import { BsTrashFill } from "react-icons/bs";
import { getAllNotification } from "api/notification";
import SendNotification from "./sendNotification";
import { deleteNotificationById } from "api/notification";
import { toast } from "react-toastify";
export default function Notification() {
  const [loading, setLoading] = useState(false);
  const [dataNotification, setDataNotification] = useState();
  const [title, setTitle] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const handleDelete = (id) => {
    // Gọi hàm onDelete khi người dùng xác nhận xóa
    fetchApideleteNotificationById(id);
    setIsOpen(false);
  };

  const fetchApideleteNotificationById = async (id) => {
    try {
      setLoading(true);
      const res = await deleteNotificationById(id);
      if (res?.success) {
        toast.success(`Xóa thành công`);
      } else {
        toast.error(`Lỗi xóa thông báo! Vui lòng thử lại.`);
      }
      fetchApiGetAllNotification();
    } catch (error) {
      console.log("error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchApiGetAllNotification = async () => {
    try {
      setLoading(true);
      const res = await getAllNotification();
      setDataNotification(res);
    } catch (error) {
      console.log("error:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchApiGetAllNotification();
  }, []);

  const handleSendNotification = () => {
    setTitle("Gửi thông báo");
    setIsOpenModal(true);
  };
  const handleCancelModal = () => {
    setIsOpenModal(false);
    fetchApiGetAllNotification();
  };

  return (
    <>
      <SimpleHeader name="Thông báo" parentName="Quản lí thông báo" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardHeader className="border-0">
                <Row>
                  <Col className="col-6">
                    <h3 className="mb-0 w-auto">Danh sách thông báo</h3>
                  </Col>
                  <Col className="text-right col-6 px-0">
                    <Button onClick={handleSendNotification}>
                      Gửi thông báo
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <div style={{ display: loading ? "none" : "block" }}>
                <>
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th className="sort" scope="col">
                          Tên thông báo
                        </th>
                        <th className="sort" scope="col">
                          Nội dung
                        </th>
                        <th className="sort" scope="col">
                          Trạng thái
                        </th>
                        <th className="sort" scope="col">
                          Hành động
                        </th>
                      </tr>
                    </thead>
                    {dataNotification?.length > 0 && (
                      <tbody className="list">
                        <>
                          {dataNotification?.map((item, k) => (
                            <tr key={k}>
                              <td>{item.title}</td>
                              <td>{item.message}</td>
                              <td>
                                {item.type === true ? "public" : "private"}
                              </td>
                              <td className="table-actions">
                                <Button id="deletePopover" onClick={toggle}>
                                  <BsTrashFill className="text-warning" />
                                </Button>
                                <Popover
                                  placement="auto"
                                  placementPrefix="center"
                                  isOpen={isOpen}
                                  target="deletePopover"
                                  toggle={toggle}
                                >
                                  <PopoverHeader>
                                    Bạn có chắc chắn muốn xóa?
                                  </PopoverHeader>
                                  <PopoverBody>
                                    <Button
                                      color="danger"
                                      onClick={() => handleDelete(item?._id)}
                                    >
                                      Xác nhận
                                    </Button>
                                  </PopoverBody>
                                </Popover>
                              </td>
                            </tr>
                          ))}
                        </>
                      </tbody>
                    )}
                  </Table>
                </>
              </div>
            </Card>
          </div>
        </Row>
      </Container>
      <SendNotification
        title={title}
        isOpenModal={isOpenModal}
        handleCancelModal={() => handleCancelModal()}
      />
    </>
  );
}
