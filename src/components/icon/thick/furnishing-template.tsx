import { IconTemplatePropsInterface } from '../template-props.interface';

/**
 * https://www.figma.com/file/BVGglAIgmnat5ZIwihRY9H/PF_Icon-Library?node-id=7%3A2624
 */
export const IconThickFurnishingTemplate = (props: IconTemplatePropsInterface): JSX.Element => {
  const { clipped = false } = props;

  return (
    <svg
      viewBox={clipped ? '0 0 15 11' : '0 0 24 24'}
      height={clipped ? undefined : '24'}
      width={clipped ? undefined : '24'}
      className={props.class}
    >
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M17.5 9.5V9C17.5 8.72386 17.2761 8.5 17 8.5H8C7.72386 8.5 7.5 8.72386 7.5 9V9.5H6V9C6 7.89543 6.89543 7 8 7H17C18.1046 7 19 7.89543 19 9V9.5H17.5ZM9 15.5V16.5H16V15.5H9ZM9 14H16V13C16 11.8954 16.8954 11 18 11C19.1046 11 20 11.8954 20 13V17.75C20 17.8881 19.8881 18 19.75 18H5.25C5.11193 18 5 17.8881 5 17.75V13C5 11.8954 5.89543 11 7 11C8.10457 11 9 11.8954 9 13V14ZM6.5 16.5H7.5V13C7.5 12.7239 7.27614 12.5 7 12.5C6.72386 12.5 6.5 12.7239 6.5 13V16.5ZM17.5 16.5H18.5V13C18.5 12.7239 18.2761 12.5 18 12.5C17.7239 12.5 17.5 12.7239 17.5 13V16.5Z'
        fill='currentColor'
      />
    </svg>
  );
};
