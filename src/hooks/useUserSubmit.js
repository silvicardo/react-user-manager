import React, {useState} from 'react';
import axios from "axios";

const API_URL = window.Cypress ? 'http://localhost:3001' : process.env.REACT_APP_API_URL

export default function useUserSubmit(userId = null){

    const apiUrl = userId ? `${API_URL}/user/${userId}/edit`  : `${API_URL}/user/create`;
    const method = userId ? 'post' : 'put';

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const onSubmit = async (submitData) => {

        if(isSubmitting) return;

        setIsSubmitting(true);
        setSubmitError('');

        try {
            const {data} = await axios[method](apiUrl, submitData);
            setIsSubmitting(false);
            return Promise.resolve(data)
        } catch (e) {
            setSubmitError(e.message);
            return Promise.reject(e.message);
        }

    }

    return [onSubmit, isSubmitting, submitError];

}