[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/PMf6wEvZ)
[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=17113225)
## CS472-Homework-10-Communication

You will create a Weather application, create the following components:
* `App`: The main component that wraps the entire application with the WeatherContext provider.
* `WeatherContext`: The context that manages the state and provides functions to fetch and store weather data. Use a Context Provider to wrap the main application in App. Implement state management in WeatherContext using the useState hook to handle the weather data state.
* `WeatherSearch`: Contains the form to search for weather information based on the city name. The input should be a controlled component. Ensure the input value is managed by React state and is reset after fetching the weather data. Use a form with an input field and a submit button to trigger the search.
* `WeatherDisplay`: Displays the current weather information fetched from the API (City name, Temperature, Humudity, and Description). This component will consume the context to get the weather data and render each WeatherItem.

### Notes:
* Sign up at [OpenWeatherMap](https://openweathermap.org/) to get a free API key.
* Once your account is active, you should receive weather information via the following API:
`https://api.openweathermap.org/data/2.5/weather?units=imperial&q=CITY&appid=YOUR_API_KEY`
* Replace `CITY` and `YOUR_API_KEY` with the actual city name and API key. Make sure you use `.env` file to store your API key and add it to your `.gitignore` file.
* Find below some helper interfaces:
```typescript
export interface ErrorResponse {
    cod: string;
    message: string;
}
export interface WeatherResponse {
    coord: Coord;
    weather: Weather[];
    base: string;
    main: Main;
    visibility: number;
    wind: Wind;
    clouds: Clouds;
    dt: number;
    sys: Sys;
    timezone: number;
    id: number;
    name: string;
    cod: number;
}

export interface Coord {
    lon: number;
    lat: number;
}

export interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface Main {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
}

export interface Wind {
    speed: number;
    deg: number;
}

export interface Clouds {
    all: number;
}

export interface Sys {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
}
```

