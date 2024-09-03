import {useState} from 'react'

function App() {

  let [count, setCount] = useState(15)

  function increase() {    
    if(count <20) {
      count = count + 1
      console.log(count);
      setCount(count)
    }
   }
  function decrease() {
    if(count>0) {
      setCount(count-1)
    }
   }
 

  return (
    <>
      <h1>Chai aur React</h1>
      <h3>Count: {count}</h3>
      <button onClick={increase}>Add</button>
      <button onClick={decrease}>Reduce</button>
      <p>Latest count value is :{count}</p>
    </>
  )
}

export default App
