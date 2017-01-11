import colors from 'colors';

export default (text, e) => {
  console.log('');
  console.error('ERROR:'.bgRed.bold);
  console.error(text);

  if(e) {
    console.log('');
    console.error('ADDITIONAL INFORMATION:'.bgRed.bold);
    console.log(e);
  }
}