document.write(`
<html><head><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body>
<style>
.sbsnippet{
  width: 100%;
  height: 50px; 
}
</style>
<p>Choose first number (stored in state)</p>
<input id="base" value=42>

<p>This is final URL to save as a bookmark: (click to copy)</p>
<textarea class="sbsnippet" id="sourceArea" readonly=true></textarea>
</body>
</html>`)

base.oninput=function(){

  let body = `<html>
  <head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body>
  <p>Add number:</p>
  <input id="base2" value="0">
  <h1 id="outcome">outcome</h1>

  <script>
  var state = ${JSON.stringify({base: Number(base.value)})}
  update = function(){
    let second = Number(base2.value)
    outcome.innerHTML = \`stored \${state.base} + current \${second} = \${state.base+second}\`
  }
  window.onload = update
  base2.oninput = update
  </script>
  </body>
  </html>`

  sourceArea.value = `data:text/html;base64,`+btoa(body);
}
base.oninput()

sourceArea.onclick = function(){
  var range = document.createRange();
  range.selectNodeContents(sourceArea);

  var s = window.getSelection();
  s.removeAllRanges();
  s.addRange(range);

  sourceArea.setSelectionRange(0, 9999999);
  document.execCommand('copy')
}