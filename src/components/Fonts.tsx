const Fonts = () => {
  const link = document.createElement('link')

  link.href = 'https://fonts.googleapis.com'
  link.href = 'https://fonts.gstatic.com'
  link.href =
    'https://fonts.googleapis.com/css2?family=Abel&family=Amatic+SC&family=Fuzzy+Bubbles&family=Josefin+Sans:wght@100;300;400&display=swap'
  link.rel = 'stylesheet'

  document.head.appendChild(link)
}

export default Fonts
