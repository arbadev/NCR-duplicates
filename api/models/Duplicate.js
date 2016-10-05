'use strict'

import Model from 'proton-mongoose-model'

export default class Duplicate extends Model {

  schema() {
    return {
      numberA: String,
      numberB: String,
      areDuplicates: Boolean,
      validInput: Boolean,
      quantity: {
        type: Number,
        default: 1
      },
    }
  }

  /**
  *
  *
  */
  static create(numberA, numberB) {
    const { CompareService } = proton.app.services
    const areDuplicates = CompareService.areDuplicates(numberA, numberB)
    const validInput = true
    const criteria = { numberA, numberB }
    const opts = { new: true, upsert: true }
    const update = {
      $setOnInsert: { numberA, numberB, areDuplicates, validInput },
      $inc: { quantity: 1 }
    }
    return this.findOneAndUpdate(criteria, update, opts)
  }

}
