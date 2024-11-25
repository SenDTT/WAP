import { createContext, useEffect, useState } from 'react'
import './App.css'
import { WeatherResponse } from './types'
import WeatherSearch from './components/WeatherSearch';
import WeatherDisplay from './components/WeatherDisplay';

export const WeatherContext = createContext<{data: WeatherResponse | undefined}>({data: undefined});

function App() {
  const [resData, setResData] = useState<WeatherResponse>();

  useEffect(() => {
    async function getWeatherData() {
      const response = await fetch(`${API_ENDPOINT}?units=imperial&q=${CITY}&appid=${API_KEY}`);
      const responseData = await response.json();

      setResData(responseData);
    }

    getWeatherData();
  }, []);

  const onSubmitHandler = async (text: string) => {
    const response = await fetch(`${API_ENDPOINT}?units=imperial&q=${text}&appid=${API_KEY}`);
    const responseData = await response.json();

    setResData(responseData);
  }
  return (
    <WeatherContext.Provider value={{data: resData}}>
      <div className='w-full flex-col flex justify-center items-center gap-4 mt-8'>
        <h1 className='text-3xl font-bold font-mono text-blue-600'>Weather Application</h1>
        <WeatherSearch onSubmitHandler={onSubmitHandler} />
        <WeatherDisplay />
      </div>
    </WeatherContext.Provider>
  )
}

export default App
