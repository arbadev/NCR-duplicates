'use strict'
import Router from 'koa-router'

const router = new Router({ prefix: '/duplicates' })
const { DuplicateController } = proton.app.controllers

router.post('/', DuplicateController.create)

router.get('/', DuplicateController.find)
router.get('/count', DuplicateController.count)
// router.post('/', AuthPolicies.bearerWithoutUser, UserController.create)
//
// router.put('/me', AuthPolicies.bearer, UserController.updateMe)
//
// router.get('/me', AuthPolicies.bearer, UserController.findMe)
// router.patch('/me', AuthPolicies.bearer, UserController.updateMe)
//
// router.delete('/:userId', UserController.destroy)
//
// router.post('/:id/like', AuthPolicies.bearer, UserController.like)
//
// router.post('/:id/dislike', AuthPolicies.bearer, UserController.dislike)
//
// /*   users reports  */
// router.post('/:userId/report', AuthPolicies.bearer, ReportController.create)
//
// /*   users feedbacks  */
// router.post('/feedback', AuthPolicies.bearer, FeedbackController.create)

/*    test EmailService   */
// router.post('/mail', ReportController.emailTest)

module.exports = router
