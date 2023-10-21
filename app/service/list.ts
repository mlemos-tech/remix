import axios from "axios";

export async function List(page: number) {
    return axios.get(`http://localhost:5000/users?page=${page}`)
}

export async function Delete(id: string) {
    await axios.delete(`http://localhost:5000/users?id=${id}`)
    return true
}

export function Create(user: any) {
    return axios.post(`http://localhost:5000/users`, user)
}

export async function Show(id: string) {
    const user = await axios.get(`http://localhost:5000/users/show?id=${id}`)
    return user.data
}

export function Update(id: string, user: any) {
    return axios.put(`http://localhost:5000/users?id=${id}`, user)
}