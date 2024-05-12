import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

export default function SnakBar({alert,msg}) {


  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <Stack spacing={2}>
      <div>
        <Snackbar
          open={alert}
          autoHideDuration={6000}
          message="Note archived"
          action={action}
        >
          <Alert variant="filled" severity="success">
            {msg}
          </Alert>
        </Snackbar>
      </div>
    </Stack>
  );
}
