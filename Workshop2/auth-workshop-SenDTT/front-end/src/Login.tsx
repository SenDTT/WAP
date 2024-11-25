import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { Context } from "./Global";
import { postLogin } from "./api";
import { Link } from "react-router-dom";

export const Login = () => {
    const [email, setEmail] = useState('');
    const { login } = useContext(Context);
    const [isSuccess, setIsSuccess] = useState<boolean | undefined>();
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await postLogin({ email }).then(res => {
            const response = res.data;
            setIsSuccess(response.success);
            if (response.success) {
                const plain_data = JSON.parse(atob(response.enc_data));
                login(plain_data.email, response.enc_data, response.hash_data);
                setEmail('');
            }
        });
    }
    return (
        <div className='flex flex-col w-full mx-auto justify-center items-center mt-40'>
            <header className='text-3xl'>Login</header>
            <form onSubmit={handleSubmit} className="flex flex-row justify-center gap-4 my-4">
                <input className="rounded border border-slate-200 p-2" placeholder="email address" value={email} onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
                <button className="bg-blue-600 hover:bg-blue-800 text-white p-2 rounded" type="submit">Submit</button>
            </form>
            <div className="w-full text-center">
                {isSuccess && (
                    <>
                        <span className="text-green-500">Signup successfull!</span>
                        <nav><Link to="/" >Home</Link></nav>
                    </>
                )}
                {isSuccess == false && (
                    <>
                        <span className="text-red-500">Email does not exist!</span>
                        <nav><Link to="/signup" >Signup</Link></nav>
                    </>
                )}
            </div>
        </div>
    )
}