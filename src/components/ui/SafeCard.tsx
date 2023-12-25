import React from "react";

const SafeCard = ({ link }: { link: string }) => {
  return (
    <div className="body">
      <a className="card credentialing" href={link}>
        <div className="overlay"></div>
        <div className="circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="80px"
            width="80px"
            fill="#000"
            className="icon flat-color"
            data-name="Flat Color"
            viewBox="0 0 24 24"
          >
            <path
              fill="#2C7DA0"
              d="M17 13a6 6 0 01-3.31-11H4a2 2 0 00-2 2v16a2 2 0 002 2h13a2 2 0 002-2v-7.35a6 6 0 01-2 .35z"
            ></path>
            <path
              fill="#2CA9BC"
              d="M14 18H6a1 1 0 010-2h8a1 1 0 010 2zm-4-4H6a1 1 0 010-2h4a1 1 0 010 2zm5-3a1 1 0 01-.71-.29 1 1 0 010-1.42l6-6a1 1 0 111.42 1.42l-6 6A1 1 0 0115 11zm5.5-3A1.5 1.5 0 1022 9.5 1.5 1.5 0 0020.5 8zm-5-5A1.5 1.5 0 1017 4.5 1.5 1.5 0 0015.5 3z"
            ></path>
          </svg>
        </div>
        <p className="z-1000 mt-8  text-gray-700 transition-colors duration-300">
          IMPO-TGR-Commune
        </p>
      </a>
    </div>
  );
};

export default SafeCard;
