import React, {useState} from 'react';
import axios from "axios";

export default function useUserSubmit(userId = ''){

    const apiUrl = userId ? `/user/${userId}/edit`  : '/user/create';
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
        }

    }

    return [onSubmit, isSubmitting, submitError];

}