import { LayoutComponent as CommonLayoutComponent } from "../../common/layout/component"
import { LayoutComponentPropsInterface } from "./component-props.interface"


export const LayoutComponent = ({ children, pageTitle }: LayoutComponentPropsInterface) => {
    return <CommonLayoutComponent pageTitle={pageTitle}>
      <header>Header TODO-FE[TPNX-2973]</header>
      {children}
      <footer>Footer TODO-FE[TPNX-2974]</footer>
    </CommonLayoutComponent>
}