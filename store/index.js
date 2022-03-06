export const state = () => ({
    allProjects: [],
    allPlans: [],
    allSubtasks: [],
    selectedProject: {},
    selectedPlan: {

    },
    selectedPlans: [],
    selectedSubtask: {

    },
    selectedSubtasks: [],
    selectedTaskLogs: [],
    dashboardData: {}
})

export const actions = {
        async getProjects({ commit }) {
            const result = await this.$axios.get('/api/projects')
            commit('SET_ALL_PROJECTS', result.data)
        },

        async getProject({ commit }, payload) {
            const result = await this.$axios.get(`/api/project/${payload}`)
            commit('SET_SELECTED_PROJECT', result.data[0])
        },

        async getPlans({ commit }, payload = null) {
            const getAll = payload === null
            const result = await this.$axios.get(getAll ? '/api/plans' : `/api/plans/${payload}`)
            commit(getAll ? 'SET_ALL_PLANS' : 'SET_SELECTED_PLANS', result.data)
        },

        async getPlan({ commit }, payload) {
            const result = await this.$axios.get(`/api/plan/${payload}`)
            commit('SET_SELECTED_PLAN', result.data[0])
        },

        async getSubtasks({ commit }, payload = null) {
            const getAll = payload === null
            const result = await this.$axios.get(getAll ? '/api/subtasks' : `/api/subtasks/${payload}`)
            commit(getAll ? 'SET_ALL_SUBTASKS' : 'SET_SELECTED_SUBTASKS', result.data)
        },

        async getSubtask({ commit }, payload) {
            const result = await this.$axios.get(`/api/subtask/${payload}`)
            commit('SET_SELECTED_SUBTASK', result.data[0])
        },

        async getTaskLogs({ commit }, payload = null) {
            const result = await this.$axios.get(`/api/taskLogs/${payload}`)
            commit('SET_SELECTED_TASK_LOGS', result.data)
        },

        async generateID(_, payload) {
            const result = await this.$axios.get(`/api/generateID/${payload}`)
            const prefix = payload === 't_projects' ? 'project-' : payload === 't_plans' ? 'plan-' : payload === 't_subtasks' ? 'subtask-' : 'task_log-'
            const count = result.data[0].count + 1
            return `${prefix}${count.toString().length === 1 ? `00${count }` : count.toString().length === 2 ? `0${count }` : count  }`
    },

    async createProject({ commit }, payload) {
        const result = await this.$axios.post('/api/createProject', payload)
        commit('SET_SELECTED_PROJECT', result.data[0])
    },

    async createPlan({ commit }, payload) {
        const result = await this.$axios.post('/api/createPlan', payload)
        commit('SET_SELECTED_PLAN', result.data[0])
    },

    async createSubtask({ commit }, payload) {
        const result = await this.$axios.post('/api/createSubtask', payload)
        commit('SET_SELECTED_SUBTASK', result.data.slice(-1).pop())
    },

    async createTaskLog({ commit }, payload) {
      await this.$axios.post('/api/createTaskLog', payload)
    },
    
    async updateSubtask(_, payload) {
        await this.$axios.put(`/api/updateSubtask/${payload.subtask_id}`, payload.data)
    },

    async getPlanDashboard({ commit }, payload) {
        const endpoint = payload === undefined ? 'api/getPlanDashboard' : `/api/getPlanDashboard/${payload}`
        const result = await this.$axios.get(endpoint)
        const actualData = result.data.map((item) => {
            return {
                x: item.subtask_title,
                y:[
                    new Date(item.start_date).getTime(),
                    new Date(item.done_date).getTime()
                ]
            }
        })

        const plannedData = result.data.map((item) => {
            return {
                x: item.subtask_title,
                y:[
                    new Date(item.start_date).getTime(),
                    new Date(item.end_date).getTime()
                ]
            }
        })
        commit('SET_DASHBOARD_DATA', {actualData, plannedData})
    }
}

export const mutations = {
    SET_SELECTED_PROJECT(state, payload) {
        state.selectedProject = payload
    },
    SET_ALL_PROJECTS(state, payload) {
        state.allProjects = payload
    },

    SET_SELECTED_PLANS(state, payload) {
        state.selectedPlans = payload
    },

    SET_SELECTED_PLAN(state, payload) {
        state.selectedPlan = payload
    },

    SET_ALL_PLANS(state, payload) {
        state.allPlans = payload
    },

    SET_SELECTED_SUBTASKS(state, payload) {
        state.selectedSubtasks = payload
    },

    SET_SELECTED_SUBTASK(state, payload) {
        state.selectedSubtask = payload
    },

    SET_ALL_SUBTASKS(state, payload) {
        state.allSubtasks = payload
    },

    SET_SELECTED_TASK_LOGS(state, payload) {
        state.selectedTaskLogs = payload
    },

    SET_DASHBOARD_DATA(state, payload) {
        state.dashboardData = payload
    }
}

export const getters = {
    GET_ALL_PROJECTS(state) {
        return state.allProjects
    },

    GET_ALL_PLANS(state) {
        return state.allPlans
    },

    GET_ALL_SUBTASKS(state) {
        return state.allSubtasks
    },

    GET_SELECTED_PROJECT(state) {
        return state.selectedProject
    },

    GET_SELECTED_PLANS(state) {
        return state.selectedPlans
    },

    GET_SELECTED_PLAN(state) {
        return state.selectedPlan
    },

    GET_SELECTED_SUBTASKS(state) {
        return state.selectedSubtasks
    },

    GET_SELECTED_SUBTASK(state) {
        return state.selectedSubtask
    },

    GET_SELECTED_TASK_LOGS(state) {
        return state.selectedTaskLogs
    },

    GET_DASHBOARD_DATA(state) {
        return state.dashboardData
    }

}