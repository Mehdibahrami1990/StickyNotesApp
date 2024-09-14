import React, { useState, useEffect } from 'react';
const Timer = ({ sec = 0, TimeLift }) => {
  const [seconds, setSeconds] = useState(sec);
  useEffect(() => {
    const myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        TimeLift(seconds);
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  return (
    <div>
      <p>{seconds} seconds 😎</p>
    </div>
  );
};

export default React.memo(Timer);
