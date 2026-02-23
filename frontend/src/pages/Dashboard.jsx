import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import axios from "axios"
import Heading from '../components/Heading'


function Dashboard() {
    const [title, setTitle] = useState()
    const [headings, setHeadings] = useState()
    const {logout} = useContext(AuthContext)

    useEffect(() => {
        fetchHeadings()
    }, [])

    const fetchHeadings = async () => {
        const res = await axios.get('/headings')
        setHeadings(res.data)
    }

    const createHeading = async () => {
        await axios.post('/headings', {title})
        setTitle('')
        fetchHeadings()
    }

    return(
        <div>
            <h1>Your Lists</h1>
            <button onClick={logout}>Logout</button>

            <input
                placeholder="New Heading"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <button onClick={createHeading}>Add Heading</button>

            {headings.map(h => (
                <Heading
                    key={h.id}
                    heading={h}
                />
            ))}

        </div>
    )
}

export default Dashboard