import { LayoutBaseComponent } from "../base/component";
import { LayoutMobileComponentPropsInterface } from "./component-props.interface";

export const LayoutMobileComponent = ({ children, pageTitle }: LayoutMobileComponentPropsInterface) => {
    return <LayoutBaseComponent pageTitle={pageTitle}>
      <header>Header TODO-FE[TPNX-2973]</header>
      {children}
      <footer>Footer TODO-FE[TPNX-2974]</footer>
    </LayoutBaseComponent>
}