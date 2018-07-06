function convert(money) {
  let reverse = money.toString().split('').reverse().join('');
  let ribuan = reverse.match(/\d{1,3}/g)
  let hasilConvert = ribuan.join('.').split('').reverse().join('');
  return `Rp. ${hasilConvert}`
}

module.exports = convert
// console.log("Rp.", convert(250000))