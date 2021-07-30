import { IconTemplatePropsInterface } from './template-props.interface';

// tslint:disable:max-line-length
export const IconCloseTemplate = (props: IconTemplatePropsInterface): JSX.Element => (
  <svg viewBox='0 0 30 20' className={props.class}>
    <g>
      <rect transform='rotate(-45) translate(-14, 15)' x='5' y='1' width='25' height='3' rx='2' ry='2' />
      <rect transform='rotate(45) translate(0, -20)' x='5' y='15' width='25' height='3' rx='2' ry='2' />
    </g>
  </svg>
);
