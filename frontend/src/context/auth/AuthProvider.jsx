import { useEffect, useState } from 'react'
import { supabase } from '../../supabase/cliente'
import { AuthContext } from './AuthContext'


export const AuthProvider = ({ children }) => {
    const [session, setSession] = useState(null)
    const [loading, setLoading] = useState(true)

    const user = session?.user ?? null

    useEffect(() => {
        if (session) {
            const cleanUrl = window.location.pathname
            window.history.replaceState({}, document.title, cleanUrl)
        }
    }, [session])

    useEffect(() => {
        const getInitialSession = async () => {
            const { data, error } = await supabase.auth.getSession()
            if (error) {
                console.error('Error obteniendo sesión:', error.message)
            }
            setSession(data.session ?? null)
            setLoading(false)
        }
        getInitialSession()

        const { data: listener } = supabase.auth.onAuthStateChange(
            (event, session) => {
                setSession(session)
            }
        )
        return () => {
            listener.subscription.unsubscribe()
        }
    }, [])

    return (
        <AuthContext.Provider value={{ session, user, loading }}>
            {children}
        </AuthContext.Provider>
    )
}