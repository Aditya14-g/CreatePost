import React from 'react'
import './index.css';
import {Routes,Route} from 'react-router-dom';
import SigninForm from './_auth/forms/SigninForm';
import Home from './_root/pages/Home';
import SignupForm from './_auth/forms/SignupForm';
import AuthLayout from './_auth/AuthLayout';
import RootLayout from './_root/RootLayout';
import { AllUsers, CreatePost, EditPost, Explore, PostDetails, Profile, Saved, UpdateProfile } from './_root/pages';

const App = () => {
  return (
    <main className='flex h-screen'>
       <Routes>
          {/* public routes: eveyone can see this. */}
          <Route element={<AuthLayout/>}>
            <Route path="/sign-in" element={<SigninForm/>}/>
            <Route path="/sign-up" element={<SignupForm/>}/>
          </Route>
          {/* private routes: those who have signed in can only see this. */}
          <Route element={<RootLayout/>}>
            <Route index element={<Home/>}/>
            <Route path='/explore' element={<Explore/>}/>
            <Route path='/saved' element={<Saved/>}/>
            <Route path='/all-users' element={<AllUsers/>}/>
            <Route path='/create-post' element={<CreatePost/>}/>
            <Route path='/update-post/:id' element={<EditPost/>}/>
            <Route path='/posts/:id' element={<PostDetails/>}/>
            <Route path='/profile/:id/*' element={<Profile/>}/> 
            <Route path='/update-profile/:id' element={<UpdateProfile/>}/>
          </Route>
       </Routes>
    </main>
  )
}

export default App