var url = "https://api.covid19api.com/summary"
fetch(url)
.then(res => res.json())
.then((out) => {
  console.log(out)
})
.catch(err => { throw err })