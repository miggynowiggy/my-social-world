import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { supabase } from 'configs/supabase'

const AuthenticatedRoute= () => {
  const location = useLocation()
  return (
    supabase.auth.user() ? 
      <Outlet /> : 
      <Navigate to="/login" state={{ from: location.pathname }} />
  )
}

export default AuthenticatedRoute