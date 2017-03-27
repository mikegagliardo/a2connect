import Preferences from 'preferences';

const A2_PREF_NAME  = 'a2Prefs'
const prefs = {};

let a2Prefs = new Preferences(A2_PREF_NAME);

prefs.clearAll = () => {
  a2Prefs = {};
}

prefs.clearP = (k) => {
  delete a2Prefs[k];
}

prefs.setP = (k,v) => {
  a2Prefs[k] = v;
}

prefs.getP = (k) => {
  return a2Prefs[k];
}

export default prefs;