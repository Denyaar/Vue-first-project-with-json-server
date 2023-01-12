<template>
  <AddTask v-if="showAddTask" @add-task="addTask"/>
  <Tasks @toggle-reminder="toggleReminder" @delete-task="deleteTask" :tasks="tasks"/>
</template>

<script>
import Tasks from "@/components/Tasks";
import AddTask from "@/components/AddTask";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  props:{
    showAddTask:Boolean
  },

  components:{
    Tasks,
    AddTask
  },
  data() {
    return {
      tasks: [],
    }
  },
  methods: {

    async addTask(task) {
      const res = await fetch(`http://localhost:5000/tasks`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(task)
      })
      const data = await res.json();
      this.tasks = [...this.tasks, data]
    },


    async deleteTask(id) {
      if (confirm('Are you sure?')) {
        const res = await fetch(`http://localhost:5000/tasks/${id}`,
            {
              method: 'DELETE'
            })
        res.status === 200 ? (this.tasks = this.tasks.filter((task) => task.id !== id)) : alert('Error Deleting Task')
      }
    },

    async toggleReminder(id) {
      const taskToToggle = await this.fetchTask(id)
      const updTask = {...taskToToggle, reminder: !taskToToggle.reminder}
      const res = await fetch('http://localhost:5000/tasks/${id}', {
        method: 'PUT',
        headers: {
          'Content-tyoe': 'application/json'
        },
        body: JSON.stringify(updTask)
      })
      const data = await res.json();
      this.tasks = this.tasks.map((task) => task.id === id ? {...task, reminder: data.reminder} : task)
    },

    async fetchTasks() {
      const data = await fetch('http://localhost:5000/tasks');
      return await data.json();
    },

    async fetchTask(id) {
      const data = await fetch(`http://localhost:5000/tasks/${id}`);
      return await data.json();
    },
  },
    async  created() {
      this.tasks = await this.fetchTasks()
      //     [
      //   {
      //     id:1,
      //     text: 'Doctors Appointment',
      //     day: '3rd Maray 2023',
      //     reminder:true,
      //   },
      //   {
      //     id:2,
      //     text: 'Food Shopping',
      //     day: '3rd May 2023',
      //     reminder:true,
      //   },
      //   {
      //     id:3,
      //     text: 'Washing',
      //     day: '3rd Of June',
      //     reminder:false,
      //   },
      //   {
      //     id:4,
      //     text: 'Sexing',
      //     day: '3rd Of July',
      //     reminder:false,
      //   },
      //
      // ]
    }
}
</script>

<style scoped>

</style>