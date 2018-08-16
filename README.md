# Minimitter2

A mini event emitter.

## Installation

`npm install minimitter2`

## Usage

```js
var Minimitter = require('minimitter2')
var emitter = new Minimitter()
```

##### Supported API:
```ts
interface Minimitter {
    emit(eventName: string, ...args: any[]): boolean
    on(eventName: string, listener: Function): Minimitter
    once(eventName: string, listener: Function): Minimitter
    off(eventName: string, listener: Function): Minimitter
    removeListener(eventName: string, listener: Function): Minimitter
    removeAllListeners(eventName: string): Minimitter
}
```

##### Extending object:
```js
const Minimitter = require("minimitter2")

class Example {
    constructor() {
        Minimitter.extend(this)
    }
}

const x = new Example()
x.on("event", () => {
    //
})
x.emit("event")
```

## Development and testing

Run `npm install` to get the dependencies. Run `jasmine` to run the Jasmine tests.
