const nodeHtmlToImage = require('node-html-to-image')

const htmlToImageBuffer = ({ htmlCode, objContent }) => {
  return nodeHtmlToImage({
    html: htmlCode,
    content: objContent
  })
}

module.exports = {
  htmlToImageBuffer
}
