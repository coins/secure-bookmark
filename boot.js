
var state={hi: prompt("Choose state")};

let body = `<html>
<head>
<script>
var state = {JSON.stringify(state)}
window.onload = function(){
  document.write(state.hi)
}
</script>
</head>
<body>
</body>
</html>`


location = `data:text/html;base64,`+btoa(body);
