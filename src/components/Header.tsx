import { AiFillCalendar } from "react-icons/ai";
import {  NavLink, useNavigate } from 'react-router-dom';
import AlertDialog from './AlertDialog';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { signOutUser } from '../redux/UserSlice';
import handleApiError from '../utils/HandleApiError';
import { RootState } from '../redux/Store';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isUser,profilePhoto } = useSelector((state: RootState) => state.user);

  const handleLogout = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/logout`, {
        withCredentials: true
      });
      if (data) {
        dispatch(signOutUser());
        toast.success(data.message);
        navigate("/login");
      }
    } catch (err) {
      handleApiError(err);
    }
  };

  return (
    <div className='h-16 fixed top-0 w-full z-50 bg-blue-600 text-white '>
      <div className='max-w-6xl mx-auto flex justify-between items-center h-full px-4 sm:px-6 lg:px-8 '>
        <div className='flex items-center space-x-3'>
          <AiFillCalendar size={25} />
          
        </div>
        <div className='flex space-x-4'>
          {isUser ? (
           <>
            <AlertDialog
              title="Log Out"
              description="Are you sure you want to logout?"
              onConfirm={handleLogout}
            >
              <button className='bg-red-500 text-white px-4 py-1 rounded'>Logout</button>
            </AlertDialog>
            
              <img src={profilePhoto} alt="" className="w-10 h-10 rounded-full" />
            
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? 'bg-white text-blue-400 px-4 py-1 rounded' : 'text-white px-4 py-1 rounded'
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  isActive ? 'bg-white text-blue-400 px-4 py-1 rounded' : 'text-white px-4 py-1 rounded'
                }
              >
                Signup
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
