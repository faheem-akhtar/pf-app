import { IconTemplatePropsInterface } from '../template-props.interface';

/**
 * Design is not in the Figma
 */
export const IconThinCheckmarkCircleTemplate = (props: IconTemplatePropsInterface): JSX.Element => {
  const { clipped = true } = props;

  return (
    <svg
      viewBox={clipped ? '0 0 32 32' : '0 0 24 24'}
      width={clipped ? undefined : '24'}
      height={clipped ? undefined : '24'}
      className={props.class}
    >
      <path
        d='M16,0C7.2,0,0,7.2,0,16c0,8.8,7.2,16,16,16s16-7.2,16-16C32,7.2,24.8,0,16,0z M16,30.7C7.9,30.7,1.3,24.1,1.3,16S7.9,1.3,16,1.3c8.1,0,14.7,6.6,14.7,14.7C30.7,24.1,24.1,30.7,16,30.7z'
        fill='currentColor'
      />
      <polygon points='13.5,20.5 7.8,14.7 6.9,15.7 13.5,22.3 25.1,10.6 24.2,9.7' fill='currentColor' />
    </svg>
  );
};
