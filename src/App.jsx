import './App.css';
import CatchAllRoute from './pages/page.jsx';
import NavigationBar from './components/navbar.jsx';
import RegisterComponents from './components/register.jsx';

function App() {
  RegisterComponents();

  return (
    <div className="App">
      <header>
        <NavigationBar />
      </header>
      <CatchAllRoute/>
    </div>
  );
}

export default App;
