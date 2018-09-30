import React from 'react'
import { control } from 'react-validation'
import { FormControl, FormHelperText, TextField } from '@material-ui/core'

export const TextInput = control(({ error, isChanged, isUsed, additionalLabel, ...props }) => (
  <FormControl error={(isChanged || isUsed) && !!error} fullWidth>
    <TextField {...props} />
    {additionalLabel && <FormHelperText error={false}>{additionalLabel}</FormHelperText>}
    <FormHelperText>{(isChanged || isUsed) && error}</FormHelperText>
  </FormControl>
))
