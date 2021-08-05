import { IconTemplatePropsInterface } from './template-props.interface';

export const IconThickBuildingCompletionTemplate = (props: IconTemplatePropsInterface): JSX.Element => {
  const { clipped = false } = props;

  return (
    <svg
      viewBox={clipped ? '0 0 20 16' : '0 0 24 24'}
      height={clipped ? undefined : '24'}
      width={clipped ? undefined : '24'}
      className={props.class}
    >
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M10.7839 6.02901C10.5171 6.10048 10.3588 6.37465 10.4303 6.64138L11.4656 10.5051C11.5371 10.7718 11.8112 10.9301 12.078 10.8586L18.1873 9.22163C18.4541 9.15016 18.6124 8.87599 18.5409 8.60926L17.5056 4.74555C17.4342 4.47882 17.16 4.32053 16.8933 4.392L10.7839 6.02901ZM12.6557 9.15093L12.138 7.21908L16.3156 6.09971L16.8332 8.03156L12.6557 9.15093ZM2.5 8.1253C2.5 7.84916 2.72386 7.6253 3 7.6253H9.8249V11.1252H18.0841C18.3602 11.1252 18.5841 11.349 18.5841 11.6252V14.6252H21C21.2761 14.6252 21.5 14.849 21.5 15.1252V19.1252C21.5 19.4013 21.2761 19.6252 21 19.6252H3C2.72386 19.6252 2.5 19.4013 2.5 19.1252V14.6252H5.41667V12.6253H2.5V8.1253ZM9.3249 12.6253H6.91667V14.6252H11.25V12.6253H12.75V14.6252H17.0833V12.6253H17.0841V12.6252H9.33738L9.3249 12.6253ZM8.3249 9.1253V11.1252H5.91667L5.9042 11.1253H4V9.1253H8.3249ZM5.41667 16.1252H4V18.1252H8.33334V16.1253H9.83334V18.1252H14.1667V16.1253H15.6667V18.1252H20V16.1252H18.5841H5.41667Z'
        fill='currentColor'
      />
    </svg>
  );
};
