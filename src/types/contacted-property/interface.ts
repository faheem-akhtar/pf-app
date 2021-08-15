export interface ContactedPropertyInterface {
  type: 'contacted_property';
  id: string;
  attributes: {
    contact_type: 'EMAIL' | 'CALL';
    property_id: number;
    save_date: string;
  };
}
