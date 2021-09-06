export interface CallingAgentModalComponentPropsInterface {
  openRef: React.MutableRefObject<() => void>;
  closeRef?: React.MutableRefObject<() => void>;
  propertyId: string;
  referenceId: string;
}
