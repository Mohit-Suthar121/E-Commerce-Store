import React, { useEffect, useRef, useState } from 'react'
import UserInfoCard from '../components/UserInfoCard'
import { Outlet } from 'react-router-dom'
import AdminPaginationController from '../components/AdminPaginationController';
import { API } from '../api/axiosInstance';
import { useAdminUsersStore } from '../store/users.store';
import NoUsersFoundCard from '../components/NoUsersFoundCard';
import { Rings } from 'react-loader-spinner';

const AdminShowUsersPage = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [inputValue, setInputValue] = useState("");
    const timerRef = useRef();
    const currentUsers = useAdminUsersStore((state) => state.currentUsers);
    const setCurrentUsers = useAdminUsersStore((state) => state.setCurrentUsers);

    const handleNextPage = () => {
        if (currentPage === totalPages) return;
        setCurrentPage((state) => state + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage === 1) return;
        setCurrentPage((state) => state - 1);
    };

    async function fetchUsers() {
        try {
            setIsLoading(true)
            const response = await API.get(`/v1/admin/users/get-all-users?limit=12&page=${currentPage}&search=${searchValue}`);
            setCurrentUsers(response.data.users);
            console.log("The response is: ", response.data);

        } catch (error) {
            console.error("some error occured:", error)
        } finally {
            setIsLoading(false);
        }
    }


    async function handleChange(e) {
        setInputValue(e.target.value);
        const value = e.target.value.trim();
        clearTimeout(timerRef.current);

        timerRef.current = setTimeout(async () => {
            setCurrentPage(1);
            setSearchValue(value);
        }, 500)

    }

    useEffect(() => {
        fetchUsers();
    }, [currentPage, searchValue])

    return (
        <div className="flex-1 flex flex-col gap-5 p-5 bg-[#060606] text-neutral-200 font-sans antialiased select-none ">

            <div className="flex flex-col w-full pl-1 border-b border-neutral-900 pb-4">
                <h2 className="text-xl font-bold tracking-tight text-neutral-100">
                    User Management
                </h2>
                <p className="text-xs font-medium text-neutral-500 mt-0.5">
                    View, filter, and audit registered system accounts.
                </p>
            </div>

            <div className="search-bar-wrapper w-full flex justify-center items-center md:justify-start ">
                <div className="relative max-w-xl w-full md:max-w-sm group flex justify-center items-center">
                    <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-neutral-600 group-focus-within:text-emerald-500 transition-colors duration-200">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </span>

                    <input
                        onChange={handleChange}
                        value={inputValue}
                        type="text"
                        placeholder="Search users by name or email..."
                        className="w-full h-11 pl-10 pr-4 rounded-xl text-sm bg-neutral-950 border border-neutral-900 text-neutral-200 placeholder-neutral-700 focus:border-emerald-500/60 focus:ring-4 focus:ring-emerald-500/5 transition-all duration-200 outline-none"
                    />
                </div>
            </div>

            {currentUsers.length == 0 && !isLoading ? <NoUsersFoundCard /> : !isLoading && <div className="users-section flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4 gap-2 w-full flex-1 min-h-0 overflow-y-auto scrollbar-gutter-stable scrollbar-design">
                {currentUsers.map((user) =>
                 <UserInfoCard
                    profilePicture={user?.profilePic?.url}
                    username={user?.name}
                    email={user?.email}
                    position={user?.role}
                    key={user?._id}
                />)}

                {/* <UserInfoCard
                    profilePicture={""}
                    username={"no name"}
                    email={"something"}
                    position={"user"}
                    key={"2"}
                />
                <UserInfoCard
                    profilePicture={""}
                    username={"no name"}
                    email={"something"}
                    position={"user"}
                    key={"2"}
                /> */}


            </div>}
           

           {isLoading && <div className=" flex flex-1 justify-center items-center ">
                 <Rings
                    visible={true}
                    height="80"
                    width="80"
                    color="#ffffff"
                    ariaLabel="rings-loading"
                    wrapperStyle={{}}
                    wrapperClass=""

                />

            </div>}



            <AdminPaginationController
                currentPage={currentPage}
                totalPages={totalPages}
                isLoading={isLoading}
                onNext={handleNextPage}
                onPrev={handlePreviousPage}
            />
        </div>
    )
}

export default AdminShowUsersPage