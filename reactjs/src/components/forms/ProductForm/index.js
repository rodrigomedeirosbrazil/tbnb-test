import {
  TextField,
  Grid,
  Select,
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl
} from '@material-ui/core';
import { get as _get } from 'lodash/object'

const ProductFormComponent = (props) => {
  const { formik, serverErrors } = props

  const get = (object, path) => {
    return _get(object, path)
  }

  return (
    <>
      <Grid container spacing={2}>

        <Grid item lg={4}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Name"
            name="name"
            onChange={formik.handleChange}
            value={get(formik, 'values.name') || ''}
            error={
              (get(formik, 'touched.name') && Boolean(get(formik, 'errors.name')))
              || (!!get(serverErrors, 'name'))
            }
            helperText={
              (get(formik, 'touched.name') && get(formik, 'errors.name'))
              || (get(serverErrors, 'name') && get(serverErrors, 'name').join('/'))
            }
          />
        </Grid>

        <Grid item lg={4}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Price"
            name="price"
            onChange={formik.handleChange}
            value={get(formik, 'values.price') || ''}
            error={
              (get(formik, 'touched.name') && Boolean(get(formik, 'errors.price')))
              || (!!get(serverErrors, 'price'))
            }
            helperText={
              (get(formik, 'touched.price') && get(formik, 'errors.price'))
              || (get(serverErrors, 'price') && get(serverErrors, 'price').join('/'))
            }
          />
        </Grid>

        <Grid item lg={4}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Quantity"
            name="quantity"
            onChange={formik.handleChange}
            value={get(formik, 'values.quantity') || ''}
            error={
              (get(formik, 'touched.quantity') && Boolean(get(formik, 'errors.quantity')))
              || (!!get(serverErrors, 'quantity'))
            }
            helperText={
              (get(formik, 'touched.quantity') && get(formik, 'errors.quantity'))
              || (get(serverErrors, 'quantity') && get(serverErrors, 'quantity').join('/'))
            }
          />
        </Grid>

      </Grid>
    </>
  );
}

export default ProductFormComponent