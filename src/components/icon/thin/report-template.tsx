import { IconTemplatePropsInterface } from '../template-props.interface';

/**
 * https://www.figma.com/file/BVGglAIgmnat5ZIwihRY9H/PF_Icon-Library?node-id=0%3A1000
 */
export const IconThinReportTemplate = (props: IconTemplatePropsInterface): JSX.Element => {
  const { clipped = true } = props;

  return (
    <svg
      viewBox={clipped ? '0 0 18 18' : '0 0 24 24'}
      width={clipped ? undefined : '24'}
      height={clipped ? undefined : '24'}
      className={props.class}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M7.98311 20C7.98311 20.5523 6.86761 21 5.49156 21C4.11551 21 3 20.5523 3 20C3 19.5162 3.85598 19.1127 4.99325 19.02V5H11.0228C11.2537 3.85888 12.2591 3 13.4645 3H17.9493L21 7.5L17.9493 12H11.9198C11.6889 13.1411 10.6834 14 9.47805 14H5.98987V19.02C7.12714 19.1127 7.98311 19.5162 7.98311 20ZM17.4219 11L19.7947 7.5L17.4219 4H13.4645C12.6389 4 11.9696 4.67157 11.9696 5.5V11H17.4219ZM10.973 6H5.98987V13H9.47805C10.3037 13 10.973 12.3284 10.973 11.5V6Z'
        fill='currentColor'
      />
    </svg>
  );
};
