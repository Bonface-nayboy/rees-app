import { Box, Card, CardContent, Typography } from '@mui/material'
import React from 'react'
import { LineChart } from "@mui/x-charts/LineChart";

export default function Graph() {
    const data = [
        {month:"Jan", sales: 10000},
        {month:"Feb", sales: 2000},
        {month:"Mar", sales: 13000},
        {month:"Apr", sales: 4000},
        {month:"May", sales: 5000},
        {month:"Jun", sales: 9000},
        {month:"Jul", sales: 5000},
        {month:"Aug", sales: 8000},
        {month:"Sep", sales: 3000},
        {month:"Oct", sales: 10000},
        {month:"Nov", sales: 7000},
        {month:"Dec", sales: 14000},
    ]
    const data1=[
        {year:"2020",sales1:70000},
        {year:"2021",sales1:50000},
        {year:"2022",sales1:90000},
        {year:"2023",sales1:70000},
        {year:"2024",sales1:80000},
    ]
  return (
    <Box sx={{display:'flex',flexDirection:'row'}}>
       <Card sx={{ maxWidth: 600, ml:0, mt: 3, p: 2 }}>
      <CardContent>
        <Typography variant="h6" textAlign="center" mb={2}>
          Sales Performance By Months of the year
        </Typography>
        <LineChart
          xAxis={[{ scaleType: "point", data: data.map((d) => d.month), label:"Months" }]}
          series={[{ data: data.map((d) => d.sales), label: "Sales", color: "#1976d2" }]}
          width={600}
          height={300}
        />
      </CardContent>
    </Card>
    <Card sx={{ maxWidth: 600, ml:5, mt: 3, p: 2,bgcolor:"#26c6da" }}>
        <CardContent>
        <Typography variant="h6" textAlign="center" mb={2} sx={{color:"white"}}>
          Sales Performance Over the years
        </Typography>
        <LineChart
          xAxis={[{ scaleType: "point", data: data1.map((d) => d.year),label:"Year"}]}
          series={[{ data: data1.map((d) => d.sales1), label: "Sales", color: "white" }]}
          width={600}
          height={300}
        />
        </CardContent>
    </Card>
    </Box>
  )
}
