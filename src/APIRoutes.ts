export const apiPath = `http://localhost:5050`;
// export const apiPath = ``;

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
export const getApprovedGatePassApiPath = `${apiPath}/api/v1/leave/approvedgatepass`
export const getAcceptedGatePassApiPath = `${apiPath}/api/v1/leave/acceptedgatepass`
export const getRejectedGatePassApiPath = `${apiPath}/api/v1/leave/rejectedgatepass`
export const updatePendingGatePassApiPath = `${apiPath}/api/v1/leave/acceptgatepass`
export const updateAcceptedGatePassApiPath = `${apiPath}/api/v1/leave/approvegatepass`
export const getAllLeavesAndGatePassApiPath = `${apiPath}/api/v1/leave/all`

// attendance 
export const getPresentNumberApiPath = `${apiPath}/api/v1/attendance/getPresentNumber`
export const getAllTodayPunchesApiPath = `${apiPath}/api/v1/attendance/getallpunches`
export const updateAllTodayPunchesApiPath = `${apiPath}/api/v1/attendance/approveAttendance`
// export const postAttandenceByDateApiPath = `${apiPath}/api/v1/attendance/getattendancebydate`
export const getAllAttandenceApiPath = `${apiPath}/api/v1/attendance`
export const getMyAttandenceApiPath = `${apiPath}/api/v1/attendance/myattendance`
export const getPresentBelowApiPath = `${apiPath}/api/v1/attendance/getpresentbelow`

// TRAINING
export const addTrainingLinkApiPath = `${apiPath}/api/v1/training/addLinks`
export const addTrainingDocumentApiPath = `${apiPath}/api/v1/training/add`
export const addTrainingQuizApiPath = `${apiPath}/api/v1/quiz/addQuestion`



// notifications
export const getNotificationApiPath = `${apiPath}/api/v1/notifications`

// jobprofile
export const getSingleJobProfileApiPath = `${apiPath}/api/v1/jobprofile`
export const updateJobProfileApiPath = `${apiPath}/api/v1/jobprofile/update`


// SALARY
export const getAllGroupSalaryApiPath = `${apiPath}/api/v1/attendance/groupSalary`
export const getSingleGroupSalaryApiPath = `${apiPath}/api/v1/attendance`


