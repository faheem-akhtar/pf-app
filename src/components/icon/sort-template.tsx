import { IconTemplatePropsInterface } from './template-props.interface';

export const IconSortTemplate = (props: IconTemplatePropsInterface): JSX.Element => {
  const { clipped = true } = props;
  return (
    <svg
      viewBox={clipped ? '7.8 6 8.5 13' : '0 0 24 24'}
      height={clipped ? undefined : '24'}
      width={clipped ? undefined : '24'}
      className={props.class}
    >
      {/* tslint:disable-next-line: max-line-length */}
      <path
        fill='currentColor'
        d='M11.254 6.747v9.703l-2.222-2.212a.753.753 0 0 0-1.062 0 .745.745 0 0 0 0 1.056l3.487 3.472a.785.785 0 0 0 .548.234.774.774 0 0 0 .53-.234l3.488-3.471a.745.745 0 0 0 0-1.057.753.753 0 0 0-1.062 0l-2.206 2.195V6.747a.75.75 0 0 0-.75-.747.75.75 0 0 0-.751.747z'
      />
    </svg>
  );
};
