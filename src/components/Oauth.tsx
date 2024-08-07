import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import handleApiError from "../utils/HandleApiError";
import { app } from "../utils/firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { loginAsUser, setProfilePhoto } from "../redux/UserSlice";

const Oauth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const { displayName, email, photoURL } = result.user;
      const name = displayName ? displayName.split(" ") : [];
      const firstname = name[0] || "";
      const lastname = name[1] || "";
      const profilePhoto = photoURL || 'path/to/default-avatar.png'; // Default avatar if not available

      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/googleAuth`, { firstname, lastname, email, profilePhoto }, {
        withCredentials: true,
      });

      if (response.data) {
        dispatch(loginAsUser());
        dispatch(setProfilePhoto(response.data.data))
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (err) {
      handleApiError(err);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleAuth}
      className="bg-blue-600 text-white p-2 rounded-lg mt-2"
    >
      Login with <span className="font-bold">Google</span>
    </button>
  );
};

export default Oauth;
