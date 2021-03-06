import { Box, useTheme } from '@mui/material'
import { Typography } from '../../basic/Typography'

interface CardAddServiceProps {
  title: string
  borderRadius: number
  onButtonClick: React.MouseEventHandler
}

export const CardAddService = ({
  title,
  borderRadius = 20,
  onButtonClick,
}: CardAddServiceProps) => {
  const theme = useTheme()
  return (
    <Box
      sx={{
        border: `1px dashed ${theme.palette.border.border04}`,
        borderRadius: `${borderRadius}px`,
        height: '160px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '0px',
        gap: '32px',
        maxWidth: '539px',
        ':hover': {
          boxShadow: theme.shadows['20'],
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '0',
          marginLeft: '20px',
          width: '120px',
          height: '120px',
          background: theme.palette.accent.accent02,
          borderRadius: `${borderRadius}px`,
          ':hover': {
            cursor: 'pointer',
          },
        }}
        onClick={onButtonClick}
      >
        <svg
          width="50"
          height="50"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M25 0C11.2 0 0 11.2 0 25C0 38.8 11.2 50 25 50C38.8 50 50 38.8 50 25C50 11.2 38.8 0 25 0ZM37.5 27.5H27.5V37.5H22.5V27.5H12.5V22.5H22.5V12.5H27.5V22.5H37.5V27.5Z"
            fill="#0F71CB"
          />
        </svg>
      </Box>
      <Typography
        variant="h4"
        sx={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'normal',
          display: 'box',
          lineClamp: '2',
          boxOrient: 'vertical',
          width: '299px',
          marginLeft: 'auto',
        }}
      >
        {title}
      </Typography>
    </Box>
  )
}
