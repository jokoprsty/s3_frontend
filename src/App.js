import { useState, useEffect } from "react";
import axios from "axios";
import API_URL from './config';


function App() {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState("");

    // Fetch items
    useEffect(() => {
        axios.get(`${API_URL}/items`)
            .then(res => setItems(res.data))
            .catch(err => console.error(err));
    }, []);

    // Add item
    const addItem = () => {
        axios.post(`${API_URL}/items`, { name: newItem })
            .then(res => setItems([...items, res.data]))
            .then(() => setNewItem(""));
    };

    // Delete item
    const deleteItem = (id) => {
        axios.delete(`${API_URL}/items/${id}`)
            .then(() => setItems(items.filter(item => item.id !== id)));
    };

    return (
        <div>
            <h1>Simple CRUD App</h1>
            <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder="Enter item"
            />
            <button onClick={addItem}>Add Item</button>

            <ul>
                {items.map(item => (
                    <li key={item.id}>
                        {item.name} <button onClick={() => deleteItem(item.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;