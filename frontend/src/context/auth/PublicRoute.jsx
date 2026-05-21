import { useAuth } from '../../hook/useAuth'
import { Navigate, Outlet } from 'react-router-dom'
import { Spinner } from '../../components/atomo/Spinner'

export const PublicRoute = ({ redirectTo = "/home" }) => {

    const { session, loading } = useAuth()

    if (loading) return <Spinner />

    if (session) {
        return <Navigate to={redirectTo} replace />
    }

    return <Outlet />
}