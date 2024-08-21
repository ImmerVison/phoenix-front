
import { acceptHMRUpdate, defineStore } from 'pinia'
export const useMainStore = defineStore('main', () => {
  const books = ref([])

  const currentBook = ref()

  try {
    books.value = JSON.parse(localStorage.getItem('todo-list') || '[]')
    if (!books.value?.length) {
      addBook()
    }
    const selectedBook = books.value.find((item) => item.selected)
    if (selectedBook) {
      currentBook.value = selectedBook
    }
  } catch (error) {
    books.value = []
  }


  function addBook() {
    books.value.map((item) => (item.selected = false))
    const book = {
      title: 'New List',
      id: Date.now().toString(),
      createdAt: Date.now(),
      items: [],
      selected: true
    }
    books.value = [book, ...books.value]
    currentBook.value = book
    sync()
  }

  const removeBook = (id) => {
    books.value.map((item) => (item.selected = false))
    books.value = books.value.filter((item) => item.id !== id)
    let selectedBook = books.value.find((item) => item.selected)
    if (!selectedBook) {
      selectedBook = books.value[0]
      books.value[0].selected = true
    }
    currentBook.value = selectedBook
    sync()
  }


  const updateBook = (title) => {
    books.value.map((item) => (item.selected = false))
    // currentBook.value = {...currentBook.value, title, selected: true} as Book
    currentBook.value = {...currentBook.value, title, selected: true}
    const index = books.value.findIndex((item) => item.id === currentBook.value?.id)
    if (index > -1) {
      books.value[index] = currentBook.value
    }
    console.log('update book finished')
    sync()
  }

  const addTodo = (content) => {
    const todo = {
      text: content,
      id: uuidv4(),
      createAt: Date.now(),
      done: false
    }
    currentBook.value.items = [todo, ...(currentBook.value?.items || [])]
    sync()
  }


  const removeTodo = (id) => {
    currentBook.value.items = currentBook.value.items.filter((item) => item.id !== id)
    sync()
  }

  const updateTodo = (id, content) => {
    const todo = currentBook.value.items.find((item) => item.id === id)
    if (todo) {
      todo.text = content
      sync()
    }
  }

  const markTodoDone = (id) => {
    const todo = currentBook.value.items.find((item) => item.id === id)
    if (todo) {
      todo.done = true
      todo.doneAt = Date.now()
      sync()
    }
  }

  const restoreTodoDone = (id) => {
    const todo = currentBook.value.items.find((item) => item.id === id)
    if (todo) {
      todo.done = false
      todo.doneAt = undefined
      sync()
    }
  }

  const setSelect = (id) => {
    const selectedBook = books.value.find((item) => item.id === id)
    if (selectedBook) {
      books.value.map((item) => (item.selected = false))
      selectedBook.selected = true
      currentBook.value = selectedBook
    }
    sync()
  }


  function sort(oldIndex, newIndex) {
    const item = currentBook.value.items[oldIndex]
    currentBook.value.items.splice(oldIndex, 1)
    currentBook.value.items.splice(newIndex, 0, item)
    sync()
  }

  function sync() {
    localStorage.setItem('todo-list', JSON.stringify(books.value))
  }


  return {
    books,
    currentBook,
    updateBook,
    updateTodo,
    addBook,
    addTodo,
    removeBook,
    removeTodo,
    setSelect,
    markTodoDone,
    restoreTodoDone,
    sort,


  }

})


export const useUserStore = defineStore('user', {
  state: () => ({
    // token
    token: '',
    // token 前缀
    tokenName: '',
  }),
  actions: {
    /** 设置 token */
    setToken(token) {
      this.token = token
    },
    /** 设置 token 前缀 */
    setTokenName(tokenName) {
      this.tokenName = tokenName
    },
  },
  persist: true,
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
