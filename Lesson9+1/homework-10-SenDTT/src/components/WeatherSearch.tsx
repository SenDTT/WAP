import { ChangeEvent, FormEvent, useState } from "react";

function WeatherSearch ({onSubmitHandler}: {onSubmitHandler: (event: string) => void}) {
    const [text, setText] = useState<string>("");

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmitHandler(text);
        setText("");
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    };

    return (
        <form className="flex flex-row justify-center items-center " onSubmit={(e) => onSubmit(e)}>
            <input className="p-2 border-y border-l border-slate-300" value={text} onChange={handleChange} placeholder="Enter City Name" />
            <button className="rounded-r border-y border-r border-blue-600 bg-blue-600 hover:bg-blue-500 text-white p-2" type="submit">Search</button>
        </form>
    )
}

export default WeatherSearch;