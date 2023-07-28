export const apiPath = `http://localhost:5050`;
// export const apiPath = ``;
// export const apiPath = `https://hrms-backend-04fw.onrender.com`;

// JOB PROFILE API

export const createJobProfileApiPath = `${apiPath}/api/v1/jobprofile/add`;
export const getJobProfileApiPath = `${apiPath}/api/v1/jobprofile`;

// DEPARTMENT API

export const createGroupApiPath = `${apiPath}/api/v1/group/add`;
export const getGroupApiPath = `${apiPath}/api/v1/group`;
export const updateGroupApiPath = `${apiPath}/api/v1/group`;
export const getSingleGroupApiPath = `${apiPath}/api/v1/group/getSingleGroup`;

// EMPLOYEE API

export const createEmployeeApiPath = `${apiPath}/api/v1/employee/add`;
export const getEmployeeApiPath = `${apiPath}/api/v1/employee`;
export const getSingleEmployeeApiPath = `${apiPath}/api/v1/employee/getSingle`;
export const updateEmployeeApiPath = `${apiPath}/api/v1/employee`
export const getEmployeeImageApiPath = `${apiPath}/api/v1/employee/docs/getProfile`
export const getQrAssignApiPath = `${apiPath}/api/v1/employee/docs/getProofPicture`
export const updatePasswordApiPath = `${apiPath}/api/v1/employee/changePassword`

// OTP VERIFICATION
export const getOtpApiPath = `${apiPath}/api/v1/otpVerify/getotp`
export const verifyApiPath = `${apiPath}/api/v1/otpVerify/verifyotp`

// UPDATE Hierarchy
export const updateHierarchyApiPath = `${apiPath}/api/v1/jobProfile/updateHierarchy`
export const updateHierarchyGroupApiPath = `${apiPath}/api/v1/group/update/hr`

// UPLOAD DOCUMENT
export const uploadImageApiPath = `${apiPath}/api/v1/employee/docs/uploadImage`;
export const uploadDocumentApiPath = `${apiPath}/api/v1/employee/docs/upload`;

// LOGIN API
export const adminLoginApiPath = `${apiPath}/api/v1/auth/admin/login`;
export const employeeLoginApiPath = `${apiPath}/api/v1/auth/login`;
export const getLoginDataApiPath = `${apiPath}/api/v1/auth/myprofile`;

// LOGOUTAPI
export const logoutApiPath = `${apiPath}/api/v1/auth/logout`;

// LEAVES APIS
export const getPendingLeavesApiPath = `${apiPath}/api/v1/leave/pending`
export const getApprovedLeavesApiPath = `${apiPath}/api/v1/leave/approved`
export const getAcceptedLeavesApiPath = `${apiPath}/api/v1/leave/accepted`
export const getRejectedLeavesApiPath = `${apiPath}/api/v1/leave/rejected`
export const updatePendingLeavesApiPath = `${apiPath}/api/v1/leave/acceptleave`
export const updateAcceptedLeavesApiPath = `${apiPath}/api/v1/leave/approveleave`

// MY LEAVES AND GATEPASS
export const getMyLeavesAndGatepassApiPath = `${apiPath}/api/v1/leave/myleave`
export const createLeavesAndGatePassApiPath = `${apiPath}/api/v1/leave`

// GATEPASS APIS
export const getPendingGatePassApiPath = `${apiPath}/api/v1/leave/pendinggatepass`
export const getApprovedGatePassApiPath = `${apiPath}/api/v1/leave/approved`
export const getAcceptedGatePassApiPath = `${apiPath}/api/v1/leave/acceptedgatepass`
export const getRejectedGatePassApiPath = `${apiPath}/api/v1/leave/rejected`
export const updatePendingGatePassApiPath = `${apiPath}/api/v1/leave/acceptgatepass`
export const updateAcceptedGatePassApiPath = `${apiPath}/api/v1/leave/approvegatepass`
export const getAllLeavesAndGatePassApiPath = `${apiPath}/api/v1/leave/all`

// attendance 
export const updateAttendanceApiPath = `${apiPath}/api/v1/attendance/updateAttendance`
export const getAllAttandenceApiPath = `${apiPath}/api/v1/attendance`
export const getMyAttandenceApiPath = `${apiPath}/api/v1/attendance/myAttendance`
export const getStaffAttendanceApiPath = `${apiPath}/api/v1/attendance/staffAttendance`
export const getGroupAttendanceApiPath = `${apiPath}/api/v1/attendance/groupPresent`

// TRAINING
export const addTrainingLinkApiPath = `${apiPath}/api/v1/training/addLinks`
export const addTrainingDocumentApiPath = `${apiPath}/api/v1/training/add`
export const addTrainingQuizApiPath = `${apiPath}/api/v1/quiz/addQuestion`
export const addAssesmentQuizApiPath = `${apiPath}/api/v1/quiz/getQuiz`



// notifications
export const getNotificationApiPath = `${apiPath}/api/v1/notifications`

// jobprofile
export const getSingleJobProfileApiPath = `${apiPath}/api/v1/jobprofile`
export const updateJobProfileApiPath = `${apiPath}/api/v1/jobprofile/update`


// SALARY
export const getAllGroupSalaryApiPath = `${apiPath}/api/v1/attendance/groupSalary`
export const getSingleGroupSalaryApiPath = `${apiPath}/api/v1/attendance`


