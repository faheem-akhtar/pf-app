import { IconTemplatePropsInterface } from '../template-props.interface';

/**
 * https://www.figma.com/file/UgqgWyePbtSNXWOjXenG36/Developer-Egypt?node-id=5063%3A121928
 */
export const IconThickDeveloperPropertyTemplate = (props: IconTemplatePropsInterface): JSX.Element => {
  const { clipped = false } = props;

  return (
    <svg
      viewBox={clipped ? '0 0 18 18' : '0 0 24 24'}
      height={clipped ? undefined : '24'}
      width={clipped ? undefined : '24'}
      className={props.class}
    >
      <path
        d='M12.9474 3.47368V4.89474M11.0526 3.47368V4.89474M15.7807 8.64531C15.775 11.6396 14.0376 14.6629 12.0028 14.6629C9.96812 14.6629 8.37102 11.6633 8.36533 8.66897C8.36533 8.66897 10.2978 8.88572 12.0028 8.88572C13.7079 8.88572 15.7807 8.64531 15.7807 8.64531ZM17.084 8.09715V8.10857C17.084 8.13143 17.0783 8.14858 17.0669 8.17143C16.8737 8.59429 14.8219 8.86858 12.2586 8.88572C12.0824 8.88572 11.9119 8.88572 11.7357 8.88572C9.17241 8.86858 7.1263 8.59429 6.92738 8.17143C6.91601 8.14858 6.91033 8.13143 6.91033 8.10857V8.09715C6.89896 7.63429 7.29681 7.32 7.92769 7.34286V6.75429C7.92769 1.73715 16.0553 1.76001 16.0553 6.75429V7.34286C16.6975 7.32 17.0954 7.63429 17.084 8.09715ZM4.98358 16.52L6.07484 16.0457L8.36533 14.8514L9.82034 16.4286C10.94 17.5714 12.7758 17.6629 14.083 16.52L15.6233 14.8514L17.8627 16.0457L19.0164 16.52C19.6985 16.8 20.2611 17.1371 20.3578 17.8686L21 21H20.6192H3.85254H3L3.64225 17.8686C3.6934 17.5029 3.84117 17.1657 4.0742 16.92C4.30155 16.6743 4.64825 16.6686 4.98358 16.52Z'
        stroke='currentColor'
        strokeWidth='1.44'
        strokeMiterlimit='22.9256'
        strokeLinecap='round'
        strokeLinejoin='round'
        fill='none'
      />
      <path d='M8 15L8 21' stroke='#403B45' strokeWidth='1.5' />
      <path d='M16 15L16 21' stroke='#403B45' strokeWidth='1.5' />
    </svg>
  );
};
