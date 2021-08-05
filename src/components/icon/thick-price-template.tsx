import { IconTemplatePropsInterface } from './template-props.interface';

export const IconThickPriceTemplate = (props: IconTemplatePropsInterface): JSX.Element => {
  const { clipped = false } = props;

  return (
    <svg
      viewBox={clipped ? '0 0 18 12' : '0 0 24 24'}
      height={clipped ? undefined : '24'}
      width={clipped ? undefined : '24'}
      className={props.class}
    >
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M7 15.5V16H19V10H18.5V8.5H19.5C20.0523 8.5 20.5 8.94772 20.5 9.5V16.5C20.5 17.0523 20.0523 17.5 19.5 17.5H6.5C5.94772 17.5 5.5 17.0523 5.5 16.5V15.5H7ZM10.5 12C9.67157 12 9 11.3284 9 10.5C9 9.67157 9.67157 9 10.5 9C11.3284 9 12 9.67157 12 10.5C12 11.3284 11.3284 12 10.5 12ZM6.5 11.25C6.08579 11.25 5.75 10.9142 5.75 10.5C5.75 10.0858 6.08579 9.75 6.5 9.75C6.91421 9.75 7.25 10.0858 7.25 10.5C7.25 10.9142 6.91421 11.25 6.5 11.25ZM14.5 11.25C14.0858 11.25 13.75 10.9142 13.75 10.5C13.75 10.0858 14.0858 9.75 14.5 9.75C14.9142 9.75 15.25 10.0858 15.25 10.5C15.25 10.9142 14.9142 11.25 14.5 11.25ZM4.5 7.5V13.5H16.5V7.5H4.5ZM4 6H17C17.5523 6 18 6.44772 18 7V14C18 14.5523 17.5523 15 17 15H4C3.44772 15 3 14.5523 3 14V7C3 6.44772 3.44772 6 4 6Z'
        fill='currentColor'
      />
    </svg>
  );
};
