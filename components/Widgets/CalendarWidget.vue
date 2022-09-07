<template>
  <div class="p-5 rounded-lg bg-gray-500 w-full h-fit">
    <div class="w-full flex flex-row items-center justify-end space-x-3 mb-5">
      
      <!----User Dropdown-->
      <div class="flex w-1/4 flex-col items-start justify-start">
        <span>Select a user</span>
        <el-select
          class="w-full transition-all hover:shadow-lg"
          v-model="username"
          placeholder="Pick a project"
        >
          <el-option
            v-for="user in users"
            :key="user.key"
            :label="user.user_name"
            :value="user.user_name"
          />
        </el-select>
      </div>

      <!----Status Dropdown-->
      <div class="flex w-1/4 flex-col items-start justify-start">
        <span>Select a status</span>
        <el-select
          class="w-full transition-all hover:shadow-lg"
          v-model="status"
          placeholder="Pick a project"
        >
          <el-option
            v-for="stat in subStatus"
            :key="stat.key"
            :label="stat"
            :value="stat"
          />
        </el-select>
      </div>
    </div>

    <client-only>
      <FullCalendar class="mb-10" :key="keybind" :options="calendarOptions">
        <template #eventContent="arg">
          <el-popover
            placement="bottom"
            :title="arg.event.title"
            width="auto"
            trigger="hover"
            popper-class="z-auto relative max-w-md"
          >
            <div>
              <div class="text-ellipsis mt-3 max-h-20 truncate w-full">
                description:
                {{ JSON.stringify(arg.event.extendedProps.description) }}
              </div>
              <el-button
                primary
                class="font-bold text-cyan-500 w-auto mt-3p cursor-pointer"
                @click="select(arg.event.id)"
                >Go to this subtask</el-button
              >
            </div>
            <div
              slot="reference"
              class="text-ellipsis truncate w-full"
              style="text-align: left"
            >
              Title: {{ JSON.stringify(arg.event.title)
              }}<br /></div></el-popover></template
      ></FullCalendar>
    </client-only>
  </div>
</template>
<script>
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

let setInt = null;
export default {
  components: {
    FullCalendar, // make the <FullCalendar> tag available
  },
  data() {
    return {
      keybind: 1,
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: "dayGridMonth",
        dayMaxEventRows: true,
        events: [
          {
            id: "a",
            title: "my event",
            start: "2022-08-03",
            end: "2022-08-05",
            allDay: false,
            backgroundColor: "#69fcdb",
          },
        ],
      },
      username: "all",
      users: [{ user_name: "all" }],
      status: "All",
      subStatus: ["All", "Todo", "Doing", "Done"],
    };
  },
  watch: {
    keybind(value) {
      if (value > 3) {
        clearInterval(setInt);
      }
    },
    username(value) {
      this.setCalendarEvents(value, this.status);
    },
    status(value) {
      this.setCalendarEvents(this.username, value);
    },
  },
  async created() {
    await this.setCalendarEvents();
    const usersArray = await this.$store.dispatch("getCurrentUserName", {
      id: "all",
    });
    this.users.push(...usersArray);
    setInt = setInterval(() => {
      this.keybind++;
    }, 500);
  },
  methods: {
    select(e) {
      this.$router.push(`/Subtask?subtask_id=${e}`);
    },

    async setCalendarEvents(username = "all", status = "All") {
      const events = await this.$store.dispatch("getSchedules", {
        assignee: username,
        status: status,
      });
      events.forEach((item, index, arr) => {
        const condition = (status) => item.backgroundColor === status;
        events[index].backgroundColor = condition("Todo")
          ? "#FF6242"
          : condition("Doing")
          ? "#FAA43A"
          : "#9ACD32";
      });
      this.calendarOptions.events = events;
    },
  },
};
</script>

<style>
.fc-popover-header {
  color: #303030 !important;
}
.fc .fc-popover {
  z-index: 1001 !important;
}
.popover-class {
  z-index: 9999 !important;
  position: sticky;
}
</style>