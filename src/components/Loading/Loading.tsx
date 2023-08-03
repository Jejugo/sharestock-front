import React from 'react'
import { Box, CircularProgress } from '@mui/material'

export default function Loading() {
  return (
    <div
      style={{
        position: 'fixed',
        top: '0',
        left: '0',
        width: '99vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        zIndex: '5'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          position: 'relative',
          top: '40vh'
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    </div>
  )
}
