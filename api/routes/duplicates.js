'use strict'
import Router from 'koa-router'

const router = new Router({ prefix: '/duplicates' })
const { DuplicateController } = proton.app.controllers

router.post('/', DuplicateController.create)

router.get('/', DuplicateController.find)
router.get('/count', DuplicateController.count)
router.get('/top5', DuplicateController.getTop5)
router.get('/findOne', DuplicateController.findOne)


module.exports = router
