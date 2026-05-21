import { useEffect } from "react"

import { MyRouter } from "./router/MyRouter"
import { Spinner } from "./components/atomo/Spinner"
import { useTheme } from "./hook/useTheme"
import { useUserQuery } from "./hook/useUserQuery"


function App() {
  const { data, isLoading } = useUserQuery()
  const { setTheme } = useTheme()

  useEffect(() => {
    if (!data) return

    if (data.tema === '0') {
      setTheme('dark')
    } else if (data.tema === '1') {
      setTheme('light')
    }
  }, [data])

  if (isLoading) return <Spinner />
  
  return (
    <>
      <MyRouter />
    </>
  )
}

export default App
