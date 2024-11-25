import { RequestHandler } from "express";
interface User {
    firstName: string,
    lastName: string
}

export const add_user_handler: RequestHandler<unknown, {result: string}, {user: User}> = (req, res, next) => {
    const {firstName, lastName} = req.body.user;

    res.json({result: `${firstName} ${lastName}`});
}