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

    var logViewY = this.showInterstitialButton.style.y +
      this.showInterstitialButton.style.height +
      150;
    this.logView = new LogView({
      superview: this.view,
      x: 0,
      y: logViewY,
      width: this.view.style.width,
      height: this.view.style.height - logViewY
    });
  };

  this.showInterstitial = function () {
    this.log("Showing chartboost interstitial");
    chartboost.showInterstitial();
  };


  this.log = function (text) {
    logger.log(text);
    this.logView.log(text);
  };

});
