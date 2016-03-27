angular
  .module('starterApp', ['ngMaterial', 'users', 'datamaps'])
  .config(function($mdThemingProvider, $mdIconProvider){

    $mdIconProvider
      .defaultIconSet("app/assets/svg/avatars.svg", 128)
      .icon("menu"       , "app/assets/svg/menu.svg"        , 24)
      .icon("share"      , "app/assets/svg/share.svg"       , 24)
      .icon("link"       , "app/assets/svg/link.svg"       , 24)
      .icon("twitter"    , "app/assets/svg/twitter.svg"     , 512)
      .icon("phone"      , "app/assets/svg/phone.svg"       , 512);

      $mdThemingProvider.theme('default')
        .primaryPalette('blue-grey')
        .accentPalette('red');

  })
