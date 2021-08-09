import { IconTemplatePropsInterface } from './template-props.interface';

export const IconChevronDownTemplate = (props: IconTemplatePropsInterface): JSX.Element => {
  const { clipped = true } = props;

  return (
    <svg
      viewBox={clipped ? '4.5 8 11 6' : '0 0 24 24'}
      height={clipped ? undefined : '24'}
      width={clipped ? undefined : '24'}
      className={props.class}
    >
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M4.646 8.9l4.47 4.714c.488.515 1.28.515 1.768 0l4.47-4.714a.548.548 0 000-.746.482.482 0 00-.708 0l-4.47 4.714a.241.241 0 01-.353 0l-4.47-4.714a.482.482 0 00-.707 0 .548.548 0 000 .746z'
        fill='currentColor'
      />
    </svg>
  );
};
