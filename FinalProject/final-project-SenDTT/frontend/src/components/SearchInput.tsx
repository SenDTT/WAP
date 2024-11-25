import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ChangeEvent, KeyboardEvent } from "react";

interface SearchInputProps {
    text: string,
    setText: (text: string) => void,
    onSubmitHandler: () => void
}

export default function SearchInput({ text, setText, onSubmitHandler }: SearchInputProps) {

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            console.log(event.key);
            onSubmitHandler();
        }
    };

    return (
        <div className="flex flex-row justify-start items-center w-full">
            <div className="relative mt-2 rounded-md shadow-sm w-full">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-1">
                    <MagnifyingGlassIcon className="size-5 text-gray-500" />
                </div>
                <input
                    id="search"
                    name="search"
                    type="text"
                    placeholder="Search..."
                    value={text}
                    onKeyDown={(e) => handleKeyDown(e)}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
                    className="block w-full rounded-md border-0 py-2 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm/6 outline-none"
                />
            </div>
        </div>
    )
}