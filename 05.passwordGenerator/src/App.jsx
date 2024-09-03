import { useCallback, useEffect, useRef, useState } from "react"


function App() {
  
  const [length,setLength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false)
  const [specialCharAllowed, setSpecialCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const generatePassword = useCallback(()=> {
        let pass ="";
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

        if(numAllowed) str += "0123456789"
        if(specialCharAllowed) str += "!#$*-_"

        for(let i=1; i<= length;i++) {
          const randomIndex = Math.floor(Math.random()*str.length+1)
          pass += str.charAt(randomIndex)          
        }
        setPassword(pass)

  }, [length, numAllowed, specialCharAllowed, setPassword])

  const copyTextToClipBoard = useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,25)
    window.navigator.clipboard.writeText(password)
  },[password])
  
useEffect(()=> {
generatePassword()
},[length,numAllowed, specialCharAllowed,generatePassword])

  return (
    < >
      <div className="w-full max-w-md mx-auto rounded-lg my-8 px-4 text-orange-500 bg-gray-700">
        <h1 className="text-white text-center my-3">Password Generator</h1>
        <div className="flex shadow overflow-hidden mb-4">
          <input type="text" name="password" 
          value={password} ref={passwordRef}
          className="outline-none w-full py-1 px-3"
          placeholder="password" readOnly/>
          <button 
          onClick={copyTextToClipBoard}
          className="bg-blue-700 text-white px-3 py-0.5 shrink-0 outline-0">Copy</button>
        </div>
        <div className="flex text-sm gap-x-2 items-center">
          <div className="flex items-center gap-x-1">
             <input type="range" min={6} max={25}
              onChange={(e) => setLength(e.target.value)}
            value={length} className="cursor-pointer"/>
            <label >Length: {length}</label> 
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox" id="num" value={numAllowed} defaultChecked={numAllowed}
          onChange={()=> setNumAllowed(prev => !prev)} />
            <label htmlFor="num">Numbers</label>
        </div>   
        <div className="flex items-center gap-x-1">
            <input type="checkbox" id="special" value={specialCharAllowed} defaultChecked={specialCharAllowed}
          onChange={()=> setSpecialCharAllowed(prev => !prev)} />
            <label htmlFor="special">Special Chars</label>
        </div>       
        </div>
       
      </div>
    </>
  )
}

export default App
