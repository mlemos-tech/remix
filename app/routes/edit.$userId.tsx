import React, { useState } from 'react'
import { Form, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { Update, Show } from '~/service/list';
import { useNavigate } from "react-router-dom";

export const loader = async ({ params }) => {
    const user =  await Show(params.userId)
    return json({ user })
}

export default function Edit() {    
    
    const { user } = useLoaderData();
    console.log(user)
    const [state, setState] = useState({
        form: {
            email: user.email,
            name: user.name,
            birthday: user.birthday
        }        
    })

    const upName = (event) => { 
        var form = state.form
        form.name = event.target.value
        setState({form: form})
    }
    
    const upEmail = (event) => { setState({email: event.target.value}) }
    const upBirthday = (event) => { 
        var form = state.form
        form.birthday = event.target.value
        setState({form: form})
    }

    const submit = (e: any) => {        
        e.preventDefault()
        
    
        Update(user.id, state.form).then(req => {
            // useNavigate()('/users')
        })
    }

    return (
        <section>
            <cite>
                <h1>Create a new user</h1>
                <a href="#">Back</a>
            </cite>

            <div>
                <Form onSubmit={submit} method='post'>

                    <input type="text" name='name' placeholder='Name' value={state.form.name || ''} onChange={upName}/>
                    <input type="email" name='email' placeholder='Email' value={state.form.email || ''} disabled="disabled" onChange={upEmail} />
                    <input type="birthday" name='birthday' placeholder='Birthday' value={state.form.birthday || ''} onChange={upBirthday}/>

                    <button>Create</button>

                </Form>
            </div>
            
        </section>
    )
}