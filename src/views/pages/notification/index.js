import React, { useEffect, useState } from "react";
import SimpleHeader from "components/Headers/SimpleHeader.js";
import {
  Button,
  Card,
  CardHeader,
  Col,
  Container,
  Row,
  Table,
  CardFooter,
} from "reactstrap";
import ReactPaginate from "react-paginate";
import { Modal } from 'antd';
import { BsTrashFill } from "react-icons/bs";
import { getAllNotification, deleteNotificationById } from "api/notification";
import SendNotification from "./sendNotification";
import { toast } from "react-toastify";
import { getAllCTV } from "api/user";

export default function Notification() {
  const [loading, setLoading] = useState(false);
  const [dataNotification, setDataNotification] = useState([]);
  const [title, setTitle] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(1);
  const [totalItem, setTotalItem] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [dataCTV, setDataCTV] = useState([]);
  const handleDelete = () => {
    if(isOpen){
      fetchApideleteNotificationById(isOpen);
      setIsOpen(false);
    }
    // Gọi hàm onDelete khi người dùng xác nhận xóa
  
  };
  const fetchApiGetAllCTV = async () => {
    try {
      setLoading(true);
      const res = await getAllCTV();
      setDataCTV(res?.data);
    } catch (error) {
      console.log("error:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchApiGetAllCTV();
  }, []);
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
      const res = await getAllNotification(pageSize, pageIndex);
      setDataNotification(res?.data);
      setTotalItem(res?.totalItem);
      setTotalPage(res?.totalPage);
      setLoading(false);
    } catch (error) {
      console.log("error:", error);
    }
  };
  useEffect(() => {
    fetchApiGetAllNotification();
  }, [pageSize, pageIndex]);

  const handleSendNotification = () => {
    setTitle("Gửi thông báo");
    setIsOpenModal(true);
  };
  const handleCancelModal = () => {
    setIsOpenModal(false);
    fetchApiGetAllNotification();
  };

  const handlePageChange = (e) => {
    setPageIndex(e.selected + 1);
  };

  const renderUsers = (users) => {
    const names = []
    users.forEach(user => {
      const item = dataCTV.find(i => i.id == user.id);
      if(item) names.push(item.username);
    })
    return names.join(', ');
  }

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
              <div>
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
                        {/* <th className="sort" scope="col">
                          Trạng thái
                        </th> */}
                        <th className="sort" scope="col">
                          Người nhận
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
                            <tr key={item._id}>
                              <td style={{whiteSpace: "wrap"}}>{item.title}</td>
                              <td style={{whiteSpace: "wrap"}} dangerouslySetInnerHTML={{__html: item.message}}></td>
                              <td>
                                {item.type == 1 ? "all user" : item.type == 2?renderUsers(item.users): `Chuyên mục ${item.category}`}
                              </td>
                              <td className="table-actions">
                                <Button onClick={() => setIsOpen(item._id)}>
                                  <BsTrashFill className="text-warning" />
                                </Button>
            
                              </td>
                            </tr>
                          ))}
                        </>
                      </tbody>
                    )}
                  </Table>
                  <Modal title="Basic Modal" open={isOpen} onOk={handleDelete} onCancel={()=> setIsOpen(false)}>
                    <p>Bạn có chắc chắn muốn xóa?</p>
                  </Modal>
                  <CardFooter className="py-4">
                    <ReactPaginate
                      className="react-paginate"
                      breakLabel="..."
                      nextLabel="next >"
                      onPageChange={handlePageChange}
                      pageRangeDisplayed={1}
                      pageCount={totalPage}
                      previousLabel="< previous"
                      renderOnZeroPageCount={null}
                    />
                  </CardFooter>
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
        dataCTV={dataCTV}
      />
    </>
  );
}
