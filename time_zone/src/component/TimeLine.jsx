import './Timeline.css'
import React, { useEffect, useState } from "react";
const Timeline = ({ area, TimeZone, currentTime, onChange, index, timezoneOffset, remove }) => {

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
      return hours * 60 + mins;
    }

    return 0;
  };

  const [selectedTime, setSelectedTime] = useState(currentTime);

  const handleSliderChange = (event) => {
    const newValue = parseInt(event.target.value);
    setSelectedTime(newValue);
    onChange(formatTime(newValue), index);
  };

  useEffect(() => {
    //  console.log("sdasD" + currentTime);
    if (currentTime) {
      const newTime = parseTime(currentTime);
      setSelectedTime(newTime);
    }
  }, [currentTime]);

  const handleremove = () => {
    remove(index)
  }
  return (
    <div className='border-4 m-8'>
      <div className='flex  justify-between mx-52 mb-3 '>
        <div>
          <span className='font-semibold text-2xl'>{TimeZone} ,   </span>
          {area}
        </div>
        <div>{formatTime(selectedTime)}</div>
        <div className=''><svg onClick={handleremove} className="w-6 h-6 cursor-pointer " xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 26 26">
          <path d="M 21.734375 19.640625 L 19.636719 21.734375 C 19.253906 22.121094 18.628906 22.121094 18.242188 21.734375 L 13 16.496094 L 7.761719 21.734375 C 7.375 22.121094 6.746094 22.121094 6.363281 21.734375 L 4.265625 19.640625 C 3.878906 19.253906 3.878906 18.628906 4.265625 18.242188 L 9.503906 13 L 4.265625 7.761719 C 3.882813 7.371094 3.882813 6.742188 4.265625 6.363281 L 6.363281 4.265625 C 6.746094 3.878906 7.375 3.878906 7.761719 4.265625 L 13 9.507813 L 18.242188 4.265625 C 18.628906 3.878906 19.257813 3.878906 19.636719 4.265625 L 21.734375 6.359375 C 22.121094 6.746094 22.121094 7.375 21.738281 7.761719 L 16.496094 13 L 21.734375 18.242188 C 22.121094 18.628906 22.121094 19.253906 21.734375 19.640625 Z"></path>
        </svg></div>
      </div>
      <div className='w-5/6 mx-auto'>

        <div className='justify-between flex -ml-4 -mr-4'>
          {Array.from({ length: 25 }, (_, index) => (
            <span key={index} className="">
              {formatTime(index * 60)}
            </span>
          ))}
        </div>
        <input
          className='w-full'
          type="range"
          min={0}
          max={24 * 60} // 24 hours * 60 minutes
          step={15} // 15-minute intervals
          value={selectedTime}
          onChange={handleSliderChange}
        />
      </div>

    </div>
  );
}
export default Timeline;


