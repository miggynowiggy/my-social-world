import React from 'react'
import { AppBar, Box, Stack, Toolbar, Typography, IconButton, Menu, MenuItem } from '@mui/material'
import { AccountCircle } from '@mui/icons-material'
import { supabase } from 'configs/supabase';

const MainLayout = ({ children }: React.PropsWithChildren) => {

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  
  const handleMenu = React.useCallback((event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget), [])
  const handleClose = React.useCallback(() => setAnchorEl(null), [])

  const logout = React.useCallback(async () => {
    await supabase.auth.signOut()
  }, [])

  return (
    <Box sx={{ padding: 0, margin: 0, flexGrow: 1 }}>
      <AppBar position="sticky" component="nav">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
            MY SOCIAL WORLD
          </Typography>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={logout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      {children}
    </Box>
  )
}

export default MainLayout