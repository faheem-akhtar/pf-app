import { IconTemplatePropsInterface } from '../template-props.interface';

/**
 * https://www.figma.com/file/BVGglAIgmnat5ZIwihRY9H/PF_Icon-Library?node-id=704%3A10
 */
export const IconThickArrowDownTemplate = (props: IconTemplatePropsInterface): JSX.Element => {
  const { clipped = true } = props;

  return (
    <svg
      viewBox={clipped ? '7.8 6 8.5 13' : '0 0 24 24'}
      height={clipped ? undefined : '24'}
      width={clipped ? undefined : '24'}
      className={props.class}
    >
      <path
        d='M11.2538 6.74743V16.4495L9.03173 14.2375C8.73852 13.9456 8.26312 13.9456 7.96991 14.2375C7.6767 14.5294 7.6767 15.0026 7.96991 15.2945L11.4573 18.7661C11.606 18.9142 11.8098 19.0021 12.0047 19C12.1902 19 12.3869 18.9142 12.5356 18.7661L16.023 15.2945C16.3162 15.0026 16.3162 14.5294 16.023 14.2375C15.7298 13.9456 15.2544 13.9456 14.9611 14.2375L12.7555 16.4332V6.74743C12.7555 6.33463 12.4193 6 12.0047 6C11.59 6 11.2538 6.33463 11.2538 6.74743Z'
        fill='currentColor'
      />
    </svg>
  );
};
