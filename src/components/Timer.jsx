import {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, set } from '../redux/timerSlice';

const Timer = () => {
  
  const timer = useSelector((state) => state.timer); //prendo lo stato del timer da Redux
  const dispatch = useDispatch(); // dispatcher per inviare azioni

  //carico il valore da session storage al primo render con useEffect
  useEffect(() => {
    const storedTime = sessionStorage.getItem('time'); 
    //recupero il valore 'time' salvato nella sessione del browser (se esiste)
    if (storedTime) {
       //se esiste, aggiorno lo stato 'time' convertendo il valore da stringa a numero
        dispatch(set(parseInt(storedTime, 10)));
    }
  }, [dispatch]);   //questo effetto viene eseguito solo una volta, al primo render (array di dipendenze vuoto)

  // incremento ogni secondo
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(increment());
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatch]);

  // salvo in sessionStorage ogni volta che cambia
  useEffect(() => {
    sessionStorage.setItem("time", timer);
  }, [timer]);


  return (
    <h3 className='mb-4'>⏲️Tempo trascorso: {timer} secondi⏲️</h3>
  )

}

export default Timer;