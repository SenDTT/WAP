import { Color } from "./commonTypes"

export interface Policy {
    readonly id: number,
    title: string,
    category: Category,
    body: string,
    owner: User,
    votes: number,
    createdAt: string,
    updatedAt: string
}

export interface Category {
    readonly id: number,
    name: string,
    color?: Color,
    description: string,
    createdAt: string,
    updatedAt: string
}

export interface User {
    readonly id: number,
    username: string,
    email: string,
    fullname: string,
    createdAt: string,
    updatedAt: string
}

export interface AddPolicyForm {
    title: string;
    body: string;
    category_id: number;
    owner_id: number;
}