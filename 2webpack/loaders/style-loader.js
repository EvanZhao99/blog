function loader(source) {
  console.log('style-loader~~~~~~~~~~~~~~~~~~~~~~~~~')
  let code = `let style = document.createElement('style')
    style.innerHTML = ${JSON.stringify(source)}
    document.head.appendChild(style)
  `
  // 回车转成明文的\n(\\n)
  return code.replace(/\\/g, '\\\\')
}

module.exports = loader