import React, { useState } from 'react'
import './PostForm.css';
import FileUploader from '../shared/FileUploader';

const PostForm = ({post}) => {
    const [username, setUsername] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault(); // Prevent form from reloading the page
      console.log('Username submitted:', username);
      // You can add additional form submission logic here
    };
  
    return (
      <form onSubmit={handleSubmit}  className='flex flex-col gap-9 w-full max-w-5xl'>
        <div className='username-box'>
          <label htmlFor="caption" className='shad-form_label'>Caption</label>
          <textarea
            type="text"
            id="username"
            className='shad-textarea custom-scrollbar'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />
        </div>
        <div className='username-box'>
          <label htmlFor="username" className='shad-form_label'>Add Photo</label>
          <FileUploader
            fieldChange={onChange}
            mediaUrl={post?.imageUrl}
          />
        </div>
        <div className='username-box'>
          <label htmlFor="location" className='shad-form_label'>Add location</label>
          <input type="text" className="shad-input"/>
        </div>
        <div className='username-box'>
          <label htmlFor="location" className='shad-form_label'>Add tags(separated by comma" , ")</label>
          <input type="text" className="shad-input" placeholder='JS, React, NextJS'/>
        </div>
        <div className='flex gap-4 items-center justify-end'>
        <button className='create-button' type="button">Cancel</button>
        <button className='create-button' type="submit">Submit</button>
        </div>
      </form>
    );
}

export default PostForm