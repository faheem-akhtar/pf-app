import { IconTemplatePropsInterface } from '../template-props.interface';

/**
 * https://www.figma.com/file/BVGglAIgmnat5ZIwihRY9H/PF_Icon-Library?node-id=7%3A2306
 */
export const IconThickFavoriteTemplate = (props: IconTemplatePropsInterface): JSX.Element => {
  const { clipped = false } = props;

  return (
    <svg
      viewBox={clipped ? '3 4 18 16' : '0 0 24 24'}
      height={clipped ? undefined : '24'}
      width={clipped ? undefined : '24'}
      className={props.class}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M10.66 19.425L4.428 12.9c-1.931-2.022-1.931-5.533.168-7.492 2.1-1.958 4.949-1.796 6.825.169l.579.607.58-.607c1.875-1.965 4.724-2.173 6.824-.169 2.1 2.004 2.1 5.47.168 7.492l-6.224 6.518a1.85 1.85 0 01-2.688.008zM12 8.984l-1.928-2.019a2.94 2.94 0 00-4.296 0c-1.196 1.253-1.196 3.291 0 4.544L12 18.027l6.224-6.518c1.197-1.253 1.197-3.29 0-4.544a2.94 2.94 0 00-4.296 0L12 8.984z'
      />
    </svg>
  );
};
