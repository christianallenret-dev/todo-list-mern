import axios from "axios"
import { useEffect, useState } from "react"
import Item from "./Item"

function Heading() {

    const [items, setItems] = useState()
    const [text, setText] = useState()

    useEffect(() => {
        fetchItems()
    }, [])

    const fetchItems = async () => {
        const res = await axios.get(`/items/${heading._id}`)
        setItems(res.data)
    }

    const addItems = async () => {
        await axios.post(`/items/${heading._id}`, {text})
        setText('')
        fetchItems()
    }

    return(
        <div>
            <h2>{heading.title}</h2>

            <input
                placeholder="New item"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

            <button onClick={addItems}>Add</button>

            {items.map(i => (
                <Item
                    key={i.key}
                    item={item}
                    refresh={fetchItems}
                />
            ))}
        </div>
    )
}

export default Heading