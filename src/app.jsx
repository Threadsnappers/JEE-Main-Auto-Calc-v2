import { useState } from 'preact/hooks'
import './app.css'
import axios from 'axios'
import { Button, Container, TextField, Typography } from '@mui/material'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { First_Time_File } from './first_time_file'
import { Home } from './home'
import { Recur } from './recur'

export function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element = {<Home />} />
        <Route path='/first_time_file' element = {<First_Time_File />} />
        <Route path='/recur' element = {<Recur />} />
      </Routes>
    </Router>
  )
}