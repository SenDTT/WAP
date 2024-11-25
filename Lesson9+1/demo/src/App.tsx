import { createContext, useContext, useState } from 'react'
import './App.css'

const GlobalContext = createContext<{counter: number, increment: () => void}>({counter: 0, increment: () => {}})

function App() {
  let [count, setCount] = useState(0);
  const increment = () => {
    setCount(++count);
  }

  return (
    <GlobalContext.Provider value={{counter: count, increment: increment}}>
      <ChildOne />
      <ChildTwo />
    </GlobalContext.Provider>
  )
}

function ChildOne() {
  const context = useContext(GlobalContext);

  return (
    <>
    <p>This is child one - {context.counter}</p>
    <button onClick={() => context.increment()}>Inc</button>
    </>
  )
}

function ChildTwo() {
  const context = useContext(GlobalContext);

  return (
    <>
    <p>This is child two - {context.counter}</p>
    <button onClick={() => context.increment()}>Inc</button>
    </>
  )
}

export default App
