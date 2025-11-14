import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'

import { useNavigate } from 'react-router';
import { AppContent } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';




const ResetPassword = () => {

  const {backendUrl}=useContext(AppContent)
  axios.defaults.withCredentials=true; 
  const navigate = useNavigate(); // ✅ This is correct
  const [email,setEmail]=useState('')
  const [newPassword,setnewPassword]=useState('')
  const [isEmailSent,setIsEmailSent]=useState('')
  const[otp,setOtp]=useState(0)
  const[isOtpSubmited,setIsOtpSubmited]=useState(false)


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
  
  const onSubmitEmail = async (e)=>{
    e.preventDefault();
    try{
      const  {data}= await axios.post(backendUrl+'/api/auth/send-reset-otp',{email})
      data.success ? toast.success(data.message): toast.error (data.message)
      data.success &&  setIsEmailSent   (true )   
    }catch(error){
      toast.error(error.message)
    }
  }
  const onSubmitOtp = async (e)=>{
    e.preventDefault();
    const otpArray= inputRefs.current.map(e=>e.value.trim());
    setOtp(otpArray.join(''));
    setIsOtpSubmited(true);
  }
  const onSubmitNewPassword = async (e)=>{
    e.preventDefault();
    try{
      const {data} = await axios.post(backendUrl + '/api/auth/reset-password',{email,otp,newPassword})
      data.success ? toast.success(data.message) : toast.error(data.message)
      data.success && navigate('/login')
    }catch(error){
      toast.error(error.message)
    }
  }
      


    


 
  return (
    
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0"
  style={{
    background:
      'linear-gradient(178deg, rgba(255, 250, 205, 1) 0%, rgba(230, 230, 250, 1) 50%, rgba(230, 230, 250, 1) 100%)',
    backgroundAttachment: 'fixed',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  }}>
    <img
        onClick={() => navigate('/')}
        src={assets.logo}
        alt=""
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      />
{/*enter email id*/}
{!isEmailSent && <form onClick ={onSubmitEmail}className="bg-white/10 backdrop-blur-lg border border-white/30 p-10 rounded-xl shadow-xl w-full sm:w-96 text-white text-sm transition-all duration-500 hover:scale-[1.02]">
    <h1 className="text-3xl font-semibold text-indigo-400 text-center mb-3">Réinitialiser le mot de passe</h1>
    <p className="text-center text-sm mb-6 text-blue-700">
      Saisissez votre adresse e-mail enregistrée.</p>
    <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-white/40'>
      <img src={assets.mail_icon} alt="" className='w-3 h-3'/>
      <input type="email" placeholder='Email id'
      className='bg-transparent outline-nonebg-transparent outline-none text-gray-700 placeholder-gray-600'
      value={email}
      onChange={e=> setEmail(e.target.value)}
      required/>
    </div>
    <button className='w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full'>Soumettre</button>
    </form>}
    


{/*otp input form*/}
{!isOtpSubmited && isEmailSent &&

    <form onSubmit={onSubmitOtp}  className="bg-white/10 backdrop-blur-lg border border-white/30 p-10 rounded-xl shadow-xl w-full sm:w-96 text-white text-sm transition-all duration-500 hover:scale-[1.02]">
    <h1 className="text-3xl font-semibold text-indigo-400 text-center mb-3">
      Code de réinitialisation du mot de passe
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
    <button className='w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full'>Soumettre</button>
  </form>
}


{/* enter new password*/}
{isEmailSent && isOtpSubmited &&
 <form  onSubmit={onSubmitNewPassword} className="bg-white/10 backdrop-blur-lg border border-white/30 p-10 rounded-xl shadow-xl w-full sm:w-96 text-white text-sm transition-all duration-500 hover:scale-[1.02]">
    <h1 className="text-3xl font-semibold text-indigo-400 text-center mb-3">Le nouveau mot de passe.</h1>
    <p className="text-center text-sm mb-6 text-blue-700">
      Saisissez le nouveau mot de passe ci-dessous.</p>
    <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-white/40'>
      <img src={assets.lock_icon} alt="" className='w-3 h-3'/>
      <input type="password" placeholder='Password'
      className='bg-transparent outline-nonebg-transparent outline-none text-gray-700 placeholder-gray-600'
      value={newPassword}
      onChange={e=> setnewPassword(e.target.value)}
      required/>
    </div>
    <button className='w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full'>Soumettre</button>
    </form>
}



    </div>
  )
}


export default ResetPassword
