import { Icon, IconProps } from '@chakra-ui/react';

export const CircleIcon = (props: IconProps) => {
  return (
    <Icon
      as='svg'
      width='60px'
      height='61px'
      viewBox='0 0 60 61'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}>
      <ellipse
        opacity='0.5'
        cx='29.7163'
        cy='29.7167'
        rx='29.7163'
        ry='29.7167'
        transform='matrix(-1 0 0 1 59.4297 0.594238)'
        fill='url(#paint0_linear_8091_55895)'
      />
      <defs>
        <linearGradient
          id='paint0_linear_8091_55895'
          x1='8.91489'
          y1='8.915'
          x2='57.0267'
          y2='25.8156'
          gradientUnits='userSpaceOnUse'>
          <stop stopColor='#B68A35' />
          <stop offset='1' stopColor='#905F00' />
        </linearGradient>
      </defs>
    </Icon>
  );
};
