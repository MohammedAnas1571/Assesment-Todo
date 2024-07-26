import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/Store"

const UserLayout: React.FC = () => {
    const { isUser } = useSelector((state: RootState) => state.user);

    return isUser ? <Outlet /> : <Navigate to="/login" />;
  };


export default UserLayout;