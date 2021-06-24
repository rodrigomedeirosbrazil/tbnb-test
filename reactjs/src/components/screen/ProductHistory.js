import {
    createStyles,
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@material-ui/core';
import { useEffect, useState, useCallback, forwardRef, useImperativeHandle } from 'react';
import { parseISO, format } from 'date-fns'

import FormLoadingComponent from '../../components/screen/FormLoading';
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

const ProductHistory = (props, ref) => {
    const productId = props.productId;
    const parentLoading = props.loading;
    const classes = useStyles();
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchHistory = useCallback(
        async () => {
            setLoading(true);
            try {
                const history = await api.get(`/products/${productId}/history`)
                setRows(history.data.data)
            } catch (error) {
            }
            setLoading(false);
        },
        [productId],
    );

    useEffect(() => {
        if (productId) {
            fetchHistory();
        }
    }, [productId, fetchHistory]);

    useImperativeHandle(ref, () => ({
        updateHistory() {
            fetchHistory();
        }
    }), [fetchHistory]);

    const formatDate = date => {
        return format(parseISO(date), 'MM/dd/yyyy HH:mm:ss')
    }

    return (
        <div style={{ display: parentLoading && 'none' }}>
            <div className={classes.toolbar}>
                <div>
                    <Typography component="h2" variant="h6">
                        History
                    </Typography>
                </div>
            </div>
            {loading ? <FormLoadingComponent /> :
                rows.length > 0 ? (
                    <TableContainer component={Paper} className={classes.table}>
                        <Table aria-label="History">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Quantity</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row,index) => (
                                    <TableRow key={index}>
                                        <TableCell component="th" scope="row">
                                            {formatDate(row.created_at)}
                                        </TableCell>
                                        <TableCell>{row.quantity}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )
                    : <h2 className={classes.noProducts}>No history available.</h2>
            }
        </div>
    );
}

export default forwardRef(ProductHistory);
