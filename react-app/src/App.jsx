import './App.css'
import Card from './components/Card';

function App() {
  return (
    <div className="app">
      <div className='cards'>
        <Card path='./Images/img01.jpg'/>
        <Card path='./Images/img02.jpg'/>
        <Card path='./Images/img03.jpg'/>
      </div>
    </div>
  );
}

export default App;