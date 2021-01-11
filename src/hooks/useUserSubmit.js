import React, {useState} from 'react';
import {getRetryableAxiosInstance} from "../helpers";
import lang from "../lang";

const API_URL = window.Cypress ? 'http://localhost:3001' : process.env.REACT_APP_API_URL

export default function useUserSubmit(userId = null){

    const apiUrl = userId ? `${API_URL}/user/${userId}/edit`  : `${API_URL}/user/create`;
    const method = userId ? 'put' : 'post';

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const shouldRetry = (currentRetryAttempt, failedAttemptAxiosError) => {

        if(currentRetryAttempt < 1){

            if(!failedAttemptAxiosError.response){
                return true;
            }

            if(failedAttemptAxiosError.response.status === 403 || failedAttemptAxiosError.response.status === 400 ){//403 : duplicate name, 400: invalid userid
                return false;
            }
            //e.response means api returned other kind of error, otherwise it's missing network or other
            return !failedAttemptAxiosError.response;

        }
        return false;
    }

    const onSubmit = async (submitData) => {

        if(isSubmitting) return;

        setIsSubmitting(true);
        setSubmitError('');

        const axiosInstance = getRetryableAxiosInstance(shouldRetry)

        try {
            const {data} = await axiosInstance[method](apiUrl, submitData);
            setIsSubmitting(false);
            return Promise.resolve(data)
        } catch (e) {
            setSubmitError(e.response ? e.response.data.error : lang.server.editCreate.errors.notUsersFault);
            setIsSubmitting(false);
            return Promise.reject(e.message);
        }

    }

    return [onSubmit, isSubmitting, submitError];

}