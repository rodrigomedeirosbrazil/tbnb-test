import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

function AlertDialog(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Alert(props) {
    const {
        messageInfo,
        handleCloseMessage
    } = props;

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            autoHideDuration={3000}
            open={messageInfo.show}
            key={messageInfo.message}
            onClose={handleCloseMessage}
        >
            <AlertDialog onClose={handleCloseMessage} severity={messageInfo.severity}>
                {messageInfo.message}
            </AlertDialog>
        </Snackbar>
    );
}
