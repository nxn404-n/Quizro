import HomePage from './components/HomePage';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="h-screen w-full bg-black overflow-y-auto">
      <NavBar />
      <HomePage />
    </div>
  )
}

export default App;