import {useState, useEffect} from 'react';

const Timer = () => {
  //definisco lo stato 'time' inizializzato a 0, e la funzione per aggiornarlo
  const [time, setTime] = useState(0);

  //carico il valore da session storage al primo render con useEffect
  useEffect(() => {
    const storedTime = sessionStorage.getItem('time'); 
    //recupero il valore 'time' salvato nella sessione del browser (se esiste)
    if (storedTime) {
       //se esiste, aggiorno lo stato 'time' convertendo il valore da stringa a numero
        setTime(parseInt(storedTime, 10));
    }
  }, []);   //questo effetto viene eseguito solo una volta, al primo render (array di dipendenze vuoto)

  //aggiorno il valore ogni secondo
  useEffect(() => {
    const interval = setInterval(() => { //creo un intervallo
        setTime(prevTime => { //aggiorno il valore di 'time', la funzione riceve il valore precedente
            const updated = prevTime + 1; //incremento il valore di 1
            sessionStorage.setItem('time', updated); //salvo il nuovo valore in sessionStorage
            return updated;
        })
    }, 1000); //imposto un intervallo di 1 secondo

    //quando il componente viene smontato, cancello l'intervallo
    return () => clearInterval(interval);
  }, []);


  return (
    <h3 className='mb-4'>⏲️Tempo trascorso: {time} secondi⏲️</h3>
  )

}

export default Timer;