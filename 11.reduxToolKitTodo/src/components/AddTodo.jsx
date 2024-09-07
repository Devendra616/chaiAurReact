import { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {addTodo, updateTodo} from '../features/todo/todoSlice'
function AddTodo({editTodoId, onUpdateTodo}) {

    const [input, setInput] = useState("")
   
    const dispatch = useDispatch()
    const todos = useSelector((state) => state.todos)

    useEffect(() => {
        if(editTodoId ) {
          const todo = todos.find(todo => todo.id === editTodoId)
          if(todo) {
            setInput(todo.text)
          }
        }else {
          setInput('')
        }
    },[editTodoId, todos])

    const addUpdateTodoHandler = (e) => {
        e.preventDefault()
        if(editTodoId) {
          dispatch(updateTodo({id: editTodoId, text: input}))          
          onUpdateTodo(null)
        }else {
          dispatch(addTodo(input))
        }
        setInput('')
    }

    return (
        <form onSubmit={addUpdateTodoHandler} className="space-x-3 mt-12">
          <input
            type="text"
            className="bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            placeholder="Enter a Todo..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          >
            {editTodoId ? "Update Todo" : "Add Todo"}
            
          </button>
        </form>
      )
}

export default AddTodo