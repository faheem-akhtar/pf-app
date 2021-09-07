import { ApiFactory } from 'api/factory';

import { ApiJsonModelInterface } from 'api/json/model.interface';
import { BackendJsonApiModelType } from 'backend/json-api/model.type';
import { EmailAgentAttributesInterface } from 'types/email-agent/attributes.interface';
import { LocaleService } from 'services/locale/service';

const fetcher = ApiFactory<BackendJsonApiModelType, ApiJsonModelInterface<EmailAgentAttributesInterface>>({
  method: 'POST',
  url: 'property/email-agent',
  handledByPfWebApp: true,
});

export const apiEmailAgentFetcher = (attributes: EmailAgentAttributesInterface): Promise<void> => {
  const locale = LocaleService.getLocale();

  return fetcher({
    locale,
    postData: {
      attributes,
    },
  }).then((response) => {
    if (!response.ok) {
      // TODO-FE[CX-180] implement Datadog logging
    }
  });
};
