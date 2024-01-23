import React from 'react';

interface IProps {
  className?: string;
}
const Discord: React.FC<IProps> = ({ className }) => {
  return (
    <div className={className}>
      <svg
        width="149"
        height="73"
        viewBox="0 0 149 73"
        fill="none"
        className="hidden md:flex"
      >
        <g clipPath="url(#clip0_541_772)">
          <g clipPath="url(#clip1_541_772)">
            <path
              d="M104.926 28.1614C102.531 28.1614 100.423 29.1556 98.8747 30.7111C93.1747 26.7503 85.4949 24.2006 76.9848 23.928L81.4075 3.91556L95.4898 7.09061C95.4898 10.5543 98.2999 13.3766 101.749 13.3766C105.261 13.3766 108.087 10.4741 108.087 7.01043C108.087 3.54674 105.277 0.644287 101.749 0.644287C99.2898 0.644287 97.1663 2.1356 96.1125 4.17213L80.5613 0.70843C79.7789 0.499966 79.0125 1.06121 78.805 1.84696L73.9512 23.912C65.505 24.2648 57.905 26.8144 52.189 30.7752C50.6403 29.1556 48.4529 28.1614 46.0579 28.1614C37.1806 28.1614 34.2747 40.124 42.4016 44.2131C42.1142 45.4799 41.9865 46.8269 41.9865 48.1739C41.9865 61.6118 57.0587 72.5 75.5638 72.5C94.1487 72.5 109.221 61.6118 109.221 48.1739C109.221 46.8269 109.077 45.4158 108.726 44.149C116.693 40.0438 113.755 28.1614 104.926 28.1614ZM55.2865 45.063C55.2865 41.5351 58.0966 38.6968 61.6251 38.6968C65.0739 38.6968 67.884 41.5191 67.884 45.063C67.884 48.5267 65.0739 51.349 61.6251 51.349C58.1125 51.365 55.2865 48.5267 55.2865 45.063ZM89.5024 60.0563C83.6907 65.8933 67.2932 65.8933 61.4814 60.0563C60.8428 59.4951 60.8428 58.5008 61.4814 57.8594C62.0403 57.2982 63.0302 57.2982 63.589 57.8594C68.0276 62.4296 82.7487 62.5098 87.3789 57.8594C87.9377 57.2982 88.9276 57.2982 89.4865 57.8594C90.1411 58.5008 90.1411 59.4951 89.5024 60.0563ZM89.3747 51.365C85.926 51.365 83.1159 48.5427 83.1159 45.079C83.1159 41.5512 85.926 38.7129 89.3747 38.7129C92.8873 38.7129 95.7134 41.5351 95.7134 45.079C95.6974 48.5267 92.8873 51.365 89.3747 51.365Z"
              fill="#737373"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_541_772">
            <rect
              width="151"
              height="72"
              fill="white"
              transform="translate(0 0.5)"
            />
          </clipPath>
          <clipPath id="clip1_541_772">
            <rect
              width="76"
              height="72"
              fill="white"
              transform="translate(37.5 0.5)"
            />
          </clipPath>
        </defs>
      </svg>

      <svg
        width="152"
        height="142"
        viewBox="0 0 152 142"
        className="flex md:hidden"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
        <g clipPath="url(#clip0_541_372)">
          <path
            d="M133.69 54.5546C128.995 54.5546 124.863 56.5154 121.827 59.5831C110.652 51.7715 95.5953 46.743 78.9111 46.2054L87.5819 6.73634L115.191 12.9983C115.191 19.8294 120.7 25.3956 127.461 25.3956C134.348 25.3956 139.888 19.6713 139.888 12.8401C139.888 6.00894 134.379 0.284668 127.461 0.284668C122.641 0.284668 118.477 3.22587 116.411 7.24235L85.9228 0.411171C84.389 3.54052e-05 82.8865 1.10694 82.4796 2.65661L72.9636 46.1737C56.4046 46.8695 41.5046 51.898 30.2983 59.7096C27.2619 56.5154 22.9735 54.5546 18.2781 54.5546C0.873892 54.5546 -4.82317 78.1475 11.1098 86.212C10.5464 88.7105 10.2959 91.3671 10.2959 94.0236C10.2959 120.526 39.8455 142 76.1252 142C112.561 142 142.111 120.526 142.111 94.0236C142.111 91.3671 141.829 88.584 141.14 86.0855C156.76 77.9893 151.001 54.5546 133.69 54.5546ZM36.3709 87.8882C36.3709 80.9305 41.8802 75.3328 48.7981 75.3328C55.5594 75.3328 61.0686 80.8989 61.0686 87.8882C61.0686 94.7194 55.5594 100.286 48.7981 100.286C41.9115 100.317 36.3709 94.7194 36.3709 87.8882ZM103.452 117.458C92.0581 128.97 59.9104 128.97 48.5163 117.458C47.2642 116.351 47.2642 114.391 48.5163 113.126C49.6119 112.019 51.5527 112.019 52.6483 113.126C61.3504 122.139 90.2113 122.297 99.289 113.126C100.385 112.019 102.325 112.019 103.421 113.126C104.704 114.391 104.704 116.351 103.452 117.458ZM103.202 100.317C96.4405 100.317 90.9312 94.751 90.9312 87.9198C90.9312 80.9622 96.4405 75.3644 103.202 75.3644C110.088 75.3644 115.629 80.9305 115.629 87.9198C115.598 94.7194 110.088 100.317 103.202 100.317Z"
            fill="#737373"
          />
        </g>
        <defs>
          <clipPath id="clip0_541_372">
            <rect
              width="149"
              height="142"
              fill="white"
              transform="translate(1.5)"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};
export default React.memo(Discord);
