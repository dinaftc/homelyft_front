import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { reset_password } from '../actions/auth';
import "./Login.css";
const ResetPassword = ({ reset_password }) => {
    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState({
        email: ''
    });

    const { email } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        reset_password(email);
        setRequestSent(true);
    };

    if (requestSent) {
        return <Navigate to='/' />
    }

    return (
        <div className="w-screen h-screen flex justify-center items-center">
        <div className="my-4 bg-offwhite rounded-lg py-12 px-12">
          <h1 className="text-3xl font-bold font-pop text-center text-primary mb-2 ">
            Please enter your email :
          </h1>
            <form onSubmit={e => onSubmit(e)}>
                <div className="InputBox">
                    <input
                        className='form-control'
                        type='email'
                        placeholder='Email'
                        name='email'
                        value={email}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <button className=" text-lg btn btn-active border-0 rounded-lg text-white w-full bg-primary normal-case font-pop font-normal font-600"
             type='submit'>Reset Password</button>
            </form>
        </div>
        </div>
    );
};

export default connect(null, { reset_password })(ResetPassword);