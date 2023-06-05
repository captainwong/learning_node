[廖雪峰JavaScript教程](https://www.liaoxuefeng.com/wiki/1022910821149312)

chrome devtools report:

```
Channel: Error in handleResponse UNK/SW_UNREACHABLE options getValue
_handleResponsePromise @ commons.js:2
(anonymous) @ commons.js:2
7commons.js:2 
Uncaught (in promise) Error: Could not establish connection. Receiving end does not exist.
fromGeneric @ commons.js:2
fromAny @ commons.js:2
_handleResponsePromise @ commons.js:2
(anonymous) @ commons.js:2
```

That's because Evernote Clipper extension was installed and not logged in. Try login.

See [Console Channel: Error in handleResponse UNK/SW_UNREACHABLE error](https://discussion.evernote.com/forums/topic/145285-console-channel-error-in-handleresponse-unksw_unreachable-error/)

2023-6-5 11:43:31：

no it does not work perfectly, refresh the page will cause the same error again.

only allow Evernote Clipper on click also not working.

I had to disable it...


