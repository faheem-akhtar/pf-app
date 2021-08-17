import { IconTemplatePropsInterface } from '../template-props.interface';

/**
 * https://www.figma.com/file/BVGglAIgmnat5ZIwihRY9H/PF_Icon-Library?node-id=0%3A1350
 */
export const IconSolidEmailTemplate = (props: IconTemplatePropsInterface): JSX.Element => {
  const { clipped = true } = props;

  return (
    <svg
      viewBox={clipped ? '4 4 16 16' : '0 0 24 24'}
      height={clipped ? undefined : '24'}
      width={clipped ? undefined : '24'}
      className={props.class}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M4.43934 6.74915C4.16445 7.09168 4 7.52663 4 8V15.5556C4 15.6679 4.00926 15.7781 4.02706 15.8854L8.80131 11.1111L4.43934 6.74915ZM6 17.5556C5.41346 17.5556 4.8859 17.3031 4.52006 16.9009L9.55556 11.8654L10.9943 13.3041C11.5497 13.8596 12.4503 13.8596 13.0057 13.3041L14.4444 11.8654L19.4799 16.9009C19.1141 17.3031 18.5865 17.5556 18 17.5556H6ZM19.9729 15.8854C19.9907 15.7781 20 15.6679 20 15.5556V8C20 7.52664 19.8355 7.09168 19.5607 6.74915L15.1987 11.1111L19.9729 15.8854ZM18.682 6.1193C18.4692 6.0421 18.2395 6 18 6H6C5.7605 6 5.53083 6.0421 5.31799 6.1193L11.7486 12.5499C11.8874 12.6887 12.1126 12.6887 12.2514 12.5499L18.682 6.1193Z'
        fill='currentColor'
      />
    </svg>
  );
};
