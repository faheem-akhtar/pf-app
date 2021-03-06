import { useContext } from 'react';

import { ErrorMessageComponent } from 'components/error-message/component';
import { FiltersContext } from 'components/filters/context';
import { ReCaptchaComponent } from 'components/re-captcha/component';
import { configPropertyReportAttachmentSizeLimit } from 'config/property/report-attachment-size-limit';
import { configPropertyReportMessageMinCharCount } from 'config/property/report-message-min-char-count';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { PropertyReportReasonEnum } from 'enums/property/report/reason.enum';
import { PropertyReportUserTypeEnum } from 'enums/property/report/user-type.enum';
import { categoryIdIsSale } from 'helpers/category-id/is-sale';
import { useForm } from 'helpers/form/hook';
import { formValidatorFileMime } from 'helpers/form/validator/file-mime';
import { formValidatorFileSize } from 'helpers/form/validator/file-size';
import { formValidatorMinLength } from 'helpers/form/validator/min-length';
import { formValidatorRequired } from 'helpers/form/validator/required';
import { userReportCategory } from 'helpers/user/report-category';
import { ButtonComponentTypeEnum } from 'library/button/component-type.enum';
import { ButtonSizeEnum } from 'library/button/size.enum';
import { ButtonTemplate } from 'library/button/template';
import { InputBaseComponent } from 'library/input/base/component';
import { SelectFieldTemplate } from 'library/select-field/template';

import { FORM_ACCEPTABLE_FILE_TYPES } from './acceptable-file-types.constant';
import { REPORT_FORM_ADDITIONAL_USER_TYPES } from './additional-user-types.constant';
import { PropertyReportFormComponentPropsInterface } from './component-props.interface';
import styles from './property-report-form.module.scss';
import { REPORT_FORM_REASONS } from './reasons.constant';

export const PropertyReportFormComponent = ({
  t,
  onClickSubmit,
  loading,
  errorMessage,
}: PropertyReportFormComponentPropsInterface): JSX.Element => {
  const filtersCtx = useContext(FiltersContext);

  const [form, setFormField] = useForm({
    reasonType: {
      defaultValue: '',
      validators: [formValidatorRequired(t('report-modal/empty-reason'))],
    },
    userType: {
      defaultValue: '',
      validators: [formValidatorRequired(t('report-modal/empty-user-type'))],
    },
    attachment: {
      defaultValue: null,
      validators: [
        formValidatorFileMime(
          t('report-modal/file-type-error', {
            formats: FORM_ACCEPTABLE_FILE_TYPES.map((format) => format.replace(/.*?\//, '')).join(', '),
          }),
          FORM_ACCEPTABLE_FILE_TYPES
        ),
        formValidatorFileSize(t('validation/max-file-size-error'), configPropertyReportAttachmentSizeLimit),
      ],
    },
    message: {
      defaultValue: '',
      validators: [
        formValidatorRequired(t('validation/empty-message')),
        formValidatorMinLength(
          t('report-modal/not-valid-message-length', { 'min-length': configPropertyReportMessageMinCharCount }),
          configPropertyReportMessageMinCharCount
        ),
      ],
    },
  });

  const categoryId = filtersCtx.value[FiltersParametersEnum.categoryId];

  return (
    <form
      onSubmit={(e): void => {
        e.preventDefault();
        if (!form.isValid()) {
          return;
        }
        onClickSubmit({
          reason_id: form.fields.reasonType.value as PropertyReportReasonEnum,
          reporter_type: form.fields.userType.value as PropertyReportUserTypeEnum,
          email: '',
          message: form.fields.message.value as string,
          attachment:
            form.fields.userType.value === PropertyReportUserTypeEnum.agent &&
            form.fields.attachment.value &&
            form.fields.attachment.error === ''
              ? (form.fields.attachment.value as File)
              : undefined,
        });
      }}
    >
      <SelectFieldTemplate
        onChange={(value): void => {
          setFormField('reasonType', value);
        }}
        value={form.fields.reasonType.value}
        errorText={form.fields.reasonType.error}
        className={styles.field}
        options={[
          {
            label: t('report-modal/select-reason'),
            value: '',
          },
          ...REPORT_FORM_REASONS.map(({ label, value }) => ({
            value,
            label: t(label),
          })),
        ]}
      />
      <SelectFieldTemplate
        onChange={(value): void => {
          setFormField('userType', value);
        }}
        value={form.fields.userType.value}
        errorText={form.fields.userType.error}
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
          ...REPORT_FORM_ADDITIONAL_USER_TYPES.map(({ label, value }) => ({
            value,
            label: t(label),
          })),
        ]}
      />
      {form.fields.userType.value === PropertyReportUserTypeEnum.agent && (
        <div className={styles.field}>
          <span className={styles.text}>
            {t('report-modal/max-file-size', { size: configPropertyReportAttachmentSizeLimit })}
          </span>
          <input
            data-testid='property-report-upload-file'
            type='file'
            name='attachment'
            onChange={(event): void => {
              const { files } = event.target;
              if (files) {
                setFormField('attachment', files[0]);
              }
            }}
          />
          {form.fields.attachment.error && <p className={styles.field__error}>{form.fields.attachment.error}</p>}
        </div>
      )}
      <div className={styles.messageContainer}>
        <span>{t('report-modal/additional-messages')}</span>
        <InputBaseComponent
          value={form.fields.message.value as string}
          className={styles.message}
          textarea
          onChange={(value): void => {
            setFormField('message', value);
          }}
          placeholder={t('report-modal/additional-messages-placeholder')}
          floatPlaceholder={false}
          errorText={form.fields.message.error}
        />
      </div>
      {errorMessage && <ErrorMessageComponent message={errorMessage} />}
      <ButtonTemplate
        type='submit'
        loading={loading}
        className={styles.send}
        size={ButtonSizeEnum.regular}
        componentType={ButtonComponentTypeEnum.primary}
        fullWidth
      >
        {`${t('send')} ${t('cta-report')}`}
      </ButtonTemplate>
      <ReCaptchaComponent />
    </form>
  );
};
