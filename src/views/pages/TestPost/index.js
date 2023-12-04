import { useDebounce } from "hooks/useDebounce";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import SimpleHeader from "components/Headers/SimpleHeader.js";
import "./styles.scss";
import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Col,
  Container,
  Form,
  Input,
  Label,
  PaginationItem,
  PaginationLink,
  Row,
  Table,
  UncontrolledTooltip,
} from "reactstrap";
import LoadingSpin from "react-loading-spin";
import { getPagingPost } from "api/post";
import Select2 from "react-select2-wrapper";
import DetailPost from "./DetailPost";
import { EnterHelper } from "utils/EnterHelper";
import { CalculateTime } from "function/calculateTime";
import moment from "moment";
import { Pagination } from "antd";
import { removeTagHtml } from "function/removeTagHtml";

const Filter = ({ options, setStatus, status, isOrder, setIsOrder, optionsOrders, startDate, endDate, handleGetPagingPost }) => {
  return (
    <>
      <Row>
        <Col className="col-3">
          <Label>Trạng thái</Label>
          <Select2
            className="form-control"
            options={{
              placeholder: "Select",
            }}
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
            }}
            data={options.map((item) => {
              return {
                id: item.value,
                text: item.title,
              };
            })}
          />
        </Col>
        <Col className="col-2">
          <Label>Loại bài</Label>
          <Select2
            className="form-control"
            defaultValue={isOrder}
            options={{
              placeholder: isOrder === "" ? "Tất cả" : isOrder,
            }}
            data={optionsOrders}
            onChange={(e) =>
              setIsOrder(e.target.value === "all" ? "" : e.target.value)
            }
          />
        </Col>
        <Col>
          <Label>Lọc theo thời gian nộp bài</Label>
          <Form className="custom" style={{ display: 'flex', gap: 5 }}>
            {console.log(startDate.current)}
            <Input type="date" style={{ width: 300 }} defaultValue={startDate.current} onChange={(e) => startDate.current = e.target.value} />
            <Input type="date" style={{ width: 300 }} defaultValue={endDate.current} onChange={(e) => endDate.current = e.target.value} />
            <Button style={{ whiteSpace: 'nowrap' }} onClick={handleGetPagingPost} title="Tìm kiếm">Tìm kiếm</Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};
//
//
const TestPost = () => {
  const [loading, setLoading] = useState(false);
  const [dataPostsList, setDataPostsList] = useState([]);
  const [totalPages, setTotalPages] = useState(5);
  const [isFilter, setIsFilter] = useState(true);
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("all");
  const keywordDebouce = useDebounce(keyword, 500);
  const [isOrder, setIsOrder] = useState("");
  const startDate = useRef(moment().subtract(7, 'days').format("YYYY-MM-DD"));
  const endDate = useRef(moment().format("YYYY-MM-DD"));
  const [totalItem, setTotalItem] = useState(0);
  //
  const handleSearchDate = () => {

  }
  const refresh = () => {
    handleGetPagingPost();
  };
  //
  const handleGetPagingPost = async () => {
    try {
      setLoading(true);
      const res = await getPagingPost(
        pageSize,
        pageIndex,
        keywordDebouce,
        status === "all"? "": status,
        isOrder,
        startDate.current,
        endDate.current,
      );
      setDataPostsList(res?.data);
      setTotalPages(res?.totalPages);
      setTotalItem(res?.totalItem)
    } catch (error) {
      console.log("error:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    handleGetPagingPost();
  }, [pageSize, pageIndex, status, isOrder]);

  const onShowSizeChange = (current, pageSize) => {
    setPageIndex(current);
    setPageSize(pageSize);
  };

  const statusOptions = [
    {
      title: "Tất cả",
      value: "all",
      color: "red",
    },
    {
      title: "Duyệt",
      value: 2,
      color: "green",
    },
    {
      title: "Chờ duyệt",
      value: 1,
      color: "blue",
    },
    {
      title: "Không duyệt",
      value: -2,
      color: "red",
    },
    // {
    //   title: "Hết hạn",
    //   value: -1,
    //   color: "red",
    // },
    {
      title: "Đang thực hiện",
      value: 0,
      color: "green",
    },
  ];

  const optionsOrders = [
    { id: "all", text: "Tất cả" },
    { id: "false", text: "Bài viết content" },
    { id: "true", text: "Bài viết entity" },
  ]
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
            setStatus={setStatus}
            status={status}
            options={statusOptions}
            isOrder={isOrder}
            setIsOrder={setIsOrder}
            optionsOrders={optionsOrders}
            startDate={startDate}
            endDate={endDate}
            handleGetPagingPost={handleGetPagingPost}
          />
        }
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
                {dataPostsList?.length > 0 ? (
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
                            Chuyên mục
                          </th>
                          <th className="sort" scope="col">
                            Từ khóa
                          </th>
                          <th className="sort" scope="col">
                            Người viết
                          </th>
                          <th className="sort" scope="col">
                            Tổng thời gian làm bài
                          </th>
                          <th className="sort" scope="col">
                            Thời gian nộp bài
                          </th>
                          <th className="sort" scope="col">
                            Người duyệt
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
                        {dataPostsList?.map((item) => (
                          <tr key={item._id}>
                            <th scope="row">{item?.title}</th>
                            <td className="budget">
                                {item?.description?.length > 50
                                  ? `${removeTagHtml(item?.description).slice(0, 50)}...`
                                  : removeTagHtml(item?.description)}
                            </td>
                            <td>{item?.category}</td>
                            <td>{item?.keywords?.map((item1) => item1)}</td>
                            <td>{item.receive?.user?.username}</td>
                            <td align="center">{CalculateTime(item.receive?.receiveTime, item.receive?.finishTime)}</td>
                            <td>{moment(item.receive?.finishTime).format('HH:mm:ss, DD-MM-YYYY')}</td>
                            <td>{item.censor?.user?.username}</td>
                            <th>
                              <div
                                style={{
                                  color: statusOptions.find(
                                    (itemS) => itemS.value === item?.status
                                  )?.color,
                                }}
                              >
                                {
                                  statusOptions.find(
                                    (itemS) => itemS.value === item?.status
                                  )?.title
                                }
                              </div>
                            </th>

                            <td className="table-actions">
                              <DetailPost id={item._id} refresh={refresh} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    <CardFooter className="py-4">
                      <nav aria-label="...">
                        <Pagination
                          showSizeChanger
                          style={{ textAlign: "right" }}
                          defaultCurrent={pageIndex}
                          onChange={onShowSizeChange}
                          total={totalItem}
                        />
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
      {/* Detailt post */}
    </>
  );
};
export default TestPost;