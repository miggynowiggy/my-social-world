import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Unstable_Grid2'
import Stack from '@mui/material/Stack'
import { Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const ForgotPasswordSuccess = () => {
  const navigate = useNavigate()

  return (
    <Grid container alignItems="center" justifyContent="center" height="100vh">
      <Grid xs={4}>
        <Paper 
          elevation={5}
          sx={{ padding: 5, color: 'primary' }}
        >
          <Stack spacing={2}>
            <Typography variant="h5" align="center" gutterBottom>Forgot Password</Typography>
            <Typography variant="body1" align="center">An email will be sent to you regarding the next steps to reset your password.</Typography>
            <Button 
              variant="contained"
              color="primary"
              size="small"
              fullWidth
              disableElevation
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

export default ForgotPasswordSuccess