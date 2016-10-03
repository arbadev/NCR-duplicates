'use strict'

import Model from 'proton-mongoose-model'
import moment from 'moment'

export default class Duplicate extends Model {

  schema() {
    return {
      numberA: String,
      numberB: String,
      areDuplicates: Boolean,
      validInput: Boolean,
    }
  }

  /**
  * @method getTop5
  * @description get top 5 records of the most frequent duplicate group
  * @author Andres Barradas
  */
  static * getTop5() {
    
  }
}
