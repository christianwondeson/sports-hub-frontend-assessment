
import { AppRouter } from "./router"
import { COLORS } from "./constants/colors"

import { MatchProvider } from "./context/MatchContext"

function App() {
  return (
    <div style={{ backgroundColor: COLORS.backgroundDark, color: COLORS.foregroundPrimary }}>
      <MatchProvider>
        <AppRouter />
      </MatchProvider>
    </div>
  )
}

export default App
