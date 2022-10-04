const sampleFunc = async () => {
  console.log('I am function')
  const resp = await fetch('http://localhost:5000')
  console.log(resp)
}

sampleFunc()