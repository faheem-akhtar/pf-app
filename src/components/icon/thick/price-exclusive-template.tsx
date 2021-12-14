import { IconTemplatePropsInterface } from '../template-props.interface';

/**
 * https://www.figma.com/file/BVGglAIgmnat5ZIwihRY9H/PF_Icon-Library?node-id=89%3A31
 */
export const IconThickPriceExclusiveTemplate = (props: IconTemplatePropsInterface): JSX.Element => {
  const { clipped = false } = props;

  return (
    <svg
      viewBox={clipped ? '0 0 15 15' : '0 0 24 24'}
      height={clipped ? undefined : '24'}
      width={clipped ? undefined : '24'}
      className={props.class}
    >
      <title>Price Exclusive</title>
      <g clipPath='url(#icon-thick-price-exclusive)'>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M6.45999 3.58999H6.66399L6.66299 3.58899C6.89999 3.58899 7.09299 3.76599 7.09299 3.98399V5.65499H6.02999V3.98399C6.02999 3.76599 6.22199 3.58999 6.45999 3.58999ZM9.31099 3.58999H9.51399L9.51499 3.58899C9.75199 3.58899 9.94499 3.76599 9.94499 3.98399V5.65499H8.88099V3.98399C8.88099 3.76599 9.07399 3.58999 9.31099 3.58999ZM8.67199 10.73C8.66799 11.541 9.42899 13.425 9.94499 14C10.148 14.226 9.14199 15.274 8.66599 14.742C7.80199 13.777 7.22099 11.693 7.22899 10.727C6.01199 10.628 5.05499 9.60999 5.05499 8.36799V6.12399H10.92V8.36799C10.9197 8.97488 10.6863 9.55847 10.2679 9.99808C9.84946 10.4377 9.27813 10.6997 8.67199 10.73Z'
          fill='currentColor'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M2 8C2 4.68629 4.68629 2 8 2C9.90237 2 11.598 2.88535 12.6972 4.26649L2.58449 10.5863C2.20981 9.80317 2 8.92609 2 8ZM3.7384 12.2236C4.82565 13.3206 6.33348 14 8 14C11.3137 14 14 11.3137 14 8C14 7.3064 13.8823 6.64029 13.6658 6.02055L3.7384 12.2236ZM8 0.5C3.85786 0.5 0.5 3.85786 0.5 8C0.5 12.1421 3.85786 15.5 8 15.5C12.1421 15.5 15.5 12.1421 15.5 8C15.5 3.85786 12.1421 0.5 8 0.5Z'
          fill='currentColor'
        />
      </g>
      <defs>
        <clipPath id='icon-thick-price-exclusive'>
          <rect width='15' height='15' fill='white' transform='translate(0.5 0.5)' />
        </clipPath>
      </defs>
    </svg>
  );
};
