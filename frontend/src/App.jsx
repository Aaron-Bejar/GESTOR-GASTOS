import { useEffect } from "react"

import { MyRouter } from "./router/MyRouter"
import { Spinner } from "./components/atomo/Spinner"
import { useTheme } from "./hook/useTheme"
import { useUserQuery } from "./hook/useUserQuery"
import { useAuth } from "./hook/useAuth"


function App() {
  const { session, loading: authLoading } = useAuth() // Traemos la sesión aquí también

  const { data, isLoading: userLoading } = useUserQuery({
    // 1. IMPORTANTE: Solo busca el usuario en la BD si existe una sesión activa
    enabled: !!session
  })
  const { setTheme } = useTheme()

  useEffect(() => {
    if (!data) return

    if (data.tema === '0') {
      setTheme('dark')
    } else if (data.tema === '1') {
      setTheme('light')
    }
  }, [data])
  
  if (session && userLoading) {
    return (
      <div className="fixed inset-0 bg-bg-primary flex items-center justify-center">
        <Spinner />
      </div>
    )
  }

  return (
    <>
      <MyRouter />
    </>
  )
}

export default App
