import ui.View as View;
import ui.TextView as TextView;

exports = Class(View, function (supr) {
  this.init = function (opts) {
    supr(this, 'init', [opts]);

    this.borderWidth = 2;
    this.onClick = opts.onClick;

    this.style.backgroundColor = 'black';
    this.fakeBorder = new View({
      superview: this,
      width: this.style.width - (this.borderWidth * 2),
      height: this.style.height - (this.borderWidth * 2),
      x: this.borderWidth,
      y: this.borderWidth,
      backgroundColor: 'white'
    });

    this.padding = 5;
    this.label = new TextView({
      superview: this,
      x: this.padding,
      y: this.padding,
      width: this.style.width - (this.padding * 2),
      height: this.style.height - (this.padding * 2),
      color: "black",
      text: opts.title
    });

    // on click
    this.on('InputSelect', this.clicked);
  };

  this.clicked = function () {
    this.onClick && this.onClick();
  };

});
