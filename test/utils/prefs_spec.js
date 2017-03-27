import {expect, assert} from 'chai';
import Preferences from 'preferences';
import rewire from 'babel-plugin-rewire';
import prefs from '../../src/utils/prefs.js';

const TEST_PREF = 'testPref';

describe('Prefs', () => {
  before(() => {
    prefs.__Rewire__('a2Prefs', new Preferences(TEST_PREF));
  });

  afterEach(() => {
    prefs.clearAll();
  });

  it('Should clear all preferences', () => {
    prefs.setP('fake', 'value');
    prefs.clearAll();
    
    expect(prefs.__get__('a2Prefs')).to.eql({});
  });

  it('Should set a preference', () => {
    const myPref = {
      myKey: 'myValue'
    };

    prefs.setP('myPref', myPref);

    expect(prefs.getP('myPref')).to.eql(myPref);
  });

  it ('Should delete a preference', () => {
    const myPref = {
      myKey: 'myValue'
    };

    prefs.setP('myPref', myPref);
    prefs.clearP('myPref');

    assert.isUndefined(prefs.getP('myPref'));
  });
});