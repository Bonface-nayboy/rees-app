"use client";

import UsersPageData from '@/src/containers/Users'
import { Box } from '@mui/material'
import React from 'react'

function Home() {
  return (
    <Box
    sx={{
      padding: 2,
      width:"100%",
    }}
  >        
    <UsersPageData />
  </Box>
  )
}

export default Home