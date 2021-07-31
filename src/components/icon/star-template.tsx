import { IconTemplatePropsInterface } from './template-props.interface';

export const IconStarTemplate = (props: IconTemplatePropsInterface): JSX.Element => {
  const { clipped = true } = props;
  return (
    <svg
      viewBox={clipped ? '3 2.8 18.6 16.8' : '0 0 24 24'}
      height={clipped ? undefined : '24'}
      width={clipped ? undefined : '24'}
      className={props.class}
      fill='none'
    >
      {/* tslint:disable-next-line: max-line-length */}
      <path d='M12.052 3.038a.5.5 0 0 1 .896 0L15.052 7.3a1.5 1.5 0 0 0 1.13.82l4.703.684a.5.5 0 0 1 .277.853l-3.404 3.318a1.5 1.5 0 0 0-.431 1.327l.803 4.685a.5.5 0 0 1-.725.527l-4.207-2.212a1.5 1.5 0 0 0-1.396 0l-4.207 2.212a.5.5 0 0 1-.725-.527l.803-4.685a1.5 1.5 0 0 0-.431-1.327L3.838 9.657a.5.5 0 0 1 .277-.853l4.704-.683a1.5 1.5 0 0 0 1.13-.82l2.103-4.263z' />
    </svg>
  );
};
