import React from 'react'
import { assets } from '../assets/assets'
import { AppContent } from '../context/appContext'
import { useContext } from 'react'

const Header = () => {
    const {userData}=useContext(AppContent);

  return (
    <div className='flex flex-col items-center mt-20 px-4 text-center text-gray-800'>
        <img src={assets.header_img} alt= "" className='w-36 h-36 rounded-full mb-6'/>
        {/* <h1 className='flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2'>
  {/* <>Bonjour cher parent,<img className='w-8 aspect-square' src={assets.hand_wave} /></>
</h1> */} 


        <h1 className='flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2'>Bonjour cher {userData ? userData.name: 'parent '}!<img className='w-8 aspect-square' src={assets.hand_wave}/>
        </h1> 


        <h2 className='text-3xl sm:text-5xl font-semibold mb-4'>Bienvenue dans notre application!</h2>
        <p className='mb-8 max-w-md'>Commençons par une brève présentation du site web, et vous serez opérationnel en un rien de temps.</p>
        <button className='border border-gray-500 rounded-full px-8 py-2.5 hover:bg-gray-100 transition-all'>Commencez</button>
    </div>
  )
}

export default Header
