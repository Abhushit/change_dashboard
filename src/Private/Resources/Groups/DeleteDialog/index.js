import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';

export default function DeleteDialog(props) {
    const [dialogDetails, setDialogDetails] = useState({
        open: true,
        delete: false
    })


  const handleClose = () => {
    setDialogDetails({
        ...dialogDetails,
        open: false
    })
  };

  const handleDelete = () => {
    setDialogDetails({
        ...dialogDetails,
        open: false,
        delete: true
    })
  }

  props.sendToDelete(dialogDetails);

  return (
    <div>
      <Dialog
        open={dialogDetails.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
            Delete Group
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this group?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleDelete} autoFocus color='primary'>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}