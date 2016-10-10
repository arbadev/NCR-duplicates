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
  const [first, second, third, fourth, fifth] = array
  // before(function*() {
  //   [first, second, third, fourth, fifth] = yield Duplicate.create(array)
  // })

  // after(function*() {
  //   yield [Duplicate.remove({})]
  // })

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
  it('Third Duplicate', function*() {
    yield request
    .post('/duplicates')
    .send({ duplicate: third })
    .expect(201)
  })
  it('Fourth Duplicate', function*() {
    yield request
    .post('/duplicates')
    .send({ duplicate: fourth })
    .expect(201)
  })
  it('Fifth Duplicate', function*() {
    yield request
    .post('/duplicates')
    .send({ duplicate: fifth })
    .expect(201)
  })
  it('Find One', function*() {
    const { body } = yield request
    .get('/duplicates/findOne')
    .query({ duplicateQuery: first })
    .expect(200)
    expect(body).to.have.property('duplicated')
    expect(body).to.have.property('quantity')
  })
  it('Get top 5', function*() {
    yield request
    .get('/duplicates/top5')
    .expect(200)
  })
  it('Get count repeateds', function*() {
    yield request
    .get('/duplicates/count')
    .query({ duplicate: 1 })
    .expect(200)
  })
  it('Get count non repeateds', function*() {
    yield request
    .get('/duplicates/count')
    .query({ duplicate: 0 })
    .expect(200)
  })
  describe('create Duplicate', () => {
  })
})
