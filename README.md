# eth-bin-to-method-ids

Extracts the four byte methodIds from EVM byte code.
Uses naive static analysis to look for entrypoints based on common Solidity->EVM patterns.

### usage
```js
const binToMethodIds = require('eth-bin-to-method-ids')
const code = Buffer.from('6060604052...', 'hex')

const methodIds = binToMethodIds(code)
console.log(methodIds)
// => [
//   '0230a07c',
//   '13c89a8f',
//   '15f73331',
//   '22ec1244'
//   ]
```