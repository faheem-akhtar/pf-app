import { IconTemplatePropsInterface } from '../template-props.interface';

/**
 * https://www.figma.com/file/BVGglAIgmnat5ZIwihRY9H/PF_Icon-Library?node-id=7%3A2809
 */
export const IconThinChevronDownTemplate = (props: IconTemplatePropsInterface): JSX.Element => {
  const { clipped = true } = props;

  return (
    <svg
      viewBox={clipped ? '4.5 8 16 8' : '0 0 24 24'}
      height={clipped ? undefined : '24'}
      width={clipped ? undefined : '24'}
      className={props.class}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M4.64645 8.14645C4.47288 8.32001 4.4536 8.58944 4.58859 8.78431L4.64645 8.85355L11.6464 15.8536C11.82 16.0271 12.0894 16.0464 12.2843 15.9114L12.3536 15.8536L19.3536 8.85355C19.5488 8.65829 19.5488 8.34171 19.3536 8.14645C19.18 7.97288 18.9106 7.9536 18.7157 8.08859L18.6464 8.14645L12 14.793L5.35355 8.14645C5.17999 7.97288 4.91056 7.9536 4.71569 8.08859L4.64645 8.14645Z'
        fill='currentColor'
      />
    </svg>
  );
};
