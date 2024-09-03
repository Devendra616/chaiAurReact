import { useState } from "react"

function App() {
  
    const [color, setColor] = useState('Black')

  return (
  <div className="w-full h-screen" style={{backgroundColor:color}}>
    <div className="fixed bottom-6 bg-slate-300 flex flex-wrap justify-center inset-x-0 px-2 ">
      <div className="flex flex-wrap gap-3 justify-center px-3 py-2 rounded-xl">
        <button onClick={() => setColor('#ef4444')} className="outline-none px-4 py-1 rounded-full text-white shadow-lg bg-red-500 ">Red</button>
        <button onClick={() => setColor('#22c55e')} className="outline-none px-4 py-1 rounded-full text-white shadow-lg bg-green-500 ">Green</button>
        <button onClick={() => setColor('#3b82f6')} className="outline-none px-4 py-1 rounded-full text-white shadow-lg bg-blue-500 ">Blue</button>
        <button onClick={() => setColor('#f97316')} className="outline-none px-4 py-1 rounded-full text-white shadow-lg bg-orange-500 ">Orange</button>
        <button onClick={() => setColor('#64748b')} className="outline-none px-4 py-1 rounded-full text-white shadow-lg bg-slate-500 ">Slate</button>
        <button onClick={() => setColor('#eab308')} className="outline-none px-4 py-1 rounded-full text-white shadow-lg bg-yellow-500 ">Yellow</button>
        <button onClick={() => setColor('#14b8a6')} className="outline-none px-4 py-1 rounded-full text-white shadow-lg bg-teal-500 ">Teal</button>
      </div>
    </div>
  </div>
  )
}

export default App
