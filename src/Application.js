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
    var buttonWidth2 = (this.view.style.width - (buttonPadding * 5)) / 2;
    var buttonHeight = 100;
    var buttonY = this.header.style.y + this.header.style.height + 100;

    // show interstitial button
    this.showInterstitialButton = new ButtonView({
      superview: this.view,
      x: buttonPadding,
      y: buttonY,
      width: buttonWidth,
      height: buttonHeight,
      title: "Show Interstitial",
      onClick: bind(this, this.showInterstitial)
    });

    // cache interstitial
    this.cacheInterstitialButton = new ButtonView({
      superview: this.view,
      x: buttonPadding,
      y: this.showInterstitialButton.style.y + buttonHeight + 100,
      width: buttonWidth,
      height: buttonHeight,
      title: "Cache Interstitial",
      onClick: bind(this, this.cacheInterstitial)
    });

    // show interstitial if available
    this.showInterstitialIfAvailableButton = new ButtonView({
      superview: this.view,
      x: buttonPadding,
      y: this.cacheInterstitialButton.style.y + buttonHeight + 100,
      width: buttonWidth,
      height: buttonHeight,
      title: "Show only if available",
      onClick: bind(this, function () {
        this.showInterstitial(true);
      })
    });

    var logViewY = this.showInterstitialIfAvailableButton.style.y +
      buttonHeight + 150;
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
    chartboost.on('AdAvailable', bind(this, function () {
      this.log("Ad cached and is available to view");
    }));

    chartboost.on('AdFailedToLoad', bind(this, function () {
      this.log("Ad failed to load");
    }));

    chartboost.on('AdDisplayed', bind(this, function () {
      this.log("Ad displayed to user");
    }));

    chartboost.on('AdDismissed', bind(this, function () {
      this.log("Ad dismissed (clicked or closed)");
    }));

    chartboost.on('AdClicked', bind(this, function () {
      this.log("Ad clicked!");
    }));

    chartboost.on('AdClosed', bind(this, function () {
      this.log("Ad closed (not clicked)");
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


  this.log = function (text) {
    logger.log(text);
    this.logView.log(text);
  };

});
