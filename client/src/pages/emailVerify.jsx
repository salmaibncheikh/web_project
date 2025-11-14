import React, { useCallback, useContext, useEffect } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { AppContent } from '../context/AppContext'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const EmailVerify = () => {
  axios.defaults.withCredentials=true;
  const {backendUrl,isLoggedin,userData,getUserData}= useContext(AppContent)
  const navigate = useNavigate()
  const inputRefs= React.useRef([])
  
  const handleInput = (e,index)=>{
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1){
      inputRefs.current[index +1].focus();
    }
  }
  const handleKeyDown =(e,index) =>{
    if(e.key==='Backspace' && e.target.value ===''&& index>0){
      inputRefs.current[index - 1].focus();
    }
  }
  const handlePaste = (e)=>{
    const paste= e.clipboardData.getData('text')
    const pasteArray=paste.split('');
    pasteArray.forEach ((char,index)=>{
      if(inputRefs.current[index]){
        inputRefs.current[index].value= char;
      }
    })
  }

  const onSubmitHandler = async(e)=>{
    try{
      e.preventDefault();
      const otpArray= inputRefs.current.map(e=>e.value.trim());
      const otp= otpArray.join('');
      //console.log("OTP envoyé :", otp);

      const{data}= await axios.post(backendUrl +'/api/auth/verify-account',{otp , userId: userData._id})
      if (data.success){
        toast.success(data.message)
        
        getUserData()
        navigate('/')
      }else{
        toast.error(data.message)
        
      }

    }catch(error){
      toast.error(error.message)
    }
  }
  useEffect(()=>{
    isLoggedin && userData && userData.isAccountVerified && navigate('/')
  },[isLoggedin,userData])




  return (
    <div
  className="flex items-center justify-center min-h-screen px-6 sm:px-0"
  style={{
    background:
      'linear-gradient(178deg, rgba(255, 250, 205, 1) 0%, rgba(230, 230, 250, 1) 50%, rgba(230, 230, 250, 1) 100%)',
    backgroundAttachment: 'fixed',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  }}
>
  <form  onSubmit={onSubmitHandler} className="bg-white/10 backdrop-blur-lg border border-white/30 p-10 rounded-xl shadow-xl w-full sm:w-96 text-white text-sm transition-all duration-500 hover:scale-[1.02]">
    <h1 className="text-3xl font-semibold text-indigo-400 text-center mb-3">
      Vérification d'email
    </h1>
    <p className="text-center text-sm mb-6 text-blue-700">
      Saisissez le code à 6 chiffres envoyé à votre adresse e-mail.
    </p>
    <div className='flex justify-between mb-8' onPaste={handlePaste}>
      {Array(6).fill(0).map((_,index)=>(
        <input type="text" maxLength='1' key={index} required
        className='w-12 h-12 bg-indigo-200 text-indigo-800 text-center text-xl rounded-md outline-none focus:ring-2 focus:ring-indigo-400 transition'
        ref={e=> inputRefs.current[index]=e}
        onInput={(e)=>handleInput(e,index)}
        onKeyDown={(e)=>handleKeyDown(e,index)}
        />
      ))}

    </div>
    <button className='w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full'>Vérifier l'émail</button>

    {/* Tu peux ajouter ici un champ input pour le code OTP et un bouton */}
  </form>
</div>

    
  )
}


export default EmailVerify
