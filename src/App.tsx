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
import { Toaster } from 'react-hot-toast'
import ComposeNotification from './components/Notification/ComposeNotification';
import { PendingLeaves } from './components/LeavesAndGatepass/pending';
import { LeaveRecords } from './components/LeavesAndGatepass/LeaveRecords';
import { GatepassRecord } from './components/LeavesAndGatepass/GatepassRecord';
import FormFileData from './FormFileData';
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
import  {ChangePassword}  from './Employee/changepassword';

import AddNewFieldsForJobProfile from "./components/Dashboard/AddNewFieldsForJobProfile";
import AddNewFieldsForDepartments from "./components/Dashboard/AddNewFieldsForDepartments";

import Employeeaside from "./Employee/EmployeeAside";
import UploadPhotoPage from "./Employee/uploadphoto";
import { Employeehome } from "./Employee/dashboard/home";
import { EmployeeLeaveHome } from "./components/LeavesAndGatepass/employee/EmployeeLeaveHome";
import { ApplyForLeave } from "./components/LeavesAndGatepass/employee/ApplyForLeave";
import { ViewLeavesRecord } from "./components/LeavesAndGatepass/employee/ViewLeavesRecord";
import { ProductedRoute } from "./ProtectedRoute/ProductedRoute";
import { ToastContainer } from "react-toastify";
import { ProductedRouteEmployee } from "./ProtectedRoute/ProtectedRouteEmployee";

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
      <Aside>
        <AddEmployee />
      </Aside>
    ),
  },
  {
    path: "/view-modify-database",
    element: (
      <Aside>
        <ViewModifyDatabase />
      </Aside>
    ),
  },
  {
    path: "/add-department",
    element: (
      <Aside>
        <AddDepartment />
      </Aside>
    ),
  },
  {
    path: "/update-hierarchy",
    element: (
      <Aside>
        <UpdateHierarcy />
      </Aside>
    ),
  },
  {
    path: "/add-job-profile",
    element: (
      <Aside>
        <AddJobProfile />
      </Aside>
    ),
  },
  {
    path: "/addnewfieldsemployee",
    element: (
      <Aside>
        <AddNewFieldEmployee />
      </Aside>
    ),
  },
  {
    path: "/add-new-fields-for-job-profile",
    element: (
      <Aside>
        <AddNewFieldsForJobProfile />
      </Aside>
    ),
  },
  {
    path: "/add-new-fields-for-department",
    element: (
      <Aside>
        <AddNewFieldsForDepartments />
      </Aside>
    ),
  },
  {
    path: "/traning-dashboard",
    element: (
      <Aside>
        <TraningDashboard />
      </Aside>
    ),
  },
  {
    path: "/add-traning-resources",
    element: (
      <Aside>
        <AddTraningResources />
      </Aside>
    ),
  },
  {
    path: "/attendance",
    element: (
      <Aside>
        {" "}
        <AttendenceDtabase></AttendenceDtabase>{" "}
      </Aside>
    ),
  },
  {
    path: "/leaves",
    element: (
      <Aside>
        {" "}
        <Leavereate></Leavereate>{" "}
      </Aside>
    ),
  },
  {
    path: "/attendance-database",
    element: (
      <Aside>
        {" "}
        <AttendenceDashboardList></AttendenceDashboardList>{" "}
      </Aside>
    ),
  },
  {
    path: "/document",
    element: (
      <Aside>
        {" "}
        <DocumentDash></DocumentDash>{" "}
      </Aside>
    ),
  },
  {
    path: "/upload",
    element: <Aside> <Uploaddocument></Uploaddocument> </Aside>,
  },
  {
    path: "/request",
    element: (
      <Aside>
        {" "}
        <Requestdocument></Requestdocument>{" "}
      </Aside>
    ),
  },
  {
    path: "/viewdocuments",
    element: (
      <Aside>
        {" "}
        <ViewDoc></ViewDoc>{" "}
      </Aside>
    ),
  },
  {
    path: "/compose-notification",
    element: (
      <Aside>
        {" "}
        <ComposeNotification />{" "}
      </Aside>
    ),
  },
    {
      path: "/fileDataTransfer",
      element: <Aside> <FormFileData></FormFileData> </Aside>,
    },
   {
    path:"/emp",
    element:<Employeeaside> <UploadPhotoPage></UploadPhotoPage> </Employeeaside>
   },
   {
    path:"/emphome",
    element:<Employeeaside> <Employeehome></Employeehome> </Employeeaside>
   },
   
   {
    path:"/empcheckin",
    element:<Employeeaside> <StaffCheckin></StaffCheckin> </Employeeaside>
   },
   {
    path:"/employee-attendence",
    element:<Employeeaside> <Employeeattendence></Employeeattendence> </Employeeaside>
   },
   {
    path:"/empdocuments",
    element:<Employeeaside> <EmpViewdoc></EmpViewdoc> </Employeeaside>
   },
   {
    path:"/your-documents",
    element:<Employeeaside> <Yourdoc></Yourdoc> </Employeeaside>
   },
   {
    path:"/change-password",
    element:<Employeeaside> <ChangePassword></ChangePassword> </Employeeaside>
   },
  {
    path: "/pending-leaves",
    element: (
      <Aside>
        {" "}
        <PendingLeaves></PendingLeaves>{" "}
      </Aside>
    ),
  },
  {
    path: "/leave-records",
    element: (
      <Aside>
        {" "}
        <LeaveRecords></LeaveRecords>{" "}
      </Aside>
    ),
  },
  {
    path: "/gatepass-records",
    element: (
      <Aside>
        {" "}
        <GatepassRecord></GatepassRecord>{" "}
      </Aside>
    ),
  },
  {
    path: "/employee-profile",
    element: (
      <Aside>
        {" "}
        <EmployeeProfile></EmployeeProfile>{" "}
      </Aside>
    ),
  },
  {
    path: "/requesting-document",
    element: (
      <Aside>
        {" "}
        <EmployeeRequestingdocument></EmployeeRequestingdocument>{" "}
      </Aside>
    ),
  },
  {
    path: "/uploading-document",
    element: (
      <Aside>
        {" "}
        <EmployeeUploadingdocument></EmployeeUploadingdocument>{" "}
      </Aside>
    ),
  },
  {
    path: "/jobprofile-info",
    element: (
      <Aside>
        {" "}
        <JobProfileInfo></JobProfileInfo>{" "}
      </Aside>
    ),
  },
  {
    path: "/departments-info",
    element: (
      <Aside>
        {" "}
        <DepartmentInfo></DepartmentInfo>{" "}
      </Aside>
    ),
  },
  {
    path: "/fileDataTransfer",
    element: (
      <Aside>
        {" "}
        <FormFileData></FormFileData>{" "}
      </Aside>
    ),
  },

  // EMPLOYEE ROUTES
  {
    path: "/employee-leaves-home",
    element: (
      <ProductedRoute>
        <Employeeaside>
          {" "}
          <EmployeeLeaveHome />{" "}
        </Employeeaside>
      </ProductedRoute>
    ),
  },
  {
    path: "/emp",
    element: (
      <Employeeaside>
        {" "}
        <UploadPhotoPage></UploadPhotoPage>{" "}
      </Employeeaside>
    ),
  },
  {
    path: "/employee-apply-for-leave",
    element: (
      <Aside>
        {" "}
        <ApplyForLeave />{" "}
      </Aside>
    ),
  },
  {
    path: "/employee-view-leave-record",
    element: (
      <Aside>
        {" "}
        <ViewLeavesRecord />
      </Aside>
    ),
  },
  {
    path: "/emphome",
    element: (
      <ProductedRouteEmployee>
      <Employeeaside>
        {" "}
        <Employeehome></Employeehome>{" "}
      </Employeeaside>
      </ProductedRouteEmployee>
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
        theme="dark"
      />
      <Toaster position="top-right" reverseOrder={false} />
    </React.StrictMode>
  );
}

export default App;