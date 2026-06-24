import { useNavigate } from "react-router-dom";


export const useGoogleAuth = (setServerError, setIsLoading) => {
const navigate = useNavigate();9

    return useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            setServerError("");
            setIsLoading(true);
            try {
                const googleAccessToken = tokenResponse.access_token;
                const response = await API.post('/auth/google', { token: googleAccessToken });
                console.log("Backend google auth response: ", response.data);
                setUser(response.data?.user)
                navigate("/")

            } catch (error) {
                const msg = error?.response?.data?.message || "Google authentication failed!";
                console.error(msg);
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




