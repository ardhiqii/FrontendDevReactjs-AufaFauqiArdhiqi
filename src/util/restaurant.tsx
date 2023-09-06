import axios from "axios"

const BASE_URL = "https://restaurant-api.dicoding.dev"

export const getAllRestaurant = async (start: number = 0,end: number) =>{
    const {data} = await axios.get(BASE_URL + "/list")
    let restaurants = data.restaurants
    restaurants = restaurants.slice(start,end)
    return restaurants
}

export const getRestaurantDetail = async (id:string) =>{
    const API = `${BASE_URL}/detail/${id}`
    const {data} = await axios.get(API)
    const restaurant = data.restaurant
    return restaurant
}

export const getRestaurantByCategory = async (category:string) =>{
    const API = `${BASE_URL}/search?q=${category}`
    const {data} = await axios.get(API)
    const restaurants = data.restaurants
    return restaurants
}

export const getFilteredRestaurantByPrice = (data:[] | undefined,selected:string) =>{
    if(!data){
        return[]
    }
    if(selected == "<= 400$"){
        return data.filter((d)=>(d.rating * 100) <= 400)
    }else{
        return data.filter((d)=>(d.rating * 100) > 400)
    }
}