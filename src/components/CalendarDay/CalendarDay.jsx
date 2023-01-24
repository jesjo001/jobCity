import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Card, CardContent, Grid } from "@material-ui/core";
import PropTypes from "prop-types";

import ReminderModal from "../Modal/ReminderModal";

const CalendarDay = ({ day, month, year, height, isEnabled = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const reminderList = useSelector((state) => state.reminder.value);
  const [reminders, setReminder] = useState([]);

  const toggleModal = (onReclick) => {
    if(!disabled || onReclick === true ){
      setIsOpen(!isOpen);
      setDisabled(true);
    }
    if(isOpen) setDisabled(true);
  }

  const handleOpen = () => {
    setIsOpen(true);
  }

  const handleClose = (event, reason) => {
    if(reason !== "backdropClick"){ 
      setIsOpen(false)
    }
  };

  const propsReady = () => {
    if( day !== undefined && !isNaN(day) &&
      year !== undefined && !isNaN(year)
       ) return true
      return false
  }

  useEffect(() => {
    try {
      if(propsReady()){
        if( reminderList && reminderList.length > 0){
          let reminderData = reminderList.filter((reminder) => {
            return day === parseInt(reminder.monthDate) && year === parseInt(reminder.year) && month === parseInt(reminder.monthNum)
          }) 
          setReminder(reminderData);
        }
      }
    } catch (error) {
      console.error(error)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[reminderList,day,year])

  
  return (
  <Card
    variant="outlined"
    style={{ height }}
    className={
      isEnabled
        ? "calendar-day-card"
        : "calendar-day-card calendar-day-card--disabled"
    }
    onClick={toggleModal}
    disabled={disabled}
  >
    <CardContent className="calendar-day-content">
      <Grid item>
        <div className="calendar-day-header">
          <p className="calendar-day-text">{day}</p>
          { reminders.map((item, i) => {
          return (
            <div className="calendar-day-header" key={item.id} onClick={() => toggleModal(true)}>
              <p className="calendar-day-text">{item.title}</p>
            </div>
            )
          })
        }
        </div>
      </Grid>
    </CardContent>
    <ReminderModal
        handleOpen={handleOpen}
        toggleOpen={toggleModal}
        isOpen={isOpen}
        handleClose={handleClose}  
        day={day}
        month={month}
        year={year}
        setIsOpen={setIsOpen} 
        reminders={reminders}
        />
  </Card>
)};

CalendarDay.propTypes = {
  day: PropTypes.number.isRequired,
  month: PropTypes.number,
  year: PropTypes.number,
  height: PropTypes.string.isRequired,
  isEnabled: PropTypes.bool,
  // reminders: PropTypes.array
};

export default CalendarDay;
