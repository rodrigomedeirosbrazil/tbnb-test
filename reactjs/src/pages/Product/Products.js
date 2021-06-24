import {
    Button,
    createStyles,
    IconButton,
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Link,
    Box
} from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import FormLoadingComponent from '../../components/screen/FormLoading';
import Alert from '../../components/screen/Alert';
import api from '../../services/api';

const useStyles = makeStyles((theme) =>
    createStyles({
        toolbar: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        table: {
            marginTop: theme.spacing(3)
        },
        noProducts: {
            textAlign: 'center'
        }
    })
);

export default function Products({ history }) {
    const classes = useStyles();
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);

    const [messageInfo, setMessageInfo] = useState ({ 
        show: false, 
        message: '' 
    });

    const handleCloseMessage = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setMessageInfo({ show: false, message: '' });
    };

    useEffect(() => {
        fetchProducts()
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const product = await api.get(`/products`)
            setRows(product.data.data)
        } catch (error) {

            if (!error.response) {
                setMessageInfo({
                    show: true,
                    message: 'Network Error, try again later.',
                    severity: 'error'
                });
            } else if (error.response.data.message) {
                setMessageInfo({
                    show: true,
                    message: error.response.data.message,
                    severity: 'error'
                });
            }
        }
        setLoading(false);
    }

    return (
        <Box m={4}>
            <div className={classes.toolbar}>
                <div>
                    <Typography component="h1" variant="h4">
                        Products
                    </Typography>
                </div>
                <div>
                    <Link component={RouterLink} to="/products/new">
                        <Button variant="contained" color="primary">
                            New Product
                        </Button>
                    </Link>
                </div>
            </div>
            {loading ? <FormLoadingComponent /> : 
                rows.length > 0 ? (
                    <TableContainer component={Paper} className={classes.table}>
                        <Table aria-label="Products">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nome</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell width="140" align="center">
                                        Actions
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell>${row.price}</TableCell>
                                        <TableCell>{row.quantity}</TableCell>
                                        <TableCell align={'center'}>
                                            <Link component={RouterLink} to={`/products/${row.id}`}>
                                                <IconButton aria-label="edit">
                                                    <Edit />
                                                </IconButton>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) 
                : <h2 className={classes.noProducts}>No products are found.</h2>
            }
            <Alert messageInfo={messageInfo} handleCloseMessage={handleCloseMessage} />
        </Box>
    );
}
