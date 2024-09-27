import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './Signupform.css';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../../components/shared/Loader';
// Import the PopupToaster
import { createUserAccount, signInAccount } from '../../lib/appwrite/api';
import Tosterpopup from '../../components/ui/Tosterpopup';
import {useSignInAccount } from '../../lib/react-query/queriesAndMutations';
import { useUserContext } from '../../context/AuthContext';

const SigninForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset } = useForm(); // Destructure 'reset'
  const [showToaster, setShowToaster] = useState(true); // Control toaster visibility

  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const { mutateAsync: signInAccount, isPending} = useSignInAccount();
  // const form= useForm({
  //   resolver: zodResolver(SigninValidation),
  //   defaultValues: {
  //     email: '',
  //     password: '',
  //   },
  // })

  const onSubmit = async (data) => {
    try {

      const session = await signInAccount({
        email: data.email,
        password: data.password,
      });

      if (!session) {
        console.log("sign-in fails");
      }

      const isLoggedIn = await checkAuthUser();

      if (isLoggedIn) {
        reset(); // Reset the form after successful signup
        navigate('/');
      } else {
        console.log("Sign up failed. Please try again");
      }

      console.log('User created:', newUser);
    } catch (error) {
      console.error('Error creating user:', error.message);
      setShowToaster(true); // Show toaster on error
      setTimeout(() => setShowToaster(false), 3000); // Hide after 3 seconds
    }
  };

  return (
    <>
      <div className='sm:w-420 flex-center flex-col'>
        <img src='/assets/images/logo.svg' alt='logo' />
        <h2 className='h3-bold'>Log in to your account</h2>
        <p className='sign-up_detail text-light-3 small-medium md:base-regular mt-2'>
          To use CreatePost, please enter your details
        </p>
      </div>

      <div>
        <form onSubmit={handleSubmit(onSubmit)} className='signup-form'>
          
          <label className={`signup-detail ${errors.email ? 'red' : ''}`}>Email</label>
          <input
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^\S+@\S+$/i, message: 'Email is invalid' },
            })}
            type='text'
            className='signup-name'
            placeholder='Email'
            name='email'
          />
          {errors.email && <span className='warning'>{errors.email.message}</span>}

          <label className={`signup-detail ${errors.password ? 'red' : ''}`}>Password</label>
          <input
            {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
            type='password'
            className='signup-name'
            placeholder='Password'
            name='password'
          />
          {errors.password && <span className='warning'>{errors.password.message}</span>}

          <button type='submit' className='signup-button'>
            {isUserLoading ? (
              <div className='flex-center gap-2'>
                <Loader />Loading...
              </div>
            ) : (
              'Sign in'
            )}
          </button>

          <p className='text-small-regular text-light-2 text-center mt-2'>
            Don't have an account?
            <Link to='/sign-up' className='text-primary-500 text-small-semibold ml-1'>
              Create
            </Link>
          </p>
        </form>
      </div>

      <Tosterpopup message="Oops, something went wrong!" show={showToaster} />
    </>
  );
};

export default SigninForm;
