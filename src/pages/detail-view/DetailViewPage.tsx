import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRestaurantDetail } from "../../util/restaurant";
import { MapPinIcon, StarIcon } from "@heroicons/react/20/solid";
import { Tab } from "@headlessui/react";
import Loading from "../../components/loading/Loading";

const DetailViewPage = () => {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const nav = useNavigate();
  const [dataRestaurant, setDataRestaurant] = useState();
  useEffect(() => {
    const getData = async () => {
      const data = await getRestaurantDetail(id as string);
      const status = data.request?.status;
      if (status) {
        nav("/NotFound", { replace: true });
      } else {
        setDataRestaurant(data);
        setLoading(false);
      }
    };
    getData();
  }, []);
  if (loading) {
    return <Loading/>;
  }
  const { name, pictureId, rating, city, address,menus }:any = dataRestaurant;
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col w-96 gap-2 border-2 rounded-md p-4 shadow-xl">
        <img
          src={`https://restaurant-api.dicoding.dev/images/small/${pictureId}`}
          alt=""
        />
        <div className="w-full flex flex-col gap-y-2">
          <h1 className="font-bold text-xl flex justify-between items-cente">
            <p>{name}</p>
            <div className="flex items-center gap-x-2">
              <StarIcon className="h-4 w-4 text-yellow-400" /> {rating}
            </div>
          </h1>
          <div className="flex items-center gap-x-1 text-sm font-semibold text-gray-400">
            <MapPinIcon className="h-4 w-4 text-gray-400" />
            {`${city}, ${address}`}
          </div>
        </div>
        <div className="w-full">
          <Tab.Group>
            <Tab.List className="flex bg-cyan-950 w-full justify-evenly px-1 py-1">
              {Object.keys(menus).map((name, idx) => (
                <Tab
                  key={idx}
                  className={({ selected }) =>
                    selected
                      ? "w-full py-2 font-semibold capitalize bg-white text-cyan-950"
                      : "w-full py-2 font-semibold capitalize text-white"
                  }
                >
                  {name}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels>
              {Object.values(menus).map((items:any) => (
                <Tab.Panel className=" flex flex-col gap-y-2 mt-2 h-72 overflow-y-auto">
                  {items.map(({ name }:any) => (
                    <div className="bg-gray-200 py-1 px-1 font-semibold">
                      {name}
                    </div>
                  ))}
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </div>
  );
};

export default DetailViewPage;
