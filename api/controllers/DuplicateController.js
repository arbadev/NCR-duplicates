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

      const { numberA } = this.request.body
      const { numberB } = this.request.body
      const { CompareService } = proton.app.services
      const areDuplicates = CompareService.areDuplicates(numberA, numberB)
      const validInput = true
      yield Duplicate.create({ numberA, numberB, areDuplicates, validInput })
      this.response.status = 201
    } catch (err) {
      proton.log.error('DuplicateController.create', err)
      this.status = 400
    }
  }

  /**
  *
  *
  */
  * find() {
    proton.log.debug('DuplicateController.find')
    const params = this.query
    proton.log.debug('params', params)
    try {
      const duplicates = yield Duplicate.find(params)
      this.response.body = duplicates
    } catch (err) {
      proton.log.error('DuplicateController.find', err)
      this.response.status = 400
    }
  }

  /**
  *
  *
  */
  * count() {
    proton.log.debug('DuplicateController.count')
    const params = this.query
    proton.log.debug('params', params)
    try {
      const number = yield Duplicate.count(params)
      this.response.body = number
    } catch (err) {
      proton.log.error('DuplicateController.count', err)
      this.response.status = 400
    }
  }
}
