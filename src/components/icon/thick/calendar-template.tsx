import { IconTemplatePropsInterface } from '../template-props.interface';

/**
 * https://www.figma.com/file/UgqgWyePbtSNXWOjXenG36/Developer-Egypt?node-id=5063%3A121315
 */
export const IconThickCalendarTemplate = (props: IconTemplatePropsInterface): JSX.Element => {
  const { clipped = false } = props;

  return (
    <svg
      viewBox={clipped ? '0 0 15 16' : '0 0 24 24'}
      height={clipped ? undefined : '24'}
      width={clipped ? undefined : '24'}
      className={props.class}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M16.2 4C16.6418 4 17 4.35817 17 4.8V5.6H17.8C18.6837 5.6 19.4 6.31634 19.4 7.2V18.4C19.4 19.2837 18.6837 20 17.8 20H6.6C5.71634 20 5 19.2837 5 18.4V7.2C5 6.31634 5.71634 5.6 6.6 5.6H7.4V4.8C7.4 4.35817 7.75817 4 8.2 4C8.64183 4 9 4.35817 9 4.8V5.6H15.4V4.8C15.4 4.35817 15.7582 4 16.2 4ZM6.6 10.4V18.4H17.8V10.4H6.6ZM6.6 8.8H17.8V7.2H6.6V8.8Z'
        fill='currentColor'
      />
    </svg>
  );
};
