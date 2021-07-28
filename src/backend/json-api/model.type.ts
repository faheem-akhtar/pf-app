import { BackendJsonApiDataInterface } from './data.interface';
import { BackendJsonApiPayloadInterface } from './payload.interface';

/**
 * Json api model
 */
export class BackendJsonApiModelType {
  /**
   * JSON API resource type (must match the backend API resource type)
   */
  public static readonly JSONAPI_TYPE: string = '__generic__';

  /**
   * JSON API resource type (must match the backend API resource type)
   */
  public jsonApiType: string = BackendJsonApiModelType.JSONAPI_TYPE;

  /**
   * List of attributes supported by the JSON API resource
   */
  public jsonApiAttributes: Array<keyof this> = [];

  /**
   * JSON API relationships
   */
  public jsonApiRelationships: Array<keyof this> = [];

  /**
   * JSON API links
   */
  public jsonApiLinks: string[] = [];

  /**
   * JSON API meta
   */
  public jsonApiMeta: string[] = [];

  /**
   * JSON API links
   */
  public links: { [key: string]: Object | string | number | void | null } = {};

  /**
   * JSON API meta
   */
  public meta: { [key: string]: Object | string | number | void | null } = {};

  /**
   * Model ID
   */
  public id: string = '';

  /**
   * Serialize a model
   *
   * @param attributes - The list of attributes to be serialized (default: all attributes)
   * @param relationships - The list of relationships to be serialized (default: all relationships)
   * @param links - The list of links to be serialized (default: all links)
   */
  public serialize(
    attributes?: Array<keyof this> | undefined,
    relationships?: Array<keyof this> | undefined,
    links?: string[] | undefined,
    meta?: string[] | undefined
  ): BackendJsonApiPayloadInterface {
    const data: BackendJsonApiDataInterface = {
      id: '',
      type: this.jsonApiType,
      attributes: {},
      relationships: {},
      links: {},
      meta: {},
    };

    const payload: BackendJsonApiPayloadInterface = {
      data,
    };

    if (attributes === undefined) {
      attributes = this.jsonApiAttributes;
    }

    if (relationships === undefined) {
      relationships = this.jsonApiRelationships;
    }

    if (links === undefined) {
      links = this.jsonApiLinks;
    }

    if (meta === undefined) {
      meta = this.jsonApiMeta;
    }

    if (this.id) {
      data.id = this.id;
    }

    if (attributes.length !== 0) {
      data.attributes = {};
    }

    if (relationships.length !== 0) {
      data.relationships = {};
    }

    if (links.length !== 0) {
      data.links = {};
    }

    if (meta.length !== 0) {
      data.meta = {};
    }

    // Attributes
    attributes.forEach((key) => (data.attributes[key as string] = this[key]));

    // Links
    links.forEach((key: string) => (data.links[key] = (this.links[key] as string) || ''));

    // Meta
    meta.forEach((key: string) => (data.meta[key] = this.meta[key] || ''));

    // Relationships
    relationships.forEach((key) => {
      // Relationship does not exist
      if (!this[key]) {
        data.relationships[key as string] = {
          data: null,
        };

        // Relationship is an array
      } else if ((this[key] as Object).constructor === Array) {
        // Using 'any' because we have an array of 'anything'
        data.relationships[key as string] = {
          data: (this[key] as unknown as Array<BackendJsonApiModelType>).map((model: BackendJsonApiModelType) => {
            return {
              type: model.jsonApiType,
              id: model.id,
            };
          }) as BackendJsonApiDataInterface[],
        };

        // Relationship is an object
      } else {
        const model = this[key] as unknown as BackendJsonApiModelType;

        data.relationships[key as string] = {
          data: {
            type: model.jsonApiType,
            id: model.id,
            attributes: {},
            relationships: {},
            links: {},
            meta: {},
          },
        };
      }
    });

    // Set payload data
    payload.data = data;

    return payload;
  }

  /**
   * Set/add an attribute to a model
   *
   * @param attrName - The name of the attribute
   * @param value - The value of the attribute (using 'any' because it could be anything, number, object, instance...)
   */
  public setAttribute<V>(attrName: keyof this, value: V): void {
    if (this[attrName] === undefined && this.jsonApiAttributes.indexOf(attrName) === -1) {
      this.jsonApiAttributes.push(attrName);
    }

    // Set attribute
    (this[attrName] as unknown) = value;
  }

  /**
   * Set/add a relationships to a model
   *
   * @param relName -The name of the relationship
   * @param models - The linked JSON API model(s)
   */
  public setRelationship(
    relName: keyof this,
    models: BackendJsonApiModelType | BackendJsonApiModelType[] | null
  ): void {
    if (this[relName] === undefined && this.jsonApiRelationships.indexOf(relName) === -1) {
      this.jsonApiRelationships.push(relName);
    }

    (this[relName] as unknown) = models;
  }
}
