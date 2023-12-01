import React, { ReactElement } from "react";
import { Alert, Button } from "@mui/material";

interface IProps {
  message: string,
  retry: () => void,
}

export default function ApiError({ message, retry }: IProps): ReactElement {
  return (
    <Alert severity="error" sx={{
      display: 'flex',
      alignItems: 'center',
      '.MuiAlert-message': {
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }
    }}>
      {message}

      <Button variant="outlined" onClick={retry} sx={{
        ml: 3,
      }}>Retry</Button>
    </Alert>
  )
}