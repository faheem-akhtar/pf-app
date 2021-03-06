import { IconTemplatePropsInterface } from '../template-props.interface';

/**
 * https://www.figma.com/file/BVGglAIgmnat5ZIwihRY9H/PF_Icon-Library?node-id=0%3A941
 */
export const IconThickSmallCloseTemplate = (props: IconTemplatePropsInterface): JSX.Element => {
  const { clipped = true } = props;

  return (
    <svg
      viewBox={clipped ? '3 3 10 10' : '0 0 16 16'}
      height={clipped ? undefined : '24'}
      width={clipped ? undefined : '24'}
      className={props.class}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M4.34408 3.17475C4.01717 2.92057 3.54448 2.94367 3.24408 3.24408C2.91864 3.56951 2.91864 4.09715 3.24408 4.42259L6.82149 8L3.24408 11.5774C2.91864 11.9028 2.91864 12.4305 3.24408 12.7559C3.54448 13.0563 4.01717 13.0794 4.34408 12.8252L4.42259 12.7559L8 9.17851L11.5774 12.7559L11.6559 12.8252C11.9828 13.0794 12.4555 13.0563 12.7559 12.7559C13.0814 12.4305 13.0814 11.9028 12.7559 11.5774L9.17851 8L12.7559 4.42259C13.0814 4.09715 13.0814 3.56951 12.7559 3.24408C12.4555 2.94367 11.9828 2.92057 11.6559 3.17475L11.5774 3.24408L8 6.82149L4.42259 3.24408L4.34408 3.17475Z'
        fill='currentColor'
      />
    </svg>
  );
};
