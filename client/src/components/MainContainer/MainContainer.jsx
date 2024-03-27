
import { useContext, useEffect, useRef } from "react";
import UserCard from "./UserCard";
import { UserContext } from "./UserContext";
import { RotateLoader } from "react-spinners";
import Topbar from "../Topbar/Topbar";
import Notifications from "./options/Notifications";
import ChatMessages from '../ChatForm/ChatMessages'
import {useLocation} from 'react-router-dom';
import ScrollToBottom from 'react-scroll-to-bottom'  
import AllGroups from "./groupCreation/AllGroups";
import GroupMessages from "../ChatGroup/GroupMessages";


const MainContainer = () => {

  const {pathname}=useLocation();       
  const {users,allGroups}=useContext(UserContext);

  const scroll=useRef();

  useEffect(()=> {
    scroll.current?.scrollIntoView({ behavior: 'smooth' });
  },[])

  return (
     <div className=" z-0">
        <Topbar/>
      <div className=" md:flex flex-row gap-1">
          <div className=" flex ">
            {!users.length>0 ? (
              <div className=" ml-10 flex-center mt-20">
                <RotateLoader />
              </div>
            ): (
              <div className=" flex flex-col py-1 max-sm:w-full w-[600px] ">
                <div className=" px-4 py-2 flex gap-2 justify-between">
                  <h1 className=" font-semibold text-3xl">Users</h1>
                    <Notifications />
                </div>
                <ScrollToBottom>
                <div className=' bg-gray-50  min-h-screen flex flex-col gap-2 overflow-y-auto'>
                  <div className=" flex flex-col gap-2">
                  {users?.map((newUser,i)=> (
                    <div className=" flex flex-col gap-2 cursor-pointer" key={i}>
                      <UserCard newUser={newUser} />
                    </div>
                  ))}
                  </div>
                  <div className=" flex flex-col gap-2">
                    <h1 className=" font-semibold text-3xl my-2 px-4 py-2 ">Group Chats</h1>
                     {allGroups.map((g)=> (
                      <div className="flex flex-col gap-2 cursor-pointer" key={g._id}>
                        <AllGroups group={g} />
                      </div>
                     ))}
                  </div>
                  <div ref={scroll} className=" list_item" />
                </div>
                </ScrollToBottom>
              </div>
              )}
              <div className=" w-1 bg-neutral-500 h-full"></div>
          </div>
          <div className=" w-full">
          <div className=" w-full max-sm:hidden">
            {pathname.includes('/chat') && (
             <div className="">
                 <ChatMessages />
             </div>
            )}
          </div>
          <div className=" w-full max-sm:hidden">
            {pathname.includes('/group') && (
             <div className="">
                 <GroupMessages />
             </div>
            )}
          </div>
          </div>
      </div>
     </div>
  )
}

export default MainContainer