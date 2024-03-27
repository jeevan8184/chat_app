


import { Dialog, DialogActions } from '@mui/material';
import React, { useEffect, useState } from 'react'

export const ExitDialog = ({newOpen,handleExit}) => {
    const [open, setOpen] = useState(newOpen);

    useEffect(()=> {
        setOpen(newOpen);
    },[newOpen]);
    
  return (
    <div>
        <Dialog 
            open={open}
            onClose={()=> setOpen(false)}
        >
            <DialogActions className=' flex flex-col gap-2'>
                <button 
                    onClick={()=> handleExit() } 
                    className=' text-red-500 border px-4 py-2 rounded-xl w-full'
                    >
                    <p><span>Are you sure you want to</span> Exit </p>
                </button>
                <button 
                    onClick={()=>setOpen(false)}
                    className=' border px-3 py-1 rounded-xl w-full'
                    >
                        cancel
                </button>
            </DialogActions>
        </Dialog>
      </div>
  )
}


export const DeleteGroup = ({groupOpen,handleRemoveGroup}) => {
    const [open, setOpen] = useState(groupOpen);

    useEffect(()=> {
        setOpen(groupOpen);
    },[groupOpen]);
    
  return (
    <div>
        <Dialog 
            open={open}
            onClose={()=> setOpen(false)}
        >
            <DialogActions className=' flex flex-col gap-2'>
                <button 
                    onClick={()=> handleRemoveGroup() } 
                    className=' text-red-500 border px-4 py-2 rounded-xl w-full'
                    >
                    <p><p>Are you sure you want to</p>Delete the group</p>
                </button>
                <button 
                    onClick={()=>setOpen(false)}
                    className=' border px-3 py-1 rounded-xl w-full'
                    >
                        cancel
                </button>
            </DialogActions>
        </Dialog>
      </div>
  )
}