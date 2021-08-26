import { IconTemplatePropsInterface } from '../template-props.interface';

/**
 * Design is not in the Figma
 */
export const IconThinSyncTemplate = (props: IconTemplatePropsInterface): JSX.Element => {
  const { clipped = true } = props;

  return (
    <svg
      viewBox={clipped ? '0 0 12 16' : '0 0 24 24'}
      width={clipped ? undefined : '24'}
      height={clipped ? undefined : '24'}
      className={props.class}
    >
      <path
        d='M5.714 2.179c1.572 0 2.917.571 4.036 1.714C10.87 5.036 11.429 6.405 11.429 8c0 1.143-.298 2.179-.893 3.107L9.5 10.036c.333-.62.5-1.298.5-2.036 0-1.19-.423-2.214-1.268-3.071-.845-.858-1.851-1.286-3.018-1.286V5.82L2.857 2.893 5.714 0v2.179zm0 10.178V10.18l2.857 2.928L5.714 16v-2.179c-1.571 0-2.916-.571-4.035-1.714C.559 10.964 0 9.595 0 8c0-1.19.298-2.226.893-3.107l1.036 1.071c-.334.62-.5 1.298-.5 2.036 0 1.19.422 2.214 1.267 3.071.846.858 1.852 1.286 3.018 1.286z'
        fill='currentColor'
      />
    </svg>
  );
};
