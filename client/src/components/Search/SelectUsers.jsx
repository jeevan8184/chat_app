
import DoneIcon from '@mui/icons-material/Done';
import { Avatar } from '@mui/material';
import { useState } from 'react';
import { useNavigate} from 'react-router-dom'

const SelectUsers = ({newUser,setSelectedMembers,selectedMembers}) => {
    const Navigate=useNavigate();
    const [isSelect, setIsSelect] = useState(true);
    
    const handleSetMembers=()=> {
        if(selectedMembers.includes(newUser)) {
            setSelectedMembers((prevMembers)=> {
                return prevMembers.filter((m)=> m !==newUser);
            })
        }else {
            setSelectedMembers((prevMembers)=> [...prevMembers,newUser])
        }
    }

    return (
    <div className=' cursor-pointer max-w-screen-sm px-2'>
       <div className={`selectUser`}>
            <div className={`flex-between `}>
                <div className={` flex gap-2 cursor-pointer`} onClick={()=> {
                    handleSetMembers();
                }}>
                    {selectedMembers.includes(newUser) ? (
                        <Avatar>
                            <DoneIcon className=' text-blue-500 font-bold ' />
                        </Avatar>
                    ): (
                        <img 
                        src={newUser.profilePic} 
                        alt='profile'
                        height={40} 
                        width={40} 
                        className=' rounded-3xl object-contain top-0 rounded-tl-5xl'
                    />
                    )}
                   
                    <div className=' flex flex-col'>
                        <p className=' font-semibold'>{newUser.username}</p>
                        <p className=' text-gray-500 text-[14px] truncate w-[300px]'>{newUser.bio}</p>
                    </div>
                </div>
            </div>   
        </div>
    </div>
  )
}

export default SelectUsers
