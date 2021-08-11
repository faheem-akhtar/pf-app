import { IconTemplatePropsInterface } from '../template-props.interface';

/**
 * https://www.figma.com/file/BVGglAIgmnat5ZIwihRY9H/PF_Icon-Library?node-id=703%3A1715
 */
export const IconThinCheckmarkTemplate = (props: IconTemplatePropsInterface): JSX.Element => {
  const { clipped = true } = props;

  return (
    <svg
      viewBox={clipped ? '4 5 17 13' : '0 0 24 24'}
      width={clipped ? undefined : '24'}
      height={clipped ? undefined : '24'}
      className={props.class}
    >
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M4.5 12.5993L8.96969 17.6139C9.45785 18.1287 10.2493 18.1287 10.7375 17.6139L20.5 7.60728C20.6953 7.40136 20.6953 7.06749 20.5 6.86157C20.3047 6.65564 19.9882 6.65564 19.7929 6.86157L10.0303 16.8682C9.93272 16.9711 9.77443 16.9711 9.6768 16.8682L5.20711 11.8535C5.01184 11.6476 4.69526 11.6476 4.5 11.8535C4.30474 12.0595 4.30474 12.3933 4.5 12.5993Z'
        fill='currentColor'
      />
    </svg>
  );
};
