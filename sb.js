/**
 * 1: we create some random seed
 */
let seed = new Uint8Array(32)
crypto.getRandomValues(seed)
seed = Array.from(seed)

/**
 * 2: we bootstrap our app containing the seed
 */
const body = `<html>
  <head>
  <title>Bitcoin App Demo</title>
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="shortcut icon" type="image/x-icon" href="https://bitcoin.robinlinus.com/images/icon-144x144.png">
  <!-- Homescreen icons -->
  <link rel="apple-touch-icon" sizes="144x144" href="https://bitcoin.robinlinus.com/images/icon-144x144.png"/>
  </head>
  <body>
    <h1>Bitcoin Demo App</h1>
    <h2>Your Address</h2>
    <div id="$address"></div>
    <h2>To install: Press + and "Add to home screen"<h2>
    <button id="$share">Share</button>
    <script src="https://coins.github.io/secure-bookmark/bitcoin.min.js" integrity="sha256-wYrSlO5fsak7WTxJ9VxtZRB/DFpatfv/cEgUXs5/FtQ" crossorigin></script>

    <script>
      const seed = ${JSON.stringify(seed)}
      const address = Bitcoin.ECKey(seed).getBitcoinAddress().toString();
      $address.textContent = address;

      $share.onclick = _ => {
          navigator.share({text:"Here's my bitcoin address "+address});
      }

      $share.hidden = !navigator.share

      $install.hidden = !!window.navigator.standalone
    </script>
    
    
  </body>
  </html>`

/*
 * 3: We store the app in a data url
 */
const sourceFile = `data:text/html;base64,` + btoa(body)

/*
 * 4: try to redirect (chrome and firefox don't allow top-level navigation to Data URLs )
 */
window.location = sourceFile

/*
 * 5: fallback to workaround
 */

document.write(`
  <h1>Secure Bootloader Demo</h1>
  <a href="${sourceFile}">To install app drag me to address bar</a>
`)
