/**
 * 1: Create some random seed
 */
let seed = new Uint8Array(32)
crypto.getRandomValues(seed)
seed = Array.from(seed)

/**
 * 2: Bootstrap the app html and store the seed by hard-coding it
 */
const body = `<html>
  <head>
  <title>Bitcoin Demo</title>
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="shortcut icon" type="image/x-icon" href="https://bitcoin.robinlinus.com/images/icon-144x144.png">
  <!-- Homescreen icons -->
  <link rel="apple-touch-icon" sizes="144x144" href="https://bitcoin.robinlinus.com/images/icon-144x144.png">
  </head>
  <body>
    <h1>Bitcoin Demo App</h1>
    <h2>Your Address</h2>
    <div id="$address"></div>
    <button id="$share">Share</button>
    <button id="$copy">Copy</button>

    <h2>Secret Key</h2>
    <div id="$secret"></div>

    <h2 id="$install" class="install">To install App: Press + and "Add to home screen"<h2>

    <script src="https://coins.github.io/secure-bookmark/bitcoin.min.js" integrity="sha256-wYrSlO5fsak7WTxJ9VxtZRB/DFpatfv/cEgUXs5/FtQ" crossorigin></script>
    <script src="https://coins.github.io/secure-bookmark/clipboard.js" integrity="sha256-3VCByRM+Ge37Dm+yksb03tsaCAq9n1rDui/BpHhyIMA=" crossorigin></script>

    <script>
      const seed = ${JSON.stringify(seed)}
      const address = Bitcoin.ECKey(seed).getBitcoinAddress().toString();
      $address.textContent = address;

      $secret.textContent = Bitcoin.convert.bytesToHex(seed)

      $share.onclick = _ => {
          navigator.share({text: "Here's my bitcoin address " + address });
      }

      $share.hidden = !navigator.share

      $copy.onclick = _ => {
        navigator.clipboard.writeText(address)
      }

      $install.hidden = !!window.navigator.standalone
    </script>
    
    <style>
      div{
        word-break: break-all;
        user-select:all;
      }
    </style>
  </body>
  </html>`

/*
 * 3: Compile the app into a Data URL 
 */
const sourceFile = `data:text/html;base64,` + btoa(body)

/*
 * 4: Try to redirect to the Data URL
 * (Chrome and Firefox don't allow top-level navigation to Data URLs )
 */
window.location = sourceFile

/*
 * 5: Otherwise, fall back to a workaround
 * Ask user to install manually
 */
document.write(`
  <h1>Secure Bootloader Demo</h1>
  <a href="${sourceFile}">Drag me to address bar and press enter</a>
`)
