import React, { useEffect, useState } from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
  Form,
  Button,
  Popover,
  PopoverHeader,
  PopoverBody,
} from "reactstrap";
// react plugin used to create DropdownMenu for selecting items
import Select2 from "react-select2-wrapper";
// reactstrap components
import { toast } from "react-toastify";
// core components
import SimpleHeader from "components/Headers/SimpleHeader.js";
import { getAllCategoriesList } from "api/category";
import { getRandomPostsList } from "api/post";
import LoadingSpin from "react-loading-spin";
import DetailPost from "../CtvTest/DetailPost";
import { BsTrashFill } from "react-icons/bs";
import { deletePostById } from "api/post";

export default function Posts() {
  const [loading, setLoading] = useState(true);
  const [keywordSearch, setKeywordSearch] = useState("");
  const [options, setOptions] = useState([{ id: "all", text: "Tổng hợp" }]);
  const [dataPostsList, setDataPostsList] = useState([]);
  const [isFilter, setIsFilter] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const handleDelete = (id) => {
    // Gọi hàm onDelete khi người dùng xác nhận xóa
    fetchApideletePostById(id);
    setIsOpen(false);
  };

  //handle event open detail post
  const [isOpenDetailPost, setIsOpenDetailPost] = useState(false);
  const [detailPostData, setDetailPostData] = useState({});
  const handleGetAllCategoriesList = async () => {
    const res = await getAllCategoriesList();
    if (res?.success) {
      const option = res?.data?.map((item) => {
        return { id: item?.name, text: item?.name };
      });
      setOptions(options.concat(option));
    }
  };

  const fetchApideletePostById = async (id) => {
    try {
      setLoading(true);
      const res = await deletePostById(id);
      if (res?.success) {
        toast.success(`Xóa thành công`);
      } else {
        toast.error(`Lỗi xóa thông báo! Vui lòng thử lại.`);
      }
      handleGetAllCategoriesList();
    } catch (error) {
      console.log("error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGetRandomPostsList = async () => {
    const res = await getRandomPostsList(keywordSearch);
    setDataPostsList(res);
    setLoading(false);
  };
  //handle about detail post
  const handleCloseModalDetailPost = () => {
    setIsOpenDetailPost(false);
  };
  //
  useEffect(() => {
    handleGetAllCategoriesList();
  }, []);
  useEffect(() => {
    handleGetRandomPostsList();
  }, [keywordSearch]);
  const Filter = () => {
    return (
      <>
        <h5>Danh sách chuyên mục</h5>
        <Form className="custom">
          <Select2
            className="form-control"
            defaultValue={keywordSearch}
            options={{
              placeholder:
                keywordSearch === "all" || keywordSearch === ""
                  ? "Tổng hợp"
                  : keywordSearch,
            }}
            data={options}
            onChange={(e) => setKeywordSearch(e.target.value)}
          />
        </Form>
      </>
    );
  };
  return (
    <>
      <SimpleHeader
        name="Tables"
        parentName="Tables"
        // isFilter
        // isNew
        setIsFilter={() => setIsFilter(!isFilter)}
        filter={isFilter}
        props={<Filter />}
      />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardHeader className="border-0">
                <h3 className="mb-0">Danh sách bài viết</h3>
              </CardHeader>
              <div
                style={{
                  display: loading ? "block" : "none",
                  textAlign: "center",
                }}
              >
                <div className={"ExampleOfUsage "}>
                  <LoadingSpin />
                </div>
              </div>
              <div style={{ display: loading ? "none" : "block" }}>
                {dataPostsList?.length ? (
                  <>
                    <Table
                      className="align-items-center table-flush"
                      responsive
                    >
                      <thead className="thead-light">
                        <tr>
                          <th className="sort" scope="col">
                            Tiêu đề
                          </th>
                          <th className="sort" scope="col">
                            Mô tả
                          </th>
                          <th className="sort" scope="col">
                            Từ khóa
                          </th>
                          <th scope="col">Số từ</th>

                          <th scope="col">Hành động</th>
                        </tr>
                      </thead>
                      {/* dữ liệu */}
                      <tbody className="list">
                        {dataPostsList?.map((item) => (
                          <>
                            <tr>
                              <th scope="row">{item?.require?.title}</th>
                              <td className="budget">
                                {item?.require?.description?.length > 50
                                  ? `${item?.require?.description.slice(
                                      0,
                                      50
                                    )}...`
                                  : item?.require?.description}
                              </td>
                              <td>
                                {item?.require?.keywords?.map((item1) => item1)}
                              </td>
                              <td>{item?.require?.words}</td>

                              <td className="table-actions">
                                <a
                                  className="table-action"
                                  href="#pablo"
                                  id="tooltip564981685"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setIsOpenDetailPost(true);
                                    setDetailPostData({
                                      ...item?.require,
                                      id: item?._id,
                                    });
                                  }}
                                >
                                  <i className="fa-sharp fa-solid fa-eye"></i>
                                </a>
                                <UncontrolledTooltip
                                  delay={0}
                                  target="tooltip564981685"
                                >
                                  Xem chi tiết
                                </UncontrolledTooltip>{" "}
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
                          </>
                        ))}
                      </tbody>
                    </Table>
                  </>
                ) : (
                  <p className="text-center">Không có dữ liệu</p>
                )}
              </div>
            </Card>
          </div>
        </Row>
      </Container>
      <DetailPost
        isOpenDetailPost={isOpenDetailPost}
        detailPostData={detailPostData}
        handleCloseModalDetailPost={handleCloseModalDetailPost}
      />
    </>
  );
}
