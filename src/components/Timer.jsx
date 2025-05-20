import {useState, useEffect} from 'react';

const Timer = () => {
  const [time, setTime] = useState(0);

  //carico il valore da session storage al primo render
  useEffect(() => {
    const storedTime = sessionStorage.getItem('time');
    if (storedTime) {
        setTime(parseInt(storedTime, 10));
    }
  }, []);

  //aggiorno il valore ogni secondo
  useEffect(() => {
    const interval = setInterval(() => {
        setTime(prevTime => {
            const updated = prevTime + 1;
            sessionStorage.setItem('time', updated);
            return updated;
        })
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  //salvo il valore aggiornato su session storage
  useEffect(() => {
    sessionStorage.setItem('time', time);
  }, [time]);


  return (
    <h3 className='mb-4'>⏲️Tempo trascorso: {time} secondi⏲️</h3>
  )

}

export default Timer;