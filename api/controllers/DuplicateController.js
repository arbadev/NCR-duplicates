'use strict'

import Controller from 'proton-controller'

export default class DuplicateController extends Controller {

  /**
  * @method create
  * @description create a document with duplicate but if this alredy
  * exist just update its quantity
  * @param duplicate = String
  * @author Andres Barradas
  */
  * create() {
    try {
      proton.log.debug('DuplicateController.create')
      proton.log.debug('body', this.request.body)
      const { duplicate } = this.request.body
      this.response.body = yield Duplicate.create(duplicate)
      this.response.status = 201
    } catch (err) {
      proton.log.error('DuplicateController.create', err)
      this.response.status = 400
    }
  }

  /**
  * @method find
  * @description find all Duplicates that found by query params
  * @param areDuplicates = boolean
  * @author Andres Barradas
  */
  * find() {
    proton.log.debug('DuplicateController.find')
    const params = this.query
    proton.log.debug('params', params)
    try {
      const duplicates = yield Duplicate.find(params)
      this.response.body = duplicates
      this.response.status = 200
    } catch (err) {
      proton.log.error('DuplicateController.find', err)
      this.response.status = 400
    }
  }

  /**
  * @method findOne
  * @description findOne duplic that match with the params param
  * @param params = String
  * @author Andres Barradas
  */
  * findOne() {
    proton.log.debug('DuplicateController.findOne')
    const { duplicateQuery } = this.query
    proton.log.debug('duplicateQuery', duplicateQuery)
    try {
      const { UtilityService } = proton.app.services
      const criteria = UtilityService.sort(duplicateQuery)
      proton.log.debug('criteria', criteria)
      const duplicate = yield Duplicate.findOne(criteria)
      this.response.body = duplicate
      this.response.status = 200
    } catch (err) {
      proton.log.error('DuplicateController.find', err)
      this.response.status = 400
    }
  }

  /**
  * @method count
  * @description count all Duplicates that found by query params
  * @param areDuplicates = boolean
  * @author Andres Barradas
  */
  * count() {
    proton.log.debug('DuplicateController.count')
    const params = this.query
    // const criteria =

    proton.log.debug('params.duplicate', params.duplicate)
    const finder = params.duplicate
    proton.log.debug('finder', finder)
    const criteria = finder === '1' ? { quantity: { $gt: 1 } } : { quantity: 1 }
    proton.log.debug('criteria', criteria)
    try {
      this.response.body = yield Duplicate.count(criteria)
      this.response.status = 200
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
  * getTop5() {
    proton.log.debug('DuplicateController.getTop5')
    try {
      const top5 = yield Duplicate.find({}).sort({ quantity: 'descending' }).limit(5)
      this.response.body = top5
      this.response.status = 200
    } catch (err) {
      proton.log.error('DuplicateController.count', err)
      this.response.status = 400
    }
  }

}
