import { IconTemplatePropsInterface } from '../template-props.interface';

/**
 * https://www.figma.com/file/BVGglAIgmnat5ZIwihRY9H/PF_Icon-Library?node-id=7%3A2419
 */
export const IconThickAmenitiesLuxuryTemplate = (props: IconTemplatePropsInterface): JSX.Element => {
  const { clipped = false } = props;

  return (
    <svg
      viewBox={clipped ? '0 0 16 13' : '0 0 24 24'}
      height={clipped ? undefined : '24'}
      width={clipped ? undefined : '24'}
      className={props.class}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M15.9571 10.5H14.2449L12.271 7.5H11.6491L9.74491 10.5H8.04137C8.07312 10.3764 8.12405 10.2567 8.19392 10.1456L9.87719 7.5H7.6671L5.54524 10.9888L10.3064 15.6862L8.45111 12H10.1292L11.9629 15.6468L13.8515 12H15.5379L13.5516 15.8263L18.4561 10.9875L16.3521 7.5H14.0488L15.8012 10.1407C15.8728 10.2532 15.9248 10.3745 15.9571 10.5ZM7.38598 6H16.6344C16.9848 6 17.3097 6.1834 17.4907 6.48344L19.9281 10.5237C19.9751 10.6017 20 10.691 20 10.782V11.3623C20 11.4961 19.9464 11.6243 19.8512 11.7183L12.7626 18.7119C12.5755 18.8965 12.3232 19 12.0603 19H11.9397C11.6768 19 11.4245 18.8965 11.2374 18.7119L4.14884 11.7183C4.05361 11.6243 4 11.4961 4 11.3623V10.783C4 10.6913 4.02519 10.6014 4.0728 10.5231L6.53159 6.48037C6.713 6.18208 7.03685 6 7.38598 6Z'
        fill='currentColor'
      />
    </svg>
  );
};
