import { observer } from 'mobx-react-lite'
import MainLayout from 'layouts/MainLayout'
import { Typography } from '@mui/material';

const Home = () => {
  return (
    <MainLayout>
      <Typography variant="h3">
        Nice post
      </Typography>
    </MainLayout>
  )
}

export default observer(Home)