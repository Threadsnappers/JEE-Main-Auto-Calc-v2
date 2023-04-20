import { useState } from 'preact/hooks'
import './app.css'
import axios from 'axios'
import { Button, Container, TextField, Typography } from '@mui/material'

export function Home() {
  return (
    <>
      <Container maxWidth="sm" color='white'>
        <Typography variant='h4' align='center' gutterBottom>
          JEE Main Score Calculator
        </Typography>
        <Typography variant='subtitle1' gutterBottom>
          Select
        </Typography>
        <Button variant='contained' color='primary' href="/first_time_file">
          First Time User
        </Button>
        <br />
        <br />
        <Button variant='contained' color='primary' href="/recur">
          Recurring User
        </Button> 
      </Container>
    </>
  )
}