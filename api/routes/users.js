'use strict'
import Router from 'koa-router'

const router = new Router({
  prefix: '/users'
})

router.post('/', AuthPolicies.bearerWithoutUser, UserController.create)
router.put('/me/avatar', AuthPolicies.bearer, UserController.uploadAvatar)
router.put('/me/message', AuthPolicies.bearer, UserController.uploadMessage)

module.exports = router