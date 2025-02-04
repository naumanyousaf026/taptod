import { IoIosArrowBack } from "react-icons/io";
import taptodlogo from '../images/taptod_1.png'; 

const Header = ({ title, showTitle = true }) => {
  const handleBack = () => {
    // Use window.history.back() to go to the previous page
    window.history.back();
  };

  return (
    <div className="bg-[#008069] text-white py-2 px-4 w-full">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        <button onClick={handleBack} className="text-white text-xl">
          <IoIosArrowBack />
        </button>
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-white">
            <img src={taptodlogo} alt="TapToD Logo" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-2xl font-bold tracking-wide uppercase">
            <span className="text-[#ffdd59] roboto-slab">Tap</span>tod
          </h1>
        </div>

        {/* Only show title if showTitle is true */}
        {showTitle && <span className="text-xl roboto-slab text-white">{title}</span>}
      </div>
    </div>
  );
};

export default Header;
