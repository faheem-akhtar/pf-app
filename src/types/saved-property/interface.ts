export interface SavedPropertyInterface {
  type: 'saved_property';
  id: string;
  attributes: {
    date_insert: {
      date: string;
      timezone: string;
      timezone_type: string;
    };
    property_id: number;
    save_date: string;
  };
}
