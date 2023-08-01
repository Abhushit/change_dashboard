import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';

export default function AlertDeleteDialog(props) {
    const [alertDetails, setAlertDetails] = useState({
        open:true,
        delete: false
    })

  const handleClose = () => {
    setAlertDetails({
        ...alertDetails,
        open:false
    })
  };

  const handleDelete = () => {
    setAlertDetails({
        ...alertDetails,
        delete:true,
        open:false
    })
  }

  props.sendDeleteCall(alertDetails);

  return (
    <div>
      <Dialog
        open={alertDetails.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
            Delete Event
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this event?

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete}>Delete</Button>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
