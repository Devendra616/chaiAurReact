import { createContext, useContext } from "react";

export const TodoContext = createContext({
  todos: [],
  addTodo: (todo) => {},
  deleteTodo: (id) => {},
  updateTodo: (id, todo) => {},
  toggleComplete: (id) => {},
});

// custom hook
export const useTodo = () => useContext(TodoContext);

export const TodoProvider = TodoContext.Provider;
