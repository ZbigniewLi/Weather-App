import React, { useCallback, useState } from 'react';
import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import ErrorBox from '../ErrorBox/ErrorBox';

const WeatherBox = props => {
  const [weather, setWeather] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);

  const handleCityChange = useCallback(city => {

    setPending(true)

    // Fetch API
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=32475708dae65e4df02d2fbe1142c31b&units=metric`)
      .then(res => {

        if (res.status === 200) {
          return res.json()
            .then(data => {

              const weatherData = {
                city: data.name,
                temp: data.main.temp,
                icon: data.weather[0].icon,
                description: data.weather[0].main
              };

              setWeather(weatherData)
              console.log(weatherData);
              setPending(false);

            })
          } else {
            setError(true);
          }
      });
  });

  return (
    <section>
      <PickCity action={handleCityChange} />
      {weather && <WeatherSummary {...weather} />}
      {pending && <Loader />}
      { error  && <ErrorBox /> }
    </section>
  );
};

export default WeatherBox;