import React from "react";
import { FaWhatsapp} from "react-icons/fa"; // Importing icons

const TaptodApp = () => {
  return (
    <div className="bg-gray-50 text-gray-800 pb-10">
    

      <main className="max-w-6xl mx-auto p-5 space-y-6">
        {/* Service Introduction */}
        <section className=" rounded-2xl bg-white p-6 ">
          <h2 className="text-xl font-bold text-[#008069] mb-6 roboto-slab flex items-center">
           Service Introduction
          </h2>
          <p className="text-gray-700 sans leading-relaxed text-md">
            The Taptod platform leverages your social media accounts
            (WhatsApp, Instagram, Facebook) to power the future of advertising.
            Taptod handles marketing tasks while you enjoy seamless earnings.
          </p>
          <div className="flex items-center justify-center space-x-8 mt-5">
            {/* Icons */}
              <div className="flex bg-[#e0f7e9] items-center space-x-3 p-4 rounded shadow transition-all duration-300 cursor-pointer" >
                      <FaWhatsapp className="text-2xl text-[#25D366]" />
                      <div className="flex flex-col flex-grow">
                        <span className="font-normal text-xl roboto-slab text-gray-800">
                          WhatsApp
                        </span>
                     
                      </div>
                    
                    </div>
         
          </div>
          <p className="mt-6 text-center text-[#25D366] sans italic">
            Note: Your accounts may receive marketing messages during active campaigns. Feel free to mute notifications for convenience.
          </p>
        </section>

        {/* Company Profile */}
        <section className="bg-white rounded-xl  p-6  ">
          <h2 className="text-xl font-bold text-[#008069] roboto-slab  mb-4 flex items-center">
            Company Profile
          </h2>
          <p className="text-gray-700 leading-relaxed sans text-md">
            Taptod is a trusted platform operating in 64 countries worldwide,
            delivering secure, virus-free advertising solutions. We’re committed
            to empowering individuals and businesses with seamless marketing
            automation.
          </p>
      
          <p className="mt-6 text-[#25D366] sans text-center italic">
            Join thousands of users and experience Taptod’s reliable and safe advertising ecosystem.
          </p>
        </section>
      </main>

      {/* Call-to-Action Section */}
    

      {/* Footer */}
   
    </div>
  );
};

export default TaptodApp;
