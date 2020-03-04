## Encodings
The following are interesting Data URL encoding examples:

```html
data:text/html,<script integrity='sha256-zC+dNFewSYDLmqdv0OvyUhKfUWXlfIySrKfYzjgxuA4=' src='https://coins.github.io/secure-bookmark/encodings/foo.js' crossorigin></script>
```

```html
data:text/html,<script integrity='sha256-sFHon+re/xKBUEHD0J8Vw0kJzU3Lmz9pBEan/YVLNdg=' crossorigin src='data:application/javascript,s=document.createElement(`script`);s.integrity=`sha256-zC+dNFewSYDLmqdv0OvyUhKfUWXlfIySrKfYzjgxuA4=`;s.src=location.hash.substr(1);s.crossOrigin=1;document.head.append(s)'></script>#data:application/javascript;base64,YWxlcnQoJ1NvdXJjZSBpbnRlZ3JpdHkgdmVyaWZpZWQhJykK
```

```html
data:text/html,<script integrity='sha256-sFHon+re/xKBUEHD0J8Vw0kJzU3Lmz9pBEan/YVLNdg=' crossorigin src='data:application/javascript,s=document.createElement(`script`);s.integrity=`sha256-zC+dNFewSYDLmqdv0OvyUhKfUWXlfIySrKfYzjgxuA4=`;s.src=location.hash.substr(1);s.crossOrigin=1;document.head.append(s)'></script>#data:application/javascript,alert('Source%20integrity%20verified!')%0A
```

```html
data:text/html,<script integrity='sha256-sFHon+re/xKBUEHD0J8Vw0kJzU3Lmz9pBEan/YVLNdg=' crossorigin src='data:application/javascript,s=document.createElement(`script`);s.integrity=`sha256-zC+dNFewSYDLmqdv0OvyUhKfUWXlfIySrKfYzjgxuA4=`;s.src=location.hash.substr(1);s.crossOrigin=1;document.head.append(s)'></script>#https://coins.github.io/secure-bookmark/encodings/foo.js
```

```html
data:text/html,<script integrity='sha256-sFHon+re/xKBUEHD0J8Vw0kJzU3Lmz9pBEan/YVLNdg=' crossorigin src='data:application/javascript;base64,cz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KGBzY3JpcHRgKTtzLmludGVncml0eT1gc2hhMjU2LXpDK2RORmV3U1lETG1xZHYwT3Z5VWhLZlVXWGxmSXlTcktmWXpqZ3h1QTQ9YDtzLnNyYz1sb2NhdGlvbi5oYXNoLnN1YnN0cigxKTtzLmNyb3NzT3JpZ2luPTE7ZG9jdW1lbnQuaGVhZC5hcHBlbmQocyk'></script>#https://coins.github.io/secure-bookmark/encodings/foo.js
```

This demonstrates that subresource integrity does not care if the `src` is a external URL or a Data URL. They're interchangeable. 


## Top-Level Navigation 
Top-level navigation to Data URLs is disabled in Chrome and Firefox. Fortunately we can use `pushState` to to store data persistently before bookmarking the URL:
```
history.pushState(0,0,location.href+'#data')
```