import { useEffect, useState, useRef } from 'react';
import { useParams } from "react-router";
import { Link as RouterLink } from 'react-router-dom';
import {
    Button,
    Box,
    createStyles,
    IconButton,
    makeStyles,
    Paper,
    Typography,
    Link
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Form, Formik } from "formik"
import { updatedDiff } from "deep-object-diff";
import * as Yup from 'yup';

import ProductHistory from '../../components/screen/ProductHistory';
import FormLoadingComponent from '../../components/screen/FormLoading';
import Alert from '../../components/screen/Alert';

import ProductFormComponent from '../../components/forms/ProductForm'

import api from '../../services/api';

const useStyles = makeStyles((theme) =>
    createStyles({
        toolbar: {
            display: 'flex',
            alignItems: 'center',
        },
        form: {
            marginTop: theme.spacing(3),
            padding: theme.spacing(3),
        },
        submit: {
            marginTop: theme.spacing(2),
        },
    })
);

export default function ProductForm({ history }) {
    const classes = useStyles();
    const [title, setTitle] = useState('Funcionário');
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const productHistoryRef = useRef();

    let [initialValues, setInitialValues] = useState({
        name: '',
        price: '0.00',
        quantity: '0',
    });

    const [serverErrors, setServerErrors] = useState({});

    const [messageInfo, setMessageInfo] = useState({ show: false, message: '' });

    const handleCloseMessage = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setMessageInfo({ show: false, message: '' });
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required(),
        price: Yup.number()
            .required()
            .positive(),
        quantity: Yup.number()
            .required()
            .positive()
            .integer(),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        setSubmitting(true);

        const partialValues = updatedDiff(initialValues, values);

        try {
            await api.patch(`/products/${id}`, partialValues)

            setInitialValues({ ...initialValues, ...values });

            setMessageInfo({
                show: true,
                message: 'Update sucessfully!',
                severity: 'info'
            });

            productHistoryRef.current.updateHistory();
        } catch (error) {
            if (!error.response) {
                setMessageInfo({
                    show: true,
                    message: 'Network Error. Try again later.',
                    severity: 'error'
                });
            } else if (error.response.data.message) {
                setMessageInfo({
                    show: true,
                    message: error.response.data.message,
                    severity: 'error'
                });
            } else if (error.response.status === 422) {
                setServerErrors(error.response.data);
                setMessageInfo({
                    show: true,
                    message: 'There were errors in the form.',
                    severity: 'error'
                });
            }
        }
        setSubmitting(false);
    };

    useEffect(() => {
        setTitle(`Product: #${id}`);
        fetchProduct(id)
        // eslint-disable-next-line
    }, [id]);

    const fetchProduct = async (id) => {
        setLoading(true);
        try {
            const response = await api.get(`/products/${id}`);
            const product = response.data;
            setInitialValues({ ...initialValues, ...product });
        } catch (error) {

            if (!error.response) {
                setMessageInfo({
                    show: true,
                    message: 'Network Error. Try again later.',
                });
            } else if (error.response.data.message) {
                setMessageInfo({
                    show: true,
                    message: error.response.data.message
                });
            }
        }
        setLoading(false);
    }

    return (
        <>
            <Box m={4}>
                <div className={classes.toolbar}>
                    <Link component={RouterLink} to="/">
                        <IconButton aria-label="Back">
                            <ArrowBackIcon />
                        </IconButton>
                    </Link>
                    <Typography component="h1" variant="h4">
                        {title}
                    </Typography>
                </div>
                {loading ? <FormLoadingComponent /> : (
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                        enableReinitialize={true}
                    >
                        {(formik) => (
                            <Form onSubmit={formik.handleSubmit}>
                                <Paper className={classes.form} elevation={3}>
                                    <ProductFormComponent formik={formik} serverErrors={serverErrors} />
                                </Paper>
                                {formik.isSubmitting && <FormLoadingComponent />}
                                <Button
                                    className={classes.submit}
                                    type="submit"
                                    value="Submit"
                                    size="large"
                                    variant="contained"
                                    color="primary"
                                    disabled={formik.isSubmitting}
                                >
                                    Save
                                </Button>
                            </Form>
                        )}
                    </Formik>
                )}
                <Box mt={2}>
                    <ProductHistory productId={id} ref={productHistoryRef} loading={loading} />
                </Box>
            </Box>
            <Alert messageInfo={messageInfo} handleCloseMessage={handleCloseMessage} />
        </>
    );
}
