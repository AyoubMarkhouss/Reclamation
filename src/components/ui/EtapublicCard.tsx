import React from "react";

const EtapublicCard = ({ link }: { link: string }) => {
  return (
    <div className="body">
      <a className="card credentialing" href={link}>
        <div className="overlay"></div>
        <div className="circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlSpace="preserve"
            height="80px"
            width="80px"
            viewBox="0 0 128 128"
            fill="#2C7DA0"
            className="-mt-4"
          >
            <path d="M124.5 118V70h-36V58h-49v12h-36v48H0v10h128v-10h-3.5zm-27-27h5v23h-5V91zm-4 23h-5V91h5v23zm9-27h-5v-5h5v5zm4-5h5v5h-5v-5zm0 9h5v23h-5V91zm9 0h5v23h-5V91zm5-4h-5v-5h5v5zm-27-5v5h-5v-5h5zm-72 5h-5v-5h5v5zm4-5h5v5h-5v-5zm-4 9v23h-5V91h5zm4 0h5v23h-5V91zm9 0h5v23h-5V91zm5-4h-5v-5h5v5zm-27-5v5h-5v-5h5zm-5 9h5v23h-5V91zm39 29V70h7v50h-7zm14 0V70h7v50h-7zm14 0V70h7v50h-7zM88.5 56 65 36.8V30h11V20H65v-2h-2v18.8L39.5 56z" />
          </svg>
        </div>
        <p className="z-1000 mt-8  text-gray-700 transition-colors duration-300">
          Établissement public
        </p>
      </a>
    </div>
  );
};

export default EtapublicCard;
