'use strict'
import Service from 'proton-service'
import fs from 'fs'
import path from 'path'

export default class CompareService extends Service {
  // constructor(app) {
  //   // super(app)
  //   // this.sg = sg(process.env.SENDGRID_API_KEY)
  // }

  areDuplicates(a, b) {
    if (a === b) return true
    return false
  }

}
