import {
  TextField,
  Grid,
} from '@material-ui/core';
import { get as _get } from 'lodash/object'

import MoneyInput from '../../inputs/MoneyInput'

const ProductFormComponent = (props) => {
  const { namespace, formik, serverErrors } = props

  const withNamespace = fieldName => {
    return namespace ? `${namespace}.${fieldName}` : fieldName
  }

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
            name={withNamespace('name')}
            onChange={formik.handleChange}
            value={get(formik, 'values.' + withNamespace('name')) || ''}
            error={
              (get(formik, 'touched.' + withNamespace('name')) && Boolean(get(formik, 'errors.' + withNamespace('name')) ))
              || (!!get(serverErrors, withNamespace('name')))
            }
            helperText={
              (get(formik, 'touched.' + withNamespace('name')) && get(formik, 'errors.' + withNamespace('name')))
              || (get(serverErrors, withNamespace('name')) && get(serverErrors, withNamespace('name')).join('/'))
            }
          />
        </Grid>

        <Grid item lg={4}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Price"
            name={withNamespace('price')}
            onChange={formik.handleChange}
            InputProps={{ inputComponent: MoneyInput }}
            InputLabelProps={{ shrink: true }}
            value={get(formik, 'values.' + withNamespace('price')) || ''}
            error={
              (get(formik, 'touched.' + withNamespace('price')) && Boolean(get(formik, 'errors.' + withNamespace('price'))))
              || (!!get(serverErrors, withNamespace('price')))
            }
            helperText={
              (get(formik, 'touched.' + withNamespace('price')) && get(formik, 'errors.' + withNamespace('price')))
              || (get(serverErrors, withNamespace('price')) && get(serverErrors, withNamespace('price')).join('/'))
            }
          />
        </Grid>

        <Grid item lg={4}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Quantity"
            name={withNamespace('quantity')}
            onChange={formik.handleChange}
            InputProps={{ type: "number" }}
            value={get(formik, 'values.' + withNamespace('quantity')) || ''}
            error={
              (get(formik, 'touched.' + withNamespace('quantity')) && Boolean(get(formik, 'errors.' + withNamespace('quantity'))))
              || (!!get(serverErrors, withNamespace('quantity')))
            }
            helperText={
              (get(formik, 'touched.' + withNamespace('quantity')) && get(formik, 'errors.' + withNamespace('quantity')))
              || (get(serverErrors, withNamespace('quantity')) && get(serverErrors, withNamespace('quantity')).join('/'))
            }
          />
        </Grid>

      </Grid>
    </>
  );
}

export default ProductFormComponent