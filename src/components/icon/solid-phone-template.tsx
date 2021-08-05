import { IconTemplatePropsInterface } from './template-props.interface';

export const IconSolidPhoneTemplate = (props: IconTemplatePropsInterface): JSX.Element => {
  const { clipped = true } = props;
  return (
    <svg
      viewBox={clipped ? '0 0 16 16' : '0 0 24 24'}
      height={clipped ? undefined : '24'}
      width={clipped ? undefined : '24'}
      className={props.class}
    >
      <path
        fill='currentColor'
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M20 16.6364C20 16.8409 19.9621 17.108 19.8864 17.4375C19.8106 17.767 19.7311 18.0265 19.6477 18.2159C19.4886 18.5947 19.0265 18.9962 18.2614 19.4205C17.5492 19.8068 16.8447 20 16.1477 20C15.9432 20 15.7443 19.9867 15.5511 19.9602C15.358 19.9337 15.1402 19.8864 14.8977 19.8182C14.6553 19.75 14.4754 19.6951 14.358 19.6534C14.2405 19.6117 14.0303 19.5341 13.7273 19.4205C13.4242 19.3068 13.2386 19.2386 13.1705 19.2159C12.428 18.9508 11.7652 18.6364 11.1818 18.2727C10.2121 17.6742 9.21023 16.858 8.17614 15.8239C7.14205 14.7898 6.32576 13.7879 5.72727 12.8182C5.36364 12.2348 5.04924 11.572 4.78409 10.8295C4.76136 10.7614 4.69318 10.5758 4.57955 10.2727C4.46591 9.9697 4.38826 9.75947 4.34659 9.64205C4.30492 9.52462 4.25 9.3447 4.18182 9.10227C4.11364 8.85985 4.06629 8.64205 4.03977 8.44886C4.01326 8.25568 4 8.05682 4 7.85227C4 7.1553 4.19318 6.45076 4.57955 5.73864C5.00379 4.97348 5.4053 4.51136 5.78409 4.35227C5.97348 4.26894 6.23295 4.18939 6.5625 4.11364C6.89205 4.03788 7.15909 4 7.36364 4C7.4697 4 7.54924 4.01136 7.60227 4.03409C7.73864 4.07955 7.93939 4.36742 8.20455 4.89773C8.28788 5.04167 8.40152 5.24621 8.54545 5.51136C8.68939 5.77652 8.82197 6.01705 8.94318 6.23295C9.06439 6.44886 9.18182 6.65152 9.29545 6.84091C9.31818 6.87121 9.38447 6.96591 9.49432 7.125C9.60417 7.28409 9.68561 7.41856 9.73864 7.52841C9.79167 7.63826 9.81818 7.74621 9.81818 7.85227C9.81818 8.00379 9.71023 8.19318 9.49432 8.42045C9.27841 8.64773 9.04356 8.85606 8.78977 9.04545C8.53598 9.23485 8.30114 9.43561 8.08523 9.64773C7.86932 9.85985 7.76136 10.0341 7.76136 10.1705C7.76136 10.2386 7.7803 10.3239 7.81818 10.4261C7.85606 10.5284 7.88826 10.6061 7.91477 10.6591C7.94129 10.7121 7.99432 10.803 8.07386 10.9318C8.15341 11.0606 8.19697 11.1326 8.20455 11.1477C8.7803 12.1856 9.43939 13.0758 10.1818 13.8182C10.9242 14.5606 11.8144 15.2197 12.8523 15.7955C12.8674 15.803 12.9394 15.8466 13.0682 15.9261C13.197 16.0057 13.2879 16.0587 13.3409 16.0852C13.3939 16.1117 13.4716 16.1439 13.5739 16.1818C13.6761 16.2197 13.7614 16.2386 13.8295 16.2386C13.9659 16.2386 14.1402 16.1307 14.3523 15.9148C14.5644 15.6989 14.7652 15.464 14.9545 15.2102C15.1439 14.9564 15.3523 14.7216 15.5795 14.5057C15.8068 14.2898 15.9962 14.1818 16.1477 14.1818C16.2538 14.1818 16.3617 14.2083 16.4716 14.2614C16.5814 14.3144 16.7159 14.3958 16.875 14.5057C17.0341 14.6155 17.1288 14.6818 17.1591 14.7045C17.3485 14.8182 17.5511 14.9356 17.767 15.0568C17.983 15.178 18.2235 15.3106 18.4886 15.4545C18.7538 15.5985 18.9583 15.7121 19.1023 15.7955C19.6326 16.0606 19.9205 16.2614 19.9659 16.3977C19.9886 16.4508 20 16.5303 20 16.6364Z'
      />
    </svg>
  );
};
