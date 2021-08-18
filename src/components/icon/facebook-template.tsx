import { IconTemplatePropsInterface } from 'components/icon/template-props.interface';

export const IconFacebookTemplate = (props: IconTemplatePropsInterface): JSX.Element => {
  return (
    <svg viewBox='0 0 12 23' className={props.class}>
      <g id='Page-1' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
        <g id='Desktop-Log-In--' transform='translate(-190.000000, -198.000000)' fill='#FEFEFE'>
          <g id='Connect-with-Facebook' transform='translate(166.000000, 186.000000)'>
            <g id='Group'>
              <path
                d='M31.9328743,35 L27.6347873,35 L27.6347873,23.5309121 L24.7675854,23.5309121 L24.7675854,19.5782401 L27.6347873,19.5768961 L27.6301953,17.248481 C27.6301953,14.0238238 28.5045409,12.0618241 32.3028177,12.0618241 L35.4653137,12.0618241 L35.4653137,16.0151681 L33.4888657,16.0151681 C32.0096518,16.0151681 31.9385864,16.5675073 31.9385864,17.5984881 L31.9326503,19.5768961 L35.4874341,19.5768961 L35.0684897,23.529568 L31.9357303,23.5309121 L31.9328743,35 Z'
                id='Logo-Facebook'
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};
