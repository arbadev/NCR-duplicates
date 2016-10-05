'use strict'

import Controller from 'proton-controller'

export default class DuplicateController extends Controller {

  /**
  *
  *
  */
  * create() {
    try {
      proton.log.debug('DuplicateController.create')
      proton.log.debug('body', this.request.body)
      const { numberA, numberB } = this.request.body
      this.response.body = yield Duplicate.create(numberA, numberB)
      this.response.status = 201
    } catch (err) {
      proton.log.error('DuplicateController.create', err)
      this.response.status = 400
    }
  }

  /**
  * @method getTop5
  * @description get top 5 most frequent records of duplicates group
  * @author Andres Barradas
  */
  * find() {
    proton.log.debug('DuplicateController.find')
    const params = this.query
    proton.log.debug('params', params)
    try {
      const duplicates = yield Duplicate.find(params)
      this.response.body = duplicates
      this.response.status = 201
    } catch (err) {
      proton.log.error('DuplicateController.find', err)
      this.response.status = 400
    }
  }

  /**
  * @method getTop5
  * @description get top 5 most frequent records of duplicates group
  * @author Andres Barradas
  */
  * count() {
    proton.log.debug('DuplicateController.count')
    const params = this.query
    proton.log.debug('params', params)
    try {
      const number = yield Duplicate.count(params)
      this.response.body = number
      this.response.status = 201
    } catch (err) {
      proton.log.error('DuplicateController.count', err)
      this.response.status = 400
    }
  }

  /**
  * @method getTop5
  * @description get top 5 most frequent records of duplicates group
  * @author Andres Barradas
  */
  static * getTop5() {
    proton.log.debug('DuplicateController.count')
    try {
      const items = yield Duplicate.find({}).sort({ quantity: 'descending' })
      this.response.body = items
      this.response.status = 201
    } catch (err) {
      proton.log.error('DuplicateController.count', err)
      this.response.status = 400
    }
  }
}
