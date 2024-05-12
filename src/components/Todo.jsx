import React from "react";
import "../App.css";
import { useTodosDispatch } from "../contexts/todoContext";

//----------------LIBRARY_ REACT-ICON----------------//
import { MdDeleteOutline } from "react-icons/md";
import { RiCheckFill } from "react-icons/ri";
import { FiEdit3 } from "react-icons/fi";
//-------------------------------------------------//

//----------------LIBRARY_ MATERIEL_UI----------------//
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import { useSnakBar } from "../contexts/SnakBarContext";
//---------------------------------------------------//

export default function Todo({
  todo,
  handleOpenDailogue,
  handleOpenUpdateDailogue,
}) {

  const dispatch = useTodosDispatch();
  const { showHideAlert } = useSnakBar();
  //---------HANDL_IS_COMPLETED----------//
  const handlIsCompleted = () => {
    dispatch({ type: "isCompleted", payload: todo });
    showHideAlert("Mission terminée avec seccés");
  };
  //-------------------------------------//

  return (
    <>
      {/*------------------ CARD -------------------------------*/}
      <Card sx={{ minWidth: 275 }} className="task">
        <CardContent className="card_Content">
          <Grid container spacing={2} className="grid_globali">
            <Grid xs={6} md={8} className="grid_title">
              <div className="div_Title">
                <Typography
                  variant="h5"
                  className={
                    todo.isCompleted
                      ? " fait typography_Todo"
                      : "typography_Todo"
                  }
                >
                  {todo.tache}
                </Typography>
                <p>{todo.discription}</p>
              </div>
            </Grid>
            <Grid xs={6} md={4} className="grid_Icon">
              {/* -------------------ACTIONS_BUTTON--------------- */}
              <div
                className={
                  todo.isCompleted
                    ? " roundded-Dev icon_Button isCompleted"
                    : "roundded-Dev icon_Button"
                }
              >
                <RiCheckFill
                  size={33}
                  color={todo.isCompleted ? "white" : "gold"}
                  onClick={() => {
                    handlIsCompleted(todo.id);
                  }}
                />
              </div>
              <div
                className="roundded-Dev icon_Button"
                onClick={() => {
                  handleOpenUpdateDailogue(todo);
                }}
              >
                <FiEdit3 size={30} color="green" />
              </div>
              <div
                className="roundded-Dev icon_Button"
                onClick={() => {
                  handleOpenDailogue(todo);
                }}
              >
                <MdDeleteOutline size={30} color="red" />
              </div>
              {/* ------------------------------------------------ */}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {/*-------------------------------------------------------*/}
    </>
  );
}
