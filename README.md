# node.js notes

## Windows build x64

If `Python3.11` was installed through `Windows App Store` but failed to run `python --version` with error `permission denied`, check older installations in `PATH`, make sure the newly installed `python3.11` is ahead of older versions.

If `openssl` was installed through `vcpkg`, `vcpkg` must be disabled by command `vcpkg integrate remove`, then run `vcbuild.bat`. See [issue 23909](https://github.com/nodejs/node/issues/23909).

