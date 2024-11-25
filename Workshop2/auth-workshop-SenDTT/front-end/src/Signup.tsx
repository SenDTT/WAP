import { ChangeEvent, FormEvent, useState } from "react";
import { postSignup } from "./api";
import { Link } from "react-router-dom";


const initial_data = {
    email: '',
    fullname: ''
};

const Signup = () => {
    const [formData, serFormData] = useState<{ email: string, fullname: string }>(initial_data);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await postSignup(formData).then(res => {
            setIsSuccess(res.data.success);
            serFormData(initial_data);
        });
    }
    return (
        <div className='flex flex-col w-full mx-auto justify-center items-center mt-40'>
            <header className='text-3xl'>Signup</header>
            <form onSubmit={handleSubmit} className="flex flex-col justify-center gap-4 my-4">
                <input className="rounded border border-slate-200 p-2" placeholder="email address" value={formData.email} onChange={(e: ChangeEvent<HTMLInputElement>) => serFormData(prev => ({ ...prev, email: e.target.value }))} />
                <input className="rounded border border-slate-200 p-2" placeholder="full name" value={formData.fullname} onChange={(e: ChangeEvent<HTMLInputElement>) => serFormData(prev => ({ ...prev, fullname: e.target.value }))} />
                <button className="bg-blue-600 hover:bg-blue-800 text-white p-2 rounded" type="submit">Submit</button>
            </form>
            {isSuccess && (
                <>
                    <span className="text-green-500">Signup successfull!</span>
                    <nav><Link to="/login" >Login</Link></nav>
                </>
            )}
        </div>
    );
}

export default Signup;