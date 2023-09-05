import NavigationFilter from "../../components/navigation-filter/NavigationFilter";

const MainPage = () => {
  return (
    <div className="flex flex-col gap-3 items-start">
      <h1 className="text-3xl">Restaurants</h1>
      <p className="text-gray-700">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
        perspiciatis, fugit quam consequuntur mollitia corrupti tempore nam
        nostrum doloremque excepturi!
      </p>
      <NavigationFilter />
    </div>
  );
};

export default MainPage;
