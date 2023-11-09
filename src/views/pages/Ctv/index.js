import React, { useEffect, useState } from "react";
import SimpleHeader from "components/Headers/SimpleHeader.js";
import {
  Card,
  CardFooter,
  CardHeader,
  Col,
  Container,
  Input,
  Label,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table,
  UncontrolledTooltip,
} from "reactstrap";
import { useDebounce } from "hooks/useDebounce";
import LoadingSpin from "react-loading-spin";
import { getPagingCtv } from "api/user";
import { BsPencil } from "react-icons/bs";
import UpdateCTV from "./Update";

const Filter = ({ keyword, setKeyword }) => {
  return (
    <>
      <Row>
        <Col className="col-3">
          <Label>Tên tài khoản</Label>
          <Input
            placeholder="Tìm kiếm theo tên tài khoản..."
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
          />
        </Col>
      </Row>
    </>
  );
};
//
const renderPaginationItemDivs = (totalPages, pageIndex, setPageIndex) => {
  const divs = [];
  for (let i = 1; i <= totalPages; i++) {
    divs.push(
      <PaginationItem className={pageIndex === i && "active"}>
        <PaginationLink
          href="#pablo"
          onClick={(e) => {
            e.preventDefault();
            setPageIndex(i);
          }}
        >
          {i} <span className="sr-only">(current)</span>
        </PaginationLink>
      </PaginationItem>
    );
  }
  return divs;
};
const options = {
  0: "Chưa duyệt",
  1: "Đã duyệt",
};
const Ctv = () => {
  const [loading, setLoading] = useState(false);
  const [dataCtvList, setDataCtvList] = useState([]);
  const [totalPages, setTotalPages] = useState(5);
  const [isFilter, setIsFilter] = useState(true);
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(1);
  const [keyword, setKeyword] = useState("");
  const keywordDebouce = useDebounce(keyword, 500);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [ctvDataDetail, steCtvDataDetail] = useState({});
  //
  const handleCloseModal = () => {
    setIsOpenUpdateModal(false);
  };
  //
  const handleUpdateSuccess = () => {
    handleGetPagingCtv();
  };
  //
  const handleGetPagingCtv = async () => {
    try {
      setLoading(true);
      const res = await getPagingCtv(pageSize, pageIndex, keywordDebouce);
      setDataCtvList(res?.data);
      setTotalPages(res?.totalPages);
    } catch (error) {
      console.log("error:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    handleGetPagingCtv();
  }, [pageSize, pageIndex, keywordDebouce]);
  return (
    <>
      <SimpleHeader
        name="Bài viết"
        parentName="Quản lí bài viết"
        // isFilter
        // isNew
        setIsFilter={() => setIsFilter(!isFilter)}
        filter={isFilter}
        props={
          <Filter
            keyword={keyword}
            // options={options}
            setKeyword={setKeyword}
            // setStatus={setStatus}
            // status={status}
          />
        }
      />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardHeader className="border-0">
                <h3 className="mb-0">Danh sách cộng tác viên</h3>
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
                {dataCtvList?.length ? (
                  <>
                    <Table
                      className="align-items-center table-flush"
                      responsive
                    >
                      <thead className="thead-light">
                        <tr>
                          <th className="sort" scope="col">
                            Tên tài khoản
                          </th>
                          <th className="sort" scope="col">
                            Họ tên
                          </th>
                          <th className="sort" scope="col">
                            Email
                          </th>
                          <th className="sort" scope="col">
                            Số bài duyệt
                          </th>
                          <th className="sort" scope="col">
                            Chuyên mục
                          </th>
                          <th className="sort" scope="col">
                            Trạng thái
                          </th>
                          <th className="sort" scope="col">
                            Hành động
                          </th>
                        </tr>
                      </thead>
                      {/* dữ liệu */}
                      <tbody className="list">
                        {dataCtvList?.map((item, k) => (
                          <tr key={k}>
                            <th scope="row">{item?.username}</th>
                            <td className="budget">
                              {item?.firstName} {item?.lastName}
                            </td>
                            <td>{item?.email} </td>
                            <td>{item?.acceptPost}</td>
                            <td>Đá gà</td>
                            <td>{options[item?.status]}</td>
                            <td className="table-actions">
                              <a
                                className="table-action"
                                href="#pablo"
                                id="tooltip564981685"
                                onClick={(e) => {
                                  e.preventDefault();

                                  steCtvDataDetail(item);
                                  setIsOpenUpdateModal(true);
                                }}
                              >
                                <BsPencil />
                              </a>
                              <UncontrolledTooltip
                                delay={0}
                                target="tooltip564981685"
                              >
                                Chỉnh sửa
                              </UncontrolledTooltip>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    <CardFooter className="py-4">
                      <nav aria-label="...">
                        <Pagination
                          className="pagination justify-content-end mb-0"
                          listClassName="justify-content-end mb-0"
                        >
                          <PaginationItem
                            className={pageIndex == "1" && "disabled"}
                          >
                            <PaginationLink
                              href="#pablo"
                              onClick={(e) => {
                                e.preventDefault();
                                setPageIndex(pageIndex - 1);
                              }}
                              tabIndex="-1"
                            >
                              <i className="fas fa-angle-left" />
                              <span className="sr-only">Previous</span>
                            </PaginationLink>
                          </PaginationItem>
                          {renderPaginationItemDivs(
                            totalPages,
                            pageIndex,
                            setPageIndex
                          )}

                          <PaginationItem
                            className={pageIndex == totalPages && "disabled"}
                          >
                            <PaginationLink
                              href="#pablo"
                              onClick={(e) => {
                                e.preventDefault();
                                setPageIndex(pageIndex + 1);
                              }}
                              tabIndex="1"
                            >
                              <i className="fas fa-angle-right" />
                              <span className="sr-only">Next</span>
                            </PaginationLink>
                          </PaginationItem>
                        </Pagination>
                      </nav>
                    </CardFooter>
                  </>
                ) : (
                  <p className="text-center">Không có dữ liệu</p>
                )}
              </div>
            </Card>
          </div>
        </Row>
      </Container>
      {/* Modal update */}
      <UpdateCTV
        ctvDataDetail={ctvDataDetail}
        isOpenUpdateModal={isOpenUpdateModal}
        handleCloseModal={handleCloseModal}
        handleUpdateSuccess={handleUpdateSuccess}
      />
    </>
  );
};
export default Ctv;
