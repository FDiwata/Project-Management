// api/index.js
const express = require('express')

const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST || 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        database: 'project_master'
    }
})

let GLOBAL_YEAR

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
    const resultAll = await knex.raw(`SELECT *,
    (100/(SELECT COUNT(*) FROM t_subtasks, t_projects WHERE t_subtasks.plan_id = t_plans.plan_id AND t_plans.project_id = t_projects.project_id) * (SELECT COUNT(*) FROM t_subtasks, t_projects WHERE t_subtasks.plan_id = t_plans.plan_id AND t_plans.project_id = t_projects.project_id AND t_subtasks.status = 'done')) as percentage
    FROM t_plans`)
    const resultSelect = await knex.raw(`SELECT *,
    (100/(SELECT COUNT(*) FROM t_subtasks, t_projects WHERE t_subtasks.plan_id = t_plans.plan_id AND t_plans.project_id = t_projects.project_id) * (SELECT COUNT(*) FROM t_subtasks, t_projects WHERE t_subtasks.plan_id = t_plans.plan_id AND t_plans.project_id = t_projects.project_id AND t_subtasks.status = 'done')) as percentage
    FROM t_plans WHERE t_plans.project_id = '${req.params.id}'`)
    const result = req.params.id === null ? resultAll : resultSelect
    res.send(result)
})

app.get('/plans', async function(req, res) {
    const result = await knex.raw(`SELECT *,
    (100/(SELECT COUNT(*) FROM t_subtasks, t_projects WHERE t_subtasks.plan_id = t_plans.plan_id AND t_plans.project_id = t_projects.project_id) * (SELECT COUNT(*) FROM t_subtasks, t_projects WHERE t_subtasks.plan_id = t_plans.plan_id AND t_plans.project_id = t_projects.project_id AND t_subtasks.status = 'done')) as percentage
    FROM t_plans`)
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

app.get('/taskLog/:id', async function(req, res) {
    const result = await knex.select('*').from('t_task_logs').where({ task_logs_id: req.params.id })
    res.send(result)
})

/**
 * project-23-0010
 */
app.get('/generateID/:table', async function(req, res) {
    const field = req.params.table === 't_projects' ? 'project_id' : req.params.table === 't_plans' ? 'plan_id' : req.params.table === 't_subtasks' ? 'subtask_id' : 'task_logs_id'
    const result = await knex.raw(`SELECT COUNT(${req.params.table}.${field}) as count from ${req.params.table};`)
    res.send(result)
})

app.get('/getPlanPercentage/:id', async function(req, res) {
    const result = await knex.raw(`select count(*) * 100.0 / (select count(*) from t_subtasks WHERE t_subtasks.plan_id = '${req.params.id}') as plan_percentage
    from t_subtasks WHERE t_subtasks.status = 'done' AND t_subtasks.plan_id = '${req.params.id}'`)
    res.send(result)
})

app.get('/getProjectPercentages', async function(req, res) {
    const result = await knex.raw(`SELECT t_projects.project_id, t_projects.project_title, t_plans.project_id, t_subtasks.status, (COUNT(*)/(SELECT COUNT(*) FROM t_subtasks)*100) AS percentage FROM t_projects, t_plans, t_subtasks WHERE t_projects.project_id = t_plans.project_id AND t_subtasks.plan_id = t_plans.plan_id GROUP BY t_projects.project_id, t_projects.project_title, t_plans.project_id, t_subtasks.status`)
    res.send(result)
})

app.get('/getAllProjectsPercentage', async function(req, res) {
    const result = await knex.raw(`SELECT 
    (SELECT t_projects.TargetMonth FROM t_projects WHERE t_projects.project_id = t_plans.project_id) as month, 
    (SELECT t_projects.project_id FROM t_projects WHERE t_projects.project_id = t_plans.project_id) as project_id, 
    (SELECT t_projects.project_title FROM t_projects WHERE t_projects.project_id = t_plans.project_id) as project_title,
    IF(ISNULL(SUM(100/(SELECT COUNT(*) FROM t_subtasks, t_projects WHERE t_subtasks.plan_id = t_plans.plan_id AND t_plans.project_id = t_projects.project_id) * (SELECT COUNT(*) FROM t_subtasks, t_projects WHERE t_subtasks.plan_id = t_plans.plan_id AND t_plans.project_id = t_projects.project_id AND t_subtasks.status = 'done')) = 1), 0 , SUM(100/(SELECT COUNT(*) FROM t_subtasks, t_projects WHERE t_subtasks.plan_id = t_plans.plan_id AND t_plans.project_id = t_projects.project_id) * (SELECT COUNT(*) FROM t_subtasks, t_projects WHERE t_subtasks.plan_id = t_plans.plan_id AND t_plans.project_id = t_projects.project_id AND t_subtasks.status = 'done'))) as percentage,
    COUNT(100/(SELECT COUNT(*) FROM t_subtasks, t_projects WHERE t_subtasks.plan_id = t_plans.plan_id AND t_plans.project_id = t_projects.project_id) * (SELECT COUNT(*) FROM t_subtasks, t_projects WHERE t_subtasks.plan_id = t_plans.plan_id AND t_plans.project_id = t_projects.project_id AND t_subtasks.status = 'done')) as plan_count
    FROM t_plans GROUP BY t_plans.project_id
    UNION
    SELECT t_projects.TargetMonth as month, t_projects.project_id, t_projects.project_title, 0 as percentage, 0 as plan_count FROM
    t_projects WHERE t_projects.project_id NOT IN (SELECT project_id FROM t_plans, t_subtasks WHERE t_plans.plan_id = t_subtasks.plan_id)`)
    res.send(result)
})



app.get('/getTodoSubtaskPercentage/:project_id/:plan_id/:year', async function(req, res) {
            const projectCondition = req.params.project_id !== 'null' ? ` AND t_projects.project_id = '${req.params.project_id}'` : ''
            const result = await knex.raw(`select count(*) * 100.0 / (select count(*) from t_subtasks, t_plans, t_projects WHERE t_subtasks.plan_id = ${req.params.plan_id !== 'null' ? `'${req.params.plan_id}'` : 't_plans.plan_id'} AND t_plans.project_id = t_projects.project_id${projectCondition} AND t_subtasks.start_date >= '${`${req.params.year}-01-01`}' AND t_subtasks.start_date < '${`${parseInt(req.params.year) + 1}-01-01`}') as percentage 
from t_subtasks, t_plans, t_projects WHERE t_subtasks.status = 'Todo' AND t_subtasks.plan_id = ${ req.params.plan_id !== 'null' ? `'${req.params.plan_id}'` : 't_plans.plan_id'} AND t_plans.project_id = t_projects.project_id${projectCondition} AND t_subtasks.start_date >= '${`${req.params.year}-01-01`}' AND t_subtasks.start_date < '${`${parseInt(req.params.year) + 1}-01-01`}'`)
res.send(result)
})

app.get('/getDoingSubtaskPercentage/:project_id/:plan_id/:year', async function (req, res) {
const projectCondition = req.params.project_id !== 'null' ? ` AND t_projects.project_id = '${req.params.project_id}'` : ''
const result = await knex.raw(`select count(*) * 100.0 / (select count(*) from t_subtasks, t_plans, t_projects WHERE t_subtasks.plan_id = ${req.params.plan_id !== 'null' ? `'${req.params.plan_id}'` : 't_plans.plan_id'} AND t_plans.project_id = t_projects.project_id${projectCondition} AND t_subtasks.start_date >= '${`${req.params.year}-01-01`}' AND t_subtasks.start_date < '${`${parseInt(req.params.year) + 1}-01-01`}') as percentage
from t_subtasks, t_plans, t_projects WHERE t_subtasks.status = 'Doing' AND t_subtasks.plan_id = ${ req.params.plan_id !== 'null' ? `'${req.params.plan_id}'` : 't_plans.plan_id'} AND t_plans.project_id = t_projects.project_id${projectCondition} AND t_subtasks.start_date >= '${`${req.params.year}-01-01`}' AND t_subtasks.start_date < '${`${parseInt(req.params.year) + 1}-01-01`}'`)
res.send(result)
})

app.get('/getDoneSubtaskPercentage/:project_id/:plan_id/:year', async function (req, res) {
const projectCondition = req.params.project_id !== 'null' ? ` AND t_projects.project_id = '${req.params.project_id}'` : ''
const result = await knex.raw(`select count(*) * 100.0 / (select count(*) from t_subtasks, t_plans, t_projects WHERE t_subtasks.plan_id = ${req.params.plan_id !== 'null' ? `'${req.params.plan_id}'` : 't_plans.plan_id'} AND t_plans.project_id = t_projects.project_id${projectCondition} AND t_subtasks.start_date >= '${`${req.params.year}-01-01`}' AND t_subtasks.start_date < '${`${parseInt(req.params.year) + 1}-01-01`}') as percentage
from t_subtasks, t_plans, t_projects WHERE t_subtasks.status = 'Done' AND t_subtasks.plan_id = ${ req.params.plan_id !== 'null' ? `'${req.params.plan_id}'` : 't_plans.plan_id'} AND t_plans.project_id = t_projects.project_id${projectCondition} AND t_subtasks.start_date >= '${`${req.params.year}-01-01`}' AND t_subtasks.start_date < '${`${parseInt(req.params.year) + 1}-01-01`}'`)
res.send(result)
})


app.get('/getLinks/:type/:id', async function (req, res) {
    const fields = `${req.params.type = 'subtask' ? 't_subtasks.subtask_id,' : ''} ${req.params.type = 'plan' ? 't_plans.plan_id,' : ''}${req.params.type = 'project' ? 't_projects.project_id,' : ''}`
    const tables = `FROM ${req.params.type = 'subtask' ? 't_subtasks' : ''}${req.params.type = 'plan' ? ',t_plans,' : ''}${req.params.type = 'subtask' ? ',t_subtasks,' : ''}`
    const condition = ''
    const result = await knex.raw(`SELECT ${fields} FROM t_subtasks, t_plans, t_projects WHERE t_subtasks.subtask_id = 'subtask-001' AND t_subtasks.plan_id = t_plans.plan_id AND t_plans.project_id = t_projects.project_id`)
    res.send(result)
})

app.get('/getSchedules/:assignee/:status', async function (req, res) {
    const result = await knex.raw(`SELECT 
    t_subtasks.subtask_id as id, t_subtasks.subtask_title as title, 
    t_subtasks.subtask_desc as description, t_subtasks.start_date as start, 
    t_subtasks.end_date as end, t_subtasks.status as backgroundColor, 
    \'false\' as allDay, \'true\'\ as dayMaxEvents FROM t_subtasks, t_plans WHERE
    t_subtasks.plan_id = t_plans.plan_id 
    ${ req.params.status !== 'All' ? `AND t_subtasks.status = '${req.params.status}'` : '' }  
    ${ req.params.assignee === 'all' ? '' : `AND t_plans.assignee LIKE '%${req.params.assignee}%'`} ;`)
    res.send(result[0])
})

app.get('/getPlanDashboard/:plan_id', async function (req, res) {
    const result = await knex.raw(`SELECT t_subtasks.subtask_id, t_subtasks.subtask_title, t_subtasks.start_date, end_date, MAX(t_task_logs.log_date) AS done_date
    FROM t_subtasks, t_task_logs
    WHERE t_subtasks.subtask_id = t_task_logs.subtask_id AND t_subtasks.plan_id = '${req.params.plan_id}'
    GROUP BY t_subtasks.subtask_id, t_subtasks.subtask_desc, t_subtasks.start_date, end_date`)
    res.send(result[0])
})

app.get('/getPlanDashboard', async function (req, res) {
    const result = await knex.raw(`SELECT t_subtasks.subtask_id, t_subtasks.subtask_title, t_subtasks.start_date, end_date, MAX(t_task_logs.log_date) AS done_date
    FROM t_subtasks, t_task_logs
    WHERE t_subtasks.subtask_id = t_task_logs.subtask_id
    GROUP BY t_subtasks.subtask_id, t_subtasks.subtask_desc, t_subtasks.start_date, end_date`)
    res.send(result[0])
})

app.get('/getPath/:key', async function (req, res) {
    const key = req.params.key
    const conditions = {
        subtask: `SELECT t_projects.project_id, t_projects.project_title, t_subtasks.subtask_id, t_subtasks.subtask_title, t_plans.plan_id, t_plans.plan_title FROM t_subtasks, t_plans, t_projects WHERE t_subtasks.subtask_id = '${key}' AND t_subtasks.plan_id = t_plans.plan_id AND t_plans.project_id = t_projects.project_id;`,
        plan: `SELECT t_projects.project_id, t_projects.project_title, t_plans.plan_id, t_plans.plan_title FROM t_plans, t_projects WHERE t_plans.plan_id = '${key}' AND t_plans.project_id = t_projects.project_id;`,
        project: `SELECT t_projects.project_id FROM t_projects WHERE t_projects.project_id = '${key}'`
    }
    const result = await knex.raw(`${conditions[key.split('-')[0]]}`)
    res.send(result[0])
})

app.get('/getOverallProjPerc', async function (req, res) {
    const result = await knex.raw(`SELECT IF(NOT EXISTS (SELECT * FROM t_plans WHERE EXISTS (SELECT * FROM t_subtasks WHERE t_subtasks.plan_id = t_plans.plan_id AND t_plans.project_id = t_projects.project_id AND t_subtasks.status != 'Done' OR t_projects.project_id NOT IN (SELECT t_plans.project_id FROM t_plans WHERE t_plans.plan_id IN (SELECT t_subtasks.plan_id FROM t_subtasks)))), true, false) as is_done, 
    t_projects.project_id, t_projects.TargetMonth FROM t_subtasks, t_plans, t_projects 
    WHERE t_subtasks.plan_id = t_plans.plan_id AND t_plans.project_id = t_projects.project_id
    OR t_projects.project_id NOT IN (SELECT t_plans.project_id FROM t_plans WHERE t_plans.plan_id IN (SELECT t_subtasks.plan_id FROM t_subtasks))
    GROUP BY t_projects.project_id`)
    res.send(result[0])
})

app.get('/getCurrentUserName/:id', async function (req, res) {
    const result = await knex.raw(`SELECT t_users.user_id FROM t_users 
    ${ req.params.id === 'all' ? '' : `WHERE t_users.user_id = '${req.params.id}'` }`)
    res.send(result[0])
})

app.get('/getGanttData/:id', async function (req, res) {
    const result = await knex.raw(`SELECT * FROM t_subtasks, t_plans WHERE t_subtasks.plan_id = t_plans.plan_id AND t_plans.assignee LIKE '${req.params.id}'`)
    res.send(result)
})

app.post('/createProject', async function (req, res) {
    const result = await knex('t_projects').insert(req.body)
    res.send(result)
})

app.post('/createPlan', async function (req, res) {
    const result = await knex('t_plans').insert(req.body)
    res.send(result)
})

app.post('/createSubtask', async function (req, res) {
    const result = await knex('t_subtasks').insert(req.body)
    res.send(result)
})

app.post('/createTaskLog', async function (req, res) {
    const result = await knex('t_task_logs').insert(req.body)
    res.send(result)
})

app.put('/updateSubtask/:id', async function (req, res) {
    await knex('t_subtasks').update(req.body).where({ subtask_id: req.params.id })
    const result = await knex.select('*').from('t_subtasks').where({ subtask_id: req.params.id })
    res.send(result)
})

app.put('/updateTableData/:id', async function (req, res) {
    const table = `t_${req.body.type}s`
    const whereObject = {
        [`${req.body.type}_id`]: req.params.id
    }
    const whereObject2 = {
        [`${req.body.parent_key}_id`]: req.params.id
    }

    const whereObject3 = {
        [`${req.body.foreign_key}_id`]: req.body.foreign_id
    }
    await knex(table).update(req.body.updateData).where(req.body.parent_key ? whereObject2 : whereObject)
    const result = await knex.select('*').from(table).where(req.body.parent_key ? whereObject3 : whereObject)
    res.send(result)
})

app.post('/delete/:id', async function (req, res) {
    const table = `t_${req.body.type}s`
    const delRes = await knex(table).where(req.body.column, req.params.id).del().catch(() => {
        res.send(false)
    })
    if (delRes === 1) {
        const result = await knex.select('*').from(table)
        res.send(result)
    } else {
        res.send(false)
    }
})

app.post('/register', async function (req, res) {
    let param = req.body
    const result = await knex('t_users').insert(param)
    res.send(result)
})

app.post('/login', async function (req, res) {
    const result = await knex.select('*').from('t_users').where({ user_name: req.body.user_name, user_pass: req.body.user_pass })
    res.send(result)
})

app.get('/getEMProject/:year', async function (req, res) {
    const dateCond = req.params.year !== 'null' ? `AND t_subtasks.start_date >= '${req.params.year}-01-01' AND t_subtasks.due_date < '${parseInt(req.params.year) + 1}-01-01'` : '';
    const result = await knex.raw(`
    SELECT t_projects.project_id, t_projects.project_title, t_projects.project_type, MAX(t_subtasks.end_date) as "end_date"
    FROM t_projects, t_plans, t_subtasks 
    WHERE t_projects.project_id = t_plans.project_id 
    AND t_plans.plan_id = t_subtasks.plan_id ${dateCond}
    GROUP BY t_projects.project_id
    `)


    const getProjectPercentage = (plan) => {
        let projTotalPercentage = 0;
        plan.forEach((plan) => {
            projTotalPercentage += plan.percentage;
        });
        return (
            ((100 / plan.length) * projTotalPercentage) / 100
        );
    }

    const categorizeProject = (type, perc) => {
        if (type === 'planned' && perc >= 50 && perc < 100) {
            return 1
        } else if (type === 'planned' && perc < 50) {
            return 2
        } else if (type === 'unplanned' && perc < 100) {
            return 3
        } else if (perc === 100) {
            return 4          
        }
    }

let retArray = result[0].map(async (project) => {
        const res2 = await knex.raw(`SELECT *,
        (100/(SELECT COUNT(*) FROM t_subtasks, t_projects WHERE t_subtasks.plan_id = t_plans.plan_id AND t_plans.project_id = t_projects.project_id) * (SELECT COUNT(*) FROM t_subtasks, t_projects WHERE t_subtasks.plan_id = t_plans.plan_id AND t_plans.project_id = t_projects.project_id AND t_subtasks.status = 'Done' ${dateCond})) as percentage
        FROM t_plans WHERE t_plans.project_id = '${project.project_id}'`)
        const percentage = getProjectPercentage(res2[0])
        const retObj = {
            project_id: project.project_id,
            project_title: project.project_title,
            percentage,
            category: categorizeProject(project.project_type, percentage)
        }
        return retObj
    })

    res.send(await Promise.all(retArray))

})


app.get('/yearRanges', async function (req, res) {
    const result = await knex.raw(`SELECT DISTINCT TargetMonth from t_projects`)
   
    const dateRange = result[0].map((date) => {
        return new Date(date.TargetMonth)
    })

    const minDate = dateRange.reduce(function (a, b) { return a < b ? a : b; });
    const maxDate = dateRange.reduce(function (a, b) { return a > b ? a : b; });
    GLOBAL_YEAR = maxDate
    res.send([minDate, maxDate])
})


app.get('/genID/:type', async function (req, res) {

    const result = await knex.raw(`SELECT DISTINCT TargetMonth from t_projects`)
   
    const dateRange = result[0].map((date) => {
        return new Date(date.TargetMonth)
    })

    const maxDate = dateRange.reduce(function (a, b) { return a > b ? a : b; });
    const digits = '0000'
    const year = new Date().getFullYear().toString().substring(4, 2)
    const str = `${req.params.type}-${year}-${digits}`
    
    const cut = str.split('-')[2]
    let current = cut[cut.length - 1]
    const diff = cut.length - current.toString().length
    digits.substring(0, 1)
    const curVal = await knex.raw('SELECT id_ref FROM t_users WHERE id_ref LIMIT 1')
    const isCurrentYear = new Date().getFullYear() === maxDate.getFullYear()
    const setVal = !isCurrentYear ? 1 : parseInt(`${curVal[0][0].id_ref + 1}`)

    await knex.raw(`UPDATE t_users SET id_ref =${!isCurrentYear ? setVal: `${curVal[0][0].id_ref + 1}`}`)

    res.send({ id: `${req.params.type}-${year}-${digits.substring(0, diff).toString() + setVal}`, current: setVal })
})

export default {
    path: '/api',
    handler: app
}