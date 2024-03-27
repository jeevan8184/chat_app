
import { Button, Grid, Paper, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux'
import { SignIn, SignUp } from '../../actions';
// import {GoogleLogin} from 'react-google-login';
import {gapi} from 'gapi-script'

const Auth = () => {

    window.gapi.load('client:auth2', () => {
        window.gapi.client.init({
          clientId:"358711883049-314cd4tlj8mi7ap5gk5mv85tu6vdu667.apps.googleusercontent.com",
            plugin_name: "chat"
      })})

    useEffect(()=> {
        gapi.load("client:auth2",()=> {
            gapi.auth2.init({clientId:"358711883049-314cd4tlj8mi7ap5gk5mv85tu6vdu667.apps.googleusercontent.com"})
        })
    },[])

    let initState={username:'',email:'',password:'',confirmPassword:''};
    const [formData, setFormData] = useState(initState);
    const [isSignIn, setIsSignIn] = useState(false);
    const Navigate=useNavigate();
    const dispatch=useDispatch();

    const handleChange=(e)=> {
        setFormData((prevData)=> ({...prevData,[e.target.name]:e.target.value}))
    }
    const handleForm=()=> {
        if(isSignIn) {
            dispatch(SignIn(formData,Navigate));
        }else {
            dispatch(SignUp(formData,Navigate));
        }
        setFormData({username:'',email:'',password:'',confirmPassword:''})
    }
    const handleSignIn=()=> {
        setIsSignIn((prevSign)=> !prevSign);
    }
    const handleSuccess=async(res)=> {
        const data=res?.profileObj;
        const token=res.tokenId;

    }
    const handleFailure = (err) => {

    };
  return (
    <div className=' flex-center items-center my-12 w-full'>
        <Paper className=' px-6 py-2 max-w-md' elevation={5}>
            <div className=' flex-center flex-col gap-1'>
                <Typography gutterBottom className=' font-semibold text-xl' variant='contained'>{isSignIn ? 'SignIn':'SignUp'}</Typography>
                <LockOpenIcon fontSize='large' className=' text-pink-400' />
            </div>
            <Grid container className=' gap-1 pt-4' item>
                {!isSignIn && (
                    <TextField name='username' variant='outlined' label='userName' type='text'  fullWidth value={formData.username} onChange={handleChange} />
                )}
                <TextField name='email' variant='outlined' label='email'    type='email' fullWidth value={formData.email}onChange={handleChange}  />
                <TextField name='password' variant='outlined' label='password' type='password'fullWidth value={formData.password} onChange={handleChange}  />
                {!isSignIn && (
                    <TextField name='confirmPassword' variant='outlined' label='confirmPassword' type='password' fullWidth value={formData.confirmPassword}  onChange={handleChange} />
                )}
                {/* <GoogleLogin clientId='358711883049-314cd4tlj8mi7ap5gk5mv85tu6vdu667.apps.googleusercontent.com'
                    crossorigin
                    render={(renderProps)=> {
                        return <Button 
                            variant='contained' 
                            fullWidth
                            startIcon={<GoogleIcon />}
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                        >
                                Google Login
                        </Button>
                    }}
                    onSuccess={handleSuccess}
                    onFailure={handleFailure}
                    cookiePolicy={'single_host_origin'}
                /> */}
                <Button variant='contained' onClick={handleForm} fullWidth>Submit</Button>
                <Button onClick={handleSignIn}>{!isSignIn ? 'have an account SignIn':'Dont have account signup'}</Button>
            </Grid>
        </Paper>
    </div>
  )
}

export default Auth