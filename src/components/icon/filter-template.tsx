import { IconTemplatePropsInterface } from './template-props.interface';

export const IconFilterTemplate = (props: IconTemplatePropsInterface): JSX.Element => {
  const { clipped = true } = props;
  return (
    <svg
      viewBox={clipped ? '0 0 16 10' : '-5 -7 24 24'}
      height={clipped ? undefined : '24'}
      width={clipped ? undefined : '24'}
      className={props.class}
    >
      <g id='svg-filter' stroke='none'>
        <path d='M6.565 4c-.083.326-.085.67 0 1H.5a.5.5 0 0 1 0-1h6.065zm2.01 4l.656 1H.5a.5.5 0 0 1 0-1h8.075zM.5 0h11.997a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1zm11.1 9.8l-3.498-5a.5.5 0 0 1 .4-.8H15.5a.5.5 0 0 1 .4.8l-3.5 5a.5.5 0 0 1-.8 0z' />
      </g>
    </svg>
  );
};
