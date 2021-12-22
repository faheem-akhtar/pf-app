import { BackendModelSeoContentInterface } from 'backend/model/seo/content.interface';
import { SeoContentInterface } from 'components/seo/content/interface';

export const backendApiSeoContentMapper = (data: BackendModelSeoContentInterface): SeoContentInterface | null =>
  data
    ? {
        uri: data.uri,
        title: data.title,
        description: data.description,
        canonical: data.canonical,
        primaryHeading: data.second_header,
        secondaryHeading: data.third_header,
        primaryContent: data.primary_content,
        secondaryContent: data.secondary_content,
        primaryImageUrl: data.primary_image_url,
        secondaryImageUrl: data.secondary_image_url,
        primaryImageAlt: data.primary_image_alt,
        secondaryImageAlt: data.secondary_image_alt,
        createdAt: data.created_at,
      }
    : null;
