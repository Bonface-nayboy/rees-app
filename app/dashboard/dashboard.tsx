import { Box } from '@mui/material'
import React from 'react'
import Sidebar from './sidebar'

export default function Dashboard() {
  return (
    <Box sx={{display:'flex'}}>
        <Sidebar/>
    </Box>
  )
}
