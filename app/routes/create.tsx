import React from 'react'
import { Form } from "@remix-run/react";
import { Create } from '~/service/list';
import { useNavigate } from "react-router-dom";

export default class UserManager extends React.Component {

    constructor(props: any) {
        super(props)
    }

    submit(e: any) {        
        e.preventDefault()
        
        const name = e.currentTarget[0].value
        const email = e.currentTarget[1].value
        const birthday = e.currentTarget[2].value
        
        Create({
            name,
            email,
            birthday
        }).then(req => {
            useNavigate()('/users')
        })
    }

    render() {
        const _self = this

        return (
            <section>
                <cite>
                    <h1>Create a new user</h1>
                    <a href="#">Back</a>
                </cite>

                <div>
                    <Form onSubmit={_self.submit} method='post'>

                        <input type="text" name='name' placeholder='Name' />
                        <input type="email" name='email' placeholder='Email' />
                        <input type="birthday" name='birthday' placeholder='Birthday' />

                        <button>Create</button>

                    </Form>
                </div>
                
            </section>
        )

    }
}