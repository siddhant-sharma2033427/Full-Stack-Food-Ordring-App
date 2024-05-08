'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const EditFoodItems = (props) => {
    const router = useRouter()
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [path, setPath] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState(false)

    useEffect(() => {
        handleLoadFoodItem()
    },[])
    const handleLoadFoodItem = async () => {
        console.log("id is ",props.params.id)
        let response = await fetch(`http://localhost:3000/api/restaurants/foods/edit/${props.params.id}`)
        response = await response.json()
        if (response.success) {
            setName(response.result.name);
            setPrice(response.result.price);
            setPath(response.result.img_path);
            setDescription(response.result.description);
        }
    }
    const handleEditFood = async () => {
        const restaurantData = JSON.parse(localStorage.getItem("restaurantUser"))
        if (!name || !price || !path || !description) {
            alert("fill all the field")
            return;
        }
        let response = await fetch(`http://localhost:3000/api/restaurants/foods/edit/${props.params.id}`,{
            method:'PUT',
            body:JSON.stringify({name,price,img_path:path,description})
            
        })
        response = await response.json()
        if(response.success){
            router.push("../dashboard");
        }else{
            alert("Something went wrong");
        }

    }

    return (<div className="container">
        <h1>Update Food Item</h1>
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
            <button className="button" onClick={handleEditFood}>Update Food Item</button>
        </div>
        <div className="input-wrapper">
            <button className="button" onClick={() => router.push('../dashboard')}>Back To Dashboard </button>
        </div>
    </div>)
}

export default EditFoodItems;