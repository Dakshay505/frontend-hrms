import userPlus from '../../assets/UserPlus.png'
import departmentLogo from '../../assets/department.svg'
import usersThree from '../../assets/UsersThree.png'
import GearSix from '../../assets/GearSix.png'
import Briefcase from '../../assets/Briefcase.png'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getLoggedInUserDataAsync } from '../../redux/Slice/loginSlice'

const Home = () => {
    const dispatch = useDispatch();

    const loggedInUserData = useSelector((state: any) => state.login.loggedInUserData)
    console.log(loggedInUserData)

    useEffect(() => {
        dispatch(getLoggedInUserDataAsync());
    }, [])



    let roleName = '';

    if (loggedInUserData.admin) {
        roleName = loggedInUserData.admin.name;
    } else if (loggedInUserData.dbManager) {
        roleName = loggedInUserData.dbManager.name;
    } else if (loggedInUserData.attendanceManager) {
        roleName = loggedInUserData.attendanceManager.name;
    } else if (loggedInUserData.employee) {
        roleName = loggedInUserData.employee.name;
    } else if (loggedInUserData.manufacturing) {
        roleName = loggedInUserData.manufacturing.name;
    }
    roleName = roleName.charAt(0).toUpperCase() + roleName.slice(1);


    return (
        <div className="mx-10">
            <div className='pt-8'>
                <h1 className='text-[32px] font-bold leading-10 text-[#2E2E2E]'>Welcome Back, {roleName}!</h1>
            </div>
            <div>
                <div className='my-8'>
                    <h3 className='text-2xl font-bold leading-8 text-[#2E2E2E]'>View/Update Database</h3>
                </div>
                <div className='flex gap-4'>
                    {loggedInUserData.admin || (loggedInUserData.employee.role === 'dbManager') ? (
                        <Link to='/addemployee'>
                            <div className='flex flex-col items-center justify-center gap-[12px] bg-[#ECEDFE] rounded-lg w-[218.67px] h-[120px]'>
                                <img className='w-[32px] h-[32px]' src={userPlus} alt="Add Employee" />
                                <p className='text-[#283093] text-xl leading-7 font-medium'>Add Employee</p>
                            </div>
                        </Link>
                    ) : null}


                    {loggedInUserData.admin || (loggedInUserData.employee.role === 'dbManager') ? (

                        <Link to='/add-department'>
                            <div className='flex flex-col items-center justify-center gap-[12px]  bg-[#ECEDFE] rounded-lg w-[218.67px] h-[120px]'>
                                <img className='w-[25px] h-[32px]' src={departmentLogo} alt="Add Department" />
                                <p className='text-[#283093] text-xl leading-7 font-medium'>Add Department</p>
                            </div>
                        </Link>
                    ) : null}

                    {loggedInUserData.admin || (loggedInUserData.employee.role === 'dbManager') ? (

                        <Link to='/add-job-profile'>
                            <div className='flex flex-col items-center justify-center gap-[12px] bg-[#ECEDFE] rounded-lg w-[218.67px] h-[120px]'>
                                <img className='w-[32px] h-[32px]' src={Briefcase} alt="Add Job Profile" />
                                <p className='text-[#283093] text-xl leading-7 font-medium'>Add Job Profile</p>
                            </div>
                        </Link>
                    ) : null}




                    <Link to="/view-modify-database">
                        <div className='flex flex-col items-center justify-center gap-[12px] bg-[#ECEDFE] rounded-lg w-[218.67px] h-[120px]'>
                            <img className='w-[32px] h-[32px]' src={usersThree} alt="View Database" />
                            <p className='text-[#283093] text-xl leading-7 font-medium'>View Database</p>
                        </div>
                    </Link>
                </div>
            </div>
            {loggedInUserData.admin || (loggedInUserData.employee.role === 'dbManager') ? (

                <div>
                    <div className='my-8'>
                        <h3 className='text-2xl font-bold leading-8 text-[#2E2E2E]'>Configure Database</h3>
                    </div>
                    <div className='flex border border-solid border-[#DEDEDE] bg-[#FAFAFA] rounded-lg p-4 gap-2 w-[900px]'>
                        <div className='flex flex-col items-center justify-center w-[109px] h-[120px] gap-3'>
                            <div className=''>
                                <img className='w-[32px] h-[32px]' src={GearSix} alt="gearimg" />
                            </div>
                            <div>
                                <p className='text-[#757575]'>Configure</p>
                            </div>
                        </div>
                        <div className='flex gap-4'>
                            <Link to="/addnewfieldsemployee">
                                <div className='flex flex-col items-center justify-center w-[169px] h-[120px] bg-[#ECEDFE] rounded-lg p-6 gap-3'>
                                    <div className=''>
                                        <img className='w-[32px] h-[32px]' src={userPlus} alt="gearimg" />
                                    </div>
                                    <div>
                                        <p className='text-xl font-medium text-[#283093]'>Employee</p>
                                    </div>
                                </div>
                            </Link>
                            <Link to="/add-new-fields-for-group">
                                <div className='flex flex-col items-center justify-center w-[169px] h-[120px] bg-[#ECEDFE] rounded-lg p-6 gap-3'>
                                    <div className=''>
                                        <img className='w-[32px] h-[32px]' src={usersThree} alt="gearimg" />
                                    </div>
                                    <div>
                                        <p className='text-xl font-medium text-[#283093]'>Group</p>
                                    </div>
                                </div>
                            </Link>
                            <Link to="/add-new-fields-for-job-profile">
                                <div className='flex flex-col items-center justify-center w-[169px] h-[120px] bg-[#ECEDFE] rounded-lg p-6 gap-3'>
                                    <div className=''>
                                        <img className='w-[32px] h-[32px]' src={Briefcase} alt="gearimg" />
                                    </div>
                                    <div>
                                        <p className='text-xl font-medium text-[#283093]'>Job Profile</p>
                                    </div>
                                </div>
                            </Link>
                            <Link to="/add-workday">
                                <div className='flex flex-col items-center justify-center w-[169px] h-[120px] bg-[#ECEDFE] rounded-lg p-6 gap-3'>
                                    <div className=''>
                                        <img className='w-[32px] h-[32px]' src={departmentLogo} alt="gearimg" />
                                    </div>
                                    <div>
                                        <p className='text-xl font-medium text-[#283093]'>Working Day</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    )
}

export default Home