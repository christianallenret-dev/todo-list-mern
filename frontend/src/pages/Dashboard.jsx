import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import Heading from '../components/Heading'
import instance from "../api/axios"


function Dashboard() {
    const [title, setTitle] = useState('')
    const [headings, setHeadings] = useState([])
    const {logout, token} = useContext(AuthContext)

    useEffect(() => {
        fetchHeadings()
    }, [])

    const fetchHeadings = async () => {
        try {
            const res = await instance.get('/headings')
            setHeadings(res.data)
        } catch (error) {
            console.error("Failed to fetch headings: ", error)
        }
    }

    const createHeading = async () => {

        if(!title.trim()) return
        try {
            await instance.post('/headings', {title})
            setTitle('')
            fetchHeadings()
        } catch (error) {
            console.error("Failed to create heading: ", error)
        }
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
                    key={h._id}
                    heading={h}
                />
            ))}

        </div>
    )
}

export default Dashboard