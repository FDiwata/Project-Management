
<template>
  <div class="p-5 rounded-lg bg-gray-500 w-full h-fit">
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
                class="
                  font-bold
                  text-cyan-500
                  w-auto
                  mt-3p
                  cursor-pointer
                "
                @click="select(arg.event.id)" 
                >Go to this subtask</el-button
              >
            </div>
            <div slot="reference" class="text-ellipsis truncate w-full" style="text-align: left">
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
    };
  },
  watch: {
    keybind (value) {
      if (value > 3) {
        clearInterval(setInt)
      }
    }
  },
  async created() {
    const events = await this.$store.dispatch("getSchedules");
    events.forEach((item, index, arr) => {
      const condition = (status) => item.backgroundColor === status;
      events[index].backgroundColor = condition("Todo")
        ? "#FF6242"
        : condition("Doing")
        ? "#FAA43A"
        : "#9ACD32";
    });
    this.calendarOptions.events = events;
    setInt = setInterval(() => {
      this.keybind++
    }, 500);
  },
  methods: {
    select(e) {
      this.$router.push(`/Subtask?subtask_id=${e}`);
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