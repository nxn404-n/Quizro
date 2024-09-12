import HomePage from './components/HomePage';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="h-screen w-screen bg-black overflow-hidden">
      <NavBar />
      <HomePage />
    </div>
  )
}

export default App;