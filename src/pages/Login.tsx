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
import { useLocation, useNavigate } from 'react-router-dom'
import { supabase } from 'configs/supabase'
import toast from 'react-hot-toast'

const Login = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  // @ts-ignore
  const from = location.state?.from || "/"

  const validationScheme = yup.object({
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
      email: '',
      password: ''
    },
    validateOnBlur: true,
    validateOnChange: true,
    validateOnMount: true,
    validationSchema: validationScheme,
    onSubmit: async ({ email, password }) => {
      const { error } = await supabase.auth.signIn({ email, password });
      if (error?.message) {
        console.log('LOGIN ERROR: ', error);
        toast.error(
          error?.message || "Something went wrong, please try again later", 
        )
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
            <Typography variant="h5" align="center" gutterBottom>Log In</Typography>
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
              onClick={formik.submitForm}
            >
              Login
            </Button>
            <Button 
              variant="outlined"
              color="primary"
              size="small"
              fullWidth
              onClick={() => navigate('/register')}
            >
              Register
            </Button>
            <Button 
              variant="text"
              color="warning"
              size="small"
              fullWidth
              onClick={() => navigate('/forgot-password')}
            >
              Forget Password?
            </Button>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default observer(Login)