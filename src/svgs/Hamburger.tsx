import React from 'react';

const Hamburger: React.FC = () => {
  return (
    <svg width="24" height="14" viewBox="0 0 24 14" fill="none">
      <path
        d="M0.571472 0H23.4286V2.28571H0.571472V0ZM6.28576 5.71429H23.4286V8H6.28576V5.71429ZM13.4286 11.4286H23.4286V13.7143H13.4286V11.4286Z"
        fill="#252B42"
      />
    </svg>
  );
};
export default React.memo(Hamburger);
