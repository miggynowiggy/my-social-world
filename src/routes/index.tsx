/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { observer } from 'mobx-react-lite';
import AuthenticatedRoutes from './authenticated'
import { supabase } from 'configs/supabase'
import { useStores } from 'store'

// Import your pages below
import Login from 'pages/Login'
import Register from 'pages/Register'
import ForgotPassword from 'pages/ForgotPassword'
import ForgotPasswordSuccess from 'pages/ForgotPasswordSuccess'
import Home from 'pages/Home'

import { IUser } from 'models';

const Router = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [triggered, setTriggered] = useState(false)
  const { globalStore } = useStores()

  const getUser = useCallback(async () => {
    if (supabase.auth.user()) {
      const response = await supabase
        .from<IUser>('user_profiles')
        .select(`*`)
        .eq('auth_id', supabase.auth.user()?.id)
      globalStore.setUser(response.data?.length ? response.data[0] : null);
    }
  }, [supabase.auth.user()])

  useEffect(() => {
    if (!triggered) {
      setTriggered(true)
      supabase.auth.onAuthStateChange(async (event) => {  
        switch (event) {
          case 'SIGNED_IN': {
            // @ts-ignore
            const from = location.state?.from || '/';
            navigate(from, { replace: true })
            break;
          }

          case 'SIGNED_OUT': {
            navigate('/login')
            break;
          }
        }
      })
      getUser()
    }

    return () => {
      supabase.removeAllSubscriptions()
    }
  }, [])

  return (
    <Routes>
      {/* Import your public pages below, pages that doesnt need any authentication when visiting */}
      {/* e.g: Privacy Policies, Sign up page, Terms and conditions */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/forgot-password-success" element={<ForgotPasswordSuccess />} />

      <Route element={<AuthenticatedRoutes/>}>
        {/* Import your protected pages below, pages that needs authenticaation when visiting */}
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  )
}

export default observer(Router)