import { IconTemplatePropsInterface } from '../template-props.interface';

/**
 * https://www.figma.com/file/BVGglAIgmnat5ZIwihRY9H/PF_Icon-Library?node-id=89%3A5
 */
export const IconThickPriceInclusiveTemplate = (props: IconTemplatePropsInterface): JSX.Element => {
  const { clipped = false } = props;

  return (
    <svg
      viewBox={clipped ? '0 0 15 15' : '0 0 24 24'}
      height={clipped ? undefined : '24'}
      width={clipped ? undefined : '24'}
      className={props.class}
    >
      <g clipPath='url(#clip0)'>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M4.5 11.988c0-4.13 3.359-7.488 7.488-7.488 4.128 0 7.487 3.359 7.487 7.489a7.435 7.435 0 01-2.207 5.308l-.023.022c-.176.16-1.764 1.57-3.159 1.57-.743 0-1.389-.281-1.865-.814-.864-.965-1-2.548-.992-3.515a2.368 2.368 0 01-2.174-2.358V9.957h5.865v2.245a2.367 2.367 0 01-2.248 2.362c-.005.81.109 1.975.625 2.55.204.226.454.331.79.331.652 0 1.739-.79 2.177-1.184a6.005 6.005 0 001.77-4.273 6.052 6.052 0 00-6.046-6.046 6.052 6.052 0 00-6.045 6.046c0 1.609.625 3.123 1.76 4.264a6.07 6.07 0 002.405 1.483.72.72 0 11-.448 1.371 7.51 7.51 0 01-2.98-1.836 7.441 7.441 0 01-2.18-5.282zm6.164-4.399h-.203c-.238 0-.43.177-.43.395v1.671h1.063V7.984c0-.218-.193-.395-.43-.395zm2.85 0h-.203c-.237 0-.43.177-.43.395v1.671h1.064V7.984c0-.218-.193-.395-.43-.395z'
          fill='currentColor'
        />
      </g>
    </svg>
  );
};
