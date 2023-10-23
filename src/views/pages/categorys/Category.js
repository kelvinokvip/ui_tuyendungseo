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
//api
import { getCategoryList } from "api/category";

//react-icon
import { BsPencil } from "react-icons/bs";
import { RiDeleteBin7Line } from "react-icons/ri";
//loading
import LoadingSpin from "react-loading-spin";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardFooter,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
  Col,
  Nav,
  NavItem,
} from "reactstrap";
// core components
import SimpleHeader from "components/Headers/SimpleHeader.js";
import UpdateCategory from "./CreateAndUpdate";
import DeleteCategoryModal from "./Delete";
import { Spin } from "antd";
import { motion } from "framer-motion";
function Category() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(1);
  const [totalPages, setTotalPages] = useState(5);
  const [title, setTitle] = useState("");
  const [dataUpdate, setDataUpdate] = useState({});
  const [loading, setLoading] = useState(true);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const handleGetCategoryList = async () => {
    setLoading(true);
    const res = await getCategoryList(pageSize, pageIndex);
    if (res?.success) {
      setLoading(false);
    }
    setCategoryData(res?.data);
    setTotalPages(res?.totalPages);
  };
  const renderPaginationItemDivs = () => {
    const divs = [];
    for (let i = 1; i <= totalPages; i++) {
      divs.push(
        <PaginationItem className={pageIndex == i && "active"}>
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
  const handleAddCateSuccess = () => {
    setPageIndex(1);
    handleGetCategoryList();
  };
  //add category
  const handleAddCategory = () => {
    setTitle("Thêm mới");
    setIsOpenModal(true);
    setDataUpdate({});
  };
  const handleCancelModal = () => {
    setIsOpenModal(false);
    setIsOpenModalDelete(false);
  };

  useEffect(() => {
    handleGetCategoryList();
  }, [pageSize, pageIndex]);
  return (
    <>
      <SimpleHeader name="Chuyên mục" parentName="Quản lý chuyên mục" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.3 } }}
        exit={{ opacity: 0, y: 1000, transition: { duration: 0.3 } }}
      >
        <Container className="mt--6" fluid>
          <Row>
            <div className="col">
              <Card>
                <CardHeader className="border-0">
                  <Row>
                    <Col className="col-6">
                      <h3 className="mb-0 w-auto">Quản lý chuyên mục</h3>
                    </Col>
                    <Col className="text-right col-6 px-0">
                      <Button onClick={handleAddCategory}>Thêm mới</Button>
                    </Col>
                  </Row>
                </CardHeader>
                {totalPages ? (
                  <>
                    <Spin spinning={loading}>
                      <Table
                        className="align-items-center table-flush"
                        responsive
                      >
                        <thead className="thead-light">
                          <tr>
                            <th className="sort" scope="col">
                              Tên
                            </th>
                            <th className="sort" scope="col">
                              Mô tả
                            </th>

                            <th className="sort text-right" scope="col">
                              Hành động
                            </th>
                          </tr>
                        </thead>
                        {/* dữ liệu */}
                        <tbody className="list">
                          {categoryData?.map((item, index) => {
                            return (
                              <>
                                <motion.tr
                                  initial={{ x: 2000, opacity: 0 }}
                                  animate={{
                                    opacity: 1,
                                    x: 0,
                                    // transition: {
                                    //   duration: 0.1 * index,
                                    //   type: "spring",
                                    // },
                                  }}
                                  key={index}
                                >
                                  <th scope="row">
                                    <Media className="align-items-center">
                                      <Media>
                                        <span className="name mb-0 text-sm">
                                          {item?.name}
                                        </span>
                                      </Media>
                                    </Media>
                                  </th>
                                  <td className="budget">
                                    {item?.description}
                                  </td>

                                  <td className="text-right">
                                    <Nav className="justify-content-end">
                                      <NavItem
                                        className="mr-3 cursor-pointer"
                                        role="button"
                                        onClick={() => {
                                          setDataUpdate({
                                            id: item?._id,
                                            name: item?.name,
                                            description: item?.description,
                                          });
                                          setTitle("Cập nhật");
                                          setIsOpenModal(true);
                                        }}
                                      >
                                        <BsPencil />
                                      </NavItem>
                                      <NavItem role="button">
                                        <RiDeleteBin7Line
                                          size={20}
                                          onClick={() => {
                                            setIsOpenModalDelete(true);
                                            setDataUpdate({
                                              id: item?._id,
                                              name: item?.name,
                                              description: item?.description,
                                            });
                                          }}
                                        />
                                      </NavItem>
                                    </Nav>
                                  </td>
                                </motion.tr>
                              </>
                            );
                          })}
                        </tbody>
                      </Table>
                    </Spin>

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
                          {renderPaginationItemDivs()}

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
                  <p className="text-center">Chưa có dữ liệu</p>
                )}
              </Card>
            </div>
          </Row>
        </Container>
      </motion.div>
      {/* modal create vs update */}
      <UpdateCategory
        title={title}
        dataUpdate={dataUpdate}
        isOpenModal={isOpenModal}
        handleCancelModal={() => handleCancelModal()}
        handleAddCateSuccess={() => handleAddCateSuccess()}
      />
      {/*  modal delete */}
      <DeleteCategoryModal
        isOpenModalDelete={isOpenModalDelete}
        dataUpdate={dataUpdate}
        handleAddCateSuccess={() => handleAddCateSuccess()}
        handleCancelModal={() => handleCancelModal()}
      />
    </>
  );
}

export default Category;
