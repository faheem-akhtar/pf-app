import { IconTemplatePropsInterface } from './template-props.interface';

export const IconThickBedroomTemplate = (props: IconTemplatePropsInterface): JSX.Element => {
  const { clipped = false } = props;

  return (
    <svg
      viewBox={clipped ? '0 0 15 13' : '0 0 24 24'}
      height={clipped ? undefined : '24'}
      width={clipped ? undefined : '24'}
      className={props.class}
    >
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M17.5 10.7561V9C17.5 8.17157 16.8284 7.5 16 7.5H7C6.17157 7.5 5.5 8.17157 5.5 9V10.7561C4.94107 10.9536 4.43282 11.2585 4 11.6458L4 9C4 7.34315 5.34315 6 7 6H16C17.6569 6 19 7.34315 19 9V11.6458C18.5672 11.2585 18.0589 10.9536 17.5 10.7561ZM6.88625 13.5042C6.11096 13.5624 5.5 14.2098 5.5 15V16.5H17.5V15C17.5 14.2098 16.889 13.5624 16.1137 13.5042C15.9402 13.8008 15.6184 14 15.25 14H7.75C7.38162 14 7.05975 13.8008 6.88625 13.5042ZM19 15V17.5C19 17.7761 18.7761 18 18.5 18H18V18.5C18 18.7761 17.7761 19 17.5 19H17C16.7239 19 16.5 18.7761 16.5 18.5V18H6.5V18.5C6.5 18.7761 6.27614 19 6 19H5.5C5.22386 19 5 18.7761 5 18.5V18H4.5C4.22386 18 4 17.7761 4 17.5V15C4 13.4273 5.21012 12.1373 6.75 12.0103V10C6.75 9.44772 7.19772 9 7.75 9H15.25C15.8023 9 16.25 9.44772 16.25 10V12.0103C17.7899 12.1373 19 13.4273 19 15ZM10.75 12.5V10.5H8.25V12.5H10.75ZM12.25 10.5V12.5H14.75V10.5H12.25Z'
        fill='currentColor'
      />
    </svg>
  );
};
