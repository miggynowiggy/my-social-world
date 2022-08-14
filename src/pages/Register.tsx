import { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Unstable_Grid2'
import Stack from '@mui/material/Stack'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { useFormik } from 'formik'
import { observer } from 'mobx-react-lite'
import * as yup from 'yup'
import { FormControl, FormHelperText, InputLabel, Typography } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'
import { useStores } from 'store';
import { supabase } from 'configs/supabase'
import toast from 'react-hot-toast'
import { IUser } from 'models';

const Register = () => {
  const navigate = useNavigate()
  const { globalStore } = useStores()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const validationScheme = yup.object({
    fullName: yup
      .string()
      .min(4, 'Wehhh? I don\'t believe you name is this short')
      .required('Full Name is required'),
    email: yup
      .string()
      .email('Invalid email')
      .required('Email is required'),
    password: yup
      .string()
      .min(8, 'Password should be a minimum of 8 characters')
      .required('Password is required')
  })

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: ''
    },
    validateOnBlur: true,
    validateOnChange: true,
    validateOnMount: true,
    validationSchema: validationScheme,
    onSubmit: async ({ fullName, email, password }) => {
      setLoading(true)
      const { error, user } = await supabase.auth.signUp(
        { 
          email, 
          password  
        }, 
        { 
          data: {
            fullName
          }
        }
      )

      if (error?.status) {
        console.log('REGISTER ERROR: ', error?.message)
        toast.error(
          error?.message || "Something went wrong, please try again later",
        )
      }

      if (user?.email) {
        globalStore.setAuthUser({ ...user })
        try {
          await supabase
            .from<IUser>('user_profiles')
            .insert({
              fullName,
              email,
              authId: user.id
            })
          toast.success(`Welcome ${fullName}! 🥳 Please check your email for verification.`, {
            duration: 10000
          })
          navigate('/login', { replace: true })
        } catch (err) {
          console.log('ERR WHILE CREATING USER: ', err);
          await supabase.auth.signOut();
          toast.error('Something went wrong, please try again later.')
        }
        setLoading(false);
      }
    }
  })

  const handleShowPassword = () => setShowPassword(!showPassword)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
    <Grid container alignItems="center" justifyContent="center" height="100vh">
      <Grid xs={4}>
        <Paper 
          elevation={5}
          sx={{ padding: 5, color: 'primary' }}
        >
          <Stack spacing={2}>
            <Typography variant="h5" align="center" gutterBottom>Register</Typography>

            <TextField 
              id="fullName" 
              label="Full Name"
              variant="outlined"
              type="text"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              helperText={formik.touched.fullName && formik.errors.fullName ? formik.errors.fullName : null}
              sx={{ m: 1, width: '100%' }}
            />

            <TextField 
              id="email" 
              label="Email"
              variant="outlined"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email ? formik.errors.email : null}
              sx={{ m: 1, width: '100%' }}
            />
            
            <FormControl 
              sx={{ m: 1, width: '100%' }}
              variant="outlined"
              error={formik.touched.password && Boolean(formik.errors.password)}
            >
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
              <FormHelperText>{formik.touched.password && formik.errors.password ? formik.errors.password : null}</FormHelperText>
            </FormControl>
            <Button
              variant="contained" 
              color="primary" 
              disableElevation
              fullWidth
              disabled={loading}
              onClick={formik.submitForm}
            >
              Register
            </Button>
            <Button 
              variant="text"
              color="primary"
              onClick={() => navigate('/login')}
              disabled={loading}
              fullWidth
            >
              Back to Login
            </Button>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default observer(Register)