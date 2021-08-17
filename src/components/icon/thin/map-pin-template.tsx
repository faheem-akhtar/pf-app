import { IconTemplatePropsInterface } from '../template-props.interface';

/**
 * https://www.figma.com/file/BVGglAIgmnat5ZIwihRY9H/PF_Icon-Library?node-id=0%3A1020
 */
export const IconThinMapPinTemplate = (props: IconTemplatePropsInterface): JSX.Element => {
  const { clipped = true } = props;

  return (
    <svg
      viewBox={clipped ? '4 2 16 20' : '0 0 24 24'}
      height={clipped ? undefined : '24'}
      width={clipped ? undefined : '24'}
      className={props.class}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M12 13.5C10.3431 13.5 9 12.1569 9 10.5C9 8.84315 10.3431 7.5 12 7.5C13.6569 7.5 15 8.84315 15 10.5C15 12.1569 13.6569 13.5 12 13.5ZM12 12.5C13.1046 12.5 14 11.6046 14 10.5C14 9.39543 13.1046 8.5 12 8.5C10.8954 8.5 10 9.39543 10 10.5C10 11.6046 10.8954 12.5 12 12.5ZM17.6569 4.80509C20.781 7.87854 20.781 12.8616 17.6569 15.935L12 21.5L6.34315 15.935C3.21895 12.8616 3.21895 7.87854 6.34315 4.80509C9.46734 1.73164 14.5327 1.73164 17.6569 4.80509ZM16.9556 15.2222C19.6815 12.5405 19.6815 8.1996 16.9556 5.51796C14.2205 2.82735 9.77948 2.82735 7.04444 5.51796C4.31852 8.1996 4.31852 12.5405 7.04444 15.2222L12 20.0972L16.9556 15.2222Z'
        fill='currentColor'
      />
    </svg>
  );
};
