import NavBar from "../components/Navbar";
import Day from "../components/Day";
import TaskModal from "../components/taskModal";
import { useState } from "react";


export default function HomePage({routines, loading, error}) {
  const [date, setDate] = useState(() => {
    const newDate = new Date(); // Create a new Date object (current date)
    newDate.setDate(1); // Set the day to 1 (first day of the month)
    return newDate;
  });
  const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const days = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday","Friday","Saturday"];
  const currentDate = new Date();


  const createMonth = () => {
    let resultList = [];
    let dateCopy = new Date(date);
    let currMonth = dateCopy.getMonth();
    
    //if first day is not on a sunday
    if(dateCopy.getDay() != 0){
      while(dateCopy.getDay() > 0){
        dateCopy.setDate(dateCopy.getDate()-1);
      }
      //checks for new year transition from december to january
      while((dateCopy.getMonth() <= currMonth ||  (currMonth === 0 && dateCopy.getMonth() ===11)) && !(currMonth == 11 && dateCopy.getMonth() == 0)) {
        resultList.push({dayOfWeek: dateCopy.getDay(), dayOfMonth: dateCopy.getDate(), month: dateCopy.getMonth()});
        dateCopy.setDate(dateCopy.getDate()+1);
        console.log(dateCopy.getMonth(),"--", currMonth)
      }
      
    }
    //first day is a sunday
    else{
      while(dateCopy.getMonth() == currMonth){
        resultList.push({dayOfWeek: dateCopy.getDay(), dayOfMonth: dateCopy.getDate(), month: dateCopy.getMonth()});
        dateCopy.setDate(dateCopy.getDate()+1);
      }
    }
    //adds days from next month until the first sunday of next month
    while(dateCopy.getDay() != 0){
      resultList.push({dayOfWeek: dateCopy.getDay(), dayOfMonth: dateCopy.getDate(), month: dateCopy.getMonth()});
      dateCopy.setDate(dateCopy.getDate()+1);

    }
    return resultList;
  }

  const setToCurrentMonth = () => {
    const newDate = new Date();
    newDate.setDate(1);
    setDate(newDate);

  }

  const decreaseMonth = () => {
    const newDate = new Date(date);
    newDate.setMonth(date.getMonth()-1);
    setDate(newDate)
  };
  
  const increaseMonth = () => {
    const newDate = new Date(date);
    newDate.setMonth(date.getMonth()+1);
    setDate(newDate);
  };

  if(loading){
    return <p>Loading...</p>;
  }

  if(error){
    return <p>Error:{error}</p>
  }

  return(
    <div  className = "homePage">
      <NavBar/>
      {routines ? 
        (  
          <div className="calendar">
            <div className = "month">
              <button onClick = {setToCurrentMonth}> Today </button>
              <button onClick = {decreaseMonth}>&lt; </button>
              <h1>{month[date.getMonth()]}</h1>
              <h1>{date.getFullYear()}</h1>
              <button onClick = {increaseMonth}> &gt;</button>
            </div>
            <div className = "days">
              {days.map((item,index) => 
                <div className ="dayColumn">
                  <h2>{item}</h2>
                  {createMonth().filter((day)=> day.dayOfWeek == index).map(element => 
                    <div className= {`${element.month === date.getMonth() ? "currentMonth" : "otherMonth"} 
                    ${element.month === currentDate.getMonth() && element.dayOfMonth === currentDate.getDate() ? "currentDay" : ""}`}>
                     {element.month === date.getMonth() ?<><h3>{element.dayOfMonth}</h3> <TaskModal routines = {routines} day = {item}></TaskModal></> : <h3></h3>}
                     

                    </div>
                    )}
                </div>
                )}
            </div>  
          </div>
        )
        :
        (<p>no routines found</p>)
        } 
    </div>
  )

  }