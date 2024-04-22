import React from 'react'
import { Box, CircularProgress } from '@mui/material'

export default function Loading() {
  return (
    <div
      style={{
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        zIndex: '5'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%'
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    </div>
  )
}
