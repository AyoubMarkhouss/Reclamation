import React from "react";

const AncfccCard = ({ link }: { link: string }) => {
  return (
    <div className="body">
      <a className="card credentialing" href={link}>
        <div className="overlay"></div>
        <div className="circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            height="90px"
            width="90px"
            fill="#2C7DA0"
            className="-mt-3"
          >
            <path fill="none" d="M0 0h20v20H0z" />
            <path d="m13 13.14 1.17-5.94c.79-.43 1.33-1.25 1.33-2.2a2.5 2.5 0 0 0-5 0c0 .95.54 1.77 1.33 2.2zm0-9.64c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zm1.72 4.8L18 6.97v9L13.12 18 7 15.97l-5 2v-9l5-2 4.27 1.41 1.73 7.3z" />
          </svg>
        </div>
        <p className="z-1000 mr-10 mt-8 pl-8  text-gray-700 transition-colors duration-300">
          ANCFCC / C.F
        </p>
      </a>
    </div>
  );
};

export default AncfccCard;
