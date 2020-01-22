const http = require('http');
const url = require('url');

const data = {
    players:[
        {
            id:1,
            name:"lebron",
            age:35
        },
        {
            id:2,
            name:"kyrie",
            age:27
        },
        {
            id:3,
            name:"durant",
            age:31
        },
        {
            id:4,
            name:"curry",
            age:30
        }
    ],
    ages:[
        {
            name:"lebron",
            age:35
        },
        {
            name:"kyrie",
            age:27
        },
        {
            name:"durant",
            age:31
        },
        {
            name:"curry",
            age:30
        }
    ]
}

const server = http.createServer((req,res) => {
    res.writeHead(200,{
        "Content-Type":"text/html;charset=utf-8",
        "Access-Control-Allow-Origin":"*",
        "Access-Control-Allow-Methods":"GET,PUT,POST",
        "Access-Control-Allow-Credentials":true
    })
    let obj = url.parse(req.url,true);
    if(obj.pathname === "/players"){
        if(obj.query.id){
            let id = obj.query.id;
            let result = data.players.find((item) => {
                return item.id == id;
            })
            res.end(JSON.stringify(result));
        }else{
            res.end(JSON.stringify(data.players));
        }
    }else if(obj.pathname === "/ages"){
        if(obj.query.age){
            let age = obj.query.age;
            let result = data.ages.find((item) => {
                return item.age == age;
            })
            res.end(JSON.stringify(result));
        }else{
            res.end(JSON.stringify(data.ages));
        }
    }
});

server.listen(3030,() => {
    console.log('app staring at port 3030');
})