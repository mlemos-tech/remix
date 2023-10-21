import React from 'react'
import { List, Delete } from "../service/list";
import Swal from "sweetalert2";
import { redirect } from '@remix-run/node';


const FIRST_PAGE = 0


export default class Users extends React.Component {
    state = {
        page: 0,
        users: {
            Content: [],
            Page: 0,
            NumOfPage: 0
        }
    }
    
    constructor(props: any) {
        super(props) 
    }
    
    componentWillMount(): void {        
       this.toList(this.state.page)
    }

    edit(e: any, user: any) {
        return redirect(`/edit/${user.id}`)
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
                this.delete(user.id)            
            }
        })
    }

    delete(id: string): void {
        Delete(id).then(() => {
            var users = this.state.users || {Content: []}
            users.Content = users.Content.filter((u: any) => u.id != id)        
            this.setState({
                users: users,
                page: this.state.page
            })
        })
    }

    toList(page: number) {
        List(page).then(req => {
            this.setState({
                users: req.data,
                page: this.state.page
            })            
        })
    }

    createLinks(page: number, limit: number): Array<number> {
        if (limit < 5) {
            page = 1
        }

        const link = []
        for (var i=page; i <= limit; i++) {
            link.push(i)
        }
        return link
    }

    toPage(e: any, l: number): void {
        e.preventDefault()
        const page = l - 1
        if (page < 0 || page >= this.state.users.NumOfPage || this.state.users.Page == page) {
            return
        }

        this.toList(page)
    }

    render() {        
        const _self = this
        const users = this.state.users || {Content: []}
        const links = this.createLinks(users.Page, users.NumOfPage)
        const _page = users.Page
        
        return (
            <section className="container">
                <cite>
                    <h1>List Of Users</h1>
                    <a href="/create">Create new user</a>
                </cite>  

                <table cellPadding={0} cellSpacing={0}>
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
                                    <td align="center" className="option">
                                        <a className="btn primary" href={`/edit/${user.id}`} >Edit</a>
                                        <button className="btn danger" type="button" onClick={(e) => _self.remove(e, user)}>Delete</button>
                                    </td>
                                </tr>                                                
                            ))}                   
                        </tbody>
                    ) : (
                        <tbody>
                            <tr>
                                <td colSpan={4} align="center">Empty.....</td>
                            </tr>
                        </tbody>
                    )}
                </table>

                {(users.NumOfPage > 1) ? (

                    <div id="paginate">
                        <ul>
                            <li><a className="prev" href="#" onClick={e => _self.toPage(e, _page + 1)}>Prev</a></li>
                            {links.map(l => (<li key={l}><a href="#" className="num" onClick={e => _self.toPage(e, l)}>{l}</a></li>))}
                            <li><a className="next" href="#" onClick={e => _self.toPage(e, _page + 2)}>Next</a></li>
                        </ul>
                    </div>

                 ) : ( 
                    <div></div>
                )}


        </section>
        )
    }
    
}