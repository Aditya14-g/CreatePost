import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './Signupform.css';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../../components/shared/Loader';
// Import the PopupToaster
import { createUserAccount } from '../../lib/appwrite/api';
import Tosterpopup from '../../components/ui/Tosterpopup';
import { useCreateUserAccountMutation, useSignInAccount } from '../../lib/react-query/queriesAndMutations';
import { useUserContext } from '../../context/AuthContext';

const SignupForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset } = useForm(); // Destructure 'reset'
  const [showToaster, setShowToaster] = useState(true); // Control toaster visibility

  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const { mutateAsync: createUserAccount, isPending: isCreatingUser } = useCreateUserAccountMutation();
  const { mutateAsync: signInAccount, isPending: isCreatingAccount } = useSignInAccount();

  const onSubmit = async (data) => {
    try {
      const newUser = await createUserAccount(data);

      if (!newUser) {
        setShowToaster(true);
        setTimeout(() => setShowToaster(false), 3000); // Hide after 3 seconds
      }

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
        <h2 className='h3-bold'>Create a new account</h2>
        <p className='sign-up_detail text-light-3 small-medium md:base-regular mt-2'>
          To use CreatePost, please enter your details
        </p>
      </div>

      <div>
        <form onSubmit={handleSubmit(onSubmit)} className='signup-form'>
          <label className={`signup-detail ${errors.name ? 'red' : ''}`}>Name</label>
          <input
            {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'Name must be at least 2 characters' } })}
            type='text'
            className='signup-name'
            placeholder='Name'
            name='name'
          />
          {errors.name && <span className='warning'>{errors.name.message}</span>}

          <label className={`signup-detail ${errors.username ? 'red' : ''}`}>Username</label>
          <input
            {...register('username', { required: 'Username is required', minLength: { value: 2, message: 'Username must be at least 2 characters' } })}
            type='text'
            className='signup-name'
            placeholder='Username'
            name='username'
          />
          {errors.username && <span className='warning'>{errors.username.message}</span>}

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
            {isCreatingAccount ? (
              <div className='flex-center gap-2'>
                <Loader />Loading...
              </div>
            ) : (
              'Sign up'
            )}
          </button>

          <p className='text-small-regular text-light-2 text-center mt-2'>
            Already have an account?
            <Link to='/sign-in' className='text-primary-500 text-small-semibold ml-1'>
              Log in
            </Link>
          </p>
        </form>
      </div>

      <Tosterpopup message="Oops, something went wrong!" show={showToaster} />
    </>
  );
};

export default SignupForm;
