import React from "react";

const WaitingMessage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl lg:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 mb-2">
        Waiting for other user to accept request...
      </h1>
      <p className="text-gray-600 text-center">
        Sit tight! We’ll notify you as soon as they respond.
      </p>
    </div>
  );
};

export default WaitingMessage;
