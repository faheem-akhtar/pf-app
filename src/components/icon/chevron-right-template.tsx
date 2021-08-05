import { IconTemplatePropsInterface } from './template-props.interface';

export const IconChevronRightTemplate = (props: IconTemplatePropsInterface): JSX.Element => {
  const { clipped = true } = props;
  return (
    <svg
      viewBox={clipped ? '0 0 10 16' : '0 0 24 24'}
      height={clipped ? undefined : '24'}
      width={clipped ? undefined : '24'}
      className={props.class}
    >
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M10.412 4.70711C10.0215 4.31658 9.38832 4.3166 8.9978 4.70713C8.60894 5.09599 8.60702 5.72588 8.99353 6.11708L14.8274 12.0218L8.99704 17.884C8.60896 18.2742 8.60982 18.9049 8.99896 19.294C9.38885 19.6839 10.021 19.6839 10.4109 19.294L16.9978 12.7071C17.3883 12.3166 17.3883 11.6834 16.9978 11.2929L10.412 4.70711Z'
        fill='white'
      />
    </svg>
  );
};
