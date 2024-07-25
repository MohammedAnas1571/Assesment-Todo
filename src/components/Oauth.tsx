import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import handleApiError from "../utils/HandleApiError";
import { app } from "../utils/firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Oauth = () => {
  const navigate = useNavigate();

  const handleGoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const { displayName, email } = result.user;
      const name = displayName ? displayName.split(" ") : [];
      const firstname = name[0] || "";
      const lastname = name[1] || "";

      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/googleAuth`, { firstname, lastname, email }, {
        withCredentials: true,
      });

      if (response.data) {
        navigate("/");
        toast.success(response.data.message);
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
