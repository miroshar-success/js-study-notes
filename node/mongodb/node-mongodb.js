/*const {MongoClient} = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url,{useUnifiedTopology:true});
async function run(){
    try {
        console.time('start');
        await client.connect();
        const database = client.db('nba');
        const collection = database.collection('players');

        // const result = await collection.insertOne({firstName:'kyrie',lastName:'irving',age:28,sex:'male'})
        const result = await collection.findOne({firstName:'kyrie'});
        console.log(result);
        console.timeEnd('start');

    }finally{
        await client.close();
    }
}
run().catch((err) => {
    console.log(err);
})*/


// 单例模式
const MongoClient = require('mongodb').MongoClient;
const config = {
    url:'mongodb://localhost:27017',
    name:'nba'
}

class DataBase {
    constructor(){
        this.connect()
    }
    static DB() {
        if(!DataBase.instance) {
            DataBase.instance = new DataBase()
        }
        return DataBase.instance;
    }
    connect() {
        return new Promise((resolve,reject) => {
            MongoClient.connect(config.url,{useUnifiedTopology:true},(err,client) => {
                if(err) {
                    reject(err);
                }else{
                    const database = client.db(config.name);
                    resolve(database);
                }
            })
        })
    }
    findOne(collectionName,data){
        return new Promise((resolve,reject) => {
            this.connect().then((db) => {
                const data = db.collection(collectionName).findOne(data);
                data.toArray((err,result) => {
                    if(!err){
                        resolve(result);
                    }
                })
            })
        })
    }
    find(collectionName,json){
        return new Promise((resolve,reject)=>{
            this.connect().then((db)=>{
                var result = db.collection(collectionName).find(json);
                result.toArray(function(err,docs){
                    if(err){
                        reject(err);
                        return;
                    }
                    resolve(docs);
                })
            })
        })
    }
}

const database = DataBase.DB();
console.time('start1');
database.find('players',{firstName:'kyrie'}).then(result => {
    console.log(result);
    console.timeEnd('start1');
})

setTimeout(() => {
    console.time('start2');
    database.find('players',{firstName:'kyrie'}).then(result => {
        console.log(result);
        console.timeEnd('start2');
    })
},3000);