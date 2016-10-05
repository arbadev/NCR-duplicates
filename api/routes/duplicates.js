'use strict'
import Router from 'koa-router'

const router = new Router({ prefix: '/duplicates' })
const { DuplicateController } = proton.app.controllers

router.post('/', DuplicateController.create)

router.get('/', DuplicateController.find)
router.get('/count', DuplicateController.count)

module.exports = router
