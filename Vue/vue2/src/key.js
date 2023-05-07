new Vue({
  el: '#key-app',
  data() {
    return {
      player_list: [
        {
          firstName: 'lebron',
          lastName: 'james',
          age: 38
        },
        {
          firstName: 'kevin',
          lastName: 'durant',
          age: 34
        },
        {
          firstName: 'kobe',
          lastName: 'bryant',
          age: 40
        },
        {
          firstName: 'kyrie',
          lastName: 'irving',
          age: 31
        }
      ],
      is_email: false
    }
  },
  methods: {
    increment() {
      this.player_list.sort((a, b) => a.age - b.age)
    }
  }
})