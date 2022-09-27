const download = require('download-git-repo')

download('direct:https://github.com/JayK0818/VuePress-Blog.git', './temp', {clone: true}, err => {
  console.log(err)
})