import { useContext, useRef, useState } from 'react';

import { ErrorMessageComponent } from 'components/error-message/component';
import { FiltersContext } from 'components/filters/context';
import { formMakeValidator } from 'components/form/make-validator';
import { ReCaptchaComponent } from 'components/re-captcha/component';
import { configPropertyReportAttachmentSizeLimit } from 'config/property/report-attachment-size-limit';
import { configPropertyReportMessageMinCharCount } from 'config/property/report-message-min-char-count';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { PropertyReportReasonEnum } from 'enums/property/report/reason.enum';
import { PropertyReportUserTypeEnum } from 'enums/property/report/user-type.enum';
import { categoryIdIsSale } from 'helpers/category-id/is-sale';
import { userReportCategory } from 'helpers/user/report-category';
import { validationMinLength } from 'helpers/validation/min-length';
import { validationRequired } from 'helpers/validation/required';
import { ButtonComponentTypeEnum } from 'library/button/component-type.enum';
import { ButtonSizeEnum } from 'library/button/size.enum';
import { ButtonTemplate } from 'library/button/template';
import { InputBaseComponent } from 'library/input/base/component';
import { SelectFieldTemplate } from 'library/select-field/template';

import { propertyReportFormAdditionalUserTypes } from './additional-user-types';
import { PropertyReportFormComponentPropsInterface } from './component-props.interface';
import { PropertyReportFormFieldsEnum } from './fields.enum';
import styles from './property-report-form.module.scss';
import { propertyReportFormReasons } from './reasons';

export const PropertyReportFormComponent = ({
  t,
  onClickSubmit,
  loading,
  errorMessage,
}: PropertyReportFormComponentPropsInterface): JSX.Element => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const filtersCtx = useContext(FiltersContext);

  const [reasonType, setReasonType] = useState<PropertyReportReasonEnum | ''>('');
  const [userType, setUserType] = useState<PropertyReportUserTypeEnum | ''>('');
  const [attachment, setAttachment] = useState<File>();
  const [message, setMessage] = useState<string>('');

  const [errors, setErrors] = useState<Partial<Record<PropertyReportFormFieldsEnum, string>>>({});
  const [validators] = useState(() => ({
    [PropertyReportFormFieldsEnum.reason]: [validationRequired(t('report-modal/empty-reason'))],
    [PropertyReportFormFieldsEnum.user]: [validationRequired(t('report-modal/empty-user-type'))],
    [PropertyReportFormFieldsEnum.message]: [
      validationRequired(t('validation/empty-message')),
      validationMinLength(t('report-modal/not-valid-message-length'), configPropertyReportMessageMinCharCount),
    ],
  }));

  const validate = formMakeValidator(errors, setErrors, validators);

  const categoryId = filtersCtx.value[FiltersParametersEnum.categoryId];

  return (
    <form
      onSubmit={(e): void => {
        e.preventDefault();
        if (
          !validate({
            [PropertyReportFormFieldsEnum.reason]: reasonType,
            [PropertyReportFormFieldsEnum.user]: userType,
            [PropertyReportFormFieldsEnum.message]: message,
          })
        ) {
          onClickSubmit({
            reason_id: reasonType as PropertyReportReasonEnum,
            reporter_type: userType as PropertyReportUserTypeEnum,
            email: '',
            message,
            attachment,
          });
        }
      }}
    >
      <SelectFieldTemplate
        onChange={(value): void => {
          validate({ [PropertyReportFormFieldsEnum.reason]: value });
          setReasonType(value);
        }}
        value={reasonType}
        error={!!errors[PropertyReportFormFieldsEnum.reason]}
        errorText={errors[PropertyReportFormFieldsEnum.reason]}
        className={styles.field}
        options={[
          {
            label: t('report-modal/select-reason'),
            value: '',
          },
          ...propertyReportFormReasons.map(({ label, value }) => ({
            value,
            label: t(label),
          })),
        ]}
      />
      <SelectFieldTemplate
        onChange={(value): void => {
          validate({ [PropertyReportFormFieldsEnum.user]: value });
          setUserType(value as PropertyReportUserTypeEnum);
        }}
        value={userType}
        error={!!errors[PropertyReportFormFieldsEnum.user]}
        errorText={errors[PropertyReportFormFieldsEnum.user]}
        className={styles.field}
        options={[
          {
            label: t('report-modal/select-user-type'),
            value: '',
          },
          {
            label: t(`user-${categoryIdIsSale(categoryId) ? 'buyer' : 'renter'}`),
            value: userReportCategory(categoryId),
          },
          ...propertyReportFormAdditionalUserTypes.map(({ label, value }) => ({
            value,
            label: t(label),
          })),
        ]}
      />
      {userType === PropertyReportUserTypeEnum.agent && (
        <div className={styles.field}>
          <span className={styles.text}>
            {t('report-modal/max-file-size', { size: configPropertyReportAttachmentSizeLimit })}
          </span>
          <input
            type='file'
            name='attachment'
            ref={fileInputRef}
            onChange={(event): void => {
              const { files } = event.target;
              if (files) {
                setAttachment(files[0]);
              }
            }}
          />
        </div>
      )}
      <div className={styles.messageContainer}>
        <span>{t('report-modal/additional-messages')}</span>
        <InputBaseComponent
          value={message}
          className={styles.message}
          textarea
          onChange={(value): void => {
            validate({ [PropertyReportFormFieldsEnum.message]: value });
            setMessage(value);
          }}
          error={!!errors[PropertyReportFormFieldsEnum.message]}
          errorText={errors[PropertyReportFormFieldsEnum.message]}
        />
      </div>
      {errorMessage && <ErrorMessageComponent message={errorMessage} />}
      <ButtonTemplate
        type='submit'
        loading={loading}
        className={styles.send}
        size={ButtonSizeEnum.small}
        componentType={ButtonComponentTypeEnum.primary}
      >
        {`${t('send')} ${t('cta-report')}`}
      </ButtonTemplate>
      <ReCaptchaComponent />
    </form>
  );
};
