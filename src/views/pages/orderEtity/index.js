import React, { useEffect, useRef, useState } from "react";
import {
    Card,
    CardHeader,
    Table,
    Container,
    Row,
    Form,
    Button,
    Col,
    CardFooter,
    PaginationItem,
    PaginationLink,
    Pagination,
    Input,
} from "reactstrap";
import { toast } from "react-toastify";
import SimpleHeader from "components/Headers/SimpleHeader.js";
import LoadingSpin from "react-loading-spin";
import { BsTrashFill } from "react-icons/bs";
import { Modal } from "antd";
import { BiSolidEdit } from "react-icons/bi";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"
import { sortOrderPost } from "api/orderPost";
import { getOrderEntity } from "api/orderEntity";
import ModalOrderEntity from "./modelOrderEntity";
import { deleteOrderEntity } from "api/orderEntity";

function getData(arr, totalPage, pageIndex, pageSize = 10) {
    if (pageIndex < 1) {
        return;
    }
    const startIndex = (pageIndex - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, totalPage * pageSize);
    const currentPageData = arr.slice(startIndex, endIndex);
    return currentPageData;
}

export default function OrderEntity() {
    const [dataOrderEntityList, setDataOrderEntityList] = useState([]);
    const [dataSort, setDataSort] = useState([])
    const [loading, setLoading] = useState(true);
    const search = useRef("")
    const [totalPage, setTotalPage] = useState([])
    const [pageIndex, setPageIndex] = useState(1);
    const [dataSearch, setDataSearch] = useState([]);
    const [isFilter, setIsFilter] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [title, setTitle] = useState("");
    const [dataUpdate, setDataUpdate] = useState({})
    //get test entity
    const handleGetAllOrderEntity = async () => {
        const res = await getOrderEntity();
        const sort = res.data.map(item => { return (item._id) });
        const data = res.data.sort((a, b) => sort.indexOf(a["_id"]) - sort.indexOf(b['_id']));
        setDataSort(sort)
        setDataOrderEntityList(data);
        setLoading(false);
    };
    //search test entity
    const handleSearch = () => {
        let data = dataOrderEntityList;
        const s = search.current
        if (s) {
            data = data.filter(item => {
                if (item.title.search(s) !== -1) {
                    return true;
                }
                if (item.title.search(s) !== -1) {
                    return true;
                }
            })
        }
        setDataSearch(getData(data, totalPage, pageIndex, 10))
    }
    //delete test entity
    const handleDelete = () => {
        if (isOpen) {
            fetchApideletePostById(isOpen);
            setIsOpen(false);
        }
    };
    const fetchApideletePostById = async (id) => {
        try {
            setLoading(true);
            const res = await deleteOrderEntity(id);
            if (res?.success) {
                toast.success(`Xóa thành công`);
            } else {
                toast.error(`Lỗi xóa thông báo! Vui lòng thử lại.`);
            }
            handleGetAllOrderEntity()
        } catch (error) {
            console.log("error:", error);
        } finally {
            setLoading(false);
        }
    };
    const handleAddOrderEntity = () => {
        setIsOpenModal(true)
        setTitle("Thêm bài test order entity")
        setDataUpdate({})
    }

    const handleEditOrderEntity = (item) => {
        setTitle("Sửa bài test order entity")
        setDataUpdate(item);
        setIsOpenModal(true)
    }

    const handleDragEnd = (e) => {
        if (!e.destination) return;
        let tempData = Array.from(dataSearch);
        let [source_data] = tempData.splice(e.source.index, 1);
        let idDown = tempData[e.destination.index]?._id;
        const idTop = source_data._id;
        if (idDown) {
            const findIndex = dataSort.findIndex(id => id === idTop)
            const findIndex2 = dataSort.findIndex(id => id === idDown)
            dataSort.splice(findIndex, 1);
            dataSort.splice(findIndex2 - 1, 0, idTop);
        } else {

            let idDown = tempData[e.destination.index - 1]._id;
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

    const handleCancelModal = () => {
        setIsOpenModal(false);
    };

    const Filter = () => {
        return (
            <div>
                <h5>Tìm kiếm</h5>
                <Form className="custom" style={{ display: 'flex', gap: 5 }}>
                    <Input style={{ width: 300 }} defaultValue={search.current} onChange={(e) => search.current = e.target.value} placeholder="Tìm kiếm theo tiêu đề" />
                    <Button style={{ whiteSpace: 'nowrap' }} onClick={handleSearch} title="Tìm kiếm theo tiêu đề bài test">Tìm kiếm</Button>
                </Form>
            </div>
        );
    };

    useEffect(() => {
        setTotalPage(Math.ceil(dataOrderEntityList.length / 10))
    }, [dataOrderEntityList])

    useEffect(() => {
        handleSearch()
    }, [dataOrderEntityList, pageIndex, totalPage])

    useEffect(() => {
        handleGetAllOrderEntity();
    }, []);

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
                                        <h3 className="mb-0">Danh sách order bài test entity</h3>
                                    </Col>
                                    <Col className="text-right col-6 px-0">
                                        <Button onClick={handleAddOrderEntity}>Thêm mới</Button>
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
                                {dataOrderEntityList?.length ? (
                                    <DragDropContext onDragEnd={handleDragEnd}>
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
                                                        Nội dung
                                                    </th>
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
                                                                        <td scope="row">{item?.title}</td>
                                                                        <td>{item.content}</td>
                                                                        <td className="table-actions">
                                                                            <Button onClick={() => setIsOpen(item._id)}>
                                                                                <BsTrashFill className="text-warning" />
                                                                            </Button>
                                                                            <Button onClick={() => handleEditOrderEntity(item)}>
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
            <Modal title="Delete" open={isOpen} onOk={handleDelete} onCancel={() => setIsOpen(false)}>
                <p>Bạn có chắc chắn muốn xóa?</p>
            </Modal>
            <ModalOrderEntity
                title={title}
                dataUpdate={dataUpdate}
                isOpenModal={isOpenModal}
                handleCancelModal={handleCancelModal}
                handleGetAllOrderEntity={handleGetAllOrderEntity}
            />
        </>
    );
}
