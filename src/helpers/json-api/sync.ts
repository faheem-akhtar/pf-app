import { JsonApiDataInterface } from './data.interface';
import { JsonApiModel } from './model';
import { JsonApiPayloadInterface } from './payload.interface';

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
        [key: string]: JsonApiModel;
      };
      order: string[];
    };
  } = {};

  /**
   * Add a model to the store
   *
   * @param model The model to add
   */
  private add(model: JsonApiModel): void {
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
  private initModel(jsonApiType: string, id: string): JsonApiModel {
    // Model exists
    if (this.cache[jsonApiType] && this.cache[jsonApiType].model[id]) {
      return this.cache[jsonApiType].model[id];
    }

    const model: JsonApiModel = new JsonApiModel();

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
  private syncRecord(record: JsonApiDataInterface): JsonApiModel {
    // Find or instantiate model
    const model = this.initModel(record.type, record.id);

    // Attributes hydrator
    if (record.attributes) {
      Object.keys(record.attributes).forEach((key: string) => {
        // key is an attribute of the class of model

        model.setAttribute(key as keyof JsonApiModel, record.attributes[key]);
      });
    }

    // Relationships hydrator
    if (record.relationships) {
      Object.keys(record.relationships).forEach((key: string) => {
        // key is an attribute of the class of model

        model.jsonApiRelationships.push(key as keyof JsonApiModel);

        const relationshipData = record.relationships[key].data;

        // Relationship is an object or array
        if (!!relationshipData && typeof relationshipData === 'object') {
          // Relationship is an array
          if (relationshipData.constructor === Array) {
            model.setRelationship(
              key as keyof JsonApiModel,
              (<JsonApiDataInterface[]>relationshipData).map((rec) => this.initModel(rec.type, rec.id))
            );

            // Relationship is an object
          } else {
            const rec = <JsonApiDataInterface>relationshipData;

            model.setRelationship(key as keyof JsonApiModel, this.initModel(rec.type, rec.id));
          }
          // Relationship is invalid
        } else {
          model.setRelationship(key as keyof JsonApiModel, null);
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
  private syncWithMeta(payload: JsonApiPayloadInterface): {
    data: JsonApiModel | JsonApiModel[] | null;
    meta: object | null;
  } {
    let data = null;

    // Sync included records
    if (payload.included) {
      payload.included.map((record) => this.syncRecord(record));
    }

    if (payload.data) {
      if (payload.data.constructor === Array) {
        data = (<JsonApiDataInterface[]>payload.data).map((record) => this.syncRecord(record));
      } else {
        data = this.syncRecord(<JsonApiDataInterface>payload.data);
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
  public sync<R>(payload: JsonApiPayloadInterface): R {
    return this.syncWithMeta(payload).data as unknown as R;
  }
}

export const jsonApiSync = <R>(json: JsonApiPayloadInterface): R => new ApiJsonStore().sync(json);
