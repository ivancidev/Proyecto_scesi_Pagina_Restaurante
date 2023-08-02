import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRouter = () => {
    const [authenticated] = useState(false);
    const getToken = () =>{
      return sessionStorage.getItem('guest_session_id')
    }
    const token = getToken();   

    return (
        (authenticated || token) ? <Outlet/> : <Navigate to='/login' />
    );
  }

export default PrivateRouter