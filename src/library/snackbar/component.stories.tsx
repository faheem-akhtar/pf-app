/* eslint-disable @propertyfinder/rules/export-name-validation */

import { ReactNode, useState } from 'react';

import { ButtonComponentTypeEnum } from 'library/button/component-type.enum';
import { ButtonSizeEnum } from 'library/button/size.enum';
import { ButtonTemplate } from 'library/button/template';

import { SnackbarComponent } from './component';
import { SnackbarPropsInterface } from './props.interface';

export default {
  title: 'Library / Snackbar',
  component: SnackbarComponent,
  argTypes: {
    onClose: { action: 'onClose' },
    onOpen: { action: 'onOpen' },
    autoHideDuration: { type: 'number', description: 'Duration in seconds' },
  },
};

export const Snackbar = (props: SnackbarPropsInterface): ReactNode => {
  const [id, setId] = useState<string>();
  const [visible, setVisibility] = useState(props.visible);
  const [action, setAction] = useState<SnackbarPropsInterface['action']>();

  const createMessage = (actions?: SnackbarPropsInterface['action']): void => {
    setAction(actions);
    setId(Math.random().toString(16).replace('0.', ''));
    setVisibility(true);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '50px',
      }}
    >
      <div>
        <h3>No Action</h3>
        <ButtonTemplate
          type='button'
          componentType={ButtonComponentTypeEnum.primary}
          size={ButtonSizeEnum.regular}
          onClick={(): void => createMessage()}
        >
          Open snackbar
        </ButtonTemplate>
      </div>
      <div>
        <h3>One Action</h3>
        <ButtonTemplate
          type='button'
          componentType={ButtonComponentTypeEnum.primary}
          size={ButtonSizeEnum.regular}
          onClick={(): void => createMessage(<button onClick={(): void => setVisibility(false)}>Action 1</button>)}
        >
          Open snackbar
        </ButtonTemplate>
      </div>
      <div>
        <h3>Two Actions</h3>
        <ButtonTemplate
          type='button'
          componentType={ButtonComponentTypeEnum.primary}
          size={ButtonSizeEnum.regular}
          onClick={(): void =>
            createMessage(
              <>
                <button onClick={(): void => setVisibility(false)}>Action 1</button>
                <button onClick={(): void => setVisibility(false)}>Action 2</button>
              </>
            )
          }
        >
          Open snackbar
        </ButtonTemplate>
      </div>
      <SnackbarComponent {...props} id={id} visible={visible} action={action} onClose={props.onClose} />
    </div>
  );
};

Snackbar.args = {
  message: 'The item is successfully deleted',
  visible: false,
  autoHideDuration: 5,
} as SnackbarPropsInterface;
