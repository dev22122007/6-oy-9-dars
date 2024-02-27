import React from 'react'
import { useRef, useState } from 'react';

function Login(props) {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [hasError, setHasError] = useState(false)

    function validate(emailRef, passwordRef) {

        if (!emailRef.current.value) {
            alert("Email bo'sh bo'lishi mumkin emas!");
            emailRef.current.focus();
            return false;
        }

        if (!passwordRef.current.value) {
            alert("Password bo'sh bo'lishi mumkin emas!");
            passwordRef.current.focus();
            return false;
        }

        if (passwordRef.current.value.length < 4) {
            alert("Password uzunligi 4ta belgidan ortiq bo'lishi kerak!");
            passwordRef.current.focus();
            return false;
        }

        return true;
    }

    function handleSubmit(e) {
        e.preventDefault();
        const isValid = validate(emailRef, passwordRef);
        if (isValid) {
            if (localStorage.getItem('data')) {
                let data = JSON.parse(localStorage.getItem('data'))
                if (data.email == emailRef.current.value && data.password == passwordRef.current.value) {
                    props.setToken(`QpwL5tke4Pnpja7X${data.id}`)
                    localStorage.setItem('token', JSON.stringify(`QpwL5tke4Pnpja7X${data.id}`))
                } else {
                    setHasError(true)
                }
            }
        }
    }

    function handleClick() {
        localStorage.removeItem('data');
        props.setdata1(localStorage.getItem('data'));
    }

    return (
        <div className='container'>
            <h1 className='text-center mt-3'>Login</h1>
            <div className="row">
                <div className="col-3"></div>
                <div className="col-6 border p-3 mt-3 ">
                    <form onSubmit={handleSubmit}>
                        {hasError &&
                            <div className="alert alert-danger" role="alert">
                                Password or Email is wrong!
                            </div>
                        }
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input ref={emailRef} type="email" className="form-control" id="exampleInputEmail1" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input ref={passwordRef} type="password" className="form-control" id="exampleInputPassword1" />
                        </div>
                        <button type="submit" className="btn btn-primary w-25">Login</button>
                    </form>

                    <button onClick={handleClick} type="submit" className="btn btn-danger mt-3 w-15 mr-50" >Return Signup</button>
                </div>
                <div className="col-3"></div>
            </div>
        </div>
    )
}

export default Login