import { useState } from "react";

const AddFoodItems = (props) => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [path, setPath] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState(false)

    const handleAddFoodItem = async () => {
        const restaurantData = JSON.parse(localStorage.getItem("restaurantUser"))
        if (!name || !price || !path || !description) {
            alert("fill all the field")
            return;
        }
        let resto_id;
        if (restaurantData) {
            resto_id = restaurantData._id;
        }
        let response = await fetch("http://localhost:3000/api/restaurants/foods", {
            method: "POST",
            body: JSON.stringify({ name, price, img_path: path, description, resto_id })
        })
        response = await response.json();
        if (response.success) {
            alert("food added")
            props.setAddItem(false)
        } else {
            alert("food item not added")
        }
    }

    return (<div className="container">
        <h1>Add New Food Item</h1>
        <div className="input-wrapper">
            <input type="text" className="input-field" placeholder="Enter food name"
                value={name} onChange={(e) => setName(e.target.value)}
            />
            {error && !name && <span className="input-error">Please enter valid name</span>}
        </div>
        <div className="input-wrapper">
            <input type="text" className="input-field" placeholder="Enter price"
                value={price} onChange={(e) => setPrice(e.target.value)}
            />
            {error && !price && <span className="input-error">Please enter valid price</span>}

        </div>
        <div className="input-wrapper">
            <input type="text" className="input-field" placeholder="Enter image path"
                value={path} onChange={(e) => setPath(e.target.value)}
            />
            {error && !path && <span className="input-error">Please enter valid path</span>}

        </div>
        <div className="input-wrapper">
            <input type="text" className="input-field" placeholder="Enter description"
                value={description} onChange={(e) => setDescription(e.target.value)}
            />
            {error && !description && <span className="input-error">Please enter valid description</span>}

        </div>
        <div className="input-wrapper">
            <button className="button" onClick={handleAddFoodItem}>Add Food Item</button>
        </div>
    </div>)
}

export default AddFoodItems;