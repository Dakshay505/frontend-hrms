

// export const apiPath = `http://localhost:5050`;
export const apiPath = ``;




// export const apiPath = `https://hrms-lix0.onrender.com`;

// export const apiPath = `https://chawlacomponents.com`;

// export const apiPath = `https://hrms-backend-04fw.onrender.com`;

// JOB PROFILE API

export const createJobProfileApiPath = `${apiPath}/api/v1/jobprofile/add`;
export const getJobProfileApiPath = `${apiPath}/api/v1/jobprofile`;

// group API

export const createGroupApiPath = `${apiPath}/api/v1/group/add`;
export const getGroupApiPath = `${apiPath}/api/v1/group`;
export const updateGroupApiPath = `${apiPath}/api/v1/group`;
export const getSingleGroupApiPath = `${apiPath}/api/v1/group/getSingleGroup`;
export const getEmployeesCountGroupApiPath = `${apiPath}/api/v1/group/getEmployeeGroup`;
export const deleteGroupApiPath = `${apiPath}/api/v1/group/delete`;

// EMPLOYEE API

export const createEmployeeApiPath = `${apiPath}/api/v1/employee/add`;
export const getEmployeeApiPath = `${apiPath}/api/v1/employee`;
export const getSingleEmployeeApiPath = `${apiPath}/api/v1/employee/getSingle`;
export const updateEmployeeApiPath = `${apiPath}/api/v1/employee`;
export const getEmployeeImageApiPath = `${apiPath}/api/v1/employee/docs/getProfile`;
export const getQrAssignApiPath = `${apiPath}/api/v1/employee/docs/getProofPicture`;
export const updatePasswordApiPath = `${apiPath}/api/v1/employee/changePassword`;
export const newPasswordApiPath = `${apiPath}/api/v1/employee/newPassword`;
export const salaryLogApiPath = `${apiPath}/api/v1/employee/salaryLog`;

// OTP VERIFICATION
export const getOtpApiPath = `${apiPath}/api/v1/otpVerify/getotp`;
export const verifyApiPath = `${apiPath}/api/v1/otpVerify/verifyotp`;

// UPDATE Hierarchy
export const updateHierarchyApiPath = `${apiPath}/api/v1/jobProfile/updateHierarchy`;
export const updateHierarchyGroupApiPath = `${apiPath}/api/v1/group/update/hr`;

// UPLOAD DOCUMENT
export const uploadImageApiPath = `${apiPath}/api/v1/employee/docs/uploadImage`;
export const uploadDocumentApiPath = `${apiPath}/api/v1/employee/docs/upload`;
export const uploadEmployeeDocumentApiPath = `${apiPath}/api/v1/employee/docs/uploadEmpDoc`;

// LOGIN API
export const adminLoginApiPath = `${apiPath}/api/v1/auth/admin/login`;
export const employeeLoginApiPath = `${apiPath}/api/v1/auth/login`;
export const getLoginDataApiPath = `${apiPath}/api/v1/auth/myprofile`;

// LOGOUTAPI
export const logoutApiPath = `${apiPath}/api/v1/auth/logout`;

// LEAVES APIS
export const getPendingLeavesApiPath = `${apiPath}/api/v1/leave/pending`;
export const getApprovedLeavesApiPath = `${apiPath}/api/v1/leave/approved`;
export const getAcceptedLeavesApiPath = `${apiPath}/api/v1/leave/accepted`;
export const getRejectedLeavesApiPath = `${apiPath}/api/v1/leave/rejected`;
export const updatePendingLeavesApiPath = `${apiPath}/api/v1/leave/acceptleave`;
export const updateAcceptedLeavesApiPath = `${apiPath}/api/v1/leave/approveleave`;

// MY LEAVES AND GATEPASS
export const getMyLeavesAndGatepassApiPath = `${apiPath}/api/v1/leave/myleave`;
export const createLeavesAndGatePassApiPath = `${apiPath}/api/v1/leave`;

// GATEPASS APIS
export const getPendingGatePassApiPath = `${apiPath}/api/v1/leave/pendinggatepass`;
export const getApprovedGatePassApiPath = `${apiPath}/api/v1/leave/approved`;
export const getAcceptedGatePassApiPath = `${apiPath}/api/v1/leave/acceptedgatepass`;
export const getRejectedGatePassApiPath = `${apiPath}/api/v1/leave/rejected`;
export const updatePendingGatePassApiPath = `${apiPath}/api/v1/leave/acceptgatepass`;
export const updateAcceptedGatePassApiPath = `${apiPath}/api/v1/leave/approvegatepass`;
export const getAllLeavesAndGatePassApiPath = `${apiPath}/api/v1/leave/all`;

// attendance
export const updateAttendanceApiPath = `${apiPath}/api/v2/attendance/updateAttendance`;
export const getAllAttandenceApiPath = `${apiPath}/api/v2/attendance`;
export const getMyAttandenceApiPath = `${apiPath}/api/v2/attendance/myAttendance`;
export const getStaffAttendanceApiPath = `${apiPath}/api/v2/attendance/staffAttendance`;
export const getGroupAttendanceApiPath = `${apiPath}/api/v2/attendance/groupPresent`;
export const addpuchApiPath = `${apiPath}/api/v2/attendance/addPunches`;
export const deletepuchApiPath = `${apiPath}/api/v2/attendance/deletePunches`;
export const editpuchApiPath = `${apiPath}/api/v2/attendance/updatePunches`;
export const shopFiterAttendancePath = `${apiPath}/api/v2/attendance/shopFilter`;

// TRAINING
export const addTrainingLinkApiPath = `${apiPath}/api/v1/training/addLinks`;
export const addTrainingDocumentApiPath = `${apiPath}/api/v1/training/add`;
export const addTrainingQuizApiPath = `${apiPath}/api/v1/quiz/addQuestion`;
export const addAssesmentQuizApiPath = `${apiPath}/api/v1/quiz/getQuiz`;
export const SubmitAnswerApiPath = `${apiPath}/api/v1/quiz/submitAnswer`;

// notifications
export const getNotificationApiPath = `${apiPath}/api/v1/notifications`;

// jobprofile
export const getSingleJobProfileApiPath = `${apiPath}/api/v1/jobprofile`;
export const updateJobProfileApiPath = `${apiPath}/api/v1/jobprofile/update`;
export const addJobProfileDepartmentApiPath = `${apiPath}/api/v1/jobprofile/addDepartment`;
export const deleteJobProfileDepartmentApiPath = `${apiPath}/api/v1/jobProfile/deleteDepartment`;
export const deleteJobProfileApiPath = `${apiPath}/api/v1/jobProfile/delete`;

// SALARY
export const getAllGroupSalaryApiPath = `${apiPath}/api/v1/attendance/groupSalary`;
export const getSingleGroupSalaryApiPath = `${apiPath}/api/v1/attendance`;

// Department
export const addDepartmentApiPath = `${apiPath}/api/v1/department/add`;
export const addParentDepartmentApiPath = `${apiPath}/api/v1/department/addParent`;
export const getAllDepartmentApiPath = `${apiPath}/api/v1/department/getAllDepartment`;
export const getAllParentDepartmentApiPath = `${apiPath}/api/v1/department/getAllParent`;
export const getDepartmentByParentApiPath = `${apiPath}/api/v1/department/getDepartmentByParent`;
export const getjobProfileBySubDepartmentNameApiPath = `${apiPath}/api/v1/department/getJobProfile`;
export const deleteDepartmentApiPath = `${apiPath}/api/v1/department/delete`;
export const updateDepartmentApiPath = `${apiPath}/api/v1/department/updateDepartment`;
export const updateParentDepartmentApiPath = `${apiPath}/api/v1/department/updateParentDepartment`;

// new Salary
export const getSalaryBySubDepartmentApiPath = `${apiPath}/api/v1/department/newData`;
export const getEmployeeSalaryApiPath = `${apiPath}/api/v1/attendance`;

// employeeBarcode
export const getEmployeeBarcodeApiPath = `${apiPath}/api/v1/employee/employeeBarCode`;

// Shop
export const getAllShopApiPath = `${apiPath}/api/v1/shop`;
export const addShopApiPath = `${apiPath}/api/v1/shop/add`;
export const getSingleShopApiPath = `${apiPath}/api/v1/shop`;
export const updateShopApiPath = `${apiPath}/api/v1/shop`;
export const deleteShopApiPath = `${apiPath}/api/v1/shop`;

//workday
export const addWorkDayApiPath = `${apiPath}/api/v2/workingDay/add`;
export const updateWorkDayApiPath = `${apiPath}/api/v2/workingDay/update`;
export const showWorkDayApiPath = `${apiPath}/api/v2/workingDay/`;

// Login history Api
export const getLoginHistroyApiPath = `${apiPath}/api/v2/loggedInHistory`;


// Login history Api
export const changePasswordPasswordApiPath = `${apiPath}/api/v1/employee/newPassword`;


export const getNewSalaryApiPath = `${apiPath}/api/v2/salary/salary`;
