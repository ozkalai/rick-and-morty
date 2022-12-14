import * as React from "react";

const ArrowIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={9}
    height={10}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M.555.425h3.54l4.36 4.48-4.36 4.48H.555l4.38-4.48L.555.425Z"
      fill="#000"
    />
  </svg>
);

export default ArrowIcon;
