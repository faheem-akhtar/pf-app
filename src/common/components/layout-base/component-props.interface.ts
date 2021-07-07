import React from "react";

export interface LayoutBaseComponentPropsInterface {
    /**
     * Page title
     */
    pageTitle: string,

    /**
     * Children components
     */
    children: React.ReactNode;
}