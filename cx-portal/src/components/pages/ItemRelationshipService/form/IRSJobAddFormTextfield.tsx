import { Controller } from "react-hook-form"
import InputLabel from '@mui/material/InputLabel'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined'

export const IRSJobAddFormTextfield = ({
    control,
    trigger,
    errors,
    helperText,
    label,
    placeholder,
    name,
    rules,
    limit = 1000
}: any) => {
    return (
        <Controller render={({ field: { onChange, value } }) => (
            <>
          <InputLabel error={!!errors[name]} sx={{ marginBottom: '7px' }}>
            {label}
          </InputLabel>
          <TextField
            error={!!errors[name]}
            fullWidth
            helperText={
              !!errors[name] ? helperText : `${value.length}/${limit}`
            }
            inputProps={{
              maxLength: limit,
            }}
            multiline
            onChange={(event) => {
              trigger(name)
              onChange(event)
            }}
            placeholder={placeholder}
            value={value}
            variant="filled"
            FormHelperTextProps={{
              sx: { marginLeft: !!errors[name] ? '' : 'auto' },
            }}
            InputProps={{
              endAdornment: !!errors[name] && (
                <InputAdornment sx={{ color: 'danger.danger' }} position="end">
                  <ErrorOutlineOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
        </>
        )}
            name={name}
            control={control}
            rules={rules}
        />
    )
}