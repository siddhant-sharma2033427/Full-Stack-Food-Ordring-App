import { useState } from "react"
import { useRouter } from "next/navigation";

const RestaurantSignup = ()=>{
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [c_password,setC_password] = useState('')
    const [name,setName] = useState('')
    const [city,setCity] = useState('')
    const [address,setAddress] = useState('')
    const [contact,setContact] = useState('')
    const [error,setError] = useState(false);
    const [passwordError,setPasswordError] = useState(false);

    const  handleSignup = async ()=>{
        if(password !==c_password){
            setPasswordError(true);
            return false
        }else{
            setPasswordError(false)
        }
        if(!email||!password||!c_password||!name,!city||!address||!contact){
            setError(true);
            return false  
        }else{
            setError(false);
        }
        console.log(email,password,c_password,name,city,address,contact)
        let result = await fetch("http://localhost:3000/api/restaurants",{
            method:"POST",
            body:JSON.stringify({email,password,name,city,address,contact})
        })
        result = await result.json()
        console.log(result)
        if(result.success){
            alert("Signup success")
            const {result} = response;
            delete result.password
            localStorage.setItem("restaurantUser",JSON.stringify(result));
            router.push("/restaurant/dashboard")
        }
    }
    return (//100mwrmanu
        <>
            <h1>Signup page</h1>
            <div>
                <div className="input-wrapper">
                    <input type="email" placeholder="Enter Email id" className="input-field" onChange={(e)=>setEmail(e.target.value)}></input>
                </div>
                <div className="input-wrapper">
                    <input type="password" placeholder="Enter Password" className="input-field"
                    onChange={(e)=>setPassword(e.target.value)}
                    ></input>
                    {
                        passwordError && <span className="input-error">Password and Confirm does not match</span>
                    }
                </div>
                <div className="input-wrapper">
                    <input type="password" placeholder="Confirm password" className="input-field"
                    onChange={(e)=>setC_password(e.target.value)}
                    ></input>
                    {
                        passwordError && <span className="input-error">Password and Confirm does not match</span>
                    }
                </div>
                <div className="input-wrapper">
                    <input type="text" placeholder="Enter Restaurant name" className="input-field"
                    onChange={(e)=>setName(e.target.value)}
                    ></input>
                </div>
                <div className="input-wrapper">
                    <input type="text" placeholder="Enter City" className="input-field"
                    onChange={(e)=>setCity(e.target.value)}
                    ></input>
                </div>
                <div className="input-wrapper">
                    <input type="text" placeholder="Enter full Address" className="input-field"
                    onChange={(e)=>setAddress(e.target.value)}
                    ></input>
                </div>
                <div className="input-wrapper">
                    <input type="text" placeholder="Enter Contact Number" className="input-field"
                    onChange={(e)=>setContact(e.target.value)}
                    ></input>
                </div>
                <div className="input-wrapper">
                    <button className="button"
                    onClick={handleSignup}
                    >Login</button>
                </div>
            </div>
        </>
    )
}
export default RestaurantSignup