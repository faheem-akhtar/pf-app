import { IconTemplatePropsInterface } from './template-props.interface';

export const IconChevronLeftTemplate = (props: IconTemplatePropsInterface): JSX.Element => {
  const { clipped = true } = props;
  return (
    <svg
      viewBox={clipped ? '0 0 10 16' : '0 0 24 24'}
      height={clipped ? undefined : '24'}
      width={clipped ? undefined : '24'}
      className={props.class}
    >
      {/* tslint:disable-next-line: max-line-length */}
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M13.588 19.2929C13.9785 19.6834 14.6117 19.6834 15.0022 19.2929C15.3911 18.904 15.393 18.2741 15.0065 17.8829L9.17257 11.9782L15.003 6.11596C15.391 5.72576 15.3902 5.0951 15.001 4.70596C14.6111 4.31607 13.979 4.31607 13.5891 4.70596L7.00218 11.2929C6.61166 11.6834 6.61166 12.3166 7.00218 12.7071L13.588 19.2929Z'
        fill='white'
      />
    </svg>
  );
};
