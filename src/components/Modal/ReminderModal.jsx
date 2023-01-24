import * as React from 'react';
import { useSelector, useDispatch } from "react-redux";

import { Button } from '@material-ui/core';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import _ from 'lodash';
import { reminder } from 'services/reminder';

import { addReminder , deleteReminder, updateReminder } from "../../appRedux/reducer/reminder";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  fontSize: 20,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  zIndex: 100
};

export default function TransitionsModal({ 
  toggleOpen, 
  handleOpen, 
  isOpen, 
  handleClose, 
  setIsOpen,
  day, 
  month, 
  year,
  reminders
}) {
  const [value, setValue] = React.useState(dayjs('2023-01-23'));
  const [dateString, setDateString] = React.useState("2023-01-23")
  const [title, setTitle] = React.useState("");
  const [city, setCity] = React.useState("");
  const [details, setDetails] = React.useState("");
  const [selected, setSelected] = React.useState(false);
  const [selectedData, setSelectedData] = React.useState({});
  const [weatherRep, setWeatherRep] = React.useState({});
  const dispatch = useDispatch();

  const addReminderData =  async (e, action) => {
    handleClose(e,"close")

    let reminderData = {
      title,
      city,
      details,
      dateString: value.$d.toDateString(),
      time: value.$d.toTimeString(),
    }

    if(selected){
      reminderData.dateString = selectedData.dateString
      reminderData.time = selectedData.time
      reminderData.id = selectedData.id

      dispatch(updateReminder(reminderData))
      setSelected(false)

      return true
    }
    dispatch(addReminder(reminderData));
  }

  const updateReminderData = (item) => {
      setTitle(item.title)      
      setCity(item.title)      
      setDetails(item.details)   
  }

  const deleteSelectedReminder = (item) => {
    dispatch(deleteReminder(item))
  }

  const debouceSearch = _.debounce( async (cityName) => {
    setCity(cityName)
    await fetchWeather(cityName);
  }, 1000) 

  const fetchWeather = async(cityName) => {

    try {
      let date = dateString.slice(0,10)

      let result = await reminder.getWeatherRep(cityName, date)
      let weatherDays = result.data.days

      let weather = weatherDays.filter(day => {
        return day.datetime.toString() === dateString.toString().slice(0,10)
      })

      if(weather.length > 0 ) setWeatherRep({ weather: weather[0]})
    } catch (error) {
      console.log(error)
    }
  }



  return (
    <div>
      {/* <Button onClick={toggleOpen}>Open modal</Button> */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isOpen}
        onClose={handleClose}
        closeAfterTransition={true}
        keepMounted={true}
        onBackdropClick={() => {}}
        disablePortal
        style={{
          zIndex: 120
        }}
      >
        <Fade in={isOpen}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Add Reminder <span style={{ color: 'red'}}> {`${weatherRep.weather !== undefined ? weatherRep.weather.conditions : "" } - ${weatherRep.weather !== undefined ? weatherRep.weather.temp: ''} - ${weatherRep.weather !== undefined ? weatherRep.weather?.preciptype[0] :''}`}</span>
            </Typography>

            <div>
              <Box
                sx={{
                  width: 700,
                  maxWidth: '100%',
                }}
              >
                <TextField fullWidth label="Enter Reminder Title" value={title} onChange={(e)=> setTitle(e.target.value)} id="fullWidth" margin="normal" />
                <TextField fullWidth label="Enter City" id="fullWidth" value={city} onChange={(e) => debouceSearch(e.target.value)} margin="normal" />
                <TextField
                id="outlined-multiline-static"
                label="Reminder Details"
                multiline
                rows={4}
                fullWidth
                margin="normal"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
              />
              </Box>
              
            </div>
            <Typography id="transition-modal-description" sx={{ mt: 5, fontSize:24 }}>
            </Typography>

            <Box
              sx={{
                width: 700,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                height: 50,
                zIndex: 200
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="DateTimePicker"
                value={value}
                margin="normal"
                onChange={(newValue) => {
                  const str = (new Date(newValue)).toISOString().slice(0, 19).replace("T", " ");
                  setValue(newValue);
                  setDateString(str)
                }}
              />
            </LocalizationProvider>
            <Button variant="contained" onClick={(e) => handleClose(e,"dfs")}>Close Modal</Button>
            <Button variant="contained" onClick={(e) => addReminderData(e)} style={{ backgroundColor:'#556C7F', color: 'white', fontWeight: "bold"}} className="calendar-day-primary-btn" >Add Reminder</Button>

   
            </Box>
            <Box
                sx={{
                  width: 700,
                  maxWidth: '100%',
                  
                }}
              >
                <div className="calendar-day-remindersContainer">

                {
                  reminders.map((item, i) => {
                    return (
                      <>
                        <div className="calendar-day-reminders" key={`${item.id} + ${i}`}
                          onClick={() => {
                            setSelected(true)
                            setSelectedData(item)
                            updateReminderData(item)

                          }} 
                        >
                          <span className="calendar-day-reminder-title">{item.title}</span>
                          <span className="calendar-day-reminder-date">{item.dateString}</span>
                          <span className="" 
                            onClick={() => 
                              deleteSelectedReminder(item)
                            }
                          ><DeleteIcon /></span>
                        </div>
                      </>
                    )
                  })

                }

                </div>

              </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}