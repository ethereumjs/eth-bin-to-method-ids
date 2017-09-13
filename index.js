const binToOps = require('eth-bin-to-ops')

const finalOps = ['JUMP', 'STOP', 'INVALID', 'REVERT']

module.exports = binToMethodIds
module.exports.opsToMethodIds = opsToMethodIds


function binToMethodIds(code) {
  const ops = binToOps(code)
  return opsToMethodIds(ops)
}

function opsToMethodIds(ops){
  const methodIds = []
  for (let index = 0; index < ops.length; index++) {
    const op = ops[index]

    if (op.name === 'JUMPI') {
      // found methodId
      const pushOp = searchBackwardsForOp(ops, index, 'PUSH4')
      if (!pushOp) continue
      const methodId = pushOp.pushData
      const methodIdString = methodId.toString('hex')
      methodIds.push(methodIdString)
    } else if (finalOps.includes(op.name)) {
      // end of methodIds
      break
    }
  }
  return methodIds
}

function searchBackwardsForOp(ops, startIndex, targetOpName){
  const reversePartialList = ops.slice(0, startIndex + 1).reverse()
  return reversePartialList.find(op => op.name === targetOpName)
}