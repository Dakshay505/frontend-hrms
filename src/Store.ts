import { configureStore } from '@reduxjs/toolkit'
import employeeReducer from './redux/Slice/EmployeeSlice'
import departmentReducer from './redux/Slice/DepartmentSlice'
import jobProfileReducer from './redux/Slice/JobProfileSlice'
import loginReducer from './redux/Slice/loginSlice';
import leaveReducer from './redux/Slice/LeaveAndGatepassSlice';
import UpdateHierarchyReducer from './redux/Slice/updateHierarchySlice'
import AttandenceReducer from './redux/Slice/AttandenceSlice';
import TrainingReducer from './redux/Slice/TrainingSlice';

export const store = configureStore({
  reducer: {
    employee: employeeReducer,
    department: departmentReducer,
    jobProfile: jobProfileReducer,
    login: loginReducer,
    leave: leaveReducer,
    updateHierarchy: UpdateHierarchyReducer,
    attandence: AttandenceReducer,
    training: TrainingReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>;