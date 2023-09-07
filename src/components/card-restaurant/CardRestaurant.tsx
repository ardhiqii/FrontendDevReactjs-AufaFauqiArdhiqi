import { useEffect, useState } from "react";
import { getRestaurantDetail } from "../../util/restaurant";
import { useNavigate } from "react-router-dom";
import { StarIcon } from "@heroicons/react/20/solid";

const CardRestaurant = ({
  id,
  name,
  idPicture,
  open,
  rating,
}: CardRestaurantValues) => {
  const nav = useNavigate();
  const [category, setCategory] = useState("");
  const imgURL = `https://restaurant-api.dicoding.dev/images/small/${idPicture}`;
  useEffect(() => {
    const getCategory = async () => {
      const restaurant = await getRestaurantDetail(id);
      setCategory(restaurant.categories[0].name);
    };
    getCategory();
  }, []);

  const navigateToDetailPage = () => {
    nav(`/detail/${id}`);
  };

  const DisplayStarRating = () => {
    const stars = [];
    for (let i = 0; i < Math.round(rating); i++) {
      stars.push(<StarIcon className="w-4 h-4" />);
    }
    return stars;
  };
  return (
    <div className=" w-56 flex flex-col gap-y-3 ">
      <img src={imgURL} alt="" className="h-28 w-full object-cover" />
      <div className="flex flex-col gap-y-1">
        <p className="font-semibold">{name}</p>
        <div className="flex ">
          <DisplayStarRating />
        </div>
        <div className="">
          <div className="flex justify-between">
            <p className="text-gray-500 text-xs font-semibold tracking-widest">
              {category}-{Math.floor(rating * 100)}$
            </p>
            <div className="flex items-center gap-x-1">
              <span
                className={
                  open
                    ? "w-3 h-3 block rounded-full bg-green-400 "
                    : "w-3 h-3 block rounded-full bg-red-400 "
                }
              ></span>
              <p className="text-gray-500 text-xs font-semibold">
                {open ? "OPEN NOW" : "CLOSED"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <a
        onClick={navigateToDetailPage}
        className="bg-cyan-950 text-white flex justify-center py-1 cursor-pointer"
      >
        <p>LEARN MORE</p>
      </a>
    </div>
  );
};

export default CardRestaurant;

export interface CardRestaurantValues {
  id: string;
  name: string;
  rating: number;
  idPicture: string;
  open: boolean;
}
