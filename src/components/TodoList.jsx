import React, { useEffect, useMemo, useState } from "react";
import "../App.css";
import Todo from "../components/Todo";
import { useTodos, useTodosDispatch } from "../contexts/todoContext";
import { useSnakBar } from "../contexts/SnakBarContext";

//----------------LIBRARY_ MATERIEL_UI----------------//
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

//---------------------------------------------------//

export default function TodoList() {
  //-------------------USE_STATE-----------------------//
  const [todoInput, setTodoInput] = useState("");
  const [displayTodoType, setDisplayTodoType] = useState("toutes");
  const [shwoDeleteDialgue, setShwoDeleteDialgue] = useState(false);
  const [dialogueTodoClicked, setDialogueTodoClicked] = useState(null);
  const [shwoUpdateDialgue, setShwoUpdateDialgue] = useState(false);
  const [fromInput, setFromInput] = useState({
    tache: "",
    discription: "",
  });

  const todos = useTodos();
  const dispatch = useTodosDispatch();
  const { showHideAlert } = useSnakBar();

  //--------------------------------------------------//
  const handlAddClick = () => {
    dispatch({ type: "addedNewTodo", payload: { tache: todoInput } });

    setTodoInput("");
    showHideAlert("Tach ajouter avec succés");
  };

  const completedTodos = useMemo(() => {
    return todos.filter((t) => {
      return t.isCompleted;
    });
  }, [todos]);

  const notCompletedTodos = useMemo(() => {
    return todos.filter((t) => {
      return !t.isCompleted;
    });
  }, [todos]);

  let todosToBeRender = todos;
  if (displayTodoType === "fait") {
    todosToBeRender = completedTodos;
  } else if (displayTodoType === "non_fait") {
    todosToBeRender = notCompletedTodos;
  } else {
    todosToBeRender = todos;
  }

  const changeDisplayTypes = (e) => {
    setDisplayTodoType(e.target.value);
  };
  useEffect(() => {
    dispatch({
      type: "getTodos",
    });
  }, []);

  //---------HANDL_SHOW_DIALOGUE----------//
  const handleCloseDailogue = () => {
    setShwoDeleteDialgue(false);
  };
  const handleCloseUpdateDailogue = () => {
    setShwoUpdateDialgue(false);
  };

  const handleOpenDailogue = (todo) => {
    setFromInput(todo);
    setDialogueTodoClicked(todo);
    setShwoDeleteDialgue(true);
  };
  const handleOpenUpdateDailogue = (todo) => {
    setFromInput(todo);
    setDialogueTodoClicked(todo);
    setShwoUpdateDialgue(true);
  };
  //-------------------------------------//

  const todosJsx = todosToBeRender.map((todo) => {
    return (
      <Todo
        key={todo.id}
        todo={todo}
        handleOpenDailogue={handleOpenDailogue}
        handleOpenUpdateDailogue={handleOpenUpdateDailogue}
      />
    );
  });

  //---------HANDL_DELETE_DIALOGUE----------//
  const handlClickDelete = () => {
    dispatch({
      type: "removedNewTodo",
      payload: { dialogueTodoClicked: dialogueTodoClicked },
    });
    handleCloseDailogue();
    showHideAlert("Tach supprimer avec succés");
  };
  //----------------------------------------//
  //---------HANDL_UPDATE_DIALOGUE----------//
  const handlClickUpdate = () => {
    dispatch({
      type: "updateTodos",
      payload: {
        tache: fromInput.tache,
        discription: fromInput.discription,
        id: dialogueTodoClicked.id,
      },
    });
    handleCloseUpdateDailogue();
    showHideAlert("Tach modifier avec succés");
  };
  //----------------------------------------//
  return (
    <>
      {/*-------------------------- DAILOGUE ------------------------*/}
      {/*---------DELETE_DAILOGUE -----------*/}
      <Dialog
        open={shwoDeleteDialgue}
        keepMounted
        onClose={handleCloseDailogue}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          {" Est ce que vous confirmer la suppression cette tache ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Vous pouvez pas annuler la suppression une fois lancer ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDailogue}>Annuler</Button>
          <Button
            style={{ color: "red", fontWeight: "700" }}
            onClick={() => {
              handlClickDelete();
            }}
          >
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>
      {/*------------------------------------*/}
      {/*---------UPDATE_DAILOGUE -----------*/}
      <Dialog
        open={shwoUpdateDialgue}
        keepMounted
        onClose={handleCloseUpdateDailogue}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          {" Est ce que vous confirmer la modification cette tache ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <TextField
              value={fromInput.tache}
              autoFocus
              required
              margin="dense"
              name="tache"
              label="Tache"
              type="title"
              fullWidth
              variant="standard"
              onChange={(event) => {
                setFromInput({ ...fromInput, tache: event.target.value });
              }}
            />
            <TextField
              value={fromInput.discription}
              autoFocus
              required
              margin="dense"
              name="tache"
              label="Discription"
              type="Discription"
              fullWidth
              variant="standard"
              onChange={(event) => {
                setFromInput({ ...fromInput, discription: event.target.value });
              }}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdateDailogue}>Annuler</Button>
          <Button
            style={{ color: "red", fontWeight: "700" }}
            onClick={() => {
              handlClickUpdate();
            }}
          >
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>
      {/*------------------------------------*/}
      {/*---------------------------------------------------------*/}

      {/*-------------------------- RETURN ------------------------*/}
      <Container maxWidth="md" style={{ textAlign: "center" }}>
        <Card
          sx={{ minWidth: 275 }}
          style={{ maxHeight: "80vh", overflow: "scroll" }}
        >
          <CardContent>
            <Typography variant="h2">Todo List</Typography>
            <Divider />

            {/* FILTTER BUTTONS */}
            <ToggleButtonGroup
              style={{ marginTop: "30px" }}
              exclusive
              aria-label="Platform"
              value={displayTodoType}
              onChange={changeDisplayTypes}
            >
              <ToggleButton value="toutes">TOUTES</ToggleButton>
              <ToggleButton value="fait">FAIT</ToggleButton>
              <ToggleButton value="non_fait">NON-FAIT</ToggleButton>
            </ToggleButtonGroup>
            {/* --------------- */}

            {/* ALL TODOS */}
            {todosJsx}
            {/* --------- */}

            {/* -----------INPUT + BUTTON----------- */}
            <Grid container spacing={2} className="input_button">
              <Grid xs={7} className="a" spacing={2}>
                <TextField
                  value={todoInput}
                  id="filled-password-input"
                  label="Title of task"
                  type="text"
                  autoComplete="current-password"
                  variant="outlined"
                  onChange={(event) => {
                    setTodoInput(event.target.value);
                  }}
                />
              </Grid>
              <Grid xs={3} className="b" spacing={2}>
                <Button
                  variant="outlined"
                  onClick={handlAddClick}
                  className={todoInput ? "" : "valide"}
                  disabled={todoInput ? false : true}
                >
                  Success
                </Button>
              </Grid>
            </Grid>
            {/* ------------------------------------ */}
          </CardContent>
        </Card>
      </Container>
      {/*----------------------------------------------------------*/}
    </>
  );
}
