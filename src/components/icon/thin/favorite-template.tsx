import { IconTemplatePropsInterface } from '../template-props.interface';

/**
 * https://www.figma.com/file/BVGglAIgmnat5ZIwihRY9H/PF_Icon-Library?node-id=35%3A1739
 */
export const IconThinFavoriteTemplate = (props: IconTemplatePropsInterface): JSX.Element => {
  const { clipped = false } = props;

  return (
    <svg
      viewBox={clipped ? '0 0 18 16' : '-3 -4 24 24'}
      width={clipped ? undefined : '24'}
      height={clipped ? undefined : '24'}
      className={props.class}
    >
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M9 2.131l.578-.609c1.927-2.03 5.05-2.03 6.977 0 1.927 2.03 1.927 5.32 0 7.35l-.578.61-5.632 5.932a1.837 1.837 0 01-2.69 0L2.023 9.481l-.578-.609c-1.927-2.03-1.927-5.32 0-7.35 1.927-2.03 5.05-2.03 6.977 0l.578.61zm-1.25.089C6.192.58 3.673.58 2.117 2.22c-1.56 1.643-1.56 4.311 0 5.955l6.21 6.542.005.006a.919.919 0 001.34-.006l6.21-6.542c1.56-1.644 1.56-4.312 0-5.955-1.557-1.64-4.076-1.64-5.632 0L9 3.537 7.75 2.22z'
        fill='currentColor'
      />
    </svg>
  );
};
