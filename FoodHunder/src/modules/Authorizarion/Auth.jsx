import React from 'react'
import Form from './Form';


function Auth() {
  const isSigninPage = window.location.pathname.includes('signin')
 
 console.log("issigninpage",isSigninPage);
  return (
    <div>
      <Form isSignInPage={isSigninPage} />
      
    </div>
  )
}

export default Auth