import { useState } from 'preact/hooks'
import './app.css'
import axios from 'axios'
import { Button, Container, TextField, Typography } from '@mui/material'

export function App() {
  const [file1, setFile1] = useState(null)
  const [file2, setFile2] = useState(null)
  const [score, setScore] = useState(null)
  const handleFile1Change = (e) => {
    setFile1(e.target.files[0])
  }
  const handleFile2Change = (e) => {
    setFile2(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('file1', file1)
    formData.append('file2', file2)

    try {
      const response = await axios.post('http://localhost:5000/api/v1/score', formData,{
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      setScore(response.data)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Container maxWidth="sm" color='white'>
        <Typography variant='h4' align='center' gutterBottom>
          JEE Main Score Calculator
        </Typography>
        <Typography variant='subtitle1' gutterBottom>
          Upload your answer key and response sheet as .html files to calculate scores
        </Typography>
        <TextField
          sx = {{ input: {color: 'white'}}}
          fullWidth
          margin="normal"
          variant="outlined"
          type="file"
          label="Answer Key"
          InputLabelProps={{shrink: true}}
          onChange={handleFile1Change} />
        <TextField
          sx = {{ input: {color: 'white'}}}
          fullWidth
          margin="normal"
          variant="outlined"
          type="file"
          label="Response Sheet"
          InputLabelProps={{shrink: true}}
          onChange={handleFile2Change} /> 
        <Button variant='contained' color='primary' onClick={handleSubmit}>
          Calculate Score
        </Button>
        {score && (
          <div>
            <Typography variant="h6" gutterBottom>
              Results
            </Typography>
            
            <Typography variant="subtitle1" gutterBottom>
              Correct Answers: {score.Correct}
            </Typography>

            <Typography variant="subtitle1" gutterBottom>
              Incorrect Answers: {score.Incorrect}
            </Typography>

            <Typography variant="subtitle1" gutterBottom>
              Total Marks: {score.Total}
            </Typography>

            <Typography variant="subtitle1" gutterBottom>
              Incorrect Questions: {score.Incorrect_Questions.join(', ')}
            </Typography>
          </div>
        )}
      </Container>
    </>
  )
}