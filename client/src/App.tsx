import { Toaster } from "sonner"
import "./App.css"
import { Providers } from "./providers"
import { Router } from "./Router"

function App() {
  return (
    <>
      <Providers>
        <Router />
        <Toaster richColors />
      </Providers>
    </>
  )
}

export default App
