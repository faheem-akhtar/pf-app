import { BackendJsonApiDataInterface } from './data.interface';
import { BackendJsonApiModelType } from './model.type';
import { BackendJsonApiPayloadInterface } from './payload.interface';

/**
 * ApiJsonStore minimal implementation to allow the call of the sync method
 */
class ApiJsonStore {
  /**
   * Cached values in memory
   */
  private cache: {
    [key: string]: {
      model: {
        [key: string]: BackendJsonApiModelType;
      };
      order: string[];
    };
  } = {};

  /**
   * Add a model to the store
   *
   * @param model The model to add
   */
  private add(model: BackendJsonApiModelType): void {
    if (!this.cache[model.jsonApiType]) {
      this.cache[model.jsonApiType] = {
        model: {},
        order: [],
      };
    }

    this.cache[model.jsonApiType].model[model.id] = model;
    this.cache[model.jsonApiType].order.push(model.id);
  }

  /**
   * Initialize a model and returns it
   *
   * @param jsonApiType
   * @param id
   */
  private initModel(jsonApiType: string, id: string): BackendJsonApiModelType {
    // Model exists
    if (this.cache[jsonApiType] && this.cache[jsonApiType].model[id]) {
      return this.cache[jsonApiType].model[id];
    }

    const model: BackendJsonApiModelType = new BackendJsonApiModelType();

    model.jsonApiType = jsonApiType;

    // Set ID
    model.id = id;

    // Keep new model in cache
    this.add(model);

    return model;
  }

  /**
   * Synchronize a record with the store
   *
   * @param record
   */
  private syncRecord(record: BackendJsonApiDataInterface): BackendJsonApiModelType {
    // Find or instantiate model
    const model = this.initModel(record.type, record.id);

    // Attributes hydrator
    if (record.attributes) {
      Object.keys(record.attributes).forEach((key: string) => {
        // key is an attribute of the class of model

        model.setAttribute(key as keyof BackendJsonApiModelType, record.attributes[key]);
      });
    }

    // Relationships hydrator
    if (record.relationships) {
      Object.keys(record.relationships).forEach((key: string) => {
        // key is an attribute of the class of model

        model.jsonApiRelationships.push(key as keyof BackendJsonApiModelType);

        const relationshipData = record.relationships[key].data;

        // Relationship is an object or array
        if (!!relationshipData && typeof relationshipData === 'object') {
          // Relationship is an array
          if (relationshipData.constructor === Array) {
            model.setRelationship(
              key as keyof BackendJsonApiModelType,
              (<BackendJsonApiDataInterface[]>relationshipData).map((rec) => this.initModel(rec.type, rec.id))
            );

            // Relationship is an object
          } else {
            const rec = <BackendJsonApiDataInterface>relationshipData;

            model.setRelationship(key as keyof BackendJsonApiModelType, this.initModel(rec.type, rec.id));
          }
          // Relationship is invalid
        } else {
          model.setRelationship(key as keyof BackendJsonApiModelType, null);
        }
      });
    }

    // Links hydrator
    if (record.links) {
      model.links = {};

      Object.keys(record.links).forEach((key: string) => {
        // key is an attribute of the class of model

        model.jsonApiLinks.push(key);
        model.links[key] = record.links[key];
      });
    }

    // Meta hydrator
    if (record.meta) {
      model.meta = {};

      Object.keys(record.meta).forEach((key) => {
        model.jsonApiMeta.push(key);
        model.meta[key] = record.meta[key];
      });
    }

    return model;
  }

  /**
   * Sync a JSONAPI-compliant payload with the store and return any metadata included in the payload
   *
   * @param payload The JSONAPI payload
   */
  private syncWithMeta(payload: BackendJsonApiPayloadInterface): {
    data: BackendJsonApiModelType | BackendJsonApiModelType[] | null;
    meta: object | null;
  } {
    let data = null;

    // Sync included records
    if (payload.included) {
      payload.included.map((record) => this.syncRecord(record));
    }

    if (payload.data) {
      if (payload.data.constructor === Array) {
        data = (<BackendJsonApiDataInterface[]>payload.data).map((record) => this.syncRecord(record));
      } else {
        data = this.syncRecord(<BackendJsonApiDataInterface>payload.data);
      }
    }

    return {
      data,
      meta: payload.meta ? payload.meta : null,
    };
  }

  /**
   * Sync a JSONAPI-compliant payload with the store.
   *
   * @param payload
   */
  public sync<R>(payload: BackendJsonApiPayloadInterface): R {
    return this.syncWithMeta(payload).data as unknown as R;
  }
}

export const backendJsonApiSync = <R>(json: BackendJsonApiPayloadInterface): R => new ApiJsonStore().sync(json);
