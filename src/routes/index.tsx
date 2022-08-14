/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import AuthenticatedRoutes from './authenticated'
import { supabase } from 'configs/supabase'
import { useStores } from 'store'

// Import your pages below
import Login from 'pages/Login'
import Register from 'pages/Register'
import ForgotPassword from 'pages/ForgotPassword'
import ForgotPasswordSuccess from 'pages/ForgotPasswordSuccess'
import Home from 'pages/Home'
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function Router() {
  const navigate = useNavigate()
  const location = useLocation()
  const [triggered, setTriggered] = useState(false)

  const getUser = useCallback(async () => {
    if (supabase.auth.user()) {
      const response = await supabase
        .from('user_profiles')
        .select(`
          id,
          fullName,
          email
        `)
        .eq('authId', supabase.auth.user()?.id)
      console.log(response)
    }
  }, [])

  useEffect(() => {
    if (!triggered) {
      setTriggered(true)
      supabase.auth.onAuthStateChange(async (event, session) => {
        console.log('EVENT: ', event)
        console.log('SESSION', session)
  
        if (event === 'SIGNED_IN') {
          // @ts-ignore
          const from = location.state?.from || '/';
          await getUser()
          navigate(from, { replace: true })
        }
  
        if (event === 'SIGNED_OUT') {
          navigate('/login')
        }
      })
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