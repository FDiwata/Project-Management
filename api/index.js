import res from 'express/lib/response';

// api/index.js
const express = require('express')
const knexConfig = require('./knexfile.js');
const knex = require('knex')(knexConfig[process.env.NODE_ENV])
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.get('/project/:id', async function(req, res) {
    const result = await knex.select('*').from('t_projects').where({ project_id: req.params.id })
    res.send(result)
})

app.get('/projects', async function(req, res) {
    const result = await knex.select('*').from('t_projects')
    res.send(result)
})

app.get('/plans/:id', async function(req, res) {
    const resultAll = await knex.select('*').from('t_plans')
    const resultSelect = await knex.select('*').from('t_plans').where({ project_id: req.params.id })
    const result = req.params.id === null ? resultAll : resultSelect
    res.send(result)
})

app.get('/plans', async function(req, res) {
    const result = await knex.select('*').from('t_plans')
    res.send(result)
})

app.get('/plan/:id', async function(req, res) {
    const result = await knex.select('*').from('t_plans').where({ plan_id: req.params.id })
    res.send(result)
})

app.get('/subtasks/:id', async function(req, res) {
    const resultAll = await knex.select('*').from('t_subtasks')
    const resultSelect = await knex.select('*').from('t_subtasks').where({ plan_id: req.params.id })
    const result = req.params.id === null ? resultAll : resultSelect
    res.send(result)
})

app.get('/subtasks', async function(req, res) {
    const result = await knex.select('*').from('t_subtasks')
    res.send(result)
})

app.get('/subtask/:id', async function(req, res) {
    const result = await knex.select('*').from('t_subtasks').where({ subtask_id: req.params.id })
    res.send(result)
})

app.get('/subtasks/:id', async function(req, res) {
    const resultAll = await knex.select('*').from('t_task_logs')
    const resultSelect = await knex.select('*').from('t_task_logs').where({ subtask_id: req.params.id })
    const result = req.params.id === null ? resultAll : resultSelect
    res.send(result)
})

app.get('/taskLogs/:id', async function(req, res) {
    const result = await knex.select('*').from('t_task_logs').where({ subtask_id: req.params.id })
    res.send(result)
})

app.get('/generateID/:table', async function(req, res) {
    const field = req.params.table === 't_projects' ? 'project_id' : req.params.table === 't_plans' ? 'plan_id' : req.params.table === 't_subtasks' ? 'subtask_id' : 'task_logs_id'
    const result = await knex(req.params.table).count(`${field} as count`)
    res.send(result)
})

app.post('/createProject', async function(req, res) {
    const result = await knex('t_projects').insert(req.body)
    res.send(result)
})

app.post('/createPlan', async function(req, res) {
    const result = await knex('t_plans').insert(req.body)
    res.send(result)
})

app.post('/createSubtask', async function(req, res) {
    const result = await knex('t_subtasks').insert(req.body)
    res.send(result)
})

app.post('/createTaskLog', async function(req, res) {
    const result = await knex('t_task_logs').insert(req.body)
    res.send(result)
})

app.put('/updateSubtask/:id', async function(req, res) {
    await knex('t_subtasks').update(req.body).where({ subtask_id: req.params.id })
    const result = await knex.select('*').from('t_subtasks').where({ subtask_id: req.params.id })
    res.send(result)
})

app.get('/getPlanDashboard/:plan_id', async function(req, res) {
    const result = await knex.raw(`SELECT t_subtasks.subtask_id, t_subtasks.subtask_title, t_subtasks.start_date, end_date, MAX(t_task_logs.log_date) AS done_date
    FROM t_subtasks, t_task_logs
    WHERE t_subtasks.subtask_id = t_task_logs.subtask_id AND t_subtasks.plan_id = '${req.params.plan_id}'
    GROUP BY t_subtasks.subtask_id, t_subtasks.subtask_desc, t_subtasks.start_date, end_date`)
    res.send(result[0])

})

app.get('/getPlanDashboard', async function(req, res) {
    const result = await knex.raw(`SELECT t_subtasks.subtask_id, t_subtasks.subtask_title, t_subtasks.start_date, end_date, MAX(t_task_logs.log_date) AS done_date
    FROM t_subtasks, t_task_logs
    WHERE t_subtasks.subtask_id = t_task_logs.subtask_id
    GROUP BY t_subtasks.subtask_id, t_subtasks.subtask_desc, t_subtasks.start_date, end_date`)
    res.send(result[0])

})

export default {
    path: '/api',
    handler: app
}