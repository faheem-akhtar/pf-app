import { IconTemplatePropsInterface } from './template-props.interface';

export const IconMenuTemplate: React.FunctionComponent<IconTemplatePropsInterface> = (props) => {
  const { clipped = false } = props;
  return (
    <svg
      className={props.class}
      height={clipped ? undefined : '24'}
      viewBox={clipped ? '0 0 13 3' : '-3 -4 24 24'}
      width={clipped ? undefined : '24'}
    >
      <g>
        <g id='price-tag/-no-price' transform='translate(-4.000000, -5.000000)'>
          <path d='M5.5,8 C4.67157288,8 4,7.32842712 4,6.5 C4,5.67157288 4.67157288,5 5.5,5 C6.32842712,5 7,5.67157288 7,6.5 C7,7.32842712 6.32842712,8 5.5,8 Z M10.5,8 C9.67157288,8 9,7.32842712 9,6.5 C9,5.67157288 9.67157288,5 10.5,5 C11.3284271,5 12,5.67157288 12,6.5 C12,7.32842712 11.3284271,8 10.5,8 Z M15.5,8 C14.6715729,8 14,7.32842712 14,6.5 C14,5.67157288 14.6715729,5 15.5,5 C16.3284271,5 17,5.67157288 17,6.5 C17,7.32842712 16.3284271,8 15.5,8 Z' />
        </g>
      </g>
    </svg>
  );
};
