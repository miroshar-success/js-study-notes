window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
window.IDBTransaction = window.IDBTransaction || window.msIDBTransaction
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

const player_list = [
  {
    firstName: 'kyrie',
    lastName: 'irving',
    age: 30,
    id: 1
  },
  {
    firstName: 'lebron',
    lastName: 'james',
    age: 38,
    id: 2
  },
  {
    firstName: 'kevin',
    lastName: 'durant',
    age: 34,
    id: 3
  }
]
const request = window.indexedDB.open('player_list')
console.log('request', request) // IDBOpenDBRequest

request.onerror = function(event) {
  console.log('error')
}
request.onupgradeneeded = function(event) {
  const db = event.target.result
  if(!db.objectStoreNames.contains('myStore')) {
    const objectStore = db.createObjectStore('myStore', { keyPath: 'id'})
    objectStore.transaction.oncomplete = function(event) {

    }
  }
}

// ------------ 开启一饿事务才能对你的创建的数据库进行操作 ------------
// readonly / readwrite / versionchange
// 使用IDBDatabase.transaction 启动一个事务, 该方法接受两个参数: storeNames, 事务mode.
