/**
 * Demo for GameClosure DevKit Chartboost Module
 */

import ui.TextView as TextView;
import src.views.LogView as LogView;
import src.views.ButtonView as ButtonView;
import device;

import chartboost;


exports = Class(GC.Application, function () {

  this.initUI = function () {
    this.view.style.backgroundColor = 'white';
    this.header = new TextView({
      superview: this.view,
      text: "Chartboost Demo",
      color: "black",
      x: 0,
      y: 25,
      width: this.view.style.width,
      height: 100
    });

    var buttonPadding = 20;
    var buttonWidth = (this.view.style.width - (buttonPadding * 2));
    var buttonWidth2 = (this.view.style.width - (buttonPadding * 3)) / 2;
    var buttonWidth3 = (this.view.style.width - (buttonPadding * 4)) / 3;
    var buttonStart31 = buttonPadding;
    var buttonStart32 = buttonPadding + buttonWidth3 + buttonPadding;
    var buttonStart33 = (buttonPadding * 3) + (buttonWidth3 * 2);
    var buttonHeight = 75;



    // show interstitial button
    var buttonY = this.header.style.y + this.header.style.height + 100;
    this.showInterstitialButton = new ButtonView({
      superview: this.view,
      x: buttonStart31,
      y: buttonY,
      width: buttonWidth3,
      height: buttonHeight,
      title: "Show Interstitial",
      onClick: bind(this, this.showInterstitial)
    });

    // cache interstitial
    this.cacheInterstitialButton = new ButtonView({
      superview: this.view,
      x: buttonStart32,
      y: buttonY,
      width: buttonWidth3,
      height: buttonHeight,
      title: "Cache Interstitial",
      onClick: bind(this, this.cacheInterstitial)
    });

    // show interstitial if available
    this.showInterstitialIfAvailableButton = new ButtonView({
      superview: this.view,
      x: buttonStart33,
      y: buttonY,
      width: buttonWidth3,
      height: buttonHeight,
      title: "Show only if available",
      onClick: bind(this, function () {
        this.showInterstitial(true);
      })
    });

    buttonY += buttonHeight + buttonPadding;
    this.showMoreAppsButton = new ButtonView({
      superview: this.view,
      x: buttonStart31,
      y: buttonY,
      width: buttonWidth3,
      height: buttonHeight,
      title: "Show More Apps",
      onClick: bind(this, this.showMoreApps)
    });

    // cache more apps
    this.cacheMoreAppsButton = new ButtonView({
      superview: this.view,
      x: buttonStart32,
      y: buttonY,
      width: buttonWidth3,
      height: buttonHeight,
      title: "Cache More Apps",
      onClick: bind(this, this.cacheMoreApps)
    });

    // show more apps if available
    this.showMoreAppsIfAvailableButton = new ButtonView({
      superview: this.view,
      x: buttonStart33,
      y: buttonY,
      width: buttonWidth3,
      height: buttonHeight,
      title: "Show only if available",
      onClick: bind(this, function () {
        this.showMoreApps(true);
      })
    });


    buttonY += buttonHeight + buttonPadding;
    this.showRewardedVideoButton = new ButtonView({
      superview: this.view,
      x: buttonStart31,
      y: buttonY,
      width: buttonWidth3,
      height: buttonHeight,
      title: "Show Rewarded Video",
      onClick: bind(this, this.showRewardedVideo)
    });

    // cache rewarded video
    this.cacheRewardedVideoButton = new ButtonView({
      superview: this.view,
      x: buttonStart32,
      y: buttonY,
      width: buttonWidth3,
      height: buttonHeight,
      title: "Cache Rewarded Video",
      onClick: bind(this, this.cacheRewardedVideo)
    });

    // show rewarded video if available
    this.showRewardedVideoIfAvailableButton = new ButtonView({
      superview: this.view,
      x: buttonStart33,
      y: buttonY,
      width: buttonWidth3,
      height: buttonHeight,
      title: "Show only if available",
      onClick: bind(this, function () {
        this.showRewardedVideo(true);
      })
    });

    var logViewY = buttonY + buttonHeight + 150;
    this.logView = new LogView({
      superview: this.view,
      x: 0,
      y: logViewY,
      width: this.view.style.width,
      height: this.view.style.height - logViewY
    });

    // listen for events
    this._createEventListeners();
  };

  this._createEventListeners = function () {
    var events = {
      'AdAvailable': 'Ad cached and is available to view',
      'AdFailedToLoad': 'Ad failed to load',
      'AdDisplayed': 'Ad displayed to user',
      'AdDismissed': 'Ad dismissed (clicked or closed)',
      'AdClicked': 'Ad clicked!',
      'AdClosed': 'Ad closed (not clicked)',

      'MoreAppsAvailable': 'More Apps cached and available to view',
      'MoreAppsFailedToLoad': 'More Apps failed to load',
      'MoreAppsDisplayed': 'More Apps displayed to user',
      'MoreAppsDismissed': 'More Apps dismissed (clicked or closed)',
      'MoreAppsClicked': 'More Apps clicked!',
      'MoreAppsClosed': 'More Apps closed (not clicked)',

      'RewardedVideoAvailable': 'Rewarded Video cached and available to view',
      'RewardedVideoFailedToLoad': 'Rewarded Video failed to load',
      'RewardedVideoDisplayed': 'Rewarded Video displayed to user',
      'RewardedVideoDismissed': 'Rewarded Video dismissed (clicked or closed)',
      'RewardedVideoClicked': 'Rewarded Video clicked!',
      'RewardedVideoClosed': 'Rewarded Video closed (not clicked)',
      //'RewardedVideoCompleted': 'Rewarded Video completed' // special cased
    };
    var eventNames = Object.keys(events);
    var boundLog = bind(this, this.log);
    for (var i = 0; i < eventNames.length; i++) {
      var eventName = eventNames[i];
      chartboost.on(eventName, bind(this, function (eventDetails) {
        this.log(eventDetails)
      }, events[eventName]));
    }

    chartboost.on('RewardedVideoCompleted', bind(this, function (reward) {
      this.log("rewarded video completed! reward:" + reward);
    }));
  };

  this.showInterstitial = function (onlyIfAvailable) {
    if (onlyIfAvailable) {
      this.log("Showing chartboost interstitial (if available)");
      chartboost.showInterstitialIfAvailable();
    } else {
      this.log("Showing chartboost interstitial");
      chartboost.showInterstitial();
    }
  };

  this.cacheInterstitial = function () {
    this.log("Caching chartboost interstitial");
    chartboost.cacheInterstitial();
  };


  this.showMoreApps = function (onlyIfAvailable) {
    if (onlyIfAvailable) {
      this.log("Showing chartboost more apps (if available)");
      chartboost.showMoreAppsIfAvailable();
    } else {
      this.log("Showing chartboost more apps");
      chartboost.showMoreApps();
    }
  };

  this.cacheMoreApps = function () {
    this.log("Caching chartboost more apps");
    chartboost.cacheMoreApps();
  };


  this.showRewardedVideo = function (onlyIfAvailable) {
    if (onlyIfAvailable) {
      this.log("Showing chartboost rewarded video (if available)");
      chartboost.showRewardedVideoIfAvailable();
    } else {
      this.log("Showing chartboost rewarded video");
      chartboost.showRewardedVideo();
    }
  };

  this.cacheRewardedVideo = function () {
    this.log("Caching chartboost rewarded video");
    chartboost.cacheRewardedVideo();
  };


  this.log = function (text) {
    logger.log(text);
    this.logView.log(text);
  };

});
