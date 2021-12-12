import { PropertyCardTemplatePropsType } from 'components/property-card/template-props.type';

export interface PropertyCardVariantsTemplatePropsBaseInterface
  extends Omit<
    PropertyCardTemplatePropsType,
    | 'loading'
    | 'gallery'
    | 'saved'
    | 'showBanners'
    | 'onSaveButtonClick'
    | 'onMenuButtonClick'
    | 'onGalleryIndexChange'
    | 'onGalleryClick'
  > {
  /**
   *
   */
  templates: {
    [key: string]: JSX.Element;
  };
}
