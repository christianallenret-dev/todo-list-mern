
function Item({item, refresh}) {

    const toggleComplete = async () => {
        await axios.put(`/items/${item._id}`, {
            completed: !item.completed
        })
        refresh()
    }

    const deleteItem = async () => {
        await axios.delete(`/items/${item._id}`)
        refresh()
    }

    return(
        <div>
            <span 
                style={{
                    textDecoration:
                        item.completed ? 'line-through' : 'none'
                }}
            >
                {item.text}
            </span>

            <button onClick={toggleComplete}>✅</button>
            <button onClick={deleteItem}>❌</button>
        </div>
    )
}

export default Item