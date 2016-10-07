'use strict'
import Service from 'proton-service'
import _ from 'lodash'

export default class UtilityService extends Service {

  /**
  * @method create
  * @description create a document with numberA and numberB but if this alredy
  * exist just update its quantity
  * @param a = String (numberA)
  * @param b = String (numberB)
  * @author Andres Barradas
  */
  areDuplicates(a, b) {
    const arrayA = a.split(',')
    const arrayB = b.split(',')
    if (arrayA.length !== arrayB.length) return false
    let flag = true
    arrayA.forEach(element => {
      if (_.includes(arrayB, element)) {
        let index = arrayB.indexOf(element)
        arrayB.splice(index, 1)
      }
      else {
        flag = false
      }
    })
    return flag
  }

  /**
  * @method sort
  * @description get a string of elements and return a string o sorted elements
  * @param duplicate = String
  * @author Andres Barradas
  */
  sort(duplicate) {
    const validInput = /^[0-9,.]*$/.test(duplicate.replace(/ /g, ''))
    proton.log.debug('validInput', validInput)
    const arrayDuplicate = _.split(duplicate, ',')
    const numberDuplicate = arrayDuplicate.map(Number)
    const sortedDuplicate = _.sortBy(numberDuplicate)
    const validDuplicate = _.toString(sortedDuplicate)
    const object = {
      duplicated: validInput ? validDuplicate : duplicate,
      validInput
    }
    return object
  }
}
