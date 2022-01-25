import { DocumentContext, DocumentInitialProps } from 'next/dist/next-server/lib/utils';
import Document, { Head, Html, Main, NextScript } from 'next/document';

import { APP_MODAL_ROOT_ELEMENT_ID } from 'constants/app/modal-root-element-id.constant';
import { APP_SNACKBAR_ROOT_ELEMENT_ID } from 'constants/app/snackbar-root-element-id.constant';

class MainDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render(): JSX.Element {
    return (
      <Html dir={this.props.locale === 'ar' ? 'rtl' : 'ltr'}>
        <Head />
        <body>
          <Main />
          <NextScript />
          <div id={APP_MODAL_ROOT_ELEMENT_ID} />
          <div id={APP_SNACKBAR_ROOT_ELEMENT_ID} />
        </body>
      </Html>
    );
  }
}

export default MainDocument;
