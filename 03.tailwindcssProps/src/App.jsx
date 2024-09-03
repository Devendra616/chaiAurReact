import { useState } from 'react'
import './App.css'
import Card from './components/Card'

function App() {
  const [count, setCount] = useState(0)
  const user = {
    "name":"Dev", "age":38
  }
  return (
    <>
      <h1 className='bg-green-400 rounded-xl text-orange-600 p-4 mb-4'>Tailwind CSS</h1>
       <Card username= "Devendra" attr={user} btnText="Click Me" />  
       <Card username="Rakesh" btnText="Visit Me"/>  

    </>
  )
}

export default App
