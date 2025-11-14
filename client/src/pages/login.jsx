import React, { useState , useContext} from 'react'
import { assets } from '../assets/assets'
import {useNavigate} from 'react-router-dom';
import { AppContent } from '../context/AppContext.jsx';
import axios from 'axios'
import { toast } from 'react-toastify';

const Login = () => {

  const navigate = useNavigate ()
  const {backendUrl,setIsLoggedin, getUserData}=useContext (AppContent);

  const [state,setState]=useState("S'inscrire")
  const [name,setName]= useState("")
  const [email,setEmail]= useState("")
  const [password,setPassword]= useState("")

  const onSubmitHandler =async (e)=>{
    try{
      e.preventDefault();
      axios.defaults.withCredentials = true
      if (state ==="S'inscrire"){
        const {data} = await axios.post(backendUrl + '/api/auth/register',{name,email,password})
        console.log(backendUrl,email,password,data);
        if (data.success){
          setIsLoggedin(true)
          getUserData()
          navigate('/')
        }
        else{
          toast.error(data.message)
        }
      }
      else{
        const {data} = await axios.post(backendUrl + '/api/auth/login',{email,password})
        if (data.success){
          setIsLoggedin(true)
          getUserData()
          navigate('/')
        }
        else{
          toast.error(data.message)
        }

      }
    }
    catch(error){
      console.log(error);
      toast.error(error.response?.data?.message || "Une erreur est survenue");
    };
  }


  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0"
  style={{
    background: 'linear-gradient(178deg, rgba(255, 250, 205, 1) 0%, rgba(230, 230, 250, 1) 50%, rgba(230, 230, 250, 1) 100%)',
    backgroundAttachment: 'fixed',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  }}>
      <img onClick={()=>navigate('/')} src={assets.logo} alt="" className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer'/>
      <div className="bg-white/10 backdrop-blur-lg border border-white/30 p-10 rounded-xl shadow-xl w-full sm:w-96 text-white text-sm transition-all duration-500 hover:scale-[1.02]">
        <h2 className='text-3xl font-semibold text-indigo-400 text-center mb-3'>
          {state === "S'inscrire"? 'Créer un compte' :'Connectez-vous '}</h2>
        <p className='text-center text-sm mb-6 text-blue-700'>
          {state === "S'inscrire"? 'Créer votre compte' :'Connectez-vous à votre compte'}</p>
        
        
        <form onSubmit ={onSubmitHandler}>
          {state== "S'inscrire" &&(
            <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-white/40'>
            <img src={assets.person_icon} alt=""/>
            <input 
            onChange={e=>setName(e.target.value)}
            value={name}
            type="text" 
            placeholder='Nom complet' 
            required 
            className="bg-transparent outline-none text-gray-800 placeholder-gray-600"/>
          </div>
          )}
          
          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-white/40'>
            <img src={assets.mail_icon} alt=""/>
            <input 
            onChange={e=>setEmail(e.target.value)}
            value={email}
            type="email" 
            placeholder='Email id' 
            required 
            className="bg-transparent outline-none text-gray-800 placeholder-gray-600"/>
          </div>

          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-white/40'>
            <img src={assets.lock_icon} alt=""/>
            <input  
            onChange={e=>setPassword(e.target.value)}
            value={password}
            type="password" 
            placeholder='Mot de passe' 
            required 
            className="bg-transparent outline-none text-gray-800 placeholder-gray-600"/>
          </div>
          <p onClick ={()=>navigate('/reset-password')} className='mb-4 text-blue-500 cursor-pointer'>Mot de passe oublié?</p>
          <button className='w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-meduim'>{state}</button>

        </form>

        {state==="S'inscrire" ?(<p className='text-gray-500 text-center text-xs mt-4'>Vous avez déjà un compte ?{' '}
          <span onClick={()=>setState('Connectez-vous')} className='text-blue-500 cursor-pointer underline'>Connectez-vous ici</span>
        </p>)
        :(<p className='text-gray-500 text-center text-xs mt-4'>Vous n'avez pas de compte ?{' '}
          <span  onClick={()=>setState("S'inscrire")}className='text-blue-500 cursor-pointer underline'>Inscrivez-vous</span>
        </p>)}
      </div>
    </div>
  )
}
export default Login 
        
       