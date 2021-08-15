import { IconTemplatePropsInterface } from '../template-props.interface';

export const IconThickMagnifierTemplate: React.FunctionComponent<IconTemplatePropsInterface> = (props) => {
  const { clipped } = props;
  return (
    <svg
      viewBox={clipped ? '4 4 15 15' : '0 0 24 24'}
      height={clipped ? undefined : '24'}
      width={clipped ? undefined : '24'}
      class={props.class}
    >
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M14.7399 13.6792L18.7806 17.7197C19.0735 18.0126 19.0735 18.4875 18.7806 18.7804C18.4877 19.0733 18.0128 19.0733 17.7199 18.7804L13.6792 14.7399C12.6632 15.5297 11.3865 16 10 16C6.68629 16 4 13.3137 4 10C4 6.68629 6.68629 4 10 4C13.3137 4 16 6.68629 16 10C16 11.3865 15.5297 12.6632 14.7399 13.6792ZM10 14.5C12.4853 14.5 14.5 12.4853 14.5 10C14.5 7.51472 12.4853 5.5 10 5.5C7.51472 5.5 5.5 7.51472 5.5 10C5.5 12.4853 7.51472 14.5 10 14.5Z'
      />
    </svg>
  );
};
