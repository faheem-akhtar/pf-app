import { Fragment } from 'react';

import { domClassMerge } from 'helpers/dom/class-merge';

import styles from './input-base.module.scss';
import { InputBaseTemplatePropsBaseInterface } from './template-props-base.interface';

/**
 * Text fields let users enter and edit text.
 *
 * Design: https://www.figma.com/file/gRARY1Vi4W2Ow1vRLw02am/PF_Consumer-Web-Kit?node-id=229%3A681
 */
export const InputBaseTemplate = (props: InputBaseTemplatePropsBaseInterface): JSX.Element => {
  const {
    type = 'text',
    textarea = false,
    floatPlaceholder = true,
    value,
    disabled = false,
    errorText,
    focus = false,
    placeholder,
    helperText,
    prefix,
    maxLength,
    className,
    inputClassName,
    onChange,
    onFocus,
    onBlur,
  } = props;
  const InputElement = (textarea ? 'textarea' : 'input') as 'input';
  const isPlaceholderFloating = floatPlaceholder && !!value;

  return (
    <Fragment>
      <div
        className={domClassMerge(styles.container, className, {
          [styles[`container--disabled`]]: disabled,
          [styles[`container--error`]]: !!errorText,
          [styles[`container--focused`]]: focus,
          [styles[`container--textarea`]]: textarea,
        })}
      >
        {prefix}

        <div className={styles.content}>
          <InputElement
            id={props.id}
            name={props.name}
            aria-label={props.name}
            aria-invalid={!!errorText}
            aria-errormessage={errorText}
            type={type}
            value={value}
            maxLength={maxLength}
            placeholder={floatPlaceholder ? undefined : placeholder}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            className={domClassMerge(styles.input, inputClassName, {
              [styles[`input--floating`]]: isPlaceholderFloating || (floatPlaceholder && focus),
              [styles[`input--textarea`]]: textarea,
            })}
          />

          {floatPlaceholder && !!placeholder && (
            <div
              className={domClassMerge(styles.placeholder, {
                [styles[`placeholder--floating`]]: isPlaceholderFloating || (floatPlaceholder && focus),
              })}
            >
              <label htmlFor={props.id}>{placeholder}</label>
            </div>
          )}
        </div>
      </div>

      {helperText && <p className={styles.helperText}>{helperText}</p>}
      {errorText && (
        <p id={errorText} className={styles.errorText}>
          {errorText}
        </p>
      )}
    </Fragment>
  );
};
