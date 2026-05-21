
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../hook/useAuth'
import { Spinner } from '../../components/atomo/Spinner'

export const ProtectedRoute = ({ redirectTo = "/login" }) => {

    const { session, loading } = useAuth()

    if (loading) return <Spinner />

    if (!session) {
        return <Navigate to={redirectTo} replace />
    }

    return <Outlet />
}