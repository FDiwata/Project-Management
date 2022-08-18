<template>
  <div class="p-1 m-auto md:ml-20 lg:m-auto md:p-5 w-full lg:w-2/3 h-screen">
       <div class="w-full">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: `/Project?project_id=${breadCrumbObj.project_id}`  }"><span class="text-white font-thin hover:underline hover:cursor-pointer">{{breadCrumbObj.project_title}}</span></el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/Plan?plan_id=${breadCrumbObj.plan_id}`  }"><span class="text-white font-bold hover:underline hover:cursor-pointer">{{breadCrumbObj.plan_id}}</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
   <div class="w-full m-auto py-3 flex flex-row items-center justify-between">
      <span class="text-2xl md:text-4xl font-bold text-blue-400">{{GET_SELECTED_PLAN.plan_title}}</span>

      <div class="w-1/3 flex flex-row items-center justify-end space-x-2 text-white">

      <nuxt-link
        :to="{
          name: 'CreatePlan',
          query: { plan_id: GET_SELECTED_PLAN.plan_id },
        }"
        ><el-button class="font-bold text-white" icon="el-icon-edit"
        ></el-button
      ></nuxt-link
      >

      <el-button @click="deleteAction(GET_SELECTED_PLAN.plan_id)" class="font-bold text-white" icon="el-icon-delete"
        ></el-button
      >
</div>
    </div>
    <div class="flex flex-col items-start justify-start w-full p-3">
      <div class="flex flex-row items-center justify-center py-5 space-x-5">
        <span class="font-thin text-sm">Assigned to:</span>
        <span class="text-cyan-500 font-semibold">{{GET_SELECTED_PLAN.assignee}}</span>
      </div>
      <div class="flex flex-col items-start justify-center">
        <span class="font-thin text-sm">Project Description:</span>
        <p class="font-italic mt-3">
          {{GET_SELECTED_PLAN.plan_desc}}
        </p>
      </div>
    </div>
     <div class="w-full flex flex-row justify-between items-center py-5">
        <span class="font-bold">Subtask list:</span>
         <nuxt-link :to="{name: 'CreateSubtask', query: {plan_id: GET_SELECTED_PLAN.plan_id}}"><el-button icon="el-icon-edit" class="text-white">Create a Subtask</el-button></nuxt-link>
      </div>
    <KanbanView @change-state="repaint" :key="KanbanRepaintKey" :subtaskArray="GET_SELECTED_SUBTASKS" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BreadCrumb from '../components/Elements/BreadCrumb.vue';
import KanbanView from '../components/Elements/KanbanView.vue';
export default {
  components: { BreadCrumb, KanbanView },
  layout: "Default",
  data() {
    return {
       breadCrumbObj : {},
       KanbanRepaintKey: 0
    };

  },
  computed: {
     ...mapGetters(['GET_SELECTED_PLAN', 'GET_SELECTED_SUBTASKS'])
  },
  async mounted () {
    try {
    await this.$store.dispatch('getPlan', this.$route.query.plan_id)
    // await this.$store.dispatch('getPath', this.GET_SELECTED_PLAN.plan_id)
    await this.$store.dispatch('getSubtasks', this.GET_SELECTED_PLAN.plan_id || '')
  } catch (_) {
      this.$message({
              type: "error",
              message:
                "Plan does not exist.",
            });
      this.$router.push("/ManagePlan");
    }
    this.fetchLinks()
  },
  methods: {
    repaint () {
      this.$store.dispatch('getSubtasks', this.GET_SELECTED_PLAN.plan_id)
      this.KanbanRepaintKey += 1
    },
    // currentPathData () {
    //   const sortObj = {
    //     project: {
    //     },
    //     plan: {
    //     },
    //     subtask: {
    //     }
    //   }
    //   Object.keys(this.GET_CURRENT_PATH[0]).forEach((item) => {
    //     if (item.split('_')[1] === 'id') {
    //       sortObj[item.split('_')[0]].path = this.GET_CURRENT_PATH[0][item]
    //     } else if (item.split('_')[1] === 'title') {
    //       sortObj[item.split('_')[0]].title = this.GET_CURRENT_PATH[0][item]
    //     }
    //   })
    //   return Object.values(sortObj)
    // }

      async fetchLinks () {
       this.breadCrumbObj = await this.$store.dispatch('getLinks', this.GET_SELECTED_PLAN.plan_id)
    },

      async deleteTableData(planID) {
      const requestObject = {
        id: planID,
        type: "plan",
        column: "plan_id",
      };
      await this.$store
        .dispatch("deleteTableData", requestObject)
        .then(async (data) => {
          if (data) {
            await this.$store.dispatch("getPlans");
            this.$message({
              type: "success",
              message: "Plan Deleted.",
            });
          } else {
            await this.$store.dispatch("getPlans");
            this.$message({
              type: "error",
              message:
                "Failed to delete because there are existing subtasks under this plan",
            });
          }
        });
    },

    deleteAction(planID) {
      this.$confirm(
        "This will permanently delete this Plan. Continue?",
        "Warning",
        {
          confirmButtonText: "Delete",
          cancelButtonText: "Cancel",
          type: "warning",
        }
      )
        .then(() => {
          this.deleteTableData(planID);
          this.$router.push(`/Project?project_id=${this.breadCrumbObj.project_id}`)
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Delete canceled",
          });
        });
    },
  }
};
</script>