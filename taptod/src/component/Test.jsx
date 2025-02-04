import React from "react";

const App = () => {
  return (
    <div className="flex flex-col gap-4 p-6 max-w-md mx-auto">
      {/* PDF Reader */}
      <div className="flex items-center justify-between p-4 rounded-lg shadow-md bg-pink-400 text-white">
        <div className="flex-1">
          <span className="text-lg font-semibold">PDF Reader</span>
        </div>
        <div className="ml-4 flex items-center justify-center w-12 h-12 bg-white rounded-md">
          <img src="path/to/pdf-icon.png" alt="PDF Reader Icon" className="w-6 h-6" />
        </div>
      </div>

      {/* Image Convert */}
      <div className="flex items-center justify-between p-4 rounded-lg shadow-md bg-orange-400 text-white">
        <div className="flex-1">
          <span className="text-lg font-semibold">Image Convert</span>
        </div>
        <div className="ml-4 flex items-center justify-center w-12 h-12 bg-white rounded-md">
          <img src="path/to/image-convert-icon.png" alt="Image Convert Icon" className="w-6 h-6" />
        </div>
      </div>

      {/* Image to Text */}
      <div className="flex items-center justify-between p-4 rounded-lg shadow-md bg-lime-400 text-white">
        <div className="flex-1">
          <span className="text-lg font-semibold">Image to Text</span>
        </div>
        <div className="ml-4 flex items-center justify-center w-12 h-12 bg-white rounded-md">
          <img src="path/to/image-to-text-icon.png" alt="Image to Text Icon" className="w-6 h-6" />
        </div>
      </div>

      {/* Document Scanner */}
      <div className="flex items-center justify-between p-4 rounded-lg shadow-md bg-yellow-400 text-white">
        <div className="flex-1">
          <span className="text-lg font-semibold">Document Scanner</span>
        </div>
        <div className="ml-4 flex items-center justify-center w-12 h-12 bg-white rounded-md">
          <img src="path/to/document-scanner-icon.png" alt="Document Scanner Icon" className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

export default App;
