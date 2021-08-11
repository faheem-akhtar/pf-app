import { IconTemplatePropsInterface } from '../template-props.interface';

/**
 * https://www.figma.com/file/BVGglAIgmnat5ZIwihRY9H/PF_Icon-Library?node-id=7%3A2339
 */
export const IconThickCloseTemplate = (props: IconTemplatePropsInterface): JSX.Element => {
  const { clipped = false } = props;

  return (
    <svg
      viewBox={clipped ? '4 4 16 16' : '0 0 24 24'}
      height={clipped ? undefined : '24'}
      width={clipped ? undefined : '24'}
      className={props.class}
    >
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M5.6129 4.2097L5.70711 4.29289L12 10.585L18.2929 4.29289C18.6834 3.90237 19.3166 3.90237 19.7071 4.29289C20.0676 4.65338 20.0953 5.22061 19.7903 5.6129L19.7071 5.70711L13.414 12L19.7071 18.2929C20.0976 18.6834 20.0976 19.3166 19.7071 19.7071C19.3466 20.0676 18.7794 20.0953 18.3871 19.7903L18.2929 19.7071L12 13.414L5.70711 19.7071C5.31658 20.0976 4.68342 20.0976 4.29289 19.7071C3.93241 19.3466 3.90468 18.7794 4.2097 18.3871L4.29289 18.2929L10.585 12L4.29289 5.70711C3.90237 5.31658 3.90237 4.68342 4.29289 4.29289C4.62334 3.96245 5.12751 3.91161 5.5114 4.14038L5.6129 4.2097Z'
        fill='currentColor'
      />
    </svg>
  );
};
