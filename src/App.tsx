import React from "react";
import "./App.css";
import Aside from "./components/aside";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from './components/Dashboard/Home';
import AddEmployee from './components/Dashboard/AddEmployee';
import AddNewFieldEmployee from './components/Dashboard/AddNewFieldEmployee';
import TraningDashboard from './components/Traning/TraningDashboard';
import AddTraningResources from './components/Traning/AddTraningResources';
import ViewModifyDatabase from './components/Dashboard/ViewModifyDatabase';
import AddDepartment from './components/Dashboard/AddDepartment';
import AddJobProfile from './components/Dashboard/AddJobProfile';
import UpdateHierarcy from './components/Dashboard/UpdateHierarcy';
import { AttendenceDtabase } from './components/AttendanceDash/attendenceDatabase';
import { Leavereate } from './components/AttendanceDash/leavereate';
import { AttendenceDashboardList } from './components/AttendanceDash/attendenceDashboardList';
import { DocumentDash } from './components/documentmodules/documentDash';
import { Uploaddocument } from './components/documentmodules/uploaddocument';
import NotFound from "./components/NotFound";
import { Requestdocument } from './components/documentmodules/requestdocuments';
import ViewDoc from './components/documentmodules/viewdocuments';
import ComposeNotification from './components/Notification/ComposeNotification';
import { PendingLeaves } from './components/LeavesAndGatepass/pending';
import { LeaveRecords } from './components/LeavesAndGatepass/LeaveRecords';
import { GatepassRecord } from './components/LeavesAndGatepass/GatepassRecord';
import { Login } from './components/Login';

import { EmployeeProfile } from './components/Employeeprofile/profile';
import { EmployeeRequestingdocument } from './components/employeedocumentmodel/requestingdocument';
import { EmployeeUploadingdocument } from './components/employeedocumentmodel/uploadingdocument';
import { JobProfileInfo } from './components/information/jobprofileinfo';
import { DepartmentInfo } from './components/information/departmentinfo';

import { StaffCheckin } from './Employee/dashboard/staffcheckin';
import { Employeeattendence } from './Employee/dashboard/EmployeeYourattendence';
import { EmpViewdoc } from './Employee/documents/viewdoc';
import { Yourdoc } from './Employee/documents/yourdoc';
import { ChangePassword } from './Employee/changepassword';

import AddNewFieldsForJobProfile from "./components/Dashboard/AddNewFieldsForJobProfile";
import AddNewFieldsForDepartments from "./components/Dashboard/AddNewFieldsForDepartments";

import Employeeaside from "./Employee/EmployeeAside";
import UploadPhotoPage from "./Employee/uploadphoto";
import { Employeehome } from "./Employee/dashboard/home";
import { EmployeeLeaveHome } from "./components/LeavesAndGatepass/employee/EmployeeLeaveHome";
import { ApplyForLeave } from "./components/LeavesAndGatepass/employee/ApplyForLeave";
import { ViewLeavesRecord } from "./components/LeavesAndGatepass/employee/ViewLeavesRecord";
import { ProductedRoute } from "./ProtectedRoute/ProductedRoute";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ProductedRouteEmployee } from "./ProtectedRoute/ProtectedRouteEmployee";
import { useSelector } from "react-redux";
import { useEffect } from "react"
import { io } from "socket.io-client";
import { apiPath } from "./APIRoutes";
import ShowNotication from "./components/Notification/showNotication";
const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <Login></Login>
    ),
  },
  {
    path: "/",
    element: (
      <ProductedRoute>
        <Aside>
          <Home />
        </Aside>
      </ProductedRoute>
    ),
  },
  {
    path: "/addemployee",
    element: (
      <ProductedRoute>
        <Aside>
          <AddEmployee />
        </Aside>
      </ProductedRoute>
    ),
  },
  {
    path: "/view-modify-database",
    element: (
      <ProductedRoute>
        <Aside>
          <ViewModifyDatabase />
        </Aside>
      </ProductedRoute>
    ),
  },
  {
    path: "/add-department",
    element: (
      <ProductedRoute>
        <Aside>
          <AddDepartment />
        </Aside>
      </ProductedRoute>
    ),
  },
  {
    path: "/update-hierarchy",
    element: (
      <ProductedRoute>
        <Aside>
          <UpdateHierarcy />
        </Aside>
      </ProductedRoute>
    ),
  },
  {
    path: "/add-job-profile",
    element: (
      <ProductedRoute>
        <Aside>
          <AddJobProfile />
        </Aside>
      </ProductedRoute>
    ),
  },
  {
    path: "/addnewfieldsemployee",
    element: (
      <ProductedRoute>
        <Aside>
          <AddNewFieldEmployee />
        </Aside>
      </ProductedRoute>
    ),
  },
  {
    path: "/add-new-fields-for-job-profile",
    element: (
      <ProductedRoute>
        <Aside>
          <AddNewFieldsForJobProfile />
        </Aside>
      </ProductedRoute>
    ),
  },
  {
    path: "/add-new-fields-for-department",
    element: (
      <ProductedRoute>
        <Aside>
          <AddNewFieldsForDepartments />
        </Aside>
      </ProductedRoute>
    ),
  },
  {
    path: "/traning-dashboard",
    element: (
      <ProductedRoute>
        <Aside>
          <TraningDashboard />
        </Aside>
      </ProductedRoute>
    ),
  },
  {
    path: "/add-traning-resources",
    element: (
      <ProductedRoute>
        <Aside>
          <AddTraningResources />
        </Aside>
      </ProductedRoute>
    ),
  },
  {
    path: "/attendance",
    element: (
      <ProductedRoute>
        <Aside>
          {" "}
          <AttendenceDtabase></AttendenceDtabase>{" "}
        </Aside>
      </ProductedRoute>
    ),
  },
  {
    path: "/leaves",
    element: (
      <ProductedRoute>
        <Aside>
          {" "}
          <Leavereate></Leavereate>{" "}
        </Aside>
      </ProductedRoute>
    ),
  },
  {
    path: "/attendance-database",
    element: (
      <ProductedRoute>
        <Aside>
          {" "}
          <AttendenceDashboardList></AttendenceDashboardList>{" "}
        </Aside>
      </ProductedRoute>
    ),
  },
  {
    path: "/document",
    element: (
      <ProductedRoute>
        <Aside>
          {" "}
          <DocumentDash></DocumentDash>{" "}
        </Aside>
      </ProductedRoute>
    ),
  },
  {
    path: "/upload",
    element: <ProductedRoute><Aside> <Uploaddocument></Uploaddocument> </Aside></ProductedRoute>,
  },
  {
    path: "/request",
    element: (
      <ProductedRoute>
        <Aside>
          {" "}
          <Requestdocument></Requestdocument>{" "}
        </Aside>
      </ProductedRoute>
    ),
  },
  {
    path: "/viewdocuments",
    element: (
      <ProductedRoute>
        <Aside>
          {" "}
          <ViewDoc></ViewDoc>{" "}
        </Aside>
      </ProductedRoute>
    ),
  },
  {
    path: "/compose-notification",
    element: (
      <ProductedRoute>
        <Aside>
          {" "}
          <ComposeNotification />{" "}
        </Aside>
      </ProductedRoute>
    ),
  },
  {
    path: "/emp",
    element: <Employeeaside> <UploadPhotoPage></UploadPhotoPage> </Employeeaside>
  },
  {
    path: "/emphome",
    element: <Employeeaside> <Employeehome></Employeehome> </Employeeaside>
  },

  {
    path: "/empcheckin",
    element: <Employeeaside> <StaffCheckin></StaffCheckin> </Employeeaside>
  },
  {
    path: "/employee-attendence",
    element: <Employeeaside> <Employeeattendence></Employeeattendence> </Employeeaside>
  },
  {
    path: "/empdocuments",
    element: <Employeeaside> <EmpViewdoc></EmpViewdoc> </Employeeaside>
  },
  {
    path: "/your-documents",
    element: <Employeeaside> <Yourdoc></Yourdoc> </Employeeaside>
  },
  {
    path: "/change-password",
    element: <Employeeaside> <ChangePassword></ChangePassword> </Employeeaside>
  },
  {
    path: "/pending-leaves",
    element: (
      <ProductedRoute>
        <Aside>
          {" "}
          <PendingLeaves></PendingLeaves>{" "}
        </Aside>
      </ProductedRoute>
    ),
  },
  {
    path: "/leave-records",
    element: (
      <ProductedRoute>
        <Aside>
          {" "}
          <LeaveRecords></LeaveRecords>{" "}
        </Aside>
      </ProductedRoute>
    ),
  },
  {
    path: "/gatepass-records",
    element: (
      <ProductedRoute>
        <Aside>
          {" "}
          <GatepassRecord></GatepassRecord>{" "}
        </Aside>
      </ProductedRoute>
    ),
  },
  {
    path: "/employee-profile",
    element: (
      <ProductedRoute>
        <Aside>
          {" "}
          <EmployeeProfile></EmployeeProfile>{" "}
        </Aside>
      </ProductedRoute>
    ),
  },
  {
    path: "/requesting-document",
    element: (
      <ProductedRoute>
        <Aside>
          {" "}
          <EmployeeRequestingdocument></EmployeeRequestingdocument>{" "}
        </Aside>
      </ProductedRoute>
    ),
  },
  {
    path: "/uploading-document",
    element: (
      <ProductedRoute>
        <Aside>
          {" "}
          <EmployeeUploadingdocument></EmployeeUploadingdocument>{" "}
        </Aside>
      </ProductedRoute>
    ),
  },
  {
    path: "/jobprofile-info",
    element: (
      <ProductedRoute>
        <Aside>
          {" "}
          <JobProfileInfo></JobProfileInfo>{" "}
        </Aside>
      </ProductedRoute>
    ),
  },
  {
    path: "/departments-info",
    element: (
      <ProductedRoute>
        <Aside>
          {" "}
          <DepartmentInfo></DepartmentInfo>{" "}
        </Aside>
      </ProductedRoute>
    ),
  },

  // EMPLOYEE ROUTES
  {
    path: "/employee-leaves-home",
    element: (
      <ProductedRouteEmployee>
        <Employeeaside>
          {" "}
          <EmployeeLeaveHome />{" "}
        </Employeeaside>
      </ProductedRouteEmployee>
    ),
  },
  {
    path: "/emp",
    element: (
      <ProductedRoute>
        <Employeeaside>
          {" "}
          <UploadPhotoPage></UploadPhotoPage>{" "}
        </Employeeaside>
      </ProductedRoute>
    ),
  },
  {
    path: "/employee-apply-for-leave",
    element: (
      <ProductedRoute>
        <Employeeaside>
          <ApplyForLeave />
        </Employeeaside>
      </ProductedRoute>
    ),
  },
  {
    path: "/employee-view-leave-record",
    element: (
      <ProductedRoute>
        <Employeeaside>
          {" "}
          <ViewLeavesRecord />
        </Employeeaside>
      </ProductedRoute>
    ),
  },
  {
    path: "/emphome",
    element: (
      <ProductedRoute>
        <Employeeaside>
          {" "}
          <Employeehome></Employeehome>{" "}
        </Employeeaside>
      </ProductedRoute>
    ),
  },
  {
    path: "/show-notifications",
    element: (
      // <ProductedRoute>
      <Aside>
        {" "}
        <ShowNotication />{" "}
      </Aside>
      //  </ProductedRoute>
    ),
  },
  {
    path: "*",
    element: (
      <NotFound></NotFound>
    ),
  },
]);

function App() {
  const user = useSelector((state: any) => state.login.loggedInUserData);
  let idd: string = "";

  if (user && user.admin) {
    idd = user.admin._id;
  } else if (user && user.employee) {
    idd = user.employee._id;
  }

  useEffect(() => {
    setupSocketConnection();
  }, []);


  const setupSocketConnection = () => {
    const socket = io(apiPath, { query: { employeeId: idd } });

    socket.on("connect", () => {
      console.log("Connected to websocket");
    });

    socket.on("notification", (notification: any) => {
      console.log("notification.... ", notification);
      const length = notification.notification.length;
      toast(notification.notification[length - 1].message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from websocket");
    });

    socket.on("error", (error: any) => {
      console.log(error.message);
    });

    return () => {
      socket.disconnect();
    };
  };
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </React.StrictMode>
  );
}

export default App;