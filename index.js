const { Readable } = require("stream");

const peaks = [
  "Tallac",
  "Ralston",
  "Rubicon",
  "Twin Peaks",
  "Castle Peak",
  "Rose",
  "Freal Peak",
];

class StreamFromArray extends Readable {
  constructor(array) {
    // stream reads data in binary mode so we need to convert it to utf-8 so as to return strings
    // super({ encoding: "utf-8" });
    super({ objectMode: true }); //stream would return the data as object
    this.array = array;
    this.index = 0;
  }

  // inherit _read method from Readable class
  _read() {
    if (this.index <= this.array.length) {
      //   const chunk = this.array[this.index];
      const chunk = {
        data: this.array[this.index],
        index: this.index,
      };
      this.push(chunk); // this push data into the stream
      this.index++;
    } else {
      this.push(null); // this signify the end of the streaming
    }
  }
}

const peakStream = new StreamFromArray(peaks);
peakStream.on("data", (chunk) => console.log(chunk));
peakStream.on("end", () => console.log("done"));
