/**
 * @description 视频文件上传
*/
const { videoModel, videoCommentModel } = require('../model/index')

const upload = async (ctx) => {
  const { id } = ctx.userinfo
  try {
    const { filepath, newFilename, originalFilename } = ctx.request.files.file
    await videoModel.create({
      uploader: id,
      title: newFilename,
      description: originalFilename,
      url: filepath
    })
    ctx.body = {
      code: 200,
      msg: '上传成功'
    }
  } catch(err) {
    ctx.body = {
      msg: err,
      code: 0
    }
  }
}

/**
 * @description 获取视频列表
*/
const get_video_list = async ctx => {
  try {
    const { size = 30, page = 1 } = ctx.request.body || {}
    const video_list = await videoModel.find()
      .skip((page - 1) * size ).limit(size).populate({
        path: 'uploader',
        model: 'User',
        strictPopulate: false,
        select: 'username _id'
      })
    ctx.body = {
      code: 200,
      data: video_list
    }
  } catch (err) {
    console.log(err)
    ctx.body = {
      code: 0,
      msg: err
    }
  }
}

/**
 * @description 视频评论
*/
const video_comment = async (ctx) => {
  const { id, content } = ctx.request.body
  const user_id = ctx.userinfo.id
  try {
    const findVideo = videoModel.findById(id)
    if (!findVideo) {
      return ctx.body = {
        code: 0,
        msg: '视频不存在'
      }
    }
    await videoCommentModel.create({
      video: id,
      content,
      user: user_id
    })
    ctx.body = {
      code: 200,
      msg: '评论成功'
    }
  } catch (err) {
    ctx.body = {
      code: 0,
      msg: err
    }
  }
}

module.exports = {
  upload,
  video_comment,
  get_video_list
}