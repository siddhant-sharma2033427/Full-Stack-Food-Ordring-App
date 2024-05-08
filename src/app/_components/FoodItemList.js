import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const FoodItemList = () => {
    const router = useRouter()
    const [foodItems, setFoodItems] = useState([]);
    useEffect(() => {
        loadFoodItems();
        console.log("entered")
    }, []);
    const loadFoodItems = async () => {
        const restaurantData = JSON.parse(localStorage.getItem('restaurantUser'));
        const resto_id = restaurantData._id
        let response = await fetch(`http://localhost:3000/api/restaurants/foods/${resto_id}`);
        response = await response.json();
        console.log(response)
        if (response.success) {
            setFoodItems(response.result)
        } else {
            alert("food item list not loading")
        }

    }
    const deleteFoodItem = async (item_id)=>{
        let response = await  fetch(`http://localhost:3000/api/restaurants/foods/${item_id}`,{
            method:'delete',

        });
        response = await response.json();
        if(response.success){
            alert("item deleted")
            loadFoodItems();
        }else{
            alert("item cannot be deleted");
        }
    }
    return (
        <div>
            <h1> Food Item </h1>
            <table>
                <thead>
                    <tr>
                        <td>S.N</td>
                        <td>Name</td>
                        <td>Price</td>
                        <td>description</td>
                        <td>Image</td>
                        <td>Operations</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        foodItems && foodItems.map((items, key) => (
                            <tr key={key}>
                                <td>{key + 1}</td>
                                <td>{items.name}</td>
                                <td>{items.price}</td>
                                <td>{items.description}</td>
                                <td><img src={items.img_path} /></td>
                                <td><button onClick={()=>deleteFoodItem(items._id)}>Delete</button><button onClick={()=>router.push(`dashboard/${items._id}`)}>Edit</button></td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>
        </div>
    )
}
export default FoodItemList;