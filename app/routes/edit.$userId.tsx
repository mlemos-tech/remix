import { useState } from 'react'
import { Form, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { Update, Show } from '~/service/list';
import InputMask from 'react-input-mask';

export const loader = async ({ params }) => {
    const user =  await Show(params.userId)
    return json({ user })
}



export default function Edit() {    
    
    const { user } = useLoaderData();
    // const {  } = useLoaderData();
    const [state, setState] = useState({
        form: {
            email: user.email,
            name: user.name,
            birthday: user.birthday
        }        
    })

    const upName = (event: any) => { 
        var form = state.form
        form.name = event.target.value
        setState({form: form})
    }
    
    const upEmail = (event: any) => { 
        var form = state.form
        form.name = event.target.value
        setState({form: form})
    }


    const upBirthday = (event: any) => { 
        var form = state.form
        form.birthday = event.target.value
        setState({form: form})
    }

    const submit = (e: any, w: any) => {        
        e.preventDefault()
        console.log(state)
        Update(user.id, state.form).then(req => {
            w.location.href = '/'
        })
    }


    return (
        <section>
            <cite>
                <h1>Edit User</h1>
                <a href="/users">Back</a>
            </cite>

            <div>
                <Form onSubmit={(e) => submit(e, window)} method='post'>                
                    <div>
                        <label htmlFor="">Name</label>
                        <input type="text" name='name' placeholder='Name' value={state.form.name || ''} onChange={upName}/>
                    </div>
                    
                    <div>
                        <label htmlFor="">Email</label>
                        <input type="email" name='email' placeholder='Email' value={state.form.email || ''} disabled onChange={upEmail} />
                    </div>
                    
                    <div>
                        <label htmlFor="">Birthday</label>
                        <InputMask mask="99/99/9999" value={state.form.birthday} onChange={upBirthday}></InputMask>
                        {/* <input type="birthday" name='birthday' placeholder='Birthday' value={state.form.birthday || ''} onChange={upBirthday}/> */}
                    </div>
                    

                    <button className='btn primary'>Save</button>

                </Form>
            </div>
            
        </section>
    )
}