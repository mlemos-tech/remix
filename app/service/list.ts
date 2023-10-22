import axios from "axios";
import { SERVER_URL } from "~/environment/properties";

export async function List(page: number) {
    return axios.get(`${SERVER_URL}/users?page=${page}`)
}

export async function Delete(id: string) {
    await axios.delete(`${SERVER_URL}/users?id=${id}`)
    return true
}

export function Create(user: any) {
    return axios.post(`${SERVER_URL}/users`, user)
}

export async function Show(id: string) {
    const user = await axios.get(`${SERVER_URL}/users/show?id=${id}`)
    return user.data
}

export function Update(id: string, user: any) {
    return axios.put(`${SERVER_URL}/users?id=${id}`, user)
}