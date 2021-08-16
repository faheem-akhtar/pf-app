import { Fragment } from 'react';

import { domClassMerge } from 'helpers/dom/class-merge';

import { TextFieldTemplatePropsBaseInterface } from './template-props-base.interface';

import styles from './text-field.module.scss';

/**
 * Text fields let users enter and edit text.
 *
 * Design: https://www.figma.com/file/gRARY1Vi4W2Ow1vRLw02am/PF_Consumer-Web-Kit?node-id=229%3A681
 */
export const TextFieldTemplate = (props: TextFieldTemplatePropsBaseInterface): JSX.Element => {
  const {
    type = 'text',
    textarea = false,
    floatPlaceholder = true,
    value,
    disabled = false,
    error = false,
    errorText,
    focus = false,
    placeholder,
    helperText,
    onChange,
    onFocus,
    onBlur,
  } = props;
  const InputElement = (textarea ? 'textarea' : 'input') as 'input';
  const isPlaceholderFloating = floatPlaceholder && !!value;

  return (
    <Fragment>
      <div
        className={domClassMerge(styles.container, {
          [styles[`container--disabled`]]: disabled,
          [styles[`container--error`]]: error,
          [styles[`container--focused`]]: focus,
        })}
      >
        <div className={styles.content}>
          <InputElement
            type={type}
            value={value}
            placeholder={floatPlaceholder ? undefined : placeholder}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            className={domClassMerge(styles.input, {
              [styles[`input--floating`]]: isPlaceholderFloating,
              [styles[`input--textarea`]]: textarea,
            })}
          />

          {floatPlaceholder && !!placeholder && (
            <div
              className={domClassMerge(styles.placeholder, {
                [styles[`placeholder--floating`]]: isPlaceholderFloating,
              })}
            >
              <label>{placeholder}</label>
            </div>
          )}
        </div>
      </div>

      {helperText && <p className={styles.helperText}>{helperText}</p>}
      {error && errorText && <p className={styles.errorText}>{errorText}</p>}
    </Fragment>
  );
};
