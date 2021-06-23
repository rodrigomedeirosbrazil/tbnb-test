import { Slide } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { forwardRef } from 'react';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmationDialog(props) {
  const {
    children,
    open,
    title,
    cancelButtonText,
    confirmButtonText,
    onClose,
    ...other
  } = props;

  const handleCancel = () => {
    onClose('cancel');
  };

  const handleOk = () => {
    onClose('ok');
  };

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xs"
      aria-labelledby="confirmation-dialog-title"
      open={open}
      TransitionComponent={Transition}
      {...other}
    >
      <DialogTitle id="confirmation-dialog-title">{title}</DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions>
        {cancelButtonText && (
        <Button autoFocus onClick={handleCancel} color="primary">
          {cancelButtonText || 'Cancelar'}
        </Button>
        )}
        <Button onClick={handleOk} color="primary">
          {confirmButtonText || 'Ok'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
