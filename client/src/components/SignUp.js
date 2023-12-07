import { Flex, Spacer, ButtonGroup, Button, Box, Heading, FormControl, FormLabel, Input, FormErrorMessage, Alert, AlertIcon, AlertTitle  } from '@chakra-ui/react'
import { Field, Form, Formik} from 'formik'
import * as yup from 'yup'
import { useState } from 'react'


function SignUp( {setUser} ){

    const [signUp, setSignUp] = useState(true)
    const [loginError, setLoginError] = useState(false)

    function toggleSignup() {
        setSignUp((currentSignup) => !currentSignup)
        setLoginError(false)
    }

    const URL = /^((https?|ftp):\/\/)?(www.)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i

    const signupSchema = yup.object().shape({
        first_name: yup.string().max(15, 'First name must be 15 characters or less').required('First name is required!'),
        last_name: yup.string().max(15, 'Last name must be 15 characters or less').required('Last name is required!'),
        email: yup.string().email('Invalid email').required('Email is required!'),
        password: yup.string().min(5, 'Password must be at least 5 characters').max(15, 'Password must be 15 characters or less').required('Password is required!'),
        img_url: yup.string().matches(URL, 'Enter a valid url')
    })

    const loginSchema = yup.object().shape({
        email: yup.string().email('Invalid email').required('Email is required!'),
        password: yup.string().min(5, 'Password must be at least 5 characters').max(15, 'Password must be 15 characters or less').required('Password is required!'),
    })

    return (
        <Flex>
            <Spacer/>
                <Flex direction='column'>
                    <Heading m={3} size='lg' align='center'>{signUp ? 'Sign Up' : 'Log In'}</Heading>
                    <Button minWidth={300} size='sm' onClick={toggleSignup}>{signUp ? `Have an account? Login instead!` : 'Register for an account'}</Button>
                    <Formik
                        initialValues={{
                            first_name: '',
                            last_name: '',
                            email: '',
                            password: '',
                            img_url: '',
                            user_type_id: 1
                        }}
                        validationSchema={signUp ? signupSchema: loginSchema}
                        validateOnBlur={true}
                        validateOnChange={false}
                        onSubmit={values => {
                            const endpoint = signUp ? '/users' : '/login'
                            fetch(endpoint, {
                                method: 'POST',
                                headers: {
                                    "Content-Type": 'application/json'
                                },
                                body: JSON.stringify(values)
                            }).then((resp) => {
                                if (resp.ok) {
                                    resp.json().then(({ user }) => {
                                        console.log(user)
                                        setUser(user)
                                        // navigate into site
                                    })
                                } else { 
                                    setLoginError(true)
                                }
                            })
                        }}
                    >
                        {({ errors, touched, isSubmitting }) => (
                            <Form>
                                {signUp && <Field name='first_name'>
                                    {({ field, form }) => (
                                        <FormControl marginBottom={2} isInvalid={form.errors.first_name && form.touched.first_name}>
                                            <FormLabel>First Name</FormLabel>
                                            <Input {...field}/>
                                            <FormErrorMessage>{errors.first_name}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>}
                                {signUp && <Field name='last_name'>
                                    {({ field, form }) => (
                                        <FormControl marginBottom={2} isInvalid={form.errors.last_name && form.touched.last_name}>
                                            <FormLabel>Last Name</FormLabel>
                                            <Input {...field}/>
                                            <FormErrorMessage>{form.errors.last_name}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>}
                                <Field name='email'>
                                    {({ field, form }) => (
                                        <FormControl marginBottom={2} isInvalid={form.errors.email && form.touched.email}>
                                            <FormLabel>Email</FormLabel>
                                            <Input type='email' {...field}/>
                                            <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name='password'>
                                    {({ field, form }) => (
                                        <FormControl marginBottom={2} isInvalid={form.errors.password && form.touched.password}>
                                            <FormLabel>Password</FormLabel>
                                            <Input type='password' {...field}/>
                                            <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                {signUp && <Field name='img_url'>
                                    {({ field, form }) => (
                                        <FormControl marginBottom={2} isInvalid={form.errors.img_url && form.touched.img_url}>
                                            <FormLabel>Image Url</FormLabel>
                                            <Input {...field}/>
                                            <FormErrorMessage>{form.errors.img_url}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>}
                                <Flex marginTop={4}>
                                    <Spacer/>
                                    <Button type='submit'>Submit</Button>
                                    <Spacer/>
                                </Flex>
                                {loginError && <Alert marginTop={4} status='error'>
                                    <AlertIcon />
                                    <AlertTitle>Incorrect login information</AlertTitle>
                                </Alert>}
                            </Form> 
                        )}
                    </Formik>
                    
                </Flex>
            <Spacer/>
        </Flex>
    )
}

export default SignUp