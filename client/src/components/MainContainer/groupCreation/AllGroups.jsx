import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { ChatGroupContext } from '../../ChatGroup/ChatGroupProvider';

const AllGroups = ({group}) => {
    const {groupNotifies}=useContext(ChatGroupContext);

    const Navigate=useNavigate();

    console.log('groupNotifies',groupNotifies);

    const newGroupNotifies=groupNotifies.filter((n)=> n.groupId===group._id);

  return (

    <div className=' cursor-pointer'>
        <div className=' px-4 py-1 bg-gray-100 rounded-2xl mx-2 cursor-pointer'>
            <div className=' flex-between '>
                <div className=' flex gap-2 cursor-pointer relative' onClick={()=> {
                    Navigate(`/group/${group._id}`);
                }}>
                    {/* {Online && (
                        <div className=' bg-green-500 rounded-full absolute top-0 p-1.5'></div>
                    )} */}
                <img 
                    src={group.profilePic} 
                    alt='profile'
                    height={40} 
                    width={40} 
                    className=' rounded-3xl object-contain top-0 rounded-tl-5xl'
                />
                <div className=' flex flex-col'>
                    <p className=' font-semibold'>{group.groupName}</p>
                    <p className=' text-gray-500 text-[14px]'>{group.creator.username}</p>
                    {/* <div className=' text-green-500 font-semibold text-[14px]'>{Online?.isTyping===true && "typing..."}</div> */}
                </div>
                </div>
                <div className=' text-[12px] rounded-full px-2 bg-green-500 text-white'>{newGroupNotifies.length>0 ? `${newGroupNotifies.length}`:null}</div>

            </div>
        </div>
    </div>
  )
}

export default AllGroups