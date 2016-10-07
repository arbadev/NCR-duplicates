'use strict'

import Model from 'proton-mongoose-model'

export default class Duplicate extends Model {

  schema() {
    return {
      duplicate: String,
      validInput: Boolean,
      quantity: {
        type: Number,
        default: 0
      },
    }
  }

  /**
  * @method create
  * @description create a document with duplicate but if this alredy
  * exist just update its quantity
  * @param duplicate = String
  * @author Andres Barradas
  */
  static create(duplicate) {
    const validInput = /^[0-9,.]*$/.test(duplicate)
    const { UtilityService } = proton.app.services
    const record = validInput ? UtilityService.sort(duplicate) : duplicate
    const criteria = { record }
    const opts = { new: true, upsert: true }
    const update = {
      $setOnInsert: { record, validInput },
      $inc: { quantity: 1 }
    }
    return this.findOneAndUpdate(criteria, update, opts)
  }

}
