import './App.css';
import { ToDo } from './components/ToDo';

function App() {
  return (
    <div className="app" style={{ backgroundImage: "url(/sky.png)" }}>
        <ToDo />
    </div>
  );
}

export default App;