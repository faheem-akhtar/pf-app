import { IconTemplatePropsInterface } from './template-props.interface';

export const IconCrossTemplate = (props: IconTemplatePropsInterface): JSX.Element => {
  const { clipped = true } = props;
  return (
    <svg
      viewBox={clipped ? '7 7 10 10' : '0 0 24 24'}
      height={clipped ? undefined : '24'}
      width={clipped ? undefined : '24'}
      className={props.class}
    >
      {/* tslint:disable-next-line: max-line-length */}
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M8.34408 7.17475C8.01717 6.92057 7.54448 6.94367 7.24408 7.24408C6.91864 7.56951 6.91864 8.09715 7.24408 8.42259L10.8215 12L7.24408 15.5774C6.91864 15.9028 6.91864 16.4305 7.24408 16.7559C7.54448 17.0563 8.01717 17.0794 8.34408 16.8252L8.42259 16.7559L12 13.1785L15.5774 16.7559L15.6559 16.8252C15.9828 17.0794 16.4555 17.0563 16.7559 16.7559C17.0814 16.4305 17.0814 15.9028 16.7559 15.5774L13.1785 12L16.7559 8.42259C17.0814 8.09715 17.0814 7.56951 16.7559 7.24408C16.4555 6.94367 15.9828 6.92057 15.6559 7.17475L15.5774 7.24408L12 10.8215L8.42259 7.24408L8.34408 7.17475Z'
      />
    </svg>
  );
};
