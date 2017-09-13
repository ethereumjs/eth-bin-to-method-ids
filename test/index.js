const test = require('tape')
const binToMethodIds = require('../index')
const omiseGoTokenBin = require('./contracts/OmiseGo_Token.bin')
const omiseGoTokenAbi = require('./contracts/OmiseGo_Token.json')
const ensRegistrarBin = require('./contracts/EnsRegistrar.bin')
const ensRegistrarAbi = require('./contracts/EnsRegistrar.json')
const abiUtils = require('ethereumjs-abi')

test('omisego token test', (t) => {
  runTest(t, omiseGoTokenAbi, omiseGoTokenBin)
})

test('ens test', (t) => {
  runTest(t, ensRegistrarAbi, ensRegistrarBin)
})

function runTest(t, abi, code){
  // load expected methodIds from ABI
  const abiMethods = abi.filter((entry) => entry.type === 'function')
  const expectedMethodIds = abiMethods.map(getMethodId)
  // read methodIds from binary
  const methodIds = binToMethodIds(code)
  // validate result
  t.ok(Array.isArray(methodIds), 'result is array')
  t.ok(methodIds.length > 0, 'result has at least one match')
  t.deepEqual(methodIds, expectedMethodIds, 'result matches ABI methodIds')
  t.end()
}

function getMethodId(method){
  return abiUtils.methodID(method.name, method.inputs.map(input => input.type)).toString('hex')
}