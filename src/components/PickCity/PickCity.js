import Button from '../Button/Button';
import TextInput from '../TextInput/TextInput';
import styles from './PickCity.module.scss';
import { useState } from 'react';

const PickCity = ({ action }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    action(city);
    setCity('');
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=32475708dae65e4df02d2fbe1142c31b&units=metric`)
   .then(res => res.json())
   .then(data => {
     console.log(data);
   });
  };


  return (
    <form className={styles.pickCityForm} onSubmit={handleSubmit}>
      <label>
        <TextInput
          placeholder="Enter city name...."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </label>
      <Button>Search</Button>
    </form>
  );
};

export default PickCity;