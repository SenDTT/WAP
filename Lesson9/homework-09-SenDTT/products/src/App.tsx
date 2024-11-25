import './App.css'
import ProductsList from './components/ProductsList'

function App() {
  return (
    <div className='Products-List-App'>
      <h1 className='text-2xl text-green-700 text-center font-mono uppercase'>Products</h1>
      <ProductsList />
    </div>
  )
}

export default App
