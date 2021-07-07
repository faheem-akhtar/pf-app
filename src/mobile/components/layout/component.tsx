import { LayoutBaseComponent } from "common/components/layout-base/component"
import {LayoutBaseComponentPropsInterface} from "common/components/layout-base/component-props.interface";


export const LayoutComponent = ({ children, pageTitle }: LayoutBaseComponentPropsInterface) => {
    return <LayoutBaseComponent pageTitle={pageTitle}>
      <header>Mobile Header TODO-FE[TPNX-2973]</header>
      {children}
      <footer>Mobile Footer TODO-FE[TPNX-2974]</footer>
    </LayoutBaseComponent>
}