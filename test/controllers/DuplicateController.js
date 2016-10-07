/* eslint no-undef: 0 */

import supertest from 'co-supertest'
import app from '../../server.js'
import { expect } from 'chai'
import fs from 'fs'
import path from 'path'

const request = supertest(app)

describe('Duplicate flows', () => {
  const regex = /\r?\n|\r/
  const filePath = path.join(`${__dirname}/../`, 'fixtures')
  const array = fs.readFileSync(`${filePath}/input.txt`).toString().split(regex)
  const [first, second] = array

  before(function*() {
    const duplicates = yield Duplicate.create(second)
  })

  it('First Duplicate', function*() {
    yield request
    .post('/duplicates')
    .send({ duplicate: first })
    .expect(201)
  })
  it('Second Duplicate', function*() {
    yield request
    .post('/duplicates')
    .send({ duplicate: second })
    .expect(201)
  })

  it('Find One', function*() {
    const { body } = yield request
    .get('/users/findOne')
    .query({ duplicateQuery: second })
    .expect(200)
    expect(body).to.have.property('duplicated')
  })

  describe('create Duplicate', () => {
  })
})
