/* eslint-disable pf-rules/export-name-validation */

import { AppearOnScrollComponent } from './component';
import styles from './component.stories.module.scss';
import { AppearOnScrollComponentPropsInterface } from './component-props.interface';

export default {
  title: 'Library/Appear on scroll',
  component: AppearOnScrollComponent,
  argTypes: {
    onExiting: { action: 'onExiting' },
    onHidden: { action: 'onHidden' },
    onEntering: { action: 'onEntering' },
    onVisible: { action: 'onVisible' },
  },
};

export const Basic = (props: AppearOnScrollComponentPropsInterface): JSX.Element => {
  return (
    <div>
      <div
        style={{
          height: '200vh',
          marginTop: '20px',
          width: '95vw',
          padding: '10px',
          border: '1px solid',
          borderRadius: '5px',
          position: 'relative',
        }}
      >
        This is just an element to illustrate what happens when there is scroll present
        <div style={{ position: 'absolute', top: '50vh' }}>
          Element will appear and disappear after passing this text
          <AppearOnScrollComponent {...props}>{props.children}</AppearOnScrollComponent>
        </div>
      </div>
    </div>
  );
};

Basic.args = {
  className: styles.example_component,
  children: 'Custom content',
};
