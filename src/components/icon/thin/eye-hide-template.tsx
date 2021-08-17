import { IconTemplatePropsInterface } from '../template-props.interface';

/**
 * https://www.figma.com/file/BVGglAIgmnat5ZIwihRY9H/PF_Icon-Library?node-id=750%3A1798
 */
export const IconThinEyeHideTemplate = (props: IconTemplatePropsInterface): JSX.Element => {
  const { clipped = true } = props;

  return (
    <svg
      viewBox={clipped ? '1 5 22 14' : '0 0 24 24'}
      width={clipped ? undefined : '24'}
      height={clipped ? undefined : '24'}
      className={props.class}
      fill='none'
    >
      <path
        d='M12.5556 17.5C6.23335 17.5 3.25436 13.8457 2.50872 12.0187C2.62148 10.9496 3.19325 9.35893 4.58313 8.01906C6.01031 6.64323 8.33392 5.5 12 5.5C15.6661 5.5 17.9897 6.64323 19.4169 8.01906C20.8262 9.37769 21.3944 10.9942 21.4958 12.0633C21.1279 13.8245 18.9021 17.5 12.5556 17.5Z'
        stroke='currentColor'
      />
      <circle cx='12.5' cy='9.5' r='4' stroke='currentColor' />
      <path
        d='M14 9.49345C14 10.3199 13.3309 11 12.4933 11C11.7249 11 11.0983 10.4277 11 9.69513C11.172 9.78434 11.3669 9.83456 11.5729 9.83456C12.2602 9.83456 12.8272 9.2738 12.8272 8.56963C12.8272 8.36416 12.7788 8.17078 12.6932 8C13.4349 8.098 14 8.7339 14 9.49345Z'
        fill='currentColor'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M21.625 16.7532C21.9702 16.9525 22.1045 17.3661 21.925 17.677C21.7655 17.9533 21.3255 18.0693 20.9803 17.87L2.22574 7.05414C1.88057 6.85486 1.74627 6.44128 1.92576 6.13039C2.08531 5.85404 2.50874 5.71642 2.8705 5.93737L21.625 16.7532Z'
        fill='currentColor'
      />
    </svg>
  );
};
