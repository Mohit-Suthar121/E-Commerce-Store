import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { API } from "../api/axiosInstance";
import { authPath } from "../utils/authRedirect";



export const useGoogleAuth = (setServerError, setIsLoading,searchParams) => {
const navigate = useNavigate();
    const redirect = searchParams?.get("redirect")||'/';

    return useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            setServerError("");
            setIsLoading(true);
            try {
                const googleAccessToken = tokenResponse.access_token;
                const response = await API.post('/auth/google', { token: googleAccessToken });
                console.log("Backend google auth response: ", response.data);
                navigate(redirect);

            } catch (error) {
                const msg = error?.response?.data || "Google authentication failed!";
                console.error("Some Error occured!: ", msg)

            } finally {
                setIsLoading(false);
            }
        },
        
        onError: (error) => {
            console.error("Google popup blocked!: ", error);
            setServerError("Google sign-in window was closed.");
        }
    }) 
}




