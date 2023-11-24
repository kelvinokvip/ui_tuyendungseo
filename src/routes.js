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
import Alternative from "views/pages/dashboards/Alternative.js";
import Buttons from "views/pages/components/Buttons.js";
import Calendar from "views/pages/Calendar.js";
import Cards from "views/pages/components/Cards.js";
import Charts from "views/pages/Charts.js";
import Components from "views/pages/forms/Components.js";
import Dashboard from "views/pages/dashboards/Dashboard.js";
import Elements from "views/pages/forms/Elements.js";
import Grid from "views/pages/components/Grid.js";
import Icons from "views/pages/components/Icons.js";
import Lock from "views/pages/examples/Lock.js";
import Login from "views/pages/examples/Login.js";
import Notifications from "views/pages/components/Notifications.js";
import Pricing from "views/pages/examples/Pricing.js";
import Profile from "views/pages/examples/Profile.js";
import ReactBSTables from "views/pages/tables/ReactBSTables.js";
import Register from "views/pages/examples/Register.js";
import RTLSupport from "views/pages/examples/RTLSupport.js";
import Sortable from "views/pages/tables/Sortable.js";
import Tables from "views/pages/tables/Tables.js";
import Timeline from "views/pages/examples/Timeline.js";
import Typography from "views/pages/components/Typography.js";
import Validation from "views/pages/forms/Validation.js";
import Vector from "views/pages/maps/Vector.js";
import Widgets from "views/pages/Widgets.js";
import Category from "views/pages/categorys/Category";
import CtvTest from "views/pages/CtvTest/CtvTest";
import User from "views/pages/User/User";
import WritePost from "views/pages/CtvTest/WritePost/WritePost";
import MyPost from "views/pages/CtvTest/MyPost";
import Ctv from "views/pages/Ctv";
import TestPost from "views/pages/TestPost";
import Notification from "views/pages/notification";
import Posts from "views/pages/posts";
import ConfirmTestContent from "views/pages/ConfirmTestContent";
import OrderEntity from "views/pages/orderEtity";
import CtvTestEntity from "views/pages/CtvTest/CtvTestEntity";
import WriteEntity from "views/pages/CtvTest/WriteEntity/WriteEntity";

const routes = [
  {
    collapse: true,
    name: "Danh sách",
    icon: "ni ni-shop text-primary",
    state: "dashboardsCollapse",
    permission: "dashboard",
    views: [
      {
        path: "/test-post",
        name: "Bài test CTV",
        miniName: "A",
        component: <TestPost />,
        layout: "/admin",
        permission: "admin-post",
      },
      {
        path: "/ctv",
        name: "CTV",
        miniName: "D",
        component: <Ctv />,
        layout: "/admin",
        permission: "admin-post",
      },
      {
        path: "/category",
        name: "Chuyên mục",
        miniName: "C",
        component: <Category />,
        layout: "/admin",
        permission: "admin-post",
      },
      {
        path: "/post",
        name: "Order bài test content",
        miniName: "E",
        component: <Posts />,
        layout: "/admin",
        permission: "admin-post",
      },
      {
        path: "/order-entity",
        name: "Order bài test entity",
        miniName: "E",
        component: <OrderEntity />,
        layout: "/admin",
        permission: "admin-post",
      },
    ],
  },
  {
    collapse: true,
    name: "Bài test CTV content",
    icon: "ni ni-shop text-primary",
    state: "B",
    permission: "post-test",
    views: [
      {
        path: "/confirm-test",
        name: "Tiến hành bài test",
        miniName: "D",
        component: <ConfirmTestContent />,
        layout: "/admin",
        permission: "post-test",
      },
      // {
      //   path: "/list-test-entity",
      //   name: "Danh sách bài test entity",
      //   miniName: "D",
      //   component: <CtvTestEntity />,
      //   layout: "/admin",
      //   permission: "post-test",
      // },
      {
        path: "/my-test",
        name: "Bài test của tôi",
        miniName: "D",
        component: <MyPost />,
        layout: "/admin",
        permission: "post-test",
      },
      {
        path: "/my-test/:id",
        name: "Bài test của tôi",
        miniName: "D",
        component: <WritePost />,
        layout: "/admin",
        permission: "post-test",
        invisible: true,
      },
      // {
      //   path: "/my-test-entity",
      //   name: "Bài test entity của tôi",
      //   miniName: "D",
      //   component: <WriteEntity />,
      //   layout: "/admin",
      //   permission: "post-test",
      //   invisible: true,
      // },
    ],
  },
  {
    collapse: true,
    name: "Bài test",
    icon: "ni ni-shop text-primary",
    state: "B",
    permission: "post-test-entity",
    views: [
      {
        path: "/list-test-entity",
        name: "Danh sách bài test entity",
        miniName: "D",
        component: <CtvTestEntity />,
        layout: "/admin",
        permission: "post-test-entity",
      },
      {
        path: "/my-test",
        name: "Bài test của tôi",
        miniName: "D",
        component: <MyPost />,
        layout: "/admin",
        permission: "post-test-entity",
      },
      {
        path: "/my-test-entity",
        name: "Bài test entity của tôi",
        miniName: "D",
        component: <WriteEntity />,
        layout: "/admin",
        permission: "post-test-entity",
        invisible: true,
      },
    ],
  },
  {
    collapse: true,
    name: "Thông Báo",
    icon: "ni ni-bell-55 text-primary",
    state: "notificationCollapse",
    permission: "admin-post",
    views: [
      {
        path: "/thong-bao/danh-sach",
        name: "Danh sách thông báo",
        miniName: "A",
        component: <Notification />,
        layout: "/admin",
        permission: "admin-post",
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    miniName: "L",
    component: <Login />,
    layout: "/auth",
    invisible: true,
  },
  {
    path: "/register",
    name: "Register",
    miniName: "R",
    component: <Register />,
    layout: "/auth",
    invisible: true,
  },
];

export default routes;
