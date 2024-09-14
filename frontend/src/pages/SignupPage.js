import React, { useState } from 'react';
import SignupForm from '../components/SignupForm';

const SignupPage = ({ onSignup }) => {
  return (
    <div>
      <h1>Signup</h1>
      <a href="/login">Login</a>
      <SignupForm onSignup={onSignup} />
    </div>
  );
};

export default SignupPage;
