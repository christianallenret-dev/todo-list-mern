import { useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await axios.post('/auth/register', {
            username,
            password
        })

        navigate('/login')
    }

    return(
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>

            <input 
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password" 
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />

            <button>Register</button>
        </form>
    )
}

export default Register