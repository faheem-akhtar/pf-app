import { IconThickSearchTemplate } from 'components/icon/thick/search-template';
import { IconThickSmallCloseTemplate } from 'components/icon/thick/small-close-template';
import { domClassMerge } from 'helpers/dom/class-merge';
import { highlightString } from 'helpers/highlight/string';
import { useTranslation } from 'helpers/translation/hook';

import { MultiSelectionAutocompleteChipTemplate } from './chip/template';
import { multiSelectionAutocompleteComputeInactiveRenderValue } from './compute-inactive-render-value';
import styles from './multi-selection-autocomplete.module.scss';
import { MultiSelectionAutocompleteTemplatePropsInterface } from './template-props.interface';

export const MultiSelectionAutocompleteTemplate = <T extends unknown>(
  props: MultiSelectionAutocompleteTemplatePropsInterface<T>
): JSX.Element => {
  const { t } = useTranslation();

  const renderInput = (): JSX.Element => (
    <input
      value={props.inputValue}
      className={domClassMerge(styles.input, { [styles.input_not_empty]: !!props.inputValue })}
      data-testid='MultiSelectionInput'
      placeholder={props.placeholder}
      ref={props.inputRef}
      onInput={props.onInputChange}
      onFocus={props.onInputFocus}
      onKeyDown={props.onInputKeyDown}
      onKeyPress={props.onInputKeyPress}
      autoComplete='off'
    />
  );

  const renderChips = (): JSX.Element => (
    <>
      {multiSelectionAutocompleteComputeInactiveRenderValue({ ...props, t }).map(({ item, title, isMore }, index) => {
        return (
          <MultiSelectionAutocompleteChipTemplate
            className={props.chipClassName}
            key={index}
            title={title}
            onCrossClick={(): void => props.onItemCrossClick(item, isMore)}
          />
        );
      })}
      <div className={styles.add_label}>{t('multi-location-selector/add')}</div>
    </>
  );

  const renderValueSection = (): JSX.Element | void => {
    if (!props.value.length) {
      return;
    }

    return (
      <div className={styles.selected_value_container}>
        {props.value.map((item, index) => {
          return (
            <div key={index} className={styles.chip_wrapper_when_opened}>
              <MultiSelectionAutocompleteChipTemplate
                key={index}
                className={props.chipClassName}
                title={props.getChipTitle(item)}
                onCrossClick={(): void => props.onItemCrossClick(item)}
              />
            </div>
          );
        })}
      </div>
    );
  };

  const renderSuggestionsSection = (): JSX.Element | void => {
    const shouldRenderNoSuggestions = props.inputValue && !props.suggestions.length && props.renderNoSuggestions;
    if (!props.suggestions.length && !shouldRenderNoSuggestions) {
      return;
    }

    return (
      <div className={styles.suggestions_container}>
        {shouldRenderNoSuggestions ? (
          <div className={styles.no_suggestions}>{props.renderNoSuggestions(props.inputValue)}</div>
        ) : null}
        {props.suggestions.map((item, index) => {
          return (
            <button
              className={domClassMerge(styles.suggestion, {
                [styles.suggestion_selected]: index === props.selectedItemIndex,
              })}
              key={index}
              onClick={(e): void => {
                e.stopPropagation();
                props.suggestionOnClick(item);
              }}
            >
              {props.suggestionIcon && <span className={styles.suggestion_icon}>{props.suggestionIcon}</span>}
              <span
                className={styles.suggestion_text}
                dangerouslySetInnerHTML={{
                  __html: highlightString(props.inputValue, props.getTitle(item)),
                }}
              />
            </button>
          );
        })}
      </div>
    );
  };

  const renderDropDown = (): JSX.Element | void => {
    if (!props.suggestions.length && !props.inputValue && !props.value.length) {
      return;
    }

    return (
      <div className={styles.dropdown}>
        <div className={styles.separator} />
        {renderValueSection()}
        {!props.isLoading && renderSuggestionsSection()}
      </div>
    );
  };

  const renderChipsOnTheBottom = (): React.ReactNode => {
    if (!props.value.length) {
      return;
    }

    return (
      <div className={styles.selected_value_container_on_the_bottom}>
        {props.value.map((item, index) => {
          return (
            <div
              key={index}
              className={domClassMerge(styles.chip_wrapper_when_opened, styles.chip_wrapper_on_the_bottom)}
            >
              <MultiSelectionAutocompleteChipTemplate
                key={index}
                className={props.chipClassName}
                title={props.getChipTitle(item)}
                onCrossClick={(): void => props.onItemCrossClick(item)}
              />
            </div>
          );
        })}
      </div>
    );
  };

  const isActiveOrNoValue = props.isActive || !props.value.length;

  const calcContainerExtraClasses = (): string[] => {
    if (props.chipsOnTheBottom) {
      return [styles.container_on_the_bottom];
    }

    const parts = [];

    if (props.isActive) {
      parts.push(styles.container_active);
    } else {
      if (props.value.length === 1) {
        parts.push(styles.container_not_active_single_element);
      }
      if (props.value.length > 1) {
        parts.push(styles.container_not_active_multiple_elements);
      }
    }

    return parts;
  };

  return (
    <div ref={props.rootRef} onClick={props.onRootClick} onKeyDown={props.onRootKeyDown} className={styles.root}>
      <div className={domClassMerge(styles.container, props.className, ...calcContainerExtraClasses())}>
        {isActiveOrNoValue && !props.chipsOnTheBottom && <IconThickSearchTemplate class={styles.search_icon} />}
        {(isActiveOrNoValue || props.chipsOnTheBottom ? renderInput : renderChips)()}
        {props.isActive && props.inputValue && (
          <button className={styles.input_cross_button} onClick={props.onInputCrossButtonClick}>
            <IconThickSmallCloseTemplate class={styles.input_cross_icon} />
          </button>
        )}
        {props.isActive && !props.chipsOnTheBottom && renderDropDown()}
      </div>
      {props.chipsOnTheBottom && renderChipsOnTheBottom()}
      <input ref={props.hiddenInputRef} className={styles.hidden_input} />
    </div>
  );
};
