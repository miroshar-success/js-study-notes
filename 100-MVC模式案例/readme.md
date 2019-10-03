
# res

    res.send()
    返回HTTP response,可以传递Buffer object string Array等数据格式。
```js
res.send(new Buffer('whoop'));
res.send({ some: 'json' });
res.send('<p>some html</p>');
res.status(404).send('Sorry, we cannot find that!');
res.status(500).send({ error: 'something blew up' });
```
    相比于原生的 res.end(),可以传递的数据格式更多。