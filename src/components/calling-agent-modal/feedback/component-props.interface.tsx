export interface CallingAgentModalFeedbackComponentPropsInterface {
  /**
   * Property ID
   */
  propertyId: string;

  /**
   * Whenever a user clicks on a feedback option
   */
  onAnswerClicked: (answer: string) => void;
}
