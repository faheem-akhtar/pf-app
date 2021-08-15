export interface ApiAuthRefreshTokenModelInterface {
  /**
   * Data
   */
  data: {
    /**
     * Attributes
     */
    attributes: {
      /**
       * Auth token
       */
      payload: string;
      /**
       * Refresh token
       */
      refresh_token: string;
    };
  };
}
