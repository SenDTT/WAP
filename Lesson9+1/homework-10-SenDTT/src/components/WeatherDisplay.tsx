import { useContext } from "react";
import { WeatherContext } from "../App";

function WeatherDisplay () {
    const {data} = useContext(WeatherContext);

    return (
        <>
        {data && <div className="w-1/4 mx-auto flex flex-col justify-start items-center gap-4">
            <div className="flex flex-row justify-start gap-4 items-center w-full"><p>City name: </p><p>{data.name}</p></div>
            <div className="flex flex-row justify-start gap-4 items-center w-full"><p>Temperature: </p><p>{data.main.temp}</p></div>
            <div className="flex flex-row justify-start gap-4 items-center w-full"><p>Humudity: </p><p>{data.main.humidity}</p></div>
            <div className="flex flex-row justify-start gap-4 items-center w-full"><p>Description: </p><p>{data.weather[0].description}</p></div>
        </div>}
        </>
    );
}

export default WeatherDisplay;