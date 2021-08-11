import { IconTemplatePropsInterface } from '../template-props.interface';

/**
 * https://www.figma.com/file/BVGglAIgmnat5ZIwihRY9H/PF_Icon-Library?node-id=7%3A2709
 */
export const IconThickChevronRightTemplate = (props: IconTemplatePropsInterface): JSX.Element => {
  const { clipped = true } = props;

  return (
    <svg
      viewBox={clipped ? '7 4 10 16' : '0 0 24 24'}
      height={clipped ? undefined : '24'}
      width={clipped ? undefined : '24'}
      className={props.class}
    >
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M10.4121 4.70711C10.0216 4.31658 9.38844 4.3166 8.99792 4.70713C8.60906 5.09599 8.60714 5.72588 8.99365 6.11708L14.8275 12.0218L8.99716 17.884C8.60908 18.2742 8.60994 18.9049 8.99908 19.294C9.38897 19.6839 10.0211 19.6839 10.411 19.294L16.9979 12.7071C17.3885 12.3166 17.3885 11.6834 16.9979 11.2929L10.4121 4.70711Z'
        fill='currentColor'
      />
    </svg>
  );
};
