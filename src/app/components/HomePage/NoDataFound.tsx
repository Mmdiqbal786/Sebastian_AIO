import React from "react";
import Image from "next/image";

interface NoDataFoundProps {
  title: string;
}

const NoDataFound: React.FC<NoDataFoundProps> = ({ title }) => {
  return (
    <div className="max-w-4xl mx-auto px-10 py-4 bg-gray-400 rounded-lg shadow-lg">
      <div className="flex flex-col justify-center items-center py-12">
        <Image
          width={400}
          height={400}
          quality={75}
          priority={true}
          className="w-32 h-32 mx-auto"
          src="/nodata.svg"
          alt="No Data"
        />
        <h1 className="text-gray-700 font-medium text-xl font-graphikTrial text-center mb-3">
          {title}
        </h1>
      </div>
    </div>
  );
};

export default NoDataFound;
