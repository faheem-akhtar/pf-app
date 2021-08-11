import { IconTemplatePropsInterface } from '../template-props.interface';

/**
 * https://www.figma.com/file/BVGglAIgmnat5ZIwihRY9H/PF_Icon-Library?node-id=0%3A1370
 */
export const IconSolidFavoriteTemplate = (props: IconTemplatePropsInterface): JSX.Element => {
  const { clipped = false } = props;

  return (
    <svg
      viewBox={clipped ? '0 0 18 16' : '-3 -4 24 24'}
      className={props.class}
      height={clipped ? undefined : '24'}
      width={clipped ? undefined : '24'}
    >
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M1.428 8.899l6.232 6.526a1.85 1.85 0 002.688-.008l6.224-6.518c1.931-2.022 1.931-5.488-.168-7.492-2.1-2.004-4.949-1.796-6.825.169L9 2.183l-.58-.607C6.546-.39 3.697-.551 1.597 1.407c-2.1 1.959-2.1 5.47-.168 7.492z'
        fill='currentColor'
      />
    </svg>
  );
};
