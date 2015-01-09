
import ui.View as View;
import ui.ViewPool as ViewPool;
import ui.TextView as TextView;

exports = Class(View, function (supr) {
  this.init = function (opts) {
    supr(this, 'init', [opts]);

    // hold log text
    this.logPadding = 25;
    this.logCount = 20;
    this.logConfig = {
      superview: this,
      x: this.logPadding,
      width: this.style.width - this.logPadding,
      height: 30,
      color: "black",
      horizontalAlign: 'left'
    };
    this.logPool = new ViewPool({
      ctor: TextView,
      initOpts: this.logConfig,
      initCount: this.logCount + 1
    });

  };

  this.log = function (text, success) {
    // move all the existing logs down
    var remove = [];
    this.logPool.forEachActiveView(bind(this, function (log) {
      log.style.y += this.logConfig.height + this.logPadding;
      if (log.style.y > this.style.height) {
        remove.push(log);
      }
    }));
    for (var i = 0; i < remove.length; i++) {
      this.logPool.releaseView(remove[i]);
    }

    // add a new log
    var nextLog = this.logPool.obtainView();
    nextLog.style.y = 0;
    nextLog.style.color = success ? 'green' : 'red';
    nextLog.setText(text)
  };
});
