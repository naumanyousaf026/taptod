import React, { useState, useEffect, useRef } from "react";
import { FaSignInAlt } from "react-icons/fa";
import Balance from "./Balance";

function App() {
  const [step, setStep] = useState(1);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false); // Popup state
  const attemptsRef = useRef(0);
  const [whatsappInfo, setWhatsappInfo] = useState(null);

  const handleLoginClick = () => {
    setStep(2);
  };

  useEffect(() => {
    if (step === 2) {
      const fetchQrCode = async () => {
        const storedToken = localStorage.getItem("token");
        const secret = encodeURIComponent("e7d0098a46e0af84f43c2b240af5984ae267e08d");
        const sid = encodeURIComponent("1");
        try {
          const response = await fetch(
            `http://localhost:5000/api/generate-whatsapp-qr?secret=${secret}&sid=${sid}`,
            {
              headers: { Authorization: `Bearer ${storedToken}` },
            }
          );

          if (response.ok) {
            const data = await response.json();
            setQrCodeUrl(data.qrImageLink);
            setToken(data.token);
          } else {
            showErrorPopup("Failed to fetch QR code.");
          }
        } catch (error) {
          showErrorPopup("Error fetching QR code.");
        }
      };
      fetchQrCode();
    }
  }, [step]);

  const handleQrScanned = async () => {
    if (!token) {
      showErrorPopup("Token is missing. Cannot fetch WhatsApp info.");
      return;
    }

    // Reset attempts when starting
    attemptsRef.current = 0;
    const maxAttempts = 10;
    const delay = 3000;

    const pollWhatsAppInfo = async () => {
      if (attemptsRef.current >= maxAttempts) {
        showErrorPopup("Timeout: Unable to fetch WhatsApp information.");
        setStep(3); // Move to next step even if error occurs
        return;
      }
      
      attemptsRef.current += 1;
      console.log("Attempt number:", attemptsRef.current);
      
      try {
        const response = await fetch(
          `http://localhost:5000/api/get-whatsapp-info?token=${token}`,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        );
        
        console.log("Response status:", response.status);
        
        if (!response.ok) {
          throw new Error("Failed to fetch WhatsApp info.");
        }

        const data = await response.json();
        console.log("WhatsApp info response:", data);

        if (data.message && data.message.includes("Waiting for WhatsApp information")) {
          setTimeout(pollWhatsAppInfo, delay);
        } else {
          setWhatsappInfo(data);
          setStep(3); // Move to next step
        }
      } catch (error) {
        console.error("Error occurred while fetching WhatsApp info:", error);
        if (attemptsRef.current < maxAttempts) {
          // Retry if not reached max attempts
          setTimeout(pollWhatsAppInfo, delay);
        } else {
          showErrorPopup("Error fetching WhatsApp information.");
          setStep(3); // Move to next step even if error occurs
        }
      }
    };

    pollWhatsAppInfo();
  };

  const showErrorPopup = (message) => {
    setError(message);
    setShowPopup(true);
  };

  return (
    <div className="p-4">
      {/* Header */}
      <header className="text-center pt-4">
        <h1 className="text-2xl roboto-slab font-serif font-bold tracking-wide">
          Taptod - Premium <span className="block">Service</span>
        </h1>
        <p className="mt-2 sans text-gray-500">
          Premium WhatsApp Service & Earnings Tracker
        </p>
      </header>

      {/* Step 1: Login Button */}
      {step === 1 && (
        <div className="mt-4 p-4 rounded-lg shadow-sm bg-white text-center flex flex-col items-center justify-center">
          <h2 className="text-2xl roboto-slab font-semibold text-[#008069]">
            Welcome to Taptod
          </h2>
          <p className="text-sm text-gray-400 sans mt-4">
            Please click the button to login.
          </p>

          <button
            onClick={handleLoginClick}
            className="mt-6 px-12 py-3 bg-[#e6f4f1] rounded-md shadow-[-6px_6px_0_#008069] font-bold hover:scale-105 transition-transform flex items-center justify-center"
          >
            <FaSignInAlt className="mr-3" />
            Login
          </button>
        </div>
      )}

      {/* Step 2: QR Code */}
      {step === 2 && (
        <div className="mt-8 p-6 sm:p-8 rounded-lg shadow-md bg-white text-center">
          <h2 className="text-2xl sm:text-3xl roboto-slab font-semibold text-[#008069]">
            Scan QR Code to Login
          </h2>
          <p className="text-sm text-gray-400 sans mt-4">
            Please scan the QR code using the Taptod app to login.
          </p>

          <div className="mt-6 flex justify-center items-center">
            <div className="w-64 h-64 bg-gray-900 flex items-center justify-center text-gray-400 rounded-lg">
              {qrCodeUrl ? <img src={qrCodeUrl} alt="QR Code" /> : <p>Loading QR Code...</p>}
            </div>
          </div>

          <button
            onClick={handleQrScanned}
            className="mt-6 px-6 py-3 bg-[#e6f4f1] rounded-md shadow-[-6px_6px_0_#008069] font-bold hover:scale-105 transition-transform"
          >
            press after scanning
          </button>
        </div>
      )}

      {/* Step 3: Balance and Earnings Section */}
      {step === 3 && <Balance whatsappInfo={whatsappInfo} />}

      {/* Error Popup */}
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-lg font-bold text-red-600">Error</h2>
            <p className="mt-4 text-gray-600">{error}</p>
            <button
              onClick={() => setShowPopup(false)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-5 text-center text-gray-500">
        <p className="text-sm sm:text-base">
          © {new Date().getFullYear()} Taptod | Premium WhatsApp Services
        </p>
      </footer>
    </div>
  );
}

export default App;