import React from "react";

interface NoDataProps {
  title: string;
}

const NoData: React.FC<NoDataProps> = ({ title }) => {
  return (
    <div className="max-w-4xl mx-auto px-10 py-4 bg-gray-400 rounded-lg shadow-lg">
      <div className="flex flex-col justify-center items-center py-12">
        <h1 className="text-gray-700 font-medium font-graphikTrial text-xl text-center mb-3">
          {title}
        </h1>
      </div>
    </div>
  );
};

export default NoData;
