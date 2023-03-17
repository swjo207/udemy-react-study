import React from "react";
import SignUpForm from "../../components/category-item/sign-up-form/sign-up-form.component";
import {
    auth,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";
//import { useEffect } from "react";
//import { getRedirectResult } from "firebase/auth";


const SignIn = () => {

/* useEffect(async () => {
        const response  = await getRedirectResult(auth); 

        if (response) {
            const userDocRef = await createUserDocumentFromAuth(response.user);
        }
    }, []);  */

    
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

/*   const logGoogleRedirectUser = async () => {
    const { user } = await signInWithGoogleRedirect();
    console.log(user);
    const userDocRef = await createUserDocumentFromAuth(user);
  }; */

  return (
    <>
      <h1> Sign In Page </h1>
      <button onClick={logGoogleUser}> Sign In with Google Popup </button>
      
      {/* <button onClick={signInWithGoogleRedirect}>  
        Sign In with Google Redirect
      </button> */}

      <SignUpForm />
      
    </>
  );
};

export default SignIn;
