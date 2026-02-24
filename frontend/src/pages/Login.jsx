import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import {AuthContext} from "../context/AuthContext"
import instance from "../api/axios";

function Login() {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const {login} = useContext(AuthContext)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const res = await instance.post('/auth/login', {
            username,
            password
        })

        login(res.data.accessToken, res.data.refreshToken)

        navigate("/")
    }

    return(
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>

            <input 
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password" 
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />

            <button>Login</button>
        </form>
    )
}

export default Login