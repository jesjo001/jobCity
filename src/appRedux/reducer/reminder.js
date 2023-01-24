import { createSlice } from "@reduxjs/toolkit";
import { getMonthNumber } from "utils/dateUtils";
import { v4 as uuidv4 } from 'uuid';

export const reminderSlice = createSlice({
    name: "reminder",
    initialState: { value: [
      {
        "id": "28af1290-4444-4564-8814-47d874d03f05",
        "title": "dfgh",
        "city": "dgh",
        "details": "fgyjhn",
        "dateString": "Thu Apr 07 2022",
        "time": "00:00:00 GMT+0100 (West Africa Standard Time)",
        "dayName": "Thu",
        "year": "2023",
        "monthDate": "01",
        "monthName": "Jan",
        "monthNum": 1
      },
      {
        "id": "28af1290-f788-4357-8814-47d874d03f05",
        "title": "dfgh",
        "city": "dgh",
        "details": "fgyjhn",
        "dateString": "Thu Apr 07 2022",
        "time": "00:00:00 GMT+0100 (West Africa Standard Time)",
        "dayName": "Thu",
        "year": "2023",
        "monthDate": "01",
        "monthName": "Apr",
        "monthNum": 1
      },
      {
        "id": "7307dcc0-4bf7-4812-97d7-ba5a6c3f4384",
        "title": "afweadfv",
        "city": "",
        "details": "",
        "dateString": "Wed Jan 11 2023",
        "time": "00:15:00 GMT+0100 (West Africa Standard Time)",
        "dayName": "Wed",
        "year": "2023",
        "monthDate": "01",
        "monthName": "Jan",
        "monthNum": 1
    },
    {
      "id": "7307dcc0-4bf7-4812-97d7-ba5a6c3f4385",
      "title": "Meet with the Otedola's",
      "city": "",
      "details": "",
      "dateString": "Wed Jan 11 2023",
      "time": "00:15:00 GMT+0100 (West Africa Standard Time)",
      "dayName": "Wed",
      "year": "2023",
      "monthDate": "01",
      "monthName": "Jan",
      "monthNum": 1
    },
    {
        "id": "7307dcc0-4bf7-4812-97d7-ba5a6c3f4386",
        "title": "meet with Dangote",
        "city": "",
        "details": "",
        "dateString": "Wed Jan 11 2023",
        "time": "00:15:00 GMT+0100 (West Africa Standard Time)",
        "dayName": "Wed",
        "year": "2023",
        "monthDate": "01",
        "monthName": "Jan",
        "monthNum": 1
    }
    ]},
    reducers: {
      addReminder: (state, action) => {

        try {

        let dateArray = action.payload.dateString.toString().split(' ');
        let newData = {
           id: uuidv4() ,
           ...action.payload, 
           dayName: dateArray[0], 
           year: dateArray[3], 
           monthDate: dateArray[2], 
           monthName: dateArray[1], 
           monthNum: getMonthNumber(dateArray[1])
          }
          state.value.push(newData);
        } catch (error) {
          console.log(error);
        }
        
      },
  
      deleteReminder: (state, action) => {
        state.value = state.value.filter((item) => item.id !== action.payload.id);
      },
  
      updateReminder: (state, action) => {
        state.value.map((item) => {
          if (item.id === action.payload.id) {
            item.title = action.payload.title;
            item.city = action.payload.city;
            item.details = action.payload.details;
            item.dateString = action.payload.dateString;
            item.time = action.payload.time;
          
          } else { 
            let newData = action.payload
            newData.id = uuidv4();
            state.value.push(newData)
          }
        });
      },
    },
  });
  
  export const { addReminder, deleteReminder, updateReminder } = reminderSlice.actions;
  export default reminderSlice.reducer;
  