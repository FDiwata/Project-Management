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
        @drop.prevent="onDrop"
      >
        <div
         v-for="card in subtaskArray.filter((item) => item.status === 'Todo')" :key="card.subtask_id"
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
          <div>
            <h1 class="font-bold text-sm">{{card.subtask_title}}</h1>
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
        @drop.prevent="onDrop"
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
          <div>
            <h1 class="font-bold text-sm">{{card.subtask_title}}</h1>
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
        @drop.prevent="onDrop"
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
          <div>
            <h1 class="font-bold text-sm">{{card.subtask_title}}</h1>
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
export default {
  props: {
    subtaskArray: {
        type: Array,
        default: () => { return [] }
    }
  },
  methods: {
    allowDrop(event) {
      event.preventDefault();
    },
    onDrag(event) {
      event.dataTransfer.dropEffect = "move";
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("card", event.target.id);
    },
    onDrop(event) {
      const site_id = event.dataTransfer.getData("card");
      const site = document.getElementById(site_id);
      try {
      event.target.appendChild(site);
      } catch {
        
      }
    },
  }
};
</script>

<style>
</style>