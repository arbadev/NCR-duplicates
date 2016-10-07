/* eslint no-undef: 0 */

import supertest from 'co-supertest'
import app from '../../server.js'
import { expect } from 'chai'

const request = supertest(app)

describe('Duplicate flows', () => {
  let [barbara, luis, mariangela, andres] = []



  before(function*() {
    [barbara, luis, mariangela, andres] = yield User.create(users)
    barbara.token = yield Token.generate(barbara.facebookId)
    luis.token = yield Token.generate(luis.facebookId)
    mariangela.token = yield Token.generate(mariangela.facebookId)
    andres.token = yield Token.generate(andres.facebookId)
  })

  after(function*() {
    yield [User.remove({}), Token.remove({}), Like.remove({})]
  })

  it('Find', function*() {
    const { body } = yield request
      .get('/users')
      .set('Authorization', `Bearer ${barbara.token.value}`)
      .expect(200)
    proton.log.debug('users', body)
  })

  it('Find me', function*() {
    const { body } = yield request
      .get('/users/me')
      .set('Authorization', `Bearer ${luis.token.value}`)
      .expect(200)
    expect(body).to.have.property('firstName')
    expect(body).to.have.property('email')
    expect(body).to.have.property('facebookId')
    expect(body).to.have.property('status')
    expect(body).to.have.property('avatar')
    expect(body).to.have.property('publicAvatar')
    expect(body).to.have.property('languages').an('array')
  })

  describe('reports on sparks', () => {
    const aReason = 'Photo'
    const aDescription = 'a description'

    it('Mariangela report Andres', function*() {
      yield request
      .post(`/users/${andres._id}/report`)
      .set('Authorization', `Bearer ${mariangela.token.value}`)
      .send({ reason: aReason, description: aDescription })
      .expect(201)
    })
    it('Andres report Mariangela', function*() {
      yield request
      .post(`/users/${mariangela._id}/report`)
      .set('Authorization', `Bearer ${andres.token.value}`)
      .send({ reason: aReason, description: aDescription })
      .expect(201)
    })
  })

  describe('Sparkd Feedbacks', () => {
    const aTitle = 'My title'
    const aDescription = 'a description'

    it('Mariangela sends Feedbacks', function*() {
      yield request
      .post('/users/feedback')
      .set('Authorization', `Bearer ${mariangela.token.value}`)
      .send({ title: aTitle, description: aDescription })
      .expect(201)
    })
    it('Andres sends Feedbacks', function*() {
      yield request
      .post('/users/feedback')
      .set('Authorization', `Bearer ${andres.token.value}`)
      .send({ title: aTitle, description: aDescription })
      .expect(201)
    })
  })
})
