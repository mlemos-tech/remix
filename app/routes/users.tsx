import Paginate from "~/component/paginate"
import React from 'react'
import { List, Delete } from "../service/list";
import Swal from "sweetalert2";
import { redirect, redirectDocument } from "@remix-run/node";


const FIRST_PAGE = 0


export default class Users extends React.Component {
    constructor(props: any) {
        super(props)
        this.state = {
            users: {
                Content: []
            }
        }
    }

    componentWillMount() {        
        List(FIRST_PAGE).then(req => {
            this.setState({users: req.data})            
        })
    }

    edit(e: any, user: any) {
        redirectDocument(`/edit/${user.id}`)
    }

    remove(e: any, user: any) {
        e.preventDefault()

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(result => {
            if (result.isConfirmed) {

                Delete(user.id).then(() => {
                    var users = this.state.users
                    users.Content = users.Content.filter((u: any) => u.id != user.id)        
                    this.setState({users: users})
                })
            
            }
        })

     
        
        return false
    }

    render() {        
        const _self = this
        const users = this.state.users     

        return (
            <section className="container">
                <cite>
                    <h1>List Of Users</h1>
                    <a href="">Create new user</a>
                </cite>            
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Birthday</th>
                        <th>Options</th>
                    </tr>
                    
                </thead>
                
                   
                {users.Content.length ? (
                    <tbody>
                        {users.Content.map((user: any) => (                    
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.birthday}</td>
                                <td>
                                    <a href={`/edit/${user.id}`} >Edit</a>
                                    <button type="button" onClick={(e) => _self.remove(e, user)}>Delete</button>
                                </td>
                            </tr>                                                
                        ))}                   
                    </tbody>
                ) : (
                    <tbody>
                        <tr>
                            <td>ola</td>
                        </tr>
                    </tbody>
                )}
            </table>
            {/* <Paginate /> */}
        </section>
        )
    }
    
}