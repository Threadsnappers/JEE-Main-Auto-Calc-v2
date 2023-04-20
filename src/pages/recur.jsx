import { useState } from 'preact/hooks'
import './../app.css'
import axios from 'axios'
import { Button, Container, TextField, Typography } from '@mui/material'

export function Recur() {
  const [score, setScore] = useState(null)
  const [app_no, setAppNo] = useState('')

  const handleAppNoChange = (e) => {
    setAppNo(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    if(app_no){
      formData.append('app_no', app_no)
      try {
        const response = await axios.post('https://jee-calc-api.vercel.app/score_app', formData,{
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
          Enter your application number to calculate scores.
        </Typography>
        <TextField
          sx = {{ input: {color: 'white'}}}
          fullWidth
          margin="normal"
          variant="outlined"
          type="text"
          label="Application Number"
          InputLabelProps={{shrink: true}}
          onChange={handleAppNoChange} />
        <Button variant='contained' color='primary' onClick={handleSubmit}>
          Get Score
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