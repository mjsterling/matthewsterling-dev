import { useCallback, useEffect, useState } from 'react';

export const DownArrow = ({ show }: { show: boolean }) => {
  const [scrollPos, setScrollPos] = useState(0);
  const updateScrollPos = useCallback(() => {
    setScrollPos(document.body.scrollTop);
  }, []);
  console.log(scrollPos);
  useEffect(() => {
    window.onscroll = updateScrollPos;
  }, [updateScrollPos]);

  return (
    <svg
      width="32"
      height="22"
      viewBox="0 0 32 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="animate-bounce fixed bottom-8 pointer-events-none transition-opacity"
      style={{ left: `calc(50vw - 16px)`, opacity: +show }}
    >
      <g filter="url(#filter0_d_1403_1780)">
        <path
          d="M14.9393 13.0607C15.5251 13.6464 16.4749 13.6464 17.0607 13.0607L26.6066 3.51472C27.1924 2.92893 27.1924 1.97918 26.6066 1.3934C26.0208 0.807612 25.0711 0.807612 24.4853 1.3934L16 9.87868L7.51472 1.3934C6.92893 0.807612 5.97918 0.807612 5.3934 1.3934C4.80761 1.97918 4.80761 2.92893 5.3934 3.51472L14.9393 13.0607ZM17.5 11C17.5 10.1716 16.8284 9.5 16 9.5C15.1716 9.5 14.5 10.1716 14.5 11H17.5ZM17.5 12V11H14.5V12H17.5Z"
          fill="#009DFF"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_1403_1780"
          x="0.954071"
          y="0.954071"
          width="30.0919"
          height="20.5459"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_1403_1780"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1403_1780"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};
