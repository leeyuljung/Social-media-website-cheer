import { useState } from 'react';

export const useForm = (callback, initialValues = {}) => {
    const [ values, setValues ] = useState(initialValues);

    const [ loading, setLoading ] = useState(false);

    const onChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
    }

    const onSubmit = (e) => {
        e.preventDefault();
        callback();
        setLoading(true);
    }

    return {
        values,
        loading,
        onChange,
        onSubmit,
        setLoading
    }
}