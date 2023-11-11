import './App.css';
import BuilderPage from './pages/page.jsx';
import NavigationBar from './components/navbar.jsx';
import RegisterComponents from './components/register.jsx';
import LoginSignup from './components/auth/LoginSignup.jsx';

function App() {
  RegisterComponents();

  return (
    <div className="App">
      <header>
        <NavigationBar />
      </header>
      <BuilderPage />
    </div>
  );
}

export default App;
