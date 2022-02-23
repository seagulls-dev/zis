export const downloadTxtFile = (string: string, name = 'downloaded.txt') => {
  const element = document.createElement('a')
  const file = new Blob([string], { type: 'text/plain' })
  element.href = URL.createObjectURL(file)
  element.download = name
  document.body.appendChild(element)
  element.click()
}
