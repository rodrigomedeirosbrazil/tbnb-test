import {
  Box,
  CircularProgress,
  createStyles,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) =>
  createStyles({
    loading: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: theme.spacing(1, 0),
    },
    loadingProgress: {
      marginRight: theme.spacing(1),
    },
  })
);

export default function FormLoadingComponent() {
  const classes = useStyles();

  return (
    <Box className={classes.loading}>
      <CircularProgress
        className={classes.loadingProgress}
        disableShrink
        color="secondary"
        size={20}
      />{' '}
      Loading...
    </Box>
  );
}
