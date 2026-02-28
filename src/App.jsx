import AppRouter from './config/Routes.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';

function App() {
  return (
    <ThemeProvider>
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;