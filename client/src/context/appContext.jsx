import { createContext ,useState, useEffect } from "react"; 
import React from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";


export const AppContent = createContext()
export const AppContextProvider =(props)=> {
    axios.defaults.withCredentials=true;
    const backendUrl= import.meta.env.VITE_BACKEND_URL
    const [isLoggedin,setIsLoggedin]=useState(false)
    const [userData,setUserData]=useState(false)
    const getAuthState= async ()=>{
        try{
            const {data} = await axios.get(backendUrl + '/api/auth/is-Auth')
            if (data.success){
                setIsLoggedin(true)
                getUserData()
            }

        }
        catch(error){
            toast.error(error.message)
        }
    }
    const getUserData= async ()=>{
        console.log("Début de getUserData");
        try{
            console.log("Avant requête Axios");
            const {data}= await axios.get(backendUrl + '/api/user/data', {})
            console.log("Réponse reçue :", data);
            console.log("userData reçu :", data.userData);

            console.log("URL appelée :", backendUrl + '/api/user/data');

            data.success ? setUserData(data.userData):toast.error(data.message)
        }
        catch(error){
            toast.error(error.message)
            console.error("Erreur Axios :", error);
            console.error("Status :", error.response?.status);
            console.error("Message serveur :", error.response?.data?.message);

        }
    }
    useEffect(()=>{
        getAuthState();

    },[])

    const value ={
        backendUrl,
        isLoggedin,setIsLoggedin,
        userData,setUserData,
        getUserData

    }
    return (
        <AppContent.Provider value={value}>
            {props.children}
        </AppContent.Provider>
    )
}