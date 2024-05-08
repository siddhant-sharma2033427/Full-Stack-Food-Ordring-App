'use client'
// import Image from "next/image";
// import CustomerHeader from "./_components/CustomerHeader";
import { useEffect, useState } from "react";
import CustomerHeader from "./_components/CustomerHeader";
import Restaurant from "./restaurant/page";
import { useRouter } from "next/navigation";

// import styles from "./page.module.css";

export default function Home() {
  const [locations, setLocations] = useState([])
  const [selectedLocation, setselectedLocation] = useState([])
  const [showLocation, setShowLocation] = useState(false);
  const [restaurants, setRestaurants] = useState([])
  const router = useRouter()

  useEffect(() => {
    loadLocation();
    LoadRestorent();
  }, [])
  const loadLocation = async () => {
    let response = await fetch('http://localhost:3000/api/customer/locations');
    response = await response.json();
    if (response.success) {
      setLocations(response.result);
    }
  }
  const handleListItem = (item) => {
    setselectedLocation(item);
    setShowLocation(false)
    LoadRestorent({ location: item })
  }
  const LoadRestorent = async (params) => {

    let url = "http://localhost:3000/api/customer"
    if (params?.location) {
      url = url + "?location=" + params.location
      console.log("location", params.location)
    } else if (params?.restaurant) {
      url = url + "?restaurant=" + params.restaurant
    }
    let response = await fetch(url);
    response = await response.json();
    if (response.success) {
      setRestaurants(response.result);
      console.log("resto---", restaurants)
    }
  }
  return (
    <main >
      <CustomerHeader />
      <div className="main-page-banner">
        <h1> Food delivery app +</h1>
        <div className="input-wrapper">
          <input
            type="text"
            className="select-input"
            placeholder="Select place"
            onClick={() => setShowLocation(true)} // Modify this line
            value={selectedLocation}
          />
          <ul className="location-list">
            {
              showLocation && locations.map((item) => (
                <li onClick={() => handleListItem(item)}>{item}</li>
              ))
            }
          </ul>
          <input type="text" className="search-input" placeholder="Enter food or resturant name"
            onChange={(event) => LoadRestorent({ restaurant: event.target.value })}
          />

        </div>
      </div>
      <div className="restaurant-list-container">
        {
          restaurants.map((item) => (
            <div className="restaurant-wrapper" onClick={() => router.push(`explore/${item.name}`)}>
              <div className="heading-wrapper">
                <h3>{item.name}</h3>
                <h5>Contact:{item.contact}</h5>
              </div>
              <div>
                <div>{item.city}</div>
                <div className="address">{item.address}</div>
                <div>{item.email}</div>
              </div>
            </div>
          ))
        }
      </div>
    </main>
  );
}
