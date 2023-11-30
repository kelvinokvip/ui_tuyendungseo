import React, { useEffect, useRef, useState } from "react";

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
  Col,
  CardFooter,
  PaginationItem,
  PaginationLink,
  Pagination,
  Input,
} from "reactstrap";
// react plugin used to create DropdownMenu for selecting items
import Select2 from "react-select2-wrapper";
// reactstrap components
import { toast } from "react-toastify";
// core components
import SimpleHeader from "components/Headers/SimpleHeader.js";
import { getAllCategoriesList } from "api/category";
import LoadingSpin from "react-loading-spin";
import DetailPost from "../CtvTest/DetailPost";
import { BsTrashFill } from "react-icons/bs";
import ModalPost from "./ModalPost";
import { getOrderPost } from "api/orderPost";
import { Modal } from "antd";
import { deleteOrderPost } from "api/orderPost";
import { BiSolidEdit } from "react-icons/bi";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"
import { updateOrderPost } from "api/orderPost";
import { sortOrderPost } from "api/orderPost";
import { removeTagHtml } from "function/removeTagHtml";


function getData (arr, totalPage, pageIndex, pageSize = 10) {
  if (pageIndex < 1) {
    return;
  }

  const startIndex = (pageIndex - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalPage * pageSize);

  const currentPageData = arr.slice(startIndex, endIndex);

  return currentPageData;
}
export default function Posts() {
  const [loading, setLoading] = useState(true);
  const [categorySearch, setCategorySearch] = useState("");
  const [options, setOptions] = useState([{ id: "all", text: "Tổng hợp" }]);
  const [dataPostsList, setDataPostsList] = useState([]);
  const [isFilter, setIsFilter] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [title, setTitle] = useState("");
  const [dataUpdate, setDataUpdate] = useState({})
  const [dataSearch, setDataSearch] = useState([]);
  const [totalPage, setTotalPage] = useState([])
  const [pageIndex, setPageIndex] = useState(1);
  //handle event open detail post
  const [isOpenDetailPost, setIsOpenDetailPost] = useState(false);
  const [detailPostData, setDetailPostData] = useState({});
  const search = useRef("")
  const [dataSort, setDataSort] = useState([])
  

  useEffect(() => {
    setTotalPage(Math.ceil(dataPostsList.length / 10))
  },[dataPostsList])

  useEffect(() => {
    handleSearch()
  },[dataPostsList, pageIndex, totalPage, categorySearch])
  
  const handleSearch = () => {
    let data = dataPostsList;
    const s = search.current
    if(s){
      data = data.filter(item => {
        if(item.require.keywords.toString().search(s) !== -1){
          return true;
        }
        if(item.require.title.search(s) !== -1){
          return true;
        }
        if(item.require.category.search(s) !== -1){
          return true;
        }
      })
    }
    if(categorySearch && categorySearch !== "all"){
      data = data.filter(item => item.require.category === categorySearch)
    }
    setDataSearch(getData(data, totalPage, pageIndex, 10))
  }

  const handleDelete = () => {
    if(isOpen){
      fetchApideletePostById(isOpen);
      setIsOpen(false);
    }
  };
  
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
      const res = await deleteOrderPost(id);
      if (res?.success) {
        toast.success(`Xóa thành công`);
      } else {
        toast.error(`Lỗi xóa thông báo! Vui lòng thử lại.`);
      }
      handleGetAllPost()
    } catch (error) {
      console.log("error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGetAllPost = async () => {
    const res = await getOrderPost();
    const sort = res.sort.sort;
    const data = res.data.sort((a, b) => sort.indexOf(a["_id"]) - sort.indexOf(b['_id']));
    setDataSort(sort)
    setDataPostsList(data);
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
    handleGetAllPost();
  }, []);

  const handleCancelModal = () => {
    setIsOpenModal(false);
  };

  const handleAddPost = () => {
    setIsOpenModal(true)
    setTitle("Thêm bài viết order")
    setDataUpdate({})
  }
  const handleEditPost = (item) => {
    setTitle("Sửa bài viết")
    setDataUpdate(item);
    setIsOpenModal(true)
  }
  const Filter = () => {
    return (
      <div style={{display: 'flex', gap: 20}}>
        <div>
          <h5>Danh sách chuyên mục</h5>
          <Form className="custom">
            <Select2
              className="form-control"
              defaultValue={categorySearch}
              options={{
                placeholder:
                  categorySearch === "all" || categorySearch === ""
                    ? "Tổng hợp"
                    : categorySearch,
              }}
              data={options}
              onChange={(e) => setCategorySearch(e.target.value)}
            />
          </Form>
        </div>
        <div>
          <h5>Search keywords</h5>
          <Form className="custom" style={{display: 'flex', gap: 5}}>
           <Input style={{width: 300}} defaultValue={search.current} onChange={(e) => search.current = e.target.value}/>
           <Button style={{whiteSpace: 'nowrap'}} onClick={handleSearch} title="Tìm kiếm">Tìm kiếm</Button>
          </Form>
        </div>
      </div>
     
    );
  };

  const handleDragEnd = (e) => {
    if (!e.destination) return;
    let tempData = Array.from(dataSearch);
    let [source_data] = tempData.splice(e.source.index, 1);
    let idDown = tempData[e.destination.index]?._id;
    const idTop = source_data._id;
    if(idDown){
      const findIndex = dataSort.findIndex(id => id === idTop)
      const findIndex2 = dataSort.findIndex(id => id === idDown)
      dataSort.splice(findIndex, 1);
      dataSort.splice(findIndex2 - 1, 0, idTop);
    }else {

      let idDown = tempData[e.destination.index -1]._id;
      const findIndex = dataSort.findIndex(id => id === idTop)
      const findIndex2 = dataSort.findIndex(id => id === idDown)
      dataSort.splice(findIndex, 1);
      dataSort.splice(findIndex2, 0, idTop);
    }
    sortOrderPost(dataSort)

    tempData.splice(e.destination.index, 0, source_data);
    setDataSearch(tempData);
  };

  const renderPaginationItemDivs = (totalPage, pageIndex, setPageIndex) => {
    const divs = [];
    for (let i = 1; i <= totalPage; i++) {
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
  return (
    <>
      <SimpleHeader
        name="Tables"
        parentName="Tables"
        setIsFilter={() => setIsFilter(!isFilter)}
        filter={isFilter}
        props={<Filter />}
      />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardHeader className="border-0">
                <Row>
                  <Col className="col-6">
                    <h3 className="mb-0">Danh sách order bài test</h3>
                  </Col>
                  <Col className="text-right col-6 px-0">
                  <Button onClick={handleAddPost}>Thêm mới</Button>
                  </Col>
                </Row>
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
                  <DragDropContext onDragEnd={handleDragEnd}>
                    <Table
                      className="align-items-center table-flush"
                      responsive
                    >
                      <thead className="thead-light">
                        <tr>
                          <th className="sort" scope="col">
                          </th>
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
                          <th scope="col">Số từ</th>

                          <th scope="col">Hành động</th>
                        </tr>
                      </thead>
                      {/* dữ liệu */}
                      <Droppable droppableId="droppable-1">
                      {(provider) => (
                        <tbody
                          className="list"
                          ref={provider.innerRef}
                          {...provider.droppableProps}
                        >
                        {dataSearch?.map((item, index) => (
                          <Draggable
                           key={item._id}
                           draggableId={item._id}
                           index={index}
                         >
                           {(provider) => (
                            <tr {...provider.draggableProps} ref={provider.innerRef}>
                              <td {...provider.dragHandleProps}> = </td>
                              <th scope="row">{item?.require?.title}</th>
                              <td className="budget">
                                {item?.require?.description?.length > 50
                                  ? `${removeTagHtml(item?.require?.description).slice(
                                      0,
                                      50
                                    )}...`
                                  : removeTagHtml(item?.require?.description)}
                              </td>
                              <td>
                                {item.require.category}
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
                                <Button onClick={() => setIsOpen(item._id)}>
                                  <BsTrashFill className="text-warning" />
                                </Button>
                                <Button onClick={() => handleEditPost(item)}>
                                  <BiSolidEdit className="text-warning" />
                                </Button>
                              </td>
                           
                            </tr>
                          )}
                          </Draggable>
                        ))}
                        {provider.placeholder}
                      </tbody>
                      )}
                      </Droppable>
                    </Table>
                  </DragDropContext>
                ) : (
                  <p className="text-center">Không có dữ liệu</p>
                )}
              </div>
            </Card>
          </div>
        </Row>
      </Container>
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
            totalPage,
            pageIndex,
            setPageIndex
          )}

          <PaginationItem
            className={pageIndex == totalPage && "disabled"}
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
      <Modal title="Delete" open={isOpen} onOk={handleDelete} onCancel={()=> setIsOpen(false)}>
          <p>Bạn có chắc chắn muốn xóa?</p>
      </Modal>
      <DetailPost
        isOpenDetailPost={isOpenDetailPost}
        detailPostData={detailPostData}
        handleCloseModalDetailPost={handleCloseModalDetailPost}
        isShowComfirm={false}
      />
      <ModalPost 
        title={title} 
        dataUpdate={dataUpdate} 
        isOpenModal={isOpenModal}
        handleCancelModal={handleCancelModal}
        handleGetAllPost={handleGetAllPost}
      />
    </>
  );
}
