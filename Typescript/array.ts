interface DataItem {
  name:string
  url:string
  data:Array<DataItem> | []
}

// interface DeepArray<DataItem> extends Array<DataItem | DeepArray<DataItem>> {}
interface DeepArray<T> extends Array<T | DeepArray<T>> {}

const data:DataItem[] = [
  {
    name:'hello',
    url:'/hello',
    data:[]
  },
  {
    name:'world',
    url:'/world',
    data:[
      {
        name:'hello',
        url:'/hello',
        data:[
          {
            name:'string',
            url:'/string',
            data:[]
          }
        ]
      }
    ]
  }
]
