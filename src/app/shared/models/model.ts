
export abstract class Model {
  constructor (data?: Model) {
    if (data) {
      this.assimilate(data);
    }

    this.init();
  }

  /**
   * Called after an object has been constructed.
   */
   public abstract init (): void;

  /**
   * Clones and assimilates the given data, where it's structure matches that
   * of the current object.
   *
   * @param data
   * @returns {Model}
   */
  public assimilate (data: any): Model {
    let cloned = JSON.parse(JSON.stringify(data));

    for (let propertyName of Object.keys(cloned)) {
      this[propertyName] = cloned[propertyName];
    }

    return this;
  }

  public injectRelatedData (callback): Model {
    callback.call(this, this);

    return this;
  }

  protected setBlankDataStructure (data: any): Model {
    Object.assign(this, data);

    return this;
  }

  /**
   * Returns the raw JSON data of this model.
   *
   * @returns {any}
   */
  public toRawData (): any {
    return this.toJSON();
  }

  /**
   * Returns the JSON data representation of this model, does not include _meta data.
   *
   * @returns {any}
   */
  public toJSON (): any {
    let stringData = JSON.stringify(this.objectTreeToRawData(this));
    let data = JSON.parse(stringData);

    return data;
  }

  /**
   * Traverses the model's properties and converts them to json data.
   *
   * @param {Object} object
   *
   * @returns {Object}
   */
  private objectTreeToRawData (object: object): object {
    let result = {};

    for (let propertyName of Object.keys(object)) {
      let property = object[propertyName];

      if (propertyName === '_meta' || typeof property === 'function') {
        continue;
      }

      result[propertyName] = property;
    }

    return result;
  }

  public clone (): Model {
    // This function bypasses a typescript error condition, where you can not
    // use an abstract model as a constructor.
    let createClone = (thing: any): any => {
      let clone = this.toJSON();

      return clone;
    };

    return createClone(this);
  }
}
