# SecureBookmarks

Let's say you want to run some critical app on your phone. For example:

- sign a cryptocurrency transaction
- encrypt/decrypt a private message
- calculate a 6 digit one-time-password
- run secure apps in a local network without SSL certificates
- or just store extremely private to-do list

and do all that in a scalable fashion that any user can verify. What would you do? Bad news is it wasn't possible at scale, until now.
## Traditional Solutions 
### App Store / Play Store
Any app served in centralized stores could be malicious. There is no way to verify if they are compiled correctly, even when the sources are public. From app developer to end user there is a long chain of trusted parties and all of them could compromise the code.

### Self Install
The next idea is to review the code locally and compile it yourself. For iOS you will need Testflight and a  $99/year account (https://developer.apple.com/programs/). For Android, you can install a self compiled .apk. These options are very cumbersome and don't scale to large user bases.

### Using the browser
Alright, if we can't use the stores because they are centralized and the apps cannot be reviewed, let's use the browser. A web app can be built so that it is easy to review. Still, of course, a centralized server would jeopardize source integrity but there is a better solution. 

## SecureBookmarks with Data URLs
Installing a secure app is possible with Data URLs and subresource integrity. Here's an example:

```
data:text/html,<script integrity=sha256-cb4FM5gL20dRVo8Fs0ogQ/A5EiARDJlOSySpIrosOVM src=https://example.com crossorigin></script>
```

This Data URL downloads the JavaScript at https://example.com and before execution it verifies that the source's hash equals `cb4FM5gL20dRVo8Fs0ogQ/A5EiARDJlOSySpIrosOVM`. So even if an attacker compromises the server there is no way to infect users with malicious code.

Usability-wise, a bookmarked web app can feel just like a native app thanks to browser features such as "add to home screen" and standalone mode.

## Demo 
[You can find a Bitcoin demo app here](https://coins.github.io/secure-bookmark/demo.html).

