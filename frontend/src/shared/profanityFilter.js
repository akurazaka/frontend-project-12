import leoProfanity from 'leo-profanity';

const filterText = (text) => leoProfanity.clean(text);

export default filterText;
