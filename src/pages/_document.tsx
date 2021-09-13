import { DocumentContext, DocumentInitialProps } from 'next/dist/next-server/lib/utils';
import Document, { Head, Html, Main, NextScript } from 'next/document';

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
          <div id='modal-root' />
          <div id='snackbar-root' />
        </body>
      </Html>
    );
  }
}

export default MainDocument;
