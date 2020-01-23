
# FormData

    FormData对象用以将数据编译成键值对，以便用XMLHttpRequest来发送数据。其主要用于发送表单数据,
    但亦可用于发送带键数据(keyed data)，而独立于表单使用。如果表单enctype属性设为multipart/form-data
    则会使用表单的submit()方法来发送数据,从而,发送数据具有同样形式。
    
## FormData的方法

    FormData接口提供了一种表示表单数据的键值对的构造方式,经过她的数据可以使用XMLHttpRequest.send()方法
    送出。如果送出时的编码类型被设为 'multipart/form-data',它会使用和表单一样的格式。
    
    append()
        添加一个新值到FormData对象中,如果键不存在则会添加该键
        
    set()
        如果指定的键已经存在,FormData.set会使用新值覆盖已有的值。
        
    delete()
        从FormData对象中删除指定键
        
    entries()
        FormData.entries()方法返回一个iterator对象,此对象可以遍历访问FormData中的键值对。
        
    get()
        FormData的get()方法用于返回FormData对象中和指定的键关联的第一个值，如果你想要返回和指定键关联的全部值
        那么可以使用getAll()方法。
        
    getAll()
        getAll()方法会返回该 FormData 对象指定 key 的所有值
        返回一个数组
        
    has()
        返回一个布尔值,表示该FormData对象中是否含有某个key
        
    FormData.keys() 
        该方法返回一个迭代器（iterator），遍历了该 formData  包含的所有key 
    
    FormData.values()
        FormData.values() 方法返回一个允许遍历该对象中所有值的 迭代器 。这些值是 USVString 或是Blob 对象。