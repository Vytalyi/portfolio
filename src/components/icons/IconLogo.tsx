const IconLogo = (props: { className?: string }) => (
  <svg
    className={`${props.className} icon icon-tabler icon-tabler-swords`}
    width='40'
    height='40'
    viewBox='0 0 24 24'
    strokeWidth='1.00'
    stroke='rgba(1, 1, 1, 1)'
    fill='none'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <circle
      cx='50%'
      cy='50%'
      r='50%'
      stroke='none'
      strokeWidth='0'
      fill='rgba(255, 255, 255, 1)'
    ></circle>
    <g transform='translate(2.40, 2.40) scale(0.8)'>
      <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
      <path d='M21 3v5l-11 9l-4 4l-3 -3l4 -4l9 -11z'></path>
      <path d='M5 13l6 6'></path>
      <path d='M14.32 17.32l3.68 3.68l3 -3l-3.365 -3.365'></path>
      <path d='M10 5.5l-2 -2.5h-5v5l3 2.5'></path>
    </g>
  </svg>
);

export default IconLogo;
