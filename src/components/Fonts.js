const FontFaceObserver = require('fontfaceobserver')

const Fonts = () => {
  const link = document.createElement('link')
  link.href = 'https://fonts.googleapis.com/css?family=Baloo+Bhaina+2&display=swap'
  link.rel = 'stylesheet'

  document.head.appendChild(link)
}

export default Fonts