import { useState } from 'preact/hooks'
import './app.css'
import axios from 'axios'
import { Button, Container, TextField, Typography } from '@mui/material'

export function Home() {
  const [file1, setFile1] = useState(null)
  const [file2, setFile2] = useState(null)
  const [score, setScore] = useState(null)
  const [app_no, setAppNo] = useState('')

  const handleFile1Change = (e) => {
    setFile1(e.target.files[0])
  }
  const handleFile2Change = (e) => {
    setFile2(e.target.files[0])
  }
  const handleAppNoChange = (e) => {
    setAppNo(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    if(file1 && file2 && app_no){
      formData.append('app_no', app_no)
      formData.append('file1', file1)
      formData.append('file2', file2)
      try {
        const response = await axios.post('https://jee-calc-api.vercel.app/score_file', formData,{
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        setScore(response.data)
        console.log(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    else if(app_no){
      formData.append('app_no', app_no)
      try {
        const response = await axios.post('https://jee-calc-api.vercel.app/score_appe', formData,{
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        setScore(response.data)
        console.log(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    else{
        alert('Please select both files')
    }
  }

  return (
    <>
      <Container maxWidth="sm" color='white'>
        <Typography variant='h4' align='center' gutterBottom>
          JEE Main Score Calculator
        </Typography>
        <Typography variant='subtitle1' gutterBottom>
          Upload your answer key and response sheet as .html files to calculate scores.
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
              Bonus: {score.Bonus}
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