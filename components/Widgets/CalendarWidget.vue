
<template>
<div class="p-5 rounded-lg bg-gray-500">
  <FullCalendar @eventClick="select" :options="calendarOptions" />
  </div>
</template>
<script>
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

export default {
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: "dayGridMonth",
        dayMaxEventRows: true,
        events: [
          {
            id: 'a',
            title: 'my event',
            start: '2022-08-03',
            end: '2022-08-05',
            allDay: false,
            backgroundColor: '#69fcdb'
          }
        ],
        eventClick: this.select
      },
    };
  },
  async mounted () {
    const events = await this.$store.dispatch('getSchedules')
    events.forEach((item, index, arr) => { 
          const condition = (status) => item.backgroundColor === status
          events[index].backgroundColor = condition('Todo') ? '#FF6242' :  condition('Doing') ? '#FAA43A' : '#9ACD32'
    })
    this.calendarOptions.events = events
    
  },
  methods: {
    select(e) {
      this.$router.push(`/Subtask?subtask_id=${e.event._def.publicId}`)
    }
  }
};
</script>

<style scoped>
.fc-popover {
  color: #303030
}
</style>