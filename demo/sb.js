/**
 * Secure Bookmark Bootloader
 * Compiles the app HTML and creates a base64 Data URL
 */

/**
 * 1: Create some random seed
 */
let seed = new Uint8Array(32)
crypto.getRandomValues(seed)
seed = Array.from(seed)

/**
 * 2: Bootstrap the app html and store the seed by hard-coding it
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
    <h2>Your Address</h2>
    <div>
      <a id="el_address" target="_blank"></a>
    </div>
    <button id="el_share">Share</button>
    <button id="el_copy">Copy</button>

    <h2>Your Secret Key</h2>
    <div id="el_secret"></div>

    <h2 id="el_install">To install App: Press + and "Add to home screen"<h2>

    <script src="https://coins.github.io/secure-bookmark/demo/bitcoin.min.js" integrity="sha256-wYrSlO5fsak7WTxJ9VxtZRB/DFpatfv/cEgUXs5/FtQ" crossorigin></script>
    <script src="https://coins.github.io/secure-bookmark/demo/clipboard.js" integrity="sha256-3VCByRM+Ge37Dm+yksb03tsaCAq9n1rDui/BpHhyIMA=" crossorigin></script>

    <script>
      const seed = ${JSON.stringify(seed)}
      const address = Bitcoin.ECKey(seed).getBitcoinAddress().toString();
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

/*
 * 3: Compile the app into a Data URL 
 */
const sourceFile = `data:text/html;base64,` + btoa(bodyHTML)

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
  <h2>Step 2: Bootloader Demo</h2>
  <a href="${sourceFile}" class="installer">Drag me into your browser's tab bar</a>
  <style>
    .installer{
      background-color: #00796b;
      color:white;
      fill:white;
      font-family: system-ui;
      display: flex;
      align-items: center;
      padding: 16px 24px;
      border-radius: 64px;
      box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.14),
            0 1px 8px 0 rgba(0, 0, 0, 0.12),
            0 3px 3px -2px rgba(0, 0, 0, 0.4);
        text-decoration: none;
        font-size: 16px;
        max-width: 360px;
        margin-left: 8px;
    }

    .installer:before {
        content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 0 24 24' width='24'%3E%3Cpath fill='white' d='M10 9h4V6h3l-5-5-5 5h3v3zm-1 1H6V7l-5 5 5 5v-3h3v-4zm14 2l-5-5v3h-3v4h3v3l5-5zm-9 3h-4v3H7l5 5 5-5h-3v-3z'/%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3C/svg%3E");
        margin-right: 16px;
    }
  </style>
`)
