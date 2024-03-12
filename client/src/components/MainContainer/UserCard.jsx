
import React from 'react'
import { Link } from 'react-router-dom';

const UserCard = ({newUser}) => {
  return (
    <div className='usercard'>
           <Link to={`/chat/${newUser.author._id}`} className=' flex gap-2'>
           <img 
                src={newUser.profilePic} 
                alt='profilePic' 
                height={40} 
                width={40} 
                className=' rounded-full'
            />
            <div className=' flex flex-col'>
                <p className=' font-semibold'>{newUser.username}</p>
                <p className=' text-[15px]'>{newUser.author.email}</p>
            </div>
           </Link>
    </div>
  )
}

export default UserCard;