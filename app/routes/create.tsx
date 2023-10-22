import React from 'react'
import { Form } from "@remix-run/react";
import { Create } from '~/service/list';
import InputMask from 'react-input-mask';
import Swal from 'sweetalert2';


export default class UserManager extends React.Component {

    constructor(props: any) {
        super(props)
    }

    submit(e: any, w: any) {        
        e.preventDefault()
        const name = e.currentTarget[0].value
        const email = e.currentTarget[1].value
        const birthday = e.currentTarget[2].value
        
        Create({
            name,
            email,
            birthday
        }).then(
            req => {
                w.location.href = "/"
            },
            err => {
                const data = err.response.data
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: data.error
                })
            }
        )
    }

    render() {
        const _self = this
        return (
            <section>
                <cite>
                    <h1>Create a new user</h1>
                    <a href="/">Back</a>
                </cite>

                <div>
                    <Form onSubmit={(e) =>_self.submit(e, window)} method='post'>

                        <div>
                            <label htmlFor="">Name</label>
                            <input type="text" name='name' placeholder='Name' required />
                        </div>
                        
                        <div>
                            <label htmlFor="">E-mail</label>
                            <input type="email" name='email' placeholder='Email' required />
                        </div>

                        <div>
                            <label htmlFor="">Birthday</label>
                            <InputMask mask="99/99/9999">
                                {/* {} */}
                            </InputMask>
                        </div>

                        <button className='btn primary'>Save</button>

                    </Form>
                </div>
                
            </section>
        )

    }
}