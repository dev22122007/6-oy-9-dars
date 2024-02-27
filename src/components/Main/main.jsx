import React, { useEffect, useState } from 'react'
import { Audio } from 'react-loader-spinner';

function Home(props) {
    const [data, setdata] = useState(null);

    useEffect(() => {
        fetch('https://auth-rg69.ornerder.com/all')
            .then(res => res.json())
            .then(data => {
                setdata(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    function handleClick(e) {
        e.preventDefault()
        localStorage.removeItem('data');
        localStorage.removeItem('token');
        props.setData(null)
    }


    return (
        <div>
            {data ? (
                <div className="container  d-flex justify-content-center align-items-center flex-column">
                    <h1 className='text-center mt-3'>Hello Users!</h1>
                    <div className="d-flex w-100 justify-content-end">
                        <button onClick={handleClick} className="btn btn-danger w-25 fs-4">Logout</button>
                    </div>
                    <div className="card-wrapper d-flex flex-wrap justify-content-between">
                        {
                            data.data.map(el => {
                                return (
                                    <div role="button" className="card w-25 p-3 m-3 d-flex lh-1 flex-wrap cursor-pointer">
                                        <p className='lh-1 mt-3'><b>username:</b> {el.username}</p>
                                        <p className='lh-1'><b>email:</b> {el.email}</p>
                                        <p className='lh-1'><b>password:</b> {el.password}</p>

                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            ) : (
                <Audio
                    height="80"
                    width="80"
                    radius="9"
                    color="green"
                    ariaLabel="loading"
                    wrapperStyle
                    wrapperClass
                />
            )}
        </div>
    )
}

export default Home