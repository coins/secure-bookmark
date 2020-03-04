/**
 * Secure Bookmark Bootloader
 * Compiles the app HTML and creates a base64 Data URL
 */

/**
 * Load or Create the crypto seed
 */
let seed;
let urlFragment = location.hash.substr(1)
if (urlFragment) {
    // there is already a seed stored within the URL
    seed = JSON.parse(urlFragment)
} else {
    // otherwise, we create a new seed
    seed = new Uint8Array(32)
    crypto.getRandomValues(seed)
    seed = Array.from(seed)
    // and we store it in the URL fragment
    history.pushState(0, 0, location.href + '#' + JSON.stringify(seed))
}

/**
 * 2: Bootstrap the app html 
 */
const bodyHTML = `<html>
  <head>
  <title>Bitcoin Demo</title>
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="shortcut icon" type="image/x-icon" href="https://bitcoin.robinlinus.com/images/icon-144x144.png">
  <!-- Homescreen icons -->
  <link rel="apple-touch-icon" sizes="144x144" href="https://bitcoin.robinlinus.com/images/icon-144x144.png">
  <style>
      html{
        font-family:system-ui;
      }
      
      #el_secret{
        word-break: break-all;
        user-select: all;
        font-family: monospace;
        padding: 8px;
        background: rgba(0,0,0,0.2);
        max-width: 260px;
      }

      #el_address{
        display:block;
        padding-bottom:16px;
      }
  </style>
  </head>
  <body translate="no">
    <h1>Bitcoin Demo App</h1>
    <h2>DISCLAIMER: EXPERIMENTAL DEMO</h2>
    DON'T USE REAL MONEY !! THIS IS EXPERIMENTAL CODE. 
    YOUR SECRET KEY IS EXPOSED IN YOUR BROWSER'S HISTORY
    <h2>Your Address</h2>
    <div>
      <a id="el_address" target="_blank"></a>
    </div>
    <button id="el_share">Share</button>
    <button id="el_copy">Copy</button>

    <h2>Your Secret Key</h2>
    <div id="el_secret"></div>

    <h2 id="el_install">Install on Mobile: Press + and "Add to home screen"
      <br><br>
     Install on Desktop: Press CTRL+D or CMD+D to bookmark this app
    </h2>

    <script src="https://coins.github.io/secure-bookmark/demo/bitcoin.min.js" integrity="sha256-wYrSlO5fsak7WTxJ9VxtZRB/DFpatfv/cEgUXs5/FtQ" crossorigin></script>
    <script src="https://coins.github.io/secure-bookmark/demo/clipboard.js" integrity="sha256-3VCByRM+Ge37Dm+yksb03tsaCAq9n1rDui/BpHhyIMA=" crossorigin></script>

    <script>
      const address = Bitcoin.ECKey(seed).getBitcoinAddress().toString()
      
      el_address.textContent = address;
      el_address.href = "https://blockstream.info/address/" + address;

      el_secret.textContent = Bitcoin.convert.bytesToHex(seed)

      el_share.onclick = _ => {
          navigator.share({text: "Here's my bitcoin address " + address });
      }

      el_share.hidden = !navigator.share

      el_copy.onclick = _ => {
          navigator.clipboard.writeText(address)
      }

      el_install.hidden = !!window.navigator.standalone
    </script>
  </body>
  </html>`

document.write(bodyHTML)
