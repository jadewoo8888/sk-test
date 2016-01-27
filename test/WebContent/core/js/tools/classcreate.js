/*  
 *  我没对JS做很多研究，有一些现成的类库一时找不到了。
 *
/*--------------------------------------------------------------------------*/

/* （或者可以直接引用这个库）引自Prototype 1.5.0 http://prototype.conio.net/ */

var Class = {
  create: function() {
    return function() {
      this.initialize.apply(this, arguments);
    }
  }
}

