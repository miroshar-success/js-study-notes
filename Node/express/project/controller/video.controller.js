const formidable = require('formidable')
const { image_model, video_model, video_thumb_model } = require('../model/index')
const path = require('path')
// 上传文件
const file_upload_image = async (req, res) => {
  const form = formidable({
    multiples: true,
    keepExtensions: true,
    uploadDir: path.resolve(__dirname, '../public/images')
  })
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(200).json({
        code: 0,
        msg: '上传失败'
      })
    }
    try {
      const { newFilename } = files.file
      await image_model.create({
        url: `/images/${newFilename}`,
        filename: newFilename
      })
      res.status(200).json({
        code: 200,
        msg: '上传成功'
      })
    } catch (err) {
      res.status(200).json({
        code: 0,
        msg: err
      })
    }
  })
}

const search_image_list = async (req, res) => {
  try {
    const image_list = await image_model.find()
    res.status(200).json({
      code: 200,
      data: image_list
    })
  } catch(err) {
    res.status(200).json({
      code: 0,
      data: []
    })
  }
}

// 上传视频
const file_upload_video = async (req, res) => {
  const { id } = req.user
  const form = formidable({
    multiples: true,
    keepExtensions: true,
    uploadDir: path.resolve(__dirname, '../public/videos')
  })
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(200).json({
        code: 0,
        msg: '上传失败'
      })
    }
    try {
      const { newFilename, originalFilename } = files.file
      await video_model.create({
        filename: `${newFilename}`,
        url: `/videos/${newFilename}`,
        user: id,
        title: originalFilename
      })
      return res.status(200).json({
        code: 200,
        msg: '上传成功'
      })
    } catch(err) {
      return res.status(200).json({
        code: 0,
        msg: err
      })
    }
  })
}

// 获取视频列表
const search_video_list = async (req, res) => {
  try {
    const video_list = await video_model.find().populate({
      path: 'user',
      strictPopulate: false,
      select: '_id, username'
    })
    console.log(video_list)
    res.status(200).json({
      code: 0,
      data: video_list
    })
  } catch(err) {
    res.status(200).json({
      code: 0,
      data: []
    })
  }
}

// 获取视频详情
const search_video_detail = async (req, res) => {
  try {
    const { id } = req.params
    const video = await video_model.findById(id).populate({
      path: 'user',
      strictPopulate: false,
      select: '_id, username'
    })
    if (!video) return res.status(200).json({
      code: 0,
      msg: '视频不存在'
    })
    // 是否点赞和点踩
    let like = false, dislike = false;
    const thumb_data = await video_thumb_model.findOne({
      user: req.user.id
    })
    if (thumb_data) {
      like = thumb_data.like,
      dislike = thumb_data.dislike
    }
    return res.status(200).json({
      code: 0,
      data: {
        like,
        dislike,
        ...video.toJSON()
      }
    })
  } catch(err) {
    return res.status(200).json({
      code: 0,
      data: null
    })
  }
}

module.exports = {
  file_upload_image,
  file_upload_video,
  search_image_list,
  search_video_list,
  search_video_detail
}