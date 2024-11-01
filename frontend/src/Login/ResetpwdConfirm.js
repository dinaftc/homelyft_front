import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { reset_password_confirm } from '../actions/auth';
import {  useParams } from "react-router-dom";
import "./Login.css";
const ResetPasswordConfirm = ({ match, reset_password_confirm }) => {
    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState({
        new_password: '',
        re_new_password: ''
    });

    const { new_password, re_new_password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const routeParams = useParams();
    const onSubmit = e => {
        e.preventDefault();
        
        const uid =routeParams.uid;
        const token = routeParams.token;
        reset_password_confirm(uid, token, new_password, re_new_password);
        setRequestSent(true);
    };

    if (requestSent) {
        return <Navigate to='/' />
    }

    return (
        <div className="w-screen h-screen flex justify-center items-center">
        <div className="my-4 bg-offwhite rounded-lg py-12 px-12">
        <h1 className="text-3xl font-bold font-pop text-center text-primary mb-4">
            your new password
          </h1>
            <form onSubmit={e => onSubmit(e)}>
            <div className="InputBox">
                    <input
                        className='form-control'
                        type='password'
                        placeholder='New Password'
                        name='new_password'
                        value={new_password}
                        onChange={e => onChange(e)}
                        minLength='6'
                        required
                    />
                </div>
                <div className="InputBox">
                    <input
                        className='form-control'
                        type='password'
                        placeholder='Confirm New Password'
                        name='re_new_password'
                        value={re_new_password}
                        onChange={e => onChange(e)}
                        minLength='6'
                        required
                    />
                </div>
                <button className=" text-lg btn btn-active border-0 rounded-lg text-white w-full bg-primary normal-case font-pop font-normal font-600"
             type='submit'>Reset Password</button>
            </form>
        </div></div>
    );
};

export default connect(null, { reset_password_confirm })(ResetPasswordConfirm);