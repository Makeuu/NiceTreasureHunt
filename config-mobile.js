// This section sets up some basic app metadata,
// the entire section is optional.
App.info({
  id: 'nice.treasure.hunt',
  name: 'Nice-Evry',
  description: '',
  author: 'Evry And Nice Developpment Group',
  email: 'mattdu77@live.fr',
  website: 'https://nicetreasure.herokuapp.com/'
});
// Set up resources such as icons and launch screens.
App.icons({
  //'iphone': 'icons/icon-60.png',
  //'iphone_2x': 'icons/icon-60@2x.png',
  // ... more screen sizes and platforms ...
});
App.launchScreens({
  //'iphone': 'splash/Default~iphone.png',
  //'iphone_2x': 'splash/Default@2x~iphone.png',
  // ... more screen sizes and platforms ...
});
// Set PhoneGap/Cordova preferences
App.setPreference('BackgroundColor', '0xff0000ff');
App.setPreference('HideKeyboardFormAccessoryBar', true);
App.setPreference('Orientation', 'default');
App.setPreference('Orientation', 'all', 'ios');

// Add custom tags for a particular PhoneGap/Cordova plugin
// to the end of generated config.xml.
// Universal Links is shown as an example here.
App.appendToConfig(`
  <universal-links>
    <host name="https://nicetreasure.herokuapp.com/" />
  </universal-links>
`);
