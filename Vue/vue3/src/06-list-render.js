const listRenderApp = createApp({
  setup () {
    const player = ref({
      firstName: 'kyrie',
      lastName: 'irving',
      age: 31
    })
    const todo_list = ref([
      {
        text: 'Vue',
        id: 1
      },
      {
        text: 'React',
        id: 2
      },
      {
        text: 'Angular',
        id: 3
      }
    ])
    const toggle = () => {
      todo_list.value.reverse()
    }
    return {
      player,
      message_list: [
        { message: 'Foo' },
        { message: 'Bar' }
      ],
      todo_list,
      toggle
    }
  }
})

listRenderApp.component('todo-item', {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  template: `<li>{{item.text}}</li>`
})


listRenderApp.mount('#list-render-app')