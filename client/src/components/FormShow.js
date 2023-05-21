import React, { useState } from 'react';
import moment from "moment";
import { useParams } from "react-router-dom";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { IconButton } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const testExercises = [
  { id: 1, exercise: 'Push Ups', weight: 0, quantity: 2, reps: 10 },
  { id: 2, exercise: 'Push Ups', weight: 0, quantity: 3, reps: 20 },
  { id: 3, exercise: 'Bench Press', weight: 200, quantity: 5, reps: 5 },
  { id: 4, exercise: 'Bentover Rows', weight: 250, quantity: 3, reps: 5 },
  { id: 5, exercise: 'Bentover Rows', weight: 200, quantity: 2, reps: 8 },
  { id: 6, exercise: 'Sit Ups', weight: 0, quantity: 5, reps: 30 },
  { id: 7, exercise: 'Shoulder Press', weight: 100, quantity: 5, reps: 8 },
  { id: 8, exercise: 'Deadlifts', weight: 285, quantity: 3, reps: 5 },
  { id: 9, exercise: 'Hip Thrusts', weight: 1000, quantity: 2, reps: 15 },
  { id: 10, exercise: 'Cable Flys', weight: 10, quantity: 6, reps: 12 }
];

export default function FormShow({
  sets,
  workouts,
  updateSet,
  deleteSet,
  updateWorkout,
  deleteWorkout,
}) {
  const { id } = useParams();
  const workout = workouts.find((w) => Number(w.id) === Number(id));
  console.log("workout", workout);
  const setsPerWorkout = sets.filter(s => Number(s.workout_id) === Number(id));
  console.log("setsPerWorkout", setsPerWorkout);
  const [titleState, setTitleState] = useState(workout?.title);
  const [descriptionState, setDescriptionState] = useState(workout?.description);
  const [dateState, setDateState] = useState(moment(workout?.workout_date)); // initialize
  const [exercisesState, setExercisesState] = useState(setsPerWorkout);
  const [imageState, setImageState] = useState(workout?.picture_url);
  const [isEditMode, setIsEditMode] = useState(false);

  const onDateChange = (newDate) => {
    setDateState(newDate);
  };

  const onEditSubmit = (event) => {
    // for (let i = 0; i < exercises.length; i++) {
    //   // console.log(event.target[`exercise-${i}`].value)
    //   console.log(event.target[`weight-${i}`].value);
    //   console.log(event.target[`quantity-${i}`].value);
    //   console.log(event.target[`reps-${i}`].value);
    // }
    setIsEditMode(false);
  };

  const onHandleChange = (newValue, i) => {
    setExercisesState(prev => {
      const key = Object.keys(newValue)[0];
      const newPrev = [...prev];

      newPrev[i][key] = newValue[key];
      return newPrev;
    });
  };

  //needs api functionality
  const onCancel = () => {
    setIsEditMode(false);
  };

  const onSave = () => {
    setIsEditMode(false);
  };

  return (
    isEditMode ?
      <Card key={`workout-info-${id}`} elevation={6} sx={{ paddingBottom: "1em", maxWidth: "425px", margin: "0 auto" }}>
        <CardContent sx={{ paddingBottom: "0px" }}>
          <TextField
            name="workout-title"
            required
            label="Title"
            value={titleState}
            onChange={(e) => setTitleState(e.target.value)}
            InputProps={{
              endAdornment: <InputAdornment position="start"></InputAdornment>
            }}
            sx={{
              '& .MuiInputBase-input': {
                fontSize: '13px',
                padding: '4px 3px',
              },
            }}
          />
        </CardContent>
        <CardContent>
          {/* {imageState && (
            <div>
              <img
                alt="not found"
                width={"250px"}
                src={URL.createObjectURL(imageState)}
              />
              <br />
              <button onClick={() => setImageState(null)}>Remove</button>
            </div>
          )} */}
          <input
            type="file"
            name="myImage"
            onChange={(event) => {
              setImageState(event.target.files[0]);
            }}
          />
        </CardContent>
        <CardContent sx={{ paddingTop: "0px" }}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <MobileDatePicker
              label="Date"
              inputFormat="MM/DD/YYYY"
              value={dateState}
              onChange={onDateChange}
              renderInput={(params) => <TextField {...params}
              />}
              sx={{
                '& .MuiInputBase-input': {
                  fontSize: '13px',
                  padding: '4px 3px',
                },
              }}
            />
          </LocalizationProvider>
        </CardContent>
        <CardContent sx={{ padding: "0px" }}>
          <TextField
            id="outlined-multiline-static"
            name="workout-description"
            required
            multiline
            label="Description"
            value={descriptionState}
            onChange={(e) => setDescriptionState(e.target.value)}
            InputProps={{
              endAdornment: <InputAdornment position="start"></InputAdornment>
            }}
            sx={{
              width: "390px",
              '& .MuiInputBase-input': {
                fontSize: '13px',
                padding: '4px 3px',
              },
            }}
          />
        </CardContent>
        <CardContent>
          <TableContainer component={Paper}>
            <form onSubmit={onEditSubmit}>
              <Table size="small" aria-label="a dense table">
                <TableBody>
                  {exercisesState.map((e, index) => (
                    <TableRow
                      key={e.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {e.exercise}
                      </TableCell>
                      <TableCell align="right" sx={{ maxWidth: '55px', padding: '4px 2px' }}>
                        <TextField
                          name={`weight-${index}`}
                          required
                          label="lbs"
                          value={e.weight}
                          onChange={(e) => onHandleChange({ weight: e.target.value }, index)}
                          InputProps={{
                            endAdornment: <InputAdornment position="start"></InputAdornment>
                          }}
                          sx={{
                            '& .MuiInputBase-input': {
                              fontSize: '13px',
                              padding: '4px 3px',
                            },
                          }}
                        />
                      </TableCell>
                      <TableCell align="right" sx={{ maxWidth: '55px', padding: '4px 2px' }}>
                        <TextField
                          name={`quantity-${index}`}
                          required
                          label="x"
                          value={e.quantity}
                          onChange={(e) => onHandleChange({ quantity: e.target.value }, index)}
                          InputProps={{
                            endAdornment: <InputAdornment position="start"></InputAdornment>
                          }}
                          sx={{
                            '& .MuiInputBase-input': {
                              fontSize: '13px',
                              padding: '4px 3px',
                            },
                          }}
                        />
                      </TableCell>
                      <TableCell align="right" sx={{ maxWidth: '55px', padding: '4px 2px' }}>
                        <TextField
                          name={`reps-${index}`}
                          required
                          label="reps"
                          value={e.reps}
                          onChange={(e) => onHandleChange({ reps: e.target.value }, index)}
                          InputProps={{
                            endAdornment: <InputAdornment position="start"></InputAdornment>
                          }}
                          sx={{
                            '& .MuiInputBase-input': {
                              fontSize: '13px',
                              padding: '4px 3px',
                            },
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton aria-label="delete">
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </form>
          </TableContainer>
        </CardContent>
        <Button type="submit" variant="contained" sx={{ backgroundColor: "green", "&:hover": { backgroundColor: "green" } }} onClick={onSave}>SAVE</Button>
        <Button type="submit" variant="contained" sx={{ backgroundColor: "red", "&:hover": { backgroundColor: "red" }, marginLeft: "1em", marginRight: "1em" }}>DELETE</Button>
        <Button variant="contained" onClick={onCancel} >CANCEL</Button>
      </Card> :
      <Card key={`workout-info-${id}`} elevation={6} sx={{ paddingBottom: "1em", maxWidth: "425px", margin: "0 auto" }}>
        <CardHeader
          title={titleState}
          subheader={dateState && dateState.format("MMMM Do YYYY")}
        />
        <CardMedia
          component="img"
          image={imageState}
          sx={{ margin: "auto", width: "252px", height: "252px" }}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {descriptionState}
          </Typography>
        </CardContent>
        <CardHeader
          title="Workout"
          sx={{ padding: "0" }}
        />
        <CardContent>
          <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
              <TableBody>
                {exercisesState.map(e => (
                  <TableRow
                    key={e.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {e.exercise}
                    </TableCell>
                    <TableCell align="right">{e.weight}lbs</TableCell>
                    <TableCell align="right">{e.quantity}x</TableCell>
                    <TableCell align="right">{e.reps}reps</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
        <Button onClick={() => setIsEditMode(true)} variant="contained">EDIT</Button>
      </Card>
  );
}