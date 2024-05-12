import { v4 as uuidv4 } from "uuid";
function todosReducer(currenttodos, { type, payload }) {
  switch (type) {
    case "addedNewTodo": {
      const newTodo = {
        id: uuidv4(),
        tache: payload.tache,
        discription: "",
        isCompleted: false,
      };
      const updateTodos = [...currenttodos, newTodo];
      localStorage.setItem("todos", JSON.stringify(updateTodos));
      return updateTodos;
    }

    case "removedNewTodo": {
      const deleteTodo = currenttodos.filter((t) => {
        return payload.dialogueTodoClicked.id !== t.id;
      });
      localStorage.setItem("todos", JSON.stringify(deleteTodo));
      return deleteTodo;
    }

    case "updateTodos": {
      const updateTodo = currenttodos.map((t) => {
        if (payload.id === t.id) {
          return {
            ...t,
            tache: payload.tache,
            discription: payload.discription,
          };
        } else {
          return t;
        }
      });
      localStorage.setItem("todos", JSON.stringify(updateTodo));
      return updateTodo;
    }

    case "isCompleted": {
      const updatedTodos = currenttodos.map((t) => {
        if (t.id === payload.id) {
          const updatedTodo = {
            ...t,
            isCompleted: !t.isCompleted,
          };
          return updatedTodo;
        }
        return t;
      });
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }

    case "getTodos": {
      const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
      return storageTodos;
    }

    default: {
      throw Error("Type introuvable " + type);
    }
  }
}

export default todosReducer;
