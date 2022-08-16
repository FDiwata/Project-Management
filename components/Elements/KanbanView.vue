<template>
  <div
    class="
      w-full
      h-fit
      min-h-max
      shadow-lg
      m-auto
      flex flex-row
      justify-center
      bg-gray-100
      rounded-lg
      space-x-3
      p-3
    "
  >
    <div class="w-1/3" @dragover="allowDrop">
      <div class="p-3"><span class="font-bold text-amber-600">Todo</span></div>
      <div
        id="todo"
        class="flex flex-col items-center justify-start h-full"
        @dragover="allowDrop"
        @drop.prevent="(e) => onDrop(e, 'Todo')"
      >
        <div
         v-for="card in subtaskArray.filter((item) => item.status === 'Todo')" :key="card.subtask_id"
        :id="card.subtask_id"
        :to="`/Subtask?subtask_id=${card.subtask_id}`"
          class="
            w-full
            p-3
            m-2
            shadow-md
            rounded-lg
            h-40
            text-start text-gray-600
            bg-gray-300
          "
          :draggable="true"
          @dragstart="onDrag"
          @drop.prevent
        >
          <div class="flex flex-col items-start justify-center">
            <nuxt-link :to="`/Subtask?subtask_id=${card.subtask_id}`" class="font-bold text-sm">{{card.subtask_title}}</nuxt-link>
            <span class="text-xs">Due date: <span class="text-red-400">{{new Date(card.due_date).toDateString()}}</span></span>
            <el-tag class="my-1 text-xs h-fit" type="warning">Todo</el-tag>
            <p class="text-xs">{{card.subtask_desc}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="w-1/3" @dragover="allowDrop">
      <div class="p-3"><span class="font-bold text-green-400">Doing</span></div>
      <div
        id="doing"
        class="flex flex-col items-center justify-start h-full"
        @dragover="allowDrop"
        @drop.prevent="(e) => onDrop(e, 'Doing')"
      >
        <div
        v-for="card in subtaskArray.filter((item) => item.status === 'Doing')" :key="card.subtask_id"
        :id="card.subtask_id"
          class="
            w-full
            p-3
            m-2
            shadow-md
            rounded-lg
            h-40
            text-start text-gray-600
            bg-gray-300
          "
          :draggable="true"
          @dragstart="onDrag"
           @drop.prevent
        >
          <div class="flex flex-col items-start justify-center">
            <nuxt-link :to="`/Subtask?subtask_id=${card.subtask_id}`" class="font-bold text-sm">{{card.subtask_title}}</nuxt-link>
            <span class="text-xs">Due date: <span class="text-red-400">{{new Date(card.due_date).toDateString()}}</span></span>
            <el-tag class="my-1 text-xs h-fit" type="success">Doing</el-tag>
            <p class="text-xs">{{card.subtask_desc}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="w-1/3" @dragover="allowDrop">
      <div class="p-3"><span class="font-bold text-blue-400">Done</span></div>
      <div
        id="done"
        class="flex flex-col items-center justify-start h-full"
        @dragover="allowDrop"
        @drop.prevent="(e) => onDrop(e, 'Done')"
      >
        <div v-for="card in subtaskArray.filter((item) => item.status === 'Done')" :key="card.subtask_id"
        :id="card.subtask_id"
          class="
            w-full
            p-3
            m-2
            shadow-md
            rounded-lg
            h-40
            text-start text-gray-600
            bg-gray-300
          "
          :draggable="true"
          @dragstart="onDrag"
          @drop.prevent
        >
          <div class="flex flex-col items-start justify-center">
            <nuxt-link @click.self.stop :to="`/Subtask?subtask_id=${card.subtask_id}`" class="font-bold text-sm">{{card.subtask_title}}</nuxt-link>
            <span class="text-xs">Due date: <span class="text-red-400">{{new Date(card.due_date).toDateString()}}</span></span>
            <el-tag class="my-1 text-xs h-fit">Done</el-tag>
            <p class="text-xs">{{card.subtask_desc}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  props: {
    subtaskArray: {
        type: Array,
        default: () => { return [] }
    }
  },

  data () {
    return {
      dragData: {
        subtask_id: "",
        plan_id: "",
        subtask_title: "",
        subtask_desc: "",
        priority: "",
        status: "",
        start_date: new Date(),
        end_date: new Date(),
        due_date: new Date(),
    }
    }
  },
  computed: {
    ...mapGetters(["GET_SELECTED_SUBTASK"], ["GET_SELECTED_SUBTASKS"]),
    updatePayload() {
      const updateData = { ...this.dragData };
      delete updateData.subtask_id;
      return {
        id: this.dragData.subtask_id,
        type: "subtask",
        updateData: updateData,
      };
    },
  },
  methods: {
    allowDrop(event) {
      event.preventDefault();
    },
    onDrag(event) {
      event.dataTransfer.dropEffect = "move";
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("card", event.target.id);
      this.getDragData(event.target.id)
    },
    onDrop(event, status) {
      const site_id = event.dataTransfer.getData("card");
      const site = document.getElementById(site_id);
      try {
      event.target.appendChild(site);

      this.updateSubtask(status)
      this.$emit('change-state', true)
      } catch {
        
      }
    },

    getDragData(id) {
      this.$store.dispatch('getSubtask', id).then(() => {
        this.dragData = { ...this.GET_SELECTED_SUBTASK}
      })
    },

    updateSubtask(status) {
        this.dragData.start_date = this.formatDate(this.dragData.start_date);
        this.dragData.end_date = this.formatDate(this.dragData.end_date);
        this.dragData.due_date = this.formatDate(this.dragData.due_date);
        this.dragData.status = status
        this.$store.dispatch("updateTableData", this.updatePayload)
    },

    formatDate(date) {
      const newDate = new Date(date);
      const dd = newDate.getDate();
      const mm = newDate.getMonth() + 1; // month start at 0, we have to add 1.
      const yyyy = newDate.getUTCFullYear();

      return `${yyyy}-${mm}-${dd}`;
    },
  }
};
</script>

<style>
</style>