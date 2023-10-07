import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import "./index.css";
import Timeline from "./component/TimeLine";

function App() {
  const url = "http://worldtimeapi.org/api/timezone/";

  const [timezonesData, setTimezonesData] = useState([]);
  const [inputText, setInputText] = useState("");
  const [data, setData] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [visible, setVisible] = useState(false);


  const getSuggetionData = async () => {
    const apiUrl = url;

    try {
      const res = await axios.get(apiUrl);
      const timezoneSuggestions = res.data;
      setData(timezoneSuggestions);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {

    getSuggetionData()
  }, [])

  const getfilltredsuggetions = () => {
    try {
      if (data && data.length > 0) {
        const filteredSuggestions = data.filter((item) =>
          item.toLowerCase().includes(inputText.toLowerCase())
        );
        // console.log(filteredSuggestions);
        setSuggestions(filteredSuggestions);
      } else {

        setSuggestions([]);
      }
    } catch (error) {
      console.error("An error occurred while filtering suggestions:", error);
    }
  };

  useEffect(() => {

    getfilltredsuggetions()

  }, [data, inputText])

  const handleZoneDataVal = async () => {
    const apiUrl = url + selectedItem;

    try {
      const res = await axios.get(apiUrl);
      const timezoneData = res.data;
      //const timezoneDataArray = Object(timezoneData); // Convert object to array
      //console.log(timezoneDataArray);
      setInputText("")
      //console.log(timezoneData);
      setTimezonesData((prevdata) => [...prevdata, timezoneData]);
    } catch (error) {
      console.log(error);
    }

  }
  const handleSuggestionClick = (item) => {
    setSuggestions([])
    setInputText(item)
    setVisible(false)
    setSelectedItem(item);
  };

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const time = `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
    return time;
  }


  const parseTime = (timeString) => {

    console.log(timeString);
    const [hours, mins] = timeString.split(':').map(Number);

    if (!isNaN(hours) && !isNaN(mins)) {
      const temp = hours * 60 + mins
      if (temp > 1440) {
        setX(x - 1440)
        return 0
      } else if (temp < 0) {
        setX(1440 - temp)
        return (1440);
      }
      return temp;
    }

    return 0;
  };

  const [x, setX] = useState(0)
  const handleTimeChange = (newTime, index) => {

    const differencce = parseTime(newTime) - parseTime(timezonesData[index].utc_offset)
    console.log("old " + parseTime(timezonesData[index].utc_offset));
    console.log("new " + parseTime(newTime));

    const newtimezonedata = [...timezonesData];

    newtimezonedata.forEach((element, index1) => {
      if (index1 != index) {
        console.log("parseTime(element.utc_offset) " + parseTime(element.utc_offset));
        console.log(parseTime(element.utc_offset) + differencce);
        element.utc_offset = formatTime(parseTime(element.utc_offset) + differencce - x)
        console.log("formatTime(parseTime(element.utc_offset) + differencce-x " + formatTime(parseTime(element.utc_offset) + differencce - x));
        console.log("x " + x);
      }
    });
    console.log("x2" + x);
    setX(differencce)

    setTimezonesData(newtimezonedata)

  }
const remove=(index)=>{
  const newtimezonedata = [...timezonesData]

  newtimezonedata.splice(index, 1);
  setTimezonesData(newtimezonedata);

  
}

  return (
    <div className="justify-center">
      <div className="text-center mt-3 font-bold text-2xl">

Add Time Zone To Convert...
      </div>

      <div className="flex m-10 gap-3 justify-center  ">
        <div>
          <input
            className="border-2 w-full"
            type="text"
            placeholder="Type zone name..."
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value)
            }}
            onFocus={(e) => setVisible(true)}

          />
          {
            visible ?
              <ul className="absolute bg-white overflow-auto h-auto max-h-52 ">
                {suggestions.map((item, index) => (
                  <li
                    onClick={() => handleSuggestionClick(item)}
                    style={{ cursor: 'pointer' }}
                    key={index}>{item}</li>
                ))}
              </ul> : ""}
        </div>
        <button className="bg-blue-500 px-5 rounded-lg h-6" onClick={handleZoneDataVal}>
          Add
        </button>
      </div>



      <div className="mt-10 ">
       
        {timezonesData.map((timezone, index) => (
          <span className="">
            <Timeline index={index} key={index} remove={remove} onChange={handleTimeChange} TimeZone={timezone.abbreviation} area={timezone.timezone} currentTime={timezone.utc_offset} />
          </span>

        ))}

      </div>
    </div>
  );
}

export default App;




