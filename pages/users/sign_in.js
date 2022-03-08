import { Button, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios'
import { errorHelper } from 'helpers/functions';
import dynamic from 'next/dynamic'
import { getSession, signIn } from 'next-auth/client'
import { errorDispatcher } from 'store/actions/notificationAction'
import { registerUser, signInUser } from 'store/actions/userAction'
const Loader = dynamic(() => import('components/Loader'))


export const getServerSideProps = async (context) => {
    const session = await getSession({ req: context.req });
    if (session) {
        return {
            redirect: {
                destination: '/users/dashboard',
                permanent: false
            }
        }
    }
    return {
        props: {}
    }
}


const SignIn = () => {

    const [formType, setFormType] = useState(false);
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: { email: 'francis@gmail.com', password: 'testing123' },
        validationSchema: Yup.object({
            email: Yup.string()
                .required('Sorry the email is required')
                .email('This is no a valid email'),
            password: Yup.string()
                .required('Sorry, the password is required')
        }),
        onSubmit: (values) => {
            submitForm(values)
        }
    });

    const submitForm = async (values) => {
        setLoading(true)
        if (formType) {
            // Register
            axios.post('/api/auth/register', values)
                .then(response => {
                    dispatch(registerUser(values, response.data, router))
                }).catch(error => {
                    setLoading(false);
                    dispatch(errorDispatcher(error.response.data.message))
                })
        }
        else {
            //SignIn
            const result = await signIn('credentials', {
                redirect: false,
                email: values.email,
                password: values.password
            })
            if (result.error) {
                setLoading(false);
                dispatch(errorDispatcher(result.error))
            } else {
                const session = await getSession();
                dispatch(signInUser(session, router))
            }
        }
    }

    return (
        <div className="container full_vh small top-space">
            {loading ?
                <Loader />
                :
                <>
                    <h1>{formType ? 'Register' : 'Sign in'}</h1>
                    <form className="mt-5" onSubmit={formik.handleSubmit}>
                        <div className="form-group my-4">
                            <TextField
                                style={{ width: '100%' }}
                                name="email"
                                label="Enter your email"
                                variant="outlined"
                                {...formik.getFieldProps('email')}
                                {...errorHelper(formik, 'email')}
                            />
                        </div>
                        <div className="form-group my-4">
                            <TextField
                                style={{ width: '100%' }}
                                name="password"
                                label="Enter your password"
                                variant="outlined"
                                type="password"
                                {...formik.getFieldProps('password')}
                                {...errorHelper(formik, 'password')}
                            />
                        </div>
                        <div className="mb-3">
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                size="small"
                                sx={{ marginRight: '1rem' }}
                            >
                                {formType ? 'Register' : 'Sign in'}
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                size="small"
                                onClick={() => setFormType(!formType)}
                            >
                                {formType ?
                                    'Already registered, click here'
                                    :
                                    'Already signed in, click here'
                                }
                            </Button>
                        </div>
                    </form>
                </>
            }

        </div >
    );
}

export default SignIn;