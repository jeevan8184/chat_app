
import React, { useCallback, useContext, useState } from 'react'
import { ChatGroupContext } from '../../ChatGroup/ChatGroupProvider';
import { Button } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { createGroup } from '../../../api';
import { useNavigate } from 'react-router-dom';
import { SocketContext } from '../../ChatForm/ChatContext';

const GroupPage = () => {
  const Navigate=useNavigate();
  const {members,setMembers}=useContext(ChatGroupContext);
  const {chatSender}=useContext(SocketContext);


  const initState={profilePic:'',groupName:'',bio:'',members,newCreator:chatSender};

  const [formdata, setFormdata] = useState(initState);
  const [uploadImage, setUploadImage] = useState([]);

  const onDrop=useCallback((acceptedFiles)=> {
    if(acceptedFiles) {
      const file=acceptedFiles[0];
      const fileReader=new FileReader();

      fileReader.onload=()=> {
        setFormdata((prevdata)=> ({...prevdata,profilePic:fileReader.result}));
      }
      fileReader.readAsDataURL(file);
      setUploadImage([
        Object.assign(file,{
          preview:URL.createObjectURL(file),
        })
      ])
    }
  },[])
  
  const {getRootProps,getInputProps}=useDropzone({onDrop})

  const handleCreate=async()=> {

      const data=await createGroup(formdata);
      console.log('data',data.data);
      setFormdata(initState);
      setMembers([]);
      Navigate('/');
      window.location.reload();
  }

  return (
    <div className=' flex-center mt-10 max-w-sm:w-full'>
      <div className=' bg-gray-900 text-white px-6 py-3 pb-6 rounded-md w-[500px] flex flex-col gap-4'>
        <h1 className=' font-semibold text-2xl flex-center'>Create Group</h1>
        <div className=' flex flex-row gap-3'>
          <div className=''>
                <div className=' h-24 w-24 bg-[#2B2B2B] rounded-full flex-center'>
                  { uploadImage.length>0 ? (
                      <img src={formdata.profilePic} alt='profilepic' height={96} width={96} className=' rounded-full object-cover' />
                  ):(
                    <img src='/assets/profile.svg' alt='profilepic' height={28} width={28} className='image' />
                  )}
              </div>
            </div>
          <div {...getRootProps()}>
            <input {...getInputProps()}  /><span className=' text-blue-500 font-semibold ml-4 '>choose file</span>
            {uploadImage && (
              <p className=''>{uploadImage[0]?.name}</p>
            )}
          </div>
        </div>
        <div className=' flex flex-col gap-2 mt-2'>
          <p className=''>Enter Group Name</p>
          <input 
            type='text' 
            value={formdata.groupName} 
            onChange={(e)=> setFormdata((prev)=> ({...prev,groupName:e.target.value}))}
            placeholder='group Name'
            className=' px-4 py-1 rounded-sm text-black'
         />
        </div>
        <div className=' flex flex-col gap-3'>
          {members.map((m)=> (
            <div className=' flex gap-2' key={m._id}>
              <img 
                src={m.profilePic}
                height={40}
                width={40}
                className=' rounded-full'
                alt='member'
              />
              <p className=' flex-center'>{m.username}</p>
            </div>
          ))}
        </div>
        <div className=' w-full flex flex-col gap-2 mt-2'>
          <p className=' font-semibold'>Add Bio</p>
          <textarea 
            className=' w-full text-black px-2 py-1'
            rows={4}
            value={formdata.bio}
            onChange={(e)=> setFormdata((prev)=> ({...prev,bio:e.target.value}))}
            placeholder='like adventurous'
          />
        </div>
        <Button variant='contained' onClick={handleCreate}>create Group</Button>
      </div>
    </div>
  )
}

export default GroupPage