const { unlink } = require('fs/promises')
async function delete_file () {
  try {
    await unlink('./data/input.txt')
  } catch(error) {
    console.log('error:', error.message)
  }
}

delete_file()