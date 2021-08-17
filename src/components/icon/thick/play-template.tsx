import { IconTemplatePropsInterface } from '../template-props.interface';

/**
 * https://www.figma.com/file/BVGglAIgmnat5ZIwihRY9H/PF_Icon-Library?node-id=7%3A2666
 */
export const IconThickPlayTemplate = (props: IconTemplatePropsInterface): JSX.Element => {
  const { clipped = false } = props;

  return (
    <svg
      viewBox={clipped ? '0 0 16 16' : '0 0 24 24'}
      height={clipped ? undefined : '24'}
      width={clipped ? undefined : '24'}
      className={props.class}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM16 12L10 7.5V16.5L16 12Z'
        fill='currentColor'
      />
    </svg>
  );
};
