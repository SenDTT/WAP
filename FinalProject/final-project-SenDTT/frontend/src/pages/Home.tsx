import { FormEvent, useContext, useEffect, useState } from "react";
import SearchInput from "../components/SearchInput";
import { Category, Policy } from "../types/policyTypes";
import { getPolicies } from "../api";
import { GetParams } from "../types/commonTypes";
import ListPolicies from "../components/ListPolicies";
import { Link } from "react-router-dom";
import DropdownList from "../components/ListBox";
import { Context } from "../Global";
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export const initial_params = {
    limit: 100,
    offset: 0,
    search: '',
    category: 0,
    year: (new Date).getFullYear()
};

const Home = () => {
    const [text, setText] = useState<string>("");
    const { categories, isAuthenticated } = useContext(Context);
    const [selected, setSelected] = useState<Pick<Category, "id" | "name"> | null>(null);
    const [data, setData] = useState<{
        rows: Policy[],
        count: number
    }>({ rows: [], count: 0 });
    const [params, setParams] = useState<GetParams>(initial_params);
    const [value, onChangeDate] = useState<Value>(new Date());

    useEffect(() => {
        if (categories && categories.length > 0) {
            setSelected(categories[0]);
        }
    }, [categories]);

    useEffect(() => {
        if (selected) {
            setParams(prev => ({ ...prev, category: selected.id }));
        }
        if (value) {
            setParams(prev => ({ ...prev, year: (new Date(value.toString())).getFullYear() }));
        }
    }, [selected, value]);

    useEffect(() => {
        async function getData() {
            const response = await getPolicies(params);
            setData(response.data);
        }

        getData();
    }, [params.limit, params.offset, params.search, params.category, params.year]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        onSubmitHandler();
    }

    const onSubmitHandler = () => {
        setParams({
            limit: 10,
            offset: 0,
            search: text,
            category: selected?.id || 0,
            year: (new Date).getFullYear()
        });
    }

    return (
        <div className="flex flex-col justify-start items-center gap-4">
            <div className="flex flex-row justify-center items-center gap-4 w-2/5 mx-auto">
                <form onSubmit={handleSubmit} className="w-full">
                    <SearchInput text={text} setText={setText} onSubmitHandler={onSubmitHandler} />
                </form>
            </div>

            <div className="mt-8 w-full">
                <div className="flex flex-row justify-between items-center mb-5">
                    {categories && Array.isArray(categories) && (
                        <DropdownList setSelected={setSelected} categories={categories} selected={selected} />
                    )}
                    <DatePicker className="w-36" onChange={onChangeDate} value={value} format="y" yearAriaLabel="Year" yearPlaceholder="yyyy" maxDetail="year" maxDate={new Date()} />
                    {isAuthenticated() && (<Link to="/add-policy" className="rounded bg-indigo-600 text-white hover:bg-indigo-700 p-2 px-4">Add Policy</Link>)}
                </div>
                <ListPolicies {...data} />
            </div>
        </div>
    );
};

export default Home;