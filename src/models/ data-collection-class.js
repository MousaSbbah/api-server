'use strict';

//create DataCollection class
class DataCollection {

  /**
   * @param  {Object} model
   */
  constructor(model) {
    this.model = model;
  }

  /**
   * @param  {String} id
   */
  read(id) {
    if (id) {
      return this.model.find({ _id: id });
    } else {
      return this.model.find({});
    }
  }
  /**
   * @param  {Object} obj
   */
  creat(obj) {
    const doc = new this.model(obj);
    return doc.save();
  }
  /**
   * @param  {String} id
   */
  delete(id) {
    return this.model.findByIdAndDelete(id);
  }
  /**
   * @param  {String} id
   * @param  {Object} obj
   */
  update(id, obj) {
    return this.model.findByIdAndUpdate(id, obj, { new: true });
  }
}


module.exports= DataCollection;
