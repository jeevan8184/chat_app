import React, { useCallback, useEffect, useState } from 'react'
import {Button} from '@mui/material'
import { useParams } from 'react-router-dom'
import { PostData, getData } from '../../api';
import {useDropzone} from 'react-dropzone';
import { useNavigate } from 'react-router-dom';

const Onboarding = () => {
  const {id}=useParams();
  const Naviagate=useNavigate();
  const initState={ profilePic:'/assets/profile.svg', username:'', bio:'',author:''}
  const [formData, setFormData] = useState(initState);
  const [uploadedImage, setUploadedImage] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles) {
      const file = acceptedFiles[0];
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setFormData((prevData) => ({...prevData, profilePic: fileReader.result, }));
      };
      fileReader.readAsDataURL(file);
      setUploadedImage([
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      ]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useEffect(()=> {
     const newFunc=async()=> {
      const data=await getData(id);
      console.log(data);
      setFormData((prevdata)=> ({...prevdata,username:data.data.username,author:data.data._id}));
     }
     newFunc();
  },[id])

  const handleSubmit=async(e)=> {
    e.preventDefault();
    console.log(formData);
    await PostData(formData);
    Naviagate('/');
    window.location.reload();

  }

  const handleChange=(e)=> {
    setFormData((prevData)=> ({...prevData,[e.target.name]:e.target.value}))
  }

  return (
    <div className=' bg-black flex justify-center min-h-screen pt-20'>
      <div className=''>
        <form noValidate onSubmit={handleSubmit} className='form gap-2 w-[400px] text-white'>
          <h1 className=' text-white text-3xl font-bold py-4'>Onboarding...</h1>
          <div className='flex gap-10 items-center'>
            <div className=''>
                <div className=' h-24 w-24 bg-[#2B2B2B] rounded-full flex-center'>
                  { uploadedImage.length>0 ? (
                    <>
                      <img src={uploadedImage[0]?.preview} alt='profilepic' height={96} width={96} className=' rounded-full object-cover' />
                    </>
                  ):(
                    <>
                    <img src={formData.profilePic} alt='profilepic' height={28} width={28} className='image' />
                    </>
                  )}
              </div>
            </div>
            <div className='' {...getRootProps()}  >
              <input {...getInputProps()} />  <span className=' text-blue-500 cursor-pointer font-semibold text-lg mr-2'>choose file</span>
              {uploadedImage && (
                 <span className='text-white'>{uploadedImage[0]?.name}</span>
              )}
            </div>
          </div>
            <span className=' span mt-8'> Username</span>
            <input placeholder='username' type='text' value={formData.username} name='username' onChange={handleChange} className='input' />
            <span className=' span'> bio</span>
            <textarea rows={5} placeholder='add your bio' type='text' value={formData.bio} name='bio' onChange={handleChange} className='input' />
            <Button variant='contained' type='submit'>submit</Button>
        </form>
      </div>
    </div>
  )
}

export default Onboarding;