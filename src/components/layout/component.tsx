import Head from 'next/head'
import { LayoutComponentPropsInterface } from './component-props.interface'

export const LayoutComponent = ({ children, pageTitle }: LayoutComponentPropsInterface) => {
    return <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" type="image/png" sizes="32x32" href="static/favicon/32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="static/favicon/16x16.png" />
        {/* Do not render telephone numbers as links */}
        <meta name="format-detection" content="telephone=no" />
      </Head>
      {children}
    </>
}