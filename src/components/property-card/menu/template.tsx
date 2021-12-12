import { FunctionComponent } from 'react';

import {
  IconSolidFavoriteTemplate,
  IconThickFavoriteTemplate,
  IconThinFavoriteTemplate,
  IconThinMenuTemplate,
} from 'components/icon';
import { domClassMerge } from 'helpers/dom/class-merge';

import styles from '../property-card.module.scss';
import { propertyCardVariantsModernIsActive } from '../variants/modern/is-active';
import { PropertyCardMenuTemplatePropsInterface } from './template-props.interface';

export const PropertyCardMenuTemplate: FunctionComponent<PropertyCardMenuTemplatePropsInterface> = ({
  cardType,
  saved,
  onSaveButtonClick,
  onMenuButtonClick,
}) => {
  const FavoriteIcon = saved
    ? IconSolidFavoriteTemplate
    : propertyCardVariantsModernIsActive(cardType)
    ? IconThickFavoriteTemplate
    : IconThinFavoriteTemplate;

  return (
    <div className={styles.menu}>
      {/*  TODO[CX-946] Extend library button types support and implement here */}
      <button
        className={domClassMerge(styles.button, styles['button--saved'])}
        onClick={onSaveButtonClick}
        data-testid='property-save-button'
      >
        <FavoriteIcon class={domClassMerge(styles['icon--saved'], { [styles['icon--saved-filled']]: saved })} />
      </button>

      <button className={domClassMerge(styles.button, styles['button--menu'])} onClick={onMenuButtonClick}>
        <IconThinMenuTemplate clipped={false} />
      </button>
    </div>
  );
};
