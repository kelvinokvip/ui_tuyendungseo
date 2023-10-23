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
import React, { memo } from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// reactstrap components
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Container,
  Row,
  Col,
  Input,
} from "reactstrap";
import { AnimatePresence, motion } from "framer-motion";
const Filter = memo(({ isFilter, children }) => {
  return (
    <AnimatePresence mode="sync">
      {isFilter ? (
        <motion.div
          initial={{ height: 0, scale: 1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, height: 100 }}
          exit={{
            scale: 1,
            opacity: 0,
            height: 0,
          }}
          transition={{ type: "spring" }}
        >
          {children}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
});

function TimelineHeader({
  name,
  parentName,
  setIsFilter,
  isNew,
  isFilter,
  filter,
  props,
}) {
  return (
    <>
      <div className="header header-dark bg-info pb-6 content__title content__title--calendar">
        <Container fluid>
          <motion.div
            // transition={{ duration: 1, type: "spring" }}
            className="header-body"
          >
            <Row className="align-items-center py-4">
              <Col lg="6" xs="7">
                <h6 className="fullcalendar-title h2 text-white d-inline-block mb-0">
                  {name}
                </h6>{" "}
                <Breadcrumb
                  className="d-none d-md-inline-block ml-lg-4"
                  listClassName="breadcrumb-links breadcrumb-dark"
                >
                  <BreadcrumbItem>
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <i className="fas fa-home" />
                    </a>
                  </BreadcrumbItem>
                  <BreadcrumbItem>
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      {parentName}
                    </a>
                  </BreadcrumbItem>
                  <BreadcrumbItem aria-current="page" className="active">
                    {name}
                  </BreadcrumbItem>
                </Breadcrumb>
              </Col>
              <Col className="mt-3 mt-md-0 text-md-right" lg="6" xs="5">
                {isNew && (
                  <Button className="btn-neutral" color="default" size="sm">
                    Tạo
                  </Button>
                )}
                {isFilter && (
                  <Button
                    className="btn-neutral"
                    color="default"
                    size="sm"
                    onClick={setIsFilter}
                  >
                    Bộ Lọc
                  </Button>
                )}
              </Col>
            </Row>
            <Filter isFilter={filter}> {props}</Filter>
          </motion.div>
        </Container>
      </div>
    </>
  );
}

TimelineHeader.propTypes = {
  name: PropTypes.string,
  parentName: PropTypes.string,
};

export default TimelineHeader;
