const multer = require('multer')
const path = require('path')
const fs = require('fs')

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/posts')
  },
  limits: {
    fileSize: 1000000 // 1000000 Bytes = 1 MB
  },

  filename: function(req, file, cb) {
    if (!file) req.images.push('')
    else {
      const fileName =
        file.fieldname + '_' + Date.now() + path.extname(file.originalname)
      cb(null, fileName)
      let filePath = `http://localhost:8000/public/posts/${fileName}`

      if (!req.images) req.images = [filePath]
      else req.images.push(filePath)
    }
  }
})
const upload = multer({ storage: storage })

function deleteImage(filePath) {
  filePath.forEach(path => {
    path = path.replace('http://localhost', '.')

    fs.unlink(path, err => {
      if (err) {
        console.error(err)
        return
      }
      console.log(`Deleted image: ${path}`)
    })
  })
}

module.exports = { upload, deleteImage }
