"use strict";
class Data {
    ReadStream(stream) {
        let output = stream.ReadStream();
        console.log(output.byteLength);
    }
}
class WebStream {
    ReadStream() {
        let array = new Int8Array(8);
        for (let index = 0; index < array.length; index++) {
            array[index] = index + 3;
        }
        return array;
    }
}
class DiskStream {
    ReadStream() {
        let array = new Int8Array(20);
        for (let index = 0; index < array.length; index++) {
            array[index] = index + 3;
        }
        return array;
    }
}
const webStream = new Data();
const diskStream = new Data();
webStream.ReadStream(new WebStream());
diskStream.ReadStream(new DiskStream());
