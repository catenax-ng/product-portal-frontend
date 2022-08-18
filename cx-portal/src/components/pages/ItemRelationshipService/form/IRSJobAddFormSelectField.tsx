
import { useTranslation } from "react-i18next"
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import { Controller } from 'react-hook-form'
import MenuItem from '@mui/material/MenuItem'


export const IRSJobAddFormSelectField = ({
    control,
    trigger,
    errors,
    label,
    name,
    rules,
}: any) => {
    const { t } = useTranslation()
    const environments = [
        { 'id': 1, 'value': 'https://irs.dev.demo.catena-x.net/irs/' },
        { 'id': 2, 'value': 'https://irs.int.demo.catena-x.net/irs/' }
    ]

    return (
        <Controller
            render={({ field: { onChange, value } }) => (
                <>
                    <InputLabel error={!!errors[name]} sx={{ marginBottom: '7px' }}>
                        {label}
                    </InputLabel>
                    <Select
                        error={!!errors[name]}
                        onChange={(event) => {
                            trigger(name)
                            onChange(event)
                        }}
                        value={value}
                        variant="filled"
                        fullWidth
                        disabled={true}
                        sx={{
                            color: value === 'none' ? 'gray' : '',
                        }}
                    >
                        <MenuItem disabled value="none">
                            {t('global.actions.pleaseSelect')}
                        </MenuItem> 
                        {environments?.map((env: { id: number, value: string }) => (
                            <MenuItem key={env.value} value={env.value}>
                                {env.value}
                            </MenuItem>
                        ))}
                    </Select>
                </>
            )}
            name={name}
            control={control}
            rules={rules}
        />
    )
}