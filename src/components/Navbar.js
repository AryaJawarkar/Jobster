import { useDispatch, useSelector } from 'react-redux';
import Wrapper from '../assets/wrappers/Navbar';
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import Logo from './Logo';
import { useState } from 'react';
import { toggleSidebar ,clearStore} from '../features/user/userSlice';

const Navbar = () => {
  const [showLogout,setShowLogout] = useState(false)
  const {user} = useSelector((store)=> store.user)
  const dispatch = useDispatch()

  const toggle=()=>{
  dispatch(toggleSidebar())
  }


  return (
    <Wrapper>
  <div className="nav-center">
    <button className="toggle-btn" type='button' onClick={toggle}>
      <FaAlignLeft/>
    </button>
    <div>
  <Logo/>
  <h3 className='logo-text'>dashboard</h3>
    </div>

    <div className="btn-container">
      <button type='button' className='btn' onClick={()=>setShowLogout(!showLogout)}>
        <FaUserCircle/>
        {user?.name}
        <FaCaretDown/>
      </button>
      <div className={showLogout?"dropdown show-dropdown":"dropdown"}>
        <button className="dropdown-btn" type='button' onClick={()=>dispatch(clearStore('Logging out...'))}>
logout
        </button>
      </div>
    </div>
  </div>
    </Wrapper>
  )
}

export default Navbar
