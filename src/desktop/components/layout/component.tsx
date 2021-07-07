import { LayoutBaseComponent } from "common/components/layout-base/component"
import {LayoutBaseComponentPropsInterface} from "common/components/layout-base/component-props.interface";

export const LayoutComponent = ({ children, pageTitle }: LayoutBaseComponentPropsInterface) => {
    return <LayoutBaseComponent pageTitle={pageTitle}>
      <header>Desktop Header TODO-FE[TPNX-2996]</header>
      {children}
      <footer>Desktop Footer TODO-FE[TPNX-2997]</footer>
    </LayoutBaseComponent>
}