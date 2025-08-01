import './App.css'
import FlowerBoxBuilder from './flower-box-builder';

function App() {
 
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-600">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-white">
          🌸 Flower Box Customizer 🌸
        </h1>
        <div>
          <FlowerBoxBuilder />
        </div>
      </div>
    </div>
  )
}

export default App