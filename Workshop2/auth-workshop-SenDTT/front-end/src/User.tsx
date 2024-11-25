import { useEffect, useState } from "react";
import { getSecretData } from "./api";

export const User = () => {
    const [secret, setSecret] = useState('');

    useEffect(() => {
        async function getSecretMessage() {
            await getSecretData().then(res => {
                setSecret(res.data.secret);
            })
        }
        getSecretMessage();
    }, []);

    return (<>Secret Data: {secret}</>);
}