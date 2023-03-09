function format2Decimals(str) {
  const num = +((+str).toFixed(2))
  return num
}

export {format2Decimals}