/*!

=========================================================
* Argon Dashboard PRO React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
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
} from "reactstrap";
// react plugin used to create DropdownMenu for selecting items
import Select2 from "react-select2-wrapper";
// reactstrap components

// core components
import SimpleHeader from "components/Headers/SimpleHeader.js";
import "./styles.scss";
import { getAllCategoriesList } from "api/category";
import { getRandomPostsList } from "api/post";
import LoadingSpin from "react-loading-spin";
import DetailPost from "./DetailPost";

function CtvTest() {
  const [loading, setLoading] = useState(true);
  const [keywordSearch, setKeywordSearch] = useState("");
  const [options, setOptions] = useState([{ id: "all", text: "Tổng hợp" }]);
  const [dataPostsList, setDataPostsList] = useState([]);
  const [isFilter, setIsFilter] = useState(true);
  //handle event open detail post
  const [isOpenDetailPost, setIsOpenDetailPost] = useState(false);
  const [detailPostData, setDetailPostData] = useState({});
  //
  const handleGetAllCategoriesList = async () => {
    const res = await getAllCategoriesList();
    if (res?.success) {
      const option = res?.data?.map((item) => {
        return { id: item?.name, text: item?.name };
      });
      setOptions(options.concat(option));
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
                                  <i class="fa-sharp fa-solid fa-eye"></i>
                                </a>
                                <UncontrolledTooltip
                                  delay={0}
                                  target="tooltip564981685"
                                >
                                  Xem chi tiết
                                </UncontrolledTooltip>
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

export default CtvTest;
