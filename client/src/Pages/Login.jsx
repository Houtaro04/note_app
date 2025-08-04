import React, { useContext } from "react"
import{ Button, Typography } from '@mui/material'
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth"
import { AuthContext } from "../context/AuthProvider";
import { Navigate } from 'react-router-dom'
import { GraphQLRequest } from "../../utils/request";

export default function Login(){
    const auth = getAuth();
    const { user } = useContext(AuthContext);

    const handleLoginWithGoogle = async () => {
        const provider = new GoogleAuthProvider();

        const {user: { uid, displayName }} = await signInWithPopup(auth, provider);
        const { data } = await GraphQLRequest({query: `mutation register($uid: String!, $name: String!) {
            register(uid: $uid, name: $name){
                uid
                name
            }    
        }`,
            variables: {
                uid,
                name: displayName,
            },
        });
        console.log('register', {data});
    };
    if (localStorage.getItem('accessToken')) {
        // navigate('/');
        return <Navigate to="/" />;
    }

    return (
        <>
            <Typography varian='h5' sx={{marginBottom: '10px'}}>Welocome to Note APP</Typography> 
            <Button variant='outlined' onClick={handleLoginWithGoogle}>
                Login with Google
            </Button>
        </> 
    )
}