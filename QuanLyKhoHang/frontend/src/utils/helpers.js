import numeral from 'numeral';

numeral.register('locale', 'vi', {
  delimiters: {
    thousands: '.',
    decimal: ',',
  },
  abbreviations: {
    thousand: 'Nghìn',
    million: 'Triệu',
    billion: 'Tỷ',
    trillion: 'Nghìn Tỷ',
  },
  currency: {
    symbol: '₫',
  },
});
numeral.locale('vi');
export { numeral as numeralCustom };
