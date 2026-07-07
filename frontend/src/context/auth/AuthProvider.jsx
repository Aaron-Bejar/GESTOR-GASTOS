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
        const { data: listener } = supabase.auth.onAuthStateChange(
            (event, session) => {
                setSession(session)
                setLoading(false)
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