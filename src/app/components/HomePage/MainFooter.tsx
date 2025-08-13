import React from "react";
import Image from "next/image";

interface DynamicFooterPageProps{
  Btitle?: string;
  Blink?: string;
}

const App: React.FC<DynamicFooterPageProps> = ({ Btitle, Blink }) => {
  const page = {
    title: "Contact Us",
    link: "/contactus",
    image: { src: "/logo2.png", alt: "Logo" },
  };

  return (
    <div className="flex flex-row items-center bg-sky-600 justify-center p-2 dark:border-neutral-500 md:flex-row md:justify-between lg:flex-row lg:justify-between mx-auto max-w-7xl">
      <div className="mr-12 lg:order-1 md:order-1 font-graphikTrial">
        <Image
          src={page.image.src}
          alt={page.image.alt}
          quality={75}
          priority={true}
          width={130}
          height={100}
        />
      </div>
      {Blink?.length && (
        <div className="flex group justify-center w-full md:w-auto lg:w-auto p-2 lg:order-2 md:order-2">
          <a href={Blink}>
            <h2 className="text-white text-header-base font-semibold">
              {Btitle} <span aria-hidden="true">&rarr;</span>
            </h2>
          </a>
        </div>
      )}
      <div className="flex group justify-end w-full md:w-auto lg:w-auto p-2 lg:order-2 md:order-2">
        <a href={page.link}>
          <button className="border-white font-graphikTrial text-white font-semibold py-1 px-1 border rounded text-sm md:text-sm flex items-center transition-all">
            Contact Us <span className='ml-2 transition-all group-hover:ml-4' aria-hidden="true">&rarr;</span>
          </button>
        </a>
      </div>
    </div>
  );
}

export default App;
