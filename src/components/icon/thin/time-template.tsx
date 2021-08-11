import { IconTemplatePropsInterface } from '../template-props.interface';

/**
 * https://www.figma.com/file/BVGglAIgmnat5ZIwihRY9H/PF_Icon-Library?node-id=0%3A633
 */
export const IconThinTimeTemplate = (props: IconTemplatePropsInterface): JSX.Element => {
  const { clipped = true } = props;

  return (
    <svg
      viewBox={clipped ? '3 3 18 18' : '0 0 24 24'}
      height={clipped ? undefined : '24'}
      width={clipped ? undefined : '24'}
      className={props.class}
    >
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12ZM4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12ZM11.5663 12.1859C11.5663 12.247 11.5784 12.3051 11.6004 12.3582C11.6224 12.4113 11.6549 12.461 11.6981 12.5041L13.6189 14.425C13.7947 14.6008 14.0796 14.6008 14.2553 14.425C14.4311 14.2493 14.4311 13.9644 14.2553 13.7886L12.4663 11.9995V7.69338C12.4663 7.44485 12.2648 7.24338 12.0163 7.24338C11.7677 7.24338 11.5663 7.44485 11.5663 7.69338V12.1859ZM11.6004 12.3582C11.6008 12.3592 11.6012 12.3601 11.6016 12.3611L11.5992 12.3553C11.5996 12.3563 11.6 12.3572 11.6004 12.3582Z'
        fill='currentColor'
      />
    </svg>
  );
};
