import { memo } from "react";

export const GradiantIcon = memo(function GradiantIcon() {
  return (
    <svg viewBox="0 0 223 178" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="223" height="178" fill="url(#paint0_radial_0_2641)" />
      <mask id="mask0_0_2641" maskUnits="userSpaceOnUse" x="0" y="0">
        <rect width="223" height="178" fill="white" />
      </mask>
      <g mask="url(#mask0_0_2641)">
        <g opacity="0.765433" filter="url(#filter0_f_0_2641)">
          <ellipse cy="-52" rx="84" ry="125" fill="#7AD8FB" />
        </g>
        <g filter="url(#filter1_f_0_2641)">
          <ellipse cx="266" cy="180" rx="84" ry="125" fill="#FBB57A" />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_f_0_2641"
          x="-173.703"
          y="-266.703"
          width="347.407"
          height="429.407"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="44.8517"
            result="effect1_foregroundBlur_0_2641"
          />
        </filter>
        <filter
          id="filter1_f_0_2641"
          x="92.2967"
          y="-34.7033"
          width="347.407"
          height="429.407"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="44.8517"
            result="effect1_foregroundBlur_0_2641"
          />
        </filter>
        <radialGradient
          id="paint0_radial_0_2641"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(231.697 -18.4881) rotate(135.832) scale(329.256 335.48)"
        >
          <stop stopColor="#E84D70" />
          <stop offset="0.530886" stopColor="#A337F6" />
          <stop offset="1" stopColor="#28A7ED" />
        </radialGradient>
      </defs>
    </svg>
  );
});
