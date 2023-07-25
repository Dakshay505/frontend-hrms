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
import AddGroup from './components/Dashboard/AddGroup';
import AddJobProfile from './components/Dashboard/AddJobProfile';
import UpdateHierarcy from './components/Dashboard/UpdateHierarcy';
import { AttendenceDtabase } from './components/Attendance/attendenceDatabase';
import { AttendenceDashboardList } from './components/Attendance/attendenceDashboardList';
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
import { JobProfileInfo } from './components/Employeeprofile/jobprofileinfo';
import { GroupInfo } from './components/Employeeprofile/groupinfo';

import { StaffCheckin } from './components/Attendance/Employee/staffcheckin';
import { Employeeattendence } from './components/Attendance/Employee/EmployeeYourattendence';
import { EmpViewdoc } from './Employee/documents/viewdoc';
// import { Yourdoc } from './Employee/documents/yourdoc';
import { ChangePassword } from './Employee/changepassword';

import AddNewFieldsForJobProfile from "./components/Dashboard/AddNewFieldsForJobProfile";
import AddNewFieldsForGroups from "./components/Dashboard/AddNewFieldsForGroups";

import Employeeaside from "./Employee/EmployeeAside";
import UploadPhotoPage from "./Employee/uploadphoto";
import { Employeehome } from "./components/Dashboard/Employee/home";
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
import SalaryDatabase from "./components/Salary/SalaryDatabase";
import { AddTrainingQuiz } from "./components/Traning/AddTrainingQuiz";
import { TraningStatus } from "./components/Traning/TraningStatus";
import SingleGroupSalary from "./components/Salary/SingleGroupSalary";

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
    path: "/add-group",
    element: (
      <ProductedRoute>
        <Aside>
          <AddGroup />
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
    path: "/add-new-fields-for-group",
    element: (
      <ProductedRoute>
        <Aside>
          <AddNewFieldsForGroups />
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
    path: "/add-traning-quiz",
    element: (
      <ProductedRoute>
        <Aside>
          <AddTrainingQuiz></AddTrainingQuiz>
        </Aside>
      </ProductedRoute>
    ),
  },
  {
    path: "/traning-status",
    element: (
      <ProductedRoute>
        <Aside>
          <TraningStatus></TraningStatus>
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
    path: "/empcheckin",
    element: <ProductedRoute><Employeeaside> <StaffCheckin></StaffCheckin> </Employeeaside></ProductedRoute>
  },
  {
    path: "/employee-attendence",
    element: <ProductedRoute><Employeeaside> <Employeeattendence></Employeeattendence> </Employeeaside></ProductedRoute>
  },
  {
    path: "/empdocuments",
    element: <ProductedRoute><Employeeaside> <EmpViewdoc></EmpViewdoc> </Employeeaside></ProductedRoute>
  },
  {
    path: "/your-documents",
    // element:<ProductedRoute><Employeeaside> <Yourdoc></Yourdoc> </Employeeaside></ProductedRoute>
  },
  {
    path: "/change-password",
    element: <ProductedRoute><Employeeaside> <ChangePassword></ChangePassword> </Employeeaside></ProductedRoute>
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
    path: "/groups-info",
    element: (
      <ProductedRoute>
        <Aside>
          {" "}
          <GroupInfo></GroupInfo>{" "}
        </Aside>
      </ProductedRoute>
    ),
  },
  {
    path: "/salary-database",
    element: (
      <ProductedRoute>
        <Aside>
          <SalaryDatabase></SalaryDatabase>
        </Aside>
      </ProductedRoute>
    ),
  },
  {
    path: "/single-group-salary",
    element: (
      <ProductedRoute>
        <Aside>
          <SingleGroupSalary></SingleGroupSalary>
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
        theme: "colored",
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
        theme="colored"
      />
    </React.StrictMode>
  );
}

export default App;