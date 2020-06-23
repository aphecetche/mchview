import fs from "fs";

const readOptions={
    highWaterMark:16*1024
}
//const readable = fs.createReadStream("./digits.in",readOptions);
const readable = fs.createReadStream("./dpl-out.bin",readOptions);

let maxsize = 17000;
let i = 0
readable.on('data',(chunk)=> {
    console.log(typeof chunk, chunk.length,readable.bytesRead)
    i += chunk.length
    for (let j=0;j<chunk.length;j+=1) {
        let x = chunk.readUInt8(j) 
        console.log(x.toString(16), " ")
    }
    if (i>maxsize) {
        process.exit(1)
    }
})

readable.on('end',()=>{
    console.log("this is the end my friend")
})
