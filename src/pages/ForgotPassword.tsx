import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Unstable_Grid2'
import Stack from '@mui/material/Stack'
import { useFormik } from 'formik'
import * as yup from 'yup'
import {Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const ForgotPassword = () => {
  const navigate = useNavigate()

  const validationScheme = yup.object({
    email: yup
      .string()
      .email('Invalid email')
      .required('Email is required')
  })

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validateOnBlur: true,
    validateOnChange: true,
    validateOnMount: true,
    validationSchema: validationScheme,
    onSubmit: async ({ email }, { setFieldError }) => {
      navigate('/forgot-password-success')
    }
  })

  return (
    <Grid container alignItems="center" justifyContent="center" height="100vh">
      <Grid xs={4}>
        <Paper 
          elevation={5}
          sx={{ padding: 5, color: 'primary' }}
        >
          <Stack spacing={2}>
            <Typography variant="h5" align="center" gutterBottom>Forgot Password</Typography>
            <TextField 
              id="email" 
              label="Enter your Registered Email"
              variant="outlined"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email ? formik.errors.email : null}
              sx={{ m: 1, width: '100%' }}
            />

            <Button
              variant="contained" 
              color="primary" 
              disableElevation
              fullWidth
              onClick={formik.submitForm}
            >
              Send Password Reset Email
            </Button>

            <Button 
              variant="text"
              color="primary"
              size="small"
              fullWidth
              onClick={() => navigate('/login')}
            >
              Back to Login
            </Button>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default ForgotPassword