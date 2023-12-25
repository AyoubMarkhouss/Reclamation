import React from "react";

const BankCard = ({ link }: { link: string }) => {
  return (
    <div className="body">
      <a className="card credentialing" href={link}>
        <div className="overlay"></div>
        <div className="circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlSpace="preserve"
            id="Icons"
            viewBox="0 0 32 32"
            height="75px"
            width="75px"
            fill="#2C7DA0"
          >
            <style>
              {
                ".st0{fill:none;stroke:#2C7DA0;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10}"
              }
            </style>
            <path
              d="M16 3 3 10v3h26v-3zM14 13h4v10h-4zM23 13h4v10h-4zM5 13h4v10H5zM3 23h26v3H3zM1 26h30v3H1z"
              className="st0"
            />
          </svg>
        </div>
        <p className="z-1000 mt-8  text-gray-700 transition-colors duration-300">
          Banques / Assurances
        </p>
      </a>
    </div>
  );
};

export default BankCard;
