import './App.css';
import CatchAllRoute from './pages/page.jsx';
import NavigationBar from './components/navbar.jsx';

function App() {
  return (
    <div className="App">
      <header>
        <NavigationBar />
      </header>
      <CatchAllRoute />
    </div>
  );
}

export default App;
