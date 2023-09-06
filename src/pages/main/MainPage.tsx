import { useEffect, useState } from "react";
import OPEN_DATA from "../../DATA_OPEN_RESTAURANT.json";
import NavigationFilter, {
  FilterValues,
} from "../../components/navigation-filter/NavigationFilter";
import CardRestaurant, {
  CardRestaurantValues,
} from "../../components/card-restaurant/CardRestaurant";
import {
  getAllRestaurant,
  getFilteredRestaurantByPrice,
  getRestaurantByCategory,
} from "../../util/restaurant";
const MainPage = () => {
  const [defaultData, setDefaultData] = useState<[]>();
  const [dataRestaurant, setDataRestaurant] = useState<[]>();
  const [amount, setAmount] = useState({
    start: 0,
    total: 8,
  });
  const [loading, setLoading] = useState(true);
  const [filterValues, setFilterValues] = useState<FilterValues>({
    open: false,
    price: "Price",
    category: "Categories",
    reset: false,
  });

  useEffect(() => {
    const getData = async () => {
      const data = await getAllRestaurant(0, 20);
      const tempData = data.slice(amount.start, amount.total);
      setDataRestaurant(tempData);
      setDefaultData(data);
      setLoading(false);
    };
    getData();
  }, []);

  useEffect(() => {
    const getDataWithFilterChanged = async () => {
      const { category, open, price, reset } = filterValues;

      setLoading(true);

      let tempData = defaultData;

      if (category != "Categories") {
        tempData = await getRestaurantByCategory(filterValues.category);
      }

      if (price != "Price") {
        tempData = getFilteredRestaurantByPrice(tempData, price);
      }

      if(open == true){
        tempData = tempData?.filter((d)=>{
          const id = d.id
          return OPEN_DATA[id] == true
        })
      }
      tempData = tempData?.slice(amount.start, amount.total);
      setDataRestaurant(tempData);

      if (reset) {
        setFilterValues({
          category: "Categories",
          open: false,
          price: "Price",
          reset: false,
        });
        setDataRestaurant(defaultData);
      }
      setLoading(false);
    };
    getDataWithFilterChanged();
  }, [filterValues, amount]);

  const loadMoreHandler = () => {
    setAmount((prev) => {
      const newTotal = amount.total + amount.total;
      return {
        ...prev,
        total: newTotal,
      };
    });
  };
  return (
    <div className="flex flex-col gap-2 items-start w-4/5 m-auto pb-10 ">
      <h1 className="text-3xl">Restaurants</h1>
      <p className="text-gray-700">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
        perspiciatis, fugit quam consequuntur mollitia corrupti tempore nam
        nostrum doloremque excepturi!
      </p>
      <img src="" alt="" />
      <NavigationFilter
        setFilterValues={setFilterValues}
        filterValues={filterValues}
      />
      <div className=" w-full ">
        {loading ? (
          <>
            <h1>LOADING TOT</h1>
          </>
        ) : (
          <div className="flex flex-wrap gap-7 w-[81%] m-auto">
            {dataRestaurant?.map((res, i) => {
              const { id, name, pictureId, rating } = res;

              const resData: CardRestaurantValues = {
                id,
                name,
                rating,
                idPicture: pictureId,
                open: OPEN_DATA[id],
              };
              return <CardRestaurant {...resData} key={i} />;
            })}
          </div>
        )}
      </div>
      {filterValues.category == "Categories" &&
        filterValues.price == "Price" &&
        dataRestaurant?.length < 20 && (
          <div
            onClick={loadMoreHandler}
            className="my-4 mx-auto border-2 font-semibold border-cyan-950 text-cyan-950 flex justify-center py-2 px-36 cursor-pointer hover:bg-gray-300"
          >
            <p>LOAD MORE</p>
          </div>
        )}
    </div>
  );
};

export default MainPage;
