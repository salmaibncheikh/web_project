import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContent } from '../context/appContext.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';

const Navbar = () => {
  const navigate = useNavigate()
  const {userData , backendUrl,setUserData,setIsLoggedin,getUserData}= useContext(AppContent)
  const sendVerificationOtp =async()=>{
    if (!userData || !userData._id) {
      toast.error("Utilisateur non chargé. Veuillez réessayer.");
      return;
    }
    try{
      axios.defaults.withCredentials=true;
      const {data}= await axios.post(backendUrl + '/api/auth/send-verify-otp',{userId:userData._id});
      console.log("Réponse reçue :", data);
      console.log("userData reçu :", data.userData); 
      if (data.success){
        await getUserData();
        navigate('/email-verify');
        toast.success(data.message);
        console.log("succès");
      }else{
        toast.error(data.message);
        console.log("erreur dans else");
      }
    }catch(error){
      toast.error(error.message);
      console.log("erreur dans catch");

    }
  }
  const logout =async ()=>{
    try{
      axios.defaults.withCredentials = true
      const {data}= await axios.post(backendUrl + '/api/auth/logout')

      data.success && setIsLoggedin(false)
      data.success && setUserData(false)
      navigate ('/')
    }catch(error){
      toast.error(error.message)
    }
  }

  return (
    <div className="w-full flex justify-between items-center p-4 s:p-6 sm:px-24 z-50"
  style={{
    backgroundColor: 'rgba(255, 250, 205, 0.7)',
  }} 
    >
        <img src={assets.logo} alt="" className='w-28 sm:w-32'></img>
        {userData ? <div className='w-8 h-8 flex justify-center items-center rounded-full bg-black text-white relative group'>{userData.name[0].toUpperCase()}
          <div className= "absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10">
            <ul className='list-non m-0 p-2 bg-gray-100 text-sm'>
              {!userData.isAccountVerified &&  <li onClick={sendVerificationOtp} className="py-1 px-2 hover:bg-gray-200 cursor-pointer"> Vérifier l'émail</li>}
              <li onClick={logout} className="py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10">Déconnexion</li>
            </ul>
          </div>
        </div> :
        <button onClick={() => navigate('/login')}  className='flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all'>Connectez-vous<img src={assets.arrow_icon} alt=""/></button>}
      
    </div>
  )
}

export default Navbar;

