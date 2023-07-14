import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div className="lg:px-24 bg-gray-800 h-screen lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
      <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
        <div className="relative">
          <div className="absolute">
            <div className="">
              <h1 className="my-2 text-gray-300 font-bold text-2xl">
                Looks like you've found the doorway to the great nothing
              </h1>
              <p className="my-2 text-gray-300">
                Sorry about that! Please visit our homepage to get where you
                need to go.
              </p>
              <Link to={"/"}>
                <button className="sm:w-full lg:w-auto my-2  px-8 text-center">
                  
                </button>
              </Link>
            </div>
            <Link to={"/"}>
              <button
                type="button"
                className=" bg-gray-900 flex mt-3 gap-2 items-center focus:ring-4 focus:ring-green-300 border  font-medium rounded-md text-sm px-4 py-2 text-center"
              >
                <span className="font-inter text-[12px] md:text-base md:font-medium leading-7 tracking-tight text-white text-center">
                Take me there!
                </span>
              </button></Link>
          </div>
          <div className="opacity-5">
            <img src="https://i.ibb.co/G9DC8S0/404-2.png" />
          </div>
        </div>
      </div>
      <div>
        <img src="https://i.ibb.co/ck1SGFJ/Group.png" />
      </div>
    </div>
  );
};

export default NotFound;
