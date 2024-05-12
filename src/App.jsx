import React from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import TodoList from "./components/TodoList";
import { useState } from "react";
import TodosProvider from "./contexts/todoContext";
import { SnakBarProvider } from "./contexts/SnakBarContext";

const intialTodos = [
  {
    id: uuidv4(),
    tache: "Finir mon Projet Vinted",
    discription: "faire les dernier taches et building le back-end",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    tache: "Faire les cours",
    discription: "je vais acheter la viande et les couches",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    tache: "Ramner les enfants a l'ecole",
    discription: "Ramner la petite a la crache et le grand a l'cole",
    isCompleted: false,
  },
];

function App() {
  //-------------------USE_STATE-----------------------//
  const [todos, setTodos] = useState(intialTodos);
  //--------------------------------------------------//

  return (
    <>
      <div className="App ">
        <TodosProvider>
          <SnakBarProvider>
            <TodoList />
          </SnakBarProvider>
        </TodosProvider>
      </div>
    </>
  );
}

export default App;
