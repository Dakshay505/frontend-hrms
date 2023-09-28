import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./redux/Slice/EmployeeSlice";
import groupReducer from "./redux/Slice/GroupSlice";
import jobProfileReducer from "./redux/Slice/JobProfileSlice";
import loginReducer from "./redux/Slice/loginSlice";
import leaveReducer from "./redux/Slice/LeaveAndGatepassSlice";
import UpdateHierarchyReducer from "./redux/Slice/updateHierarchySlice";
import AttandenceReducer from "./redux/Slice/AttandenceSlice";
import TrainingReducer from "./redux/Slice/TrainingSlice";
import SalaryReducer from "./redux/Slice/SalarySlice";
import notificationSlice from "./redux/Slice/notificationSlice";
import departmentSlice from "./redux/Slice/departmentSlice";
import ShopSlice from "./redux/Slice/ShopSlice";
import WorkDaySlice from "./redux/Slice/WorkDaySlice";
export const store = configureStore({
  reducer: {
    employee: employeeReducer,
    group: groupReducer,
    jobProfile: jobProfileReducer,
    login: loginReducer,
    leave: leaveReducer,
    updateHierarchy: UpdateHierarchyReducer,
    attandence: AttandenceReducer,
    training: TrainingReducer,
    salary: SalaryReducer,
    notification: notificationSlice,
    department: departmentSlice,
    Shop:ShopSlice,
    Work:WorkDaySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
