import { ApiMakeFactoryPropsNoAuthType } from './make-factory-props-no-auth.type';
import { ApiMakeFactoryPropsRequireAuthType } from './make-factory-props-require-auth.type';

export type ApiMakeFactoryPropsType = ApiMakeFactoryPropsNoAuthType | ApiMakeFactoryPropsRequireAuthType;
