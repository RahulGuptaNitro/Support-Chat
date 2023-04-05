import { Alert, Snackbar } from '@mui/material'
import React from 'react'

export const Toaster = (props) => {

  return (
    <>
    <Snackbar open={props.open} autoHideDuration={5000} onClose={()=>props.setOpen(false)}>
        <Alert onClose={()=>props.setOpen(false)} severity="success" sx={{ width: '100%' }}>
          Invalid Credentials
        </Alert>
    </Snackbar>
    </>
  )
}