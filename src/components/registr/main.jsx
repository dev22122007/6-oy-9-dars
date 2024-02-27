import React, { useRef, useState } from 'react'

function Signup(props) {
    const nameRef = useRef();
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const rePasswordRef = useRef();
    const [hasError, setHasError] = useState(false)

    function validate(nameRef, usernameRef, emailRef, passwordRef, rePasswordRef) {
        if (!nameRef.current.value) {
            alert("Name bo'sh bo'lishi mumkin emas!");
            nameRef.current.focus();
            return false;
        }

        if (!usernameRef.current.value) {
            alert("Username bo'sh bo'lishi mumkin emas!");
            usernameRef.current.focus();
            return false;
        }

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

        if (!rePasswordRef.current.value) {
            alert("Repassword bo'sh bo'lishi mumkin emas!");
            rePasswordRef.current.focus();
            return false;
        }

        if (rePasswordRef.current.value != passwordRef.current.value) {
            alert("Parolni qayta kiriting!");
            rePasswordRef.current.value = '';
            passwordRef.current.focus();
            return false;
        }

        return true;
    }

    function handleSubmit(e) {
        e.preventDefault();
        const isValid = validate(nameRef, usernameRef, emailRef, passwordRef, rePasswordRef);
        if (isValid) {
            fetch('https://auth-rg69.ornerder.com/api/auth/signup', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    "username": `${usernameRef.current.value}`,
                    "email": `${emailRef.current.value}`,
                    "password": `${passwordRef.current.value}`
                })
            })
                .then(res => res.json())
                .then(data => {
                    localStorage.setItem('data', JSON.stringify(data))
                    props.setData(data)
                })
                .catch(() => {
                    setHasError(true)
                })
        }
    }

    return (
        <div className='container'>
            <h1 className='text-center mt-3'>Sign up</h1>
            <div className="row">
                <div className="col-3"></div>
                <div className="col-6 border p-3 mt-3 ">
                    {hasError && <div className="alert alert-danger" role="alert">
                        A simple danger alert—check it out!
                    </div>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputName1" className="form-label">Name</label>
                            <input ref={nameRef} type="text" className="form-control" id="exampleInputName1" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputUsername1" className="form-label">Username</label>
                            <input ref={usernameRef} type="text" className="form-control" id="exampleInputUsername1" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input ref={emailRef} type="email" className="form-control" id="exampleInputEmail1" />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input ref={passwordRef} type="password" className="form-control" id="exampleInputPassword1" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputRepassword1" className="form-label">Repassword</label>
                            <input ref={rePasswordRef} type="password" className="form-control" id="exampleInputRepassword1" />
                        </div>
                        <button type="submit" className="btn btn-primary">Sign up</button>
                    </form>
                </div>
                <div className="col-3"></div>
            </div>
        </div>
    )
}

export default Signup