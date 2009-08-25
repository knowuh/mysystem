var CanvasTextFunctions = { };

CanvasTextFunctions.letters = {
    ' ': { width: 16, points: [] },
    '!': { width: 10, points: [[5,21],[5,7],[-1,-1],[5,2],[4,1],[5,0],[6,1],[5,2]] },
    '"': { width: 16, points: [[4,21],[4,14],[-1,-1],[12,21],[12,14]] },
    '#': { width: 21, points: [[11,25],[4,-7],[-1,-1],[17,25],[10,-7],[-1,-1],[4,12],[18,12],[-1,-1],[3,6],[17,6]] },
    '$': { width: 20, points: [[8,25],[8,-4],[-1,-1],[12,25],[12,-4],[-1,-1],[17,18],[15,20],[12,21],[8,21],[5,20],[3,18],[3,16],[4,14],[5,13],[7,12],[13,10],[15,9],[16,8],[17,6],[17,3],[15,1],[12,0],[8,0],[5,1],[3,3]] },
    '%': { width: 24, points: [[21,21],[3,0],[-1,-1],[8,21],[10,19],[10,17],[9,15],[7,14],[5,14],[3,16],[3,18],[4,20],[6,21],[8,21],[10,20],[13,19],[16,19],[19,20],[21,21],[-1,-1],[17,7],[15,6],[14,4],[14,2],[16,0],[18,0],[20,1],[21,3],[21,5],[19,7],[17,7]] },
    '&': { width: 26, points: [[23,12],[23,13],[22,14],[21,14],[20,13],[19,11],[17,6],[15,3],[13,1],[11,0],[7,0],[5,1],[4,2],[3,4],[3,6],[4,8],[5,9],[12,13],[13,14],[14,16],[14,18],[13,20],[11,21],[9,20],[8,18],[8,16],[9,13],[11,10],[16,3],[18,1],[20,0],[22,0],[23,1],[23,2]] },
    '\'': { width: 10, points: [[5,19],[4,20],[5,21],[6,20],[6,18],[5,16],[4,15]] },
    '(': { width: 14, points: [[11,25],[9,23],[7,20],[5,16],[4,11],[4,7],[5,2],[7,-2],[9,-5],[11,-7]] },
    ')': { width: 14, points: [[3,25],[5,23],[7,20],[9,16],[10,11],[10,7],[9,2],[7,-2],[5,-5],[3,-7]] },
    '*': { width: 16, points: [[8,21],[8,9],[-1,-1],[3,18],[13,12],[-1,-1],[13,18],[3,12]] },
    '+': { width: 26, points: [[13,18],[13,0],[-1,-1],[4,9],[22,9]] },
    ',': { width: 10, points: [[6,1],[5,0],[4,1],[5,2],[6,1],[6,-1],[5,-3],[4,-4]] },
    '-': { width: 26, points: [[4,9],[22,9]] },
    '.': { width: 10, points: [[5,2],[4,1],[5,0],[6,1],[5,2]] },
    '/': { width: 22, points: [[20,25],[2,-7]] },
    '0': { width: 20, points: [[9,21],[6,20],[4,17],[3,12],[3,9],[4,4],[6,1],[9,0],[11,0],[14,1],[16,4],[17,9],[17,12],[16,17],[14,20],[11,21],[9,21]] },
    '1': { width: 20, points: [[6,17],[8,18],[11,21],[11,0]] },
    '2': { width: 20, points: [[4,16],[4,17],[5,19],[6,20],[8,21],[12,21],[14,20],[15,19],[16,17],[16,15],[15,13],[13,10],[3,0],[17,0]] },
    '3': { width: 20, points: [[5,21],[16,21],[10,13],[13,13],[15,12],[16,11],[17,8],[17,6],[16,3],[14,1],[11,0],[8,0],[5,1],[4,2],[3,4]] },
    '4': { width: 20, points: [[13,21],[3,7],[18,7],[-1,-1],[13,21],[13,0]] },
    '5': { width: 20, points: [[15,21],[5,21],[4,12],[5,13],[8,14],[11,14],[14,13],[16,11],[17,8],[17,6],[16,3],[14,1],[11,0],[8,0],[5,1],[4,2],[3,4]] },
    '6': { width: 20, points: [[16,18],[15,20],[12,21],[10,21],[7,20],[5,17],[4,12],[4,7],[5,3],[7,1],[10,0],[11,0],[14,1],[16,3],[17,6],[17,7],[16,10],[14,12],[11,13],[10,13],[7,12],[5,10],[4,7]] },
    '7': { width: 20, points: [[17,21],[7,0],[-1,-1],[3,21],[17,21]] },
    '8': { width: 20, points: [[8,21],[5,20],[4,18],[4,16],[5,14],[7,13],[11,12],[14,11],[16,9],[17,7],[17,4],[16,2],[15,1],[12,0],[8,0],[5,1],[4,2],[3,4],[3,7],[4,9],[6,11],[9,12],[13,13],[15,14],[16,16],[16,18],[15,20],[12,21],[8,21]] },
    '9': { width: 20, points: [[16,14],[15,11],[13,9],[10,8],[9,8],[6,9],[4,11],[3,14],[3,15],[4,18],[6,20],[9,21],[10,21],[13,20],[15,18],[16,14],[16,9],[15,4],[13,1],[10,0],[8,0],[5,1],[4,3]] },
    ':': { width: 10, points: [[5,14],[4,13],[5,12],[6,13],[5,14],[-1,-1],[5,2],[4,1],[5,0],[6,1],[5,2]] },
    ',': { width: 10, points: [[5,14],[4,13],[5,12],[6,13],[5,14],[-1,-1],[6,1],[5,0],[4,1],[5,2],[6,1],[6,-1],[5,-3],[4,-4]] },
    '<': { width: 24, points: [[20,18],[4,9],[20,0]] },
    '=': { width: 26, points: [[4,12],[22,12],[-1,-1],[4,6],[22,6]] },
    '>': { width: 24, points: [[4,18],[20,9],[4,0]] },
    '?': { width: 18, points: [[3,16],[3,17],[4,19],[5,20],[7,21],[11,21],[13,20],[14,19],[15,17],[15,15],[14,13],[13,12],[9,10],[9,7],[-1,-1],[9,2],[8,1],[9,0],[10,1],[9,2]] },
    '@': { width: 27, points: [[18,13],[17,15],[15,16],[12,16],[10,15],[9,14],[8,11],[8,8],[9,6],[11,5],[14,5],[16,6],[17,8],[-1,-1],[12,16],[10,14],[9,11],[9,8],[10,6],[11,5],[-1,-1],[18,16],[17,8],[17,6],[19,5],[21,5],[23,7],[24,10],[24,12],[23,15],[22,17],[20,19],[18,20],[15,21],[12,21],[9,20],[7,19],[5,17],[4,15],[3,12],[3,9],[4,6],[5,4],[7,2],[9,1],[12,0],[15,0],[18,1],[20,2],[21,3],[-1,-1],[19,16],[18,8],[18,6],[19,5]] },
    'A': { width: 18, points: [[9,21],[1,0],[-1,-1],[9,21],[17,0],[-1,-1],[4,7],[14,7]] },
    'B': { width: 21, points: [[4,21],[4,0],[-1,-1],[4,21],[13,21],[16,20],[17,19],[18,17],[18,15],[17,13],[16,12],[13,11],[-1,-1],[4,11],[13,11],[16,10],[17,9],[18,7],[18,4],[17,2],[16,1],[13,0],[4,0]] },
    'C': { width: 21, points: [[18,16],[17,18],[15,20],[13,21],[9,21],[7,20],[5,18],[4,16],[3,13],[3,8],[4,5],[5,3],[7,1],[9,0],[13,0],[15,1],[17,3],[18,5]] },
    'D': { width: 21, points: [[4,21],[4,0],[-1,-1],[4,21],[11,21],[14,20],[16,18],[17,16],[18,13],[18,8],[17,5],[16,3],[14,1],[11,0],[4,0]] },
    'E': { width: 19, points: [[4,21],[4,0],[-1,-1],[4,21],[17,21],[-1,-1],[4,11],[12,11],[-1,-1],[4,0],[17,0]] },
    'F': { width: 18, points: [[4,21],[4,0],[-1,-1],[4,21],[17,21],[-1,-1],[4,11],[12,11]] },
    'G': { width: 21, points: [[18,16],[17,18],[15,20],[13,21],[9,21],[7,20],[5,18],[4,16],[3,13],[3,8],[4,5],[5,3],[7,1],[9,0],[13,0],[15,1],[17,3],[18,5],[18,8],[-1,-1],[13,8],[18,8]] },
    'H': { width: 22, points: [[4,21],[4,0],[-1,-1],[18,21],[18,0],[-1,-1],[4,11],[18,11]] },
    'I': { width: 8, points: [[4,21],[4,0]] },
    'J': { width: 16, points: [[12,21],[12,5],[11,2],[10,1],[8,0],[6,0],[4,1],[3,2],[2,5],[2,7]] },
    'K': { width: 21, points: [[4,21],[4,0],[-1,-1],[18,21],[4,7],[-1,-1],[9,12],[18,0]] },
    'L': { width: 17, points: [[4,21],[4,0],[-1,-1],[4,0],[16,0]] },
    'M': { width: 24, points: [[4,21],[4,0],[-1,-1],[4,21],[12,0],[-1,-1],[20,21],[12,0],[-1,-1],[20,21],[20,0]] },
    'N': { width: 22, points: [[4,21],[4,0],[-1,-1],[4,21],[18,0],[-1,-1],[18,21],[18,0]] },
    'O': { width: 22, points: [[9,21],[7,20],[5,18],[4,16],[3,13],[3,8],[4,5],[5,3],[7,1],[9,0],[13,0],[15,1],[17,3],[18,5],[19,8],[19,13],[18,16],[17,18],[15,20],[13,21],[9,21]] },
    'P': { width: 21, points: [[4,21],[4,0],[-1,-1],[4,21],[13,21],[16,20],[17,19],[18,17],[18,14],[17,12],[16,11],[13,10],[4,10]] },
    'Q': { width: 22, points: [[9,21],[7,20],[5,18],[4,16],[3,13],[3,8],[4,5],[5,3],[7,1],[9,0],[13,0],[15,1],[17,3],[18,5],[19,8],[19,13],[18,16],[17,18],[15,20],[13,21],[9,21],[-1,-1],[12,4],[18,-2]] },
    'R': { width: 21, points: [[4,21],[4,0],[-1,-1],[4,21],[13,21],[16,20],[17,19],[18,17],[18,15],[17,13],[16,12],[13,11],[4,11],[-1,-1],[11,11],[18,0]] },
    'S': { width: 20, points: [[17,18],[15,20],[12,21],[8,21],[5,20],[3,18],[3,16],[4,14],[5,13],[7,12],[13,10],[15,9],[16,8],[17,6],[17,3],[15,1],[12,0],[8,0],[5,1],[3,3]] },
    'T': { width: 16, points: [[8,21],[8,0],[-1,-1],[1,21],[15,21]] },
    'U': { width: 22, points: [[4,21],[4,6],[5,3],[7,1],[10,0],[12,0],[15,1],[17,3],[18,6],[18,21]] },
    'V': { width: 18, points: [[1,21],[9,0],[-1,-1],[17,21],[9,0]] },
    'W': { width: 24, points: [[2,21],[7,0],[-1,-1],[12,21],[7,0],[-1,-1],[12,21],[17,0],[-1,-1],[22,21],[17,0]] },
    'X': { width: 20, points: [[3,21],[17,0],[-1,-1],[17,21],[3,0]] },
    'Y': { width: 18, points: [[1,21],[9,11],[9,0],[-1,-1],[17,21],[9,11]] },
    'Z': { width: 20, points: [[17,21],[3,0],[-1,-1],[3,21],[17,21],[-1,-1],[3,0],[17,0]] },
    '[': { width: 14, points: [[4,25],[4,-7],[-1,-1],[5,25],[5,-7],[-1,-1],[4,25],[11,25],[-1,-1],[4,-7],[11,-7]] },
    '\\': { width: 14, points: [[0,21],[14,-3]] },
    ']': { width: 14, points: [[9,25],[9,-7],[-1,-1],[10,25],[10,-7],[-1,-1],[3,25],[10,25],[-1,-1],[3,-7],[10,-7]] },
    '^': { width: 16, points: [[6,15],[8,18],[10,15],[-1,-1],[3,12],[8,17],[13,12],[-1,-1],[8,17],[8,0]] },
    '_': { width: 16, points: [[0,-2],[16,-2]] },
    '`': { width: 10, points: [[6,21],[5,20],[4,18],[4,16],[5,15],[6,16],[5,17]] },
    'a': { width: 19, points: [[15,14],[15,0],[-1,-1],[15,11],[13,13],[11,14],[8,14],[6,13],[4,11],[3,8],[3,6],[4,3],[6,1],[8,0],[11,0],[13,1],[15,3]] },
    'b': { width: 19, points: [[4,21],[4,0],[-1,-1],[4,11],[6,13],[8,14],[11,14],[13,13],[15,11],[16,8],[16,6],[15,3],[13,1],[11,0],[8,0],[6,1],[4,3]] },
    'c': { width: 18, points: [[15,11],[13,13],[11,14],[8,14],[6,13],[4,11],[3,8],[3,6],[4,3],[6,1],[8,0],[11,0],[13,1],[15,3]] },
    'd': { width: 19, points: [[15,21],[15,0],[-1,-1],[15,11],[13,13],[11,14],[8,14],[6,13],[4,11],[3,8],[3,6],[4,3],[6,1],[8,0],[11,0],[13,1],[15,3]] },
    'e': { width: 18, points: [[3,8],[15,8],[15,10],[14,12],[13,13],[11,14],[8,14],[6,13],[4,11],[3,8],[3,6],[4,3],[6,1],[8,0],[11,0],[13,1],[15,3]] },
    'f': { width: 12, points: [[10,21],[8,21],[6,20],[5,17],[5,0],[-1,-1],[2,14],[9,14]] },
    'g': { width: 19, points: [[15,14],[15,-2],[14,-5],[13,-6],[11,-7],[8,-7],[6,-6],[-1,-1],[15,11],[13,13],[11,14],[8,14],[6,13],[4,11],[3,8],[3,6],[4,3],[6,1],[8,0],[11,0],[13,1],[15,3]] },
    'h': { width: 19, points: [[4,21],[4,0],[-1,-1],[4,10],[7,13],[9,14],[12,14],[14,13],[15,10],[15,0]] },
    'i': { width: 8, points: [[3,21],[4,20],[5,21],[4,22],[3,21],[-1,-1],[4,14],[4,0]] },
    'j': { width: 10, points: [[5,21],[6,20],[7,21],[6,22],[5,21],[-1,-1],[6,14],[6,-3],[5,-6],[3,-7],[1,-7]] },
    'k': { width: 17, points: [[4,21],[4,0],[-1,-1],[14,14],[4,4],[-1,-1],[8,8],[15,0]] },
    'l': { width: 8, points: [[4,21],[4,0]] },
    'm': { width: 30, points: [[4,14],[4,0],[-1,-1],[4,10],[7,13],[9,14],[12,14],[14,13],[15,10],[15,0],[-1,-1],[15,10],[18,13],[20,14],[23,14],[25,13],[26,10],[26,0]] },
    'n': { width: 19, points: [[4,14],[4,0],[-1,-1],[4,10],[7,13],[9,14],[12,14],[14,13],[15,10],[15,0]] },
    'o': { width: 19, points: [[8,14],[6,13],[4,11],[3,8],[3,6],[4,3],[6,1],[8,0],[11,0],[13,1],[15,3],[16,6],[16,8],[15,11],[13,13],[11,14],[8,14]] },
    'p': { width: 19, points: [[4,14],[4,-7],[-1,-1],[4,11],[6,13],[8,14],[11,14],[13,13],[15,11],[16,8],[16,6],[15,3],[13,1],[11,0],[8,0],[6,1],[4,3]] },
    'q': { width: 19, points: [[15,14],[15,-7],[-1,-1],[15,11],[13,13],[11,14],[8,14],[6,13],[4,11],[3,8],[3,6],[4,3],[6,1],[8,0],[11,0],[13,1],[15,3]] },
    'r': { width: 13, points: [[4,14],[4,0],[-1,-1],[4,8],[5,11],[7,13],[9,14],[12,14]] },
    's': { width: 17, points: [[14,11],[13,13],[10,14],[7,14],[4,13],[3,11],[4,9],[6,8],[11,7],[13,6],[14,4],[14,3],[13,1],[10,0],[7,0],[4,1],[3,3]] },
    't': { width: 12, points: [[5,21],[5,4],[6,1],[8,0],[10,0],[-1,-1],[2,14],[9,14]] },
    'u': { width: 19, points: [[4,14],[4,4],[5,1],[7,0],[10,0],[12,1],[15,4],[-1,-1],[15,14],[15,0]] },
    'v': { width: 16, points: [[2,14],[8,0],[-1,-1],[14,14],[8,0]] },
    'w': { width: 22, points: [[3,14],[7,0],[-1,-1],[11,14],[7,0],[-1,-1],[11,14],[15,0],[-1,-1],[19,14],[15,0]] },
    'x': { width: 17, points: [[3,14],[14,0],[-1,-1],[14,14],[3,0]] },
    'y': { width: 16, points: [[2,14],[8,0],[-1,-1],[14,14],[8,0],[6,-4],[4,-6],[2,-7],[1,-7]] },
    'z': { width: 17, points: [[14,14],[3,0],[-1,-1],[3,14],[14,14],[-1,-1],[3,0],[14,0]] },
    '{': { width: 14, points: [[9,25],[7,24],[6,23],[5,21],[5,19],[6,17],[7,16],[8,14],[8,12],[6,10],[-1,-1],[7,24],[6,22],[6,20],[7,18],[8,17],[9,15],[9,13],[8,11],[4,9],[8,7],[9,5],[9,3],[8,1],[7,0],[6,-2],[6,-4],[7,-6],[-1,-1],[6,8],[8,6],[8,4],[7,2],[6,1],[5,-1],[5,-3],[6,-5],[7,-6],[9,-7]] },
    '|': { width: 8, points: [[4,25],[4,-7]] },
    '}': { width: 14, points: [[5,25],[7,24],[8,23],[9,21],[9,19],[8,17],[7,16],[6,14],[6,12],[8,10],[-1,-1],[7,24],[8,22],[8,20],[7,18],[6,17],[5,15],[5,13],[6,11],[10,9],[6,7],[5,5],[5,3],[6,1],[7,0],[8,-2],[8,-4],[7,-6],[-1,-1],[8,8],[6,6],[6,4],[7,2],[8,1],[9,-1],[9,-3],[8,-5],[7,-6],[5,-7]] },
    '~': { width: 24, points: [[3,6],[3,8],[4,11],[6,12],[8,12],[10,11],[14,8],[16,7],[18,7],[20,8],[21,10],[-1,-1],[3,8],[4,10],[6,11],[8,11],[10,10],[14,7],[16,6],[18,6],[20,7],[21,10],[21,12]] }
};

CanvasTextFunctions.letter = function (ch)
{
    return CanvasTextFunctions.letters[ch];
}

CanvasTextFunctions.ascent = function( font, size)
{
    return size;
}

CanvasTextFunctions.descent = function( font, size)
{
    return 7.0*size/25.0;
}

CanvasTextFunctions.measure = function( font, size, str)
{
    var total = 0;
    var len = str.length;

    for ( i = 0; i < len; i++) {
	var c = CanvasTextFunctions.letter( str.charAt(i));
	if ( c) total += c.width * size / 25.0;
    }
    return total;
}

CanvasTextFunctions.draw = function(ctx,font,size,x,y,str)
{
    var total = 0;
    var len = str.length;
    var mag = size / 25.0;

    ctx.save();
    ctx.lineCap = "round";
    ctx.lineWidth = 2.0 * mag;

    for ( i = 0; i < len; i++) {
	var c = CanvasTextFunctions.letter( str.charAt(i));
	if ( !c) continue;

	ctx.beginPath();

	var penUp = 1;
	var needStroke = 0;
	for ( j = 0; j < c.points.length; j++) {
	    var a = c.points[j];
	    if ( a[0] == -1 && a[1] == -1) {
		penUp = 1;
		continue;
	    }
	    if ( penUp) {
		ctx.moveTo( x + a[0]*mag, y - a[1]*mag);
		penUp = false;
	    } else {
		ctx.lineTo( x + a[0]*mag, y - a[1]*mag);
	    }
	}
	ctx.stroke();
	x += c.width*mag;
    }
    ctx.restore();
    return total;
}

CanvasTextFunctions.enable = function( ctx)
{
    ctx.drawText = function(font,size,x,y,text) { return CanvasTextFunctions.draw( ctx, font,size,x,y,text); };
    ctx.measureText = function(font,size,text) { return CanvasTextFunctions.measure( font,size,text); };
    ctx.fontAscent = function(font,size) { return CanvasTextFunctions.ascent(font,size); }
    ctx.fontDescent = function(font,size) { return CanvasTextFunctions.descent(font,size); }

    ctx.drawTextRight = function(font,size,x,y,text) {
	var w = CanvasTextFunctions.measure(font,size,text);
	return CanvasTextFunctions.draw( ctx, font,size,x-w,y,text);
    };
    ctx.drawTextCenter = function(font,size,x,y,text) {
	var w = CanvasTextFunctions.measure(font,size,text);
	return CanvasTextFunctions.draw( ctx, font,size,x-w/2,y,text);
    };
}

/**
 * WireIt provide classes to build wirable interfaces
 * @module WireIt
 */
/**
 * @class WireIt
 * @static
 * @namespace WireIt
 */
var WireIt = {

   /**
    * Get a css property in pixels and convert it to an integer
    * @method getIntStyle
    * @namespace WireIt
    * @static
    * @param {HTMLElement} el The element
    * @param {String} style css-property to get
    * @return {Integer} integer size
    */
   getIntStyle: function(el,style) {
      var sStyle = YAHOO.util.Dom.getStyle(el, style);
      return parseInt(sStyle.substr(0, sStyle.length-2), 10);
   },

   /**
    * Helper function to set DOM node attributes and style attributes.
    * @method sn
    * @static
    * @param {HTMLElement} el The element to set attributes to
    * @param {Object} domAttributes An object containing key/value pairs to set as node attributes (ex: {id: 'myElement', className: 'myCssClass', ...})
    * @param {Object} styleAttributes Same thing for style attributes. Please use camelCase for style attributes (ex: backgroundColor for 'background-color')
    */
   sn: function(el,domAttributes,styleAttributes){
      if(!el) { return; }
      if(domAttributes){
         for(var i in domAttributes){
            var domAttribute = domAttributes[i];
            if(typeof (domAttribute)=="function"){continue;}
            if(i=="className"){
               i="class";
               el.className=domAttribute;
            }
            if(domAttribute!==el.getAttribute(i)){
               if(domAttribute===false){
                  el.removeAttribute(i);
               }else{
                  el.setAttribute(i,domAttribute);
               }
            }
         }
      }
      if(styleAttributes){
         for(var i in styleAttributes){
            if(typeof (styleAttributes[i])=="function"){ continue; }
            if(el.style[i]!=styleAttributes[i]){
               el.style[i]=styleAttributes[i];
            }
         }
      }

   },

   /**
    * Helper function to create a DOM node. (wrapps the document.createElement tag and the inputEx.sn functions)
    * @method cn
    * @static
    * @param {String} tag The tagName to create (ex: 'div', 'a', ...)
    * @param {Object} [domAttributes] see inputEx.sn
    * @param {Object} [styleAttributes] see inputEx.sn
    * @param {String} [innerHTML] The html string to append into the created element
    * @return {HTMLElement} The created node
    */
   cn: function(tag, domAttributes, styleAttributes, innerHTML){
      var el=document.createElement(tag);
      this.sn(el,domAttributes,styleAttributes);
      if(innerHTML){ el.innerHTML = innerHTML; }
      return el;
   },

   /**
    * indexOf replace Array.indexOf for cases where it isn't available (IE6 only ?)
    * @method indexOf
    * @static
    * @param {Any} el element to search for
    * @param {Array} arr Array to search into
    * @return {Integer} element index or -1 if not found
    */
   indexOf: YAHOO.lang.isFunction(Array.prototype.indexOf) ?
                        function(el, arr) { return arr.indexOf(el);} :
                        function(el, arr) {
                           for(var i = 0 ;i < arr.length ; i++) {
                              if(arr[i] == el) return i;
                           }
                           return -1;
                        },

   /**
    * compact replace Array.compact for cases where it isn't available
    * @method compact
    * @static
    * @param {Array} arr Array to compact
    * @return {Array} compacted array
    */
   compact: YAHOO.lang.isFunction(Array.prototype.compact) ?
                        function(arr) { return arr.compact();} :
                        function(arr) {
                           var n = [];
                           for(var i = 0 ; i < arr.length ; i++) {
                              if(arr[i]) {
                                 n.push(arr[i]);
                              }
                           }
                           return n;
                        }
};


/**
 * WireIt.util contains utility classes
 */
WireIt.util = {};
(function () {

   var Event = YAHOO.util.Event, UA = YAHOO.env.ua;

   /**
    * Create a canvas element and wrap cross-browser hacks to resize it
    * @class CanvasElement
    * @namespace WireIt
    * @constructor
    * @param {HTMLElement} parentNode The canvas tag will be append to this parent DOM node.
    */
   WireIt.CanvasElement = function(parentNode) {

      /**
       * The canvas element
       * @property element
       * @type HTMLElement
       */
      this.element = document.createElement('canvas');

      parentNode.appendChild(this.element);

      if(typeof (G_vmlCanvasManager)!="undefined"){
         this.element = G_vmlCanvasManager.initElement(this.element);
      }

   };

   WireIt.CanvasElement.prototype = {

      /**
       * Get a drawing context
       * @method getContext
       * @param {String} [mode] Context mode (default "2d")
       * @return {CanvasContext} the context
       */
      getContext: function(mode) {
       return this.element.getContext(mode || "2d");
      },

      /**
       * Purge all event listeners and remove the component from the dom
       * @method destroy
       */
      destroy: function() {
         var el = this.element;

         if(YAHOO.util.Dom.inDocument(el)) {
            el.parentNode.removeChild(el);
         }

         Event.purgeElement(el, true);
      },

      /**
       * Set the canvas position and size.
       * <b>Warning:</b> This method changes the <i>element</i> property under some brother. Don't copy references !
       * @method SetCanvasRegion
       * @param {Number} left Left position
       * @param {Number} top Top position
       * @param {Number} width New width
       * @param {Number} height New height
       */
      SetCanvasRegion: UA.ie ?
               function(left,top,width,height){
                  var el = this.element;
                  WireIt.sn(el,null,{left:left+"px",top:top+"px",width:width+"px",height:height+"px"});
                  el.getContext("2d").clearRect(0,0,width,height);
                  this.element = el;
               } :
               ( (UA.webkit || UA.opera) ?
                  function(left,top,width,height){
                     var el = this.element;
                     var newCanvas=WireIt.cn("canvas",{className:el.className || el.getAttribute("class"),width:width,height:height},{left:left+"px",top:top+"px"});
                     var listeners=Event.getListeners(el);
                     for(var listener in listeners){
                        var l=listeners[listener];
                        Event.addListener(newCanvas,l.type,l.fn,l.obj,l.adjust);
                     }
                     Event.purgeElement(el);
                     el.parentNode.replaceChild(newCanvas,el);
                     this.element = newCanvas;
                  } :
                  function(left,top,width,height){
                     WireIt.sn(this.element,{width:width,height:height},{left:left+"px",top:top+"px"});
                  })
   };

})();
String.prototype.parseColor = function() {
  var color = '#';
  if(this.slice(0,4) == 'rgb(') {
    var cols = this.slice(4,this.length-1).split(',');
    var i=0; do { color += parseInt(cols[i]).toColorPart() } while (++i<3);
  } else {
    if(this.slice(0,1) == '#') {
      if(this.length==4) for(var i=1;i<4;i++) color += (this.charAt(i) + this.charAt(i)).toLowerCase();

      if(this.length==7) color = this.toLowerCase();
    }
  }
  return(color.length==7 ? color : (arguments[0] || this));
}

/**
 * The wire widget that uses a canvas to render
 * @class Wire
 * @namespace WireIt
 * @extends WireIt.CanvasElement
 * @constructor
 * @param  {WireIt.Terminal}    terminal1   Source terminal
 * @param  {WireIt.Terminal}    terminal2   Target terminal
 * @param  {HTMLElement} parentEl    Container of the CANVAS tag
 * @param  {Obj}                options      Styling configuration
 */
WireIt.Wire = function( terminal1, terminal2, parentEl, options) {

   /**
    * Reference to the parent dom element
    * @property parentEl
    * @type HTMLElement
    */
   this.parentEl = parentEl;

   /**
    * Source terminal
    * @property terminal1
    * @type WireIt.Terminal
    */
   this.terminal1 = terminal1;

   /**
    * Target terminal
    * @property terminal2
    * @type WireIt.Terminal || WireIt.TerminalProxy
    */
   this.terminal2 = terminal2;

   this.setOptions(options || {});

   WireIt.Wire.superclass.constructor.call(this, this.parentEl);



   YAHOO.util.Dom.addClass(this.element, this.options.className);

   this.terminal1.addWire(this);
   this.terminal2.addWire(this);
};


YAHOO.lang.extend(WireIt.Wire, WireIt.CanvasElement, {

   /**
    * @method setOptions
    */
   setOptions: function(options) {
      /**
       * Wire styling, and properties:
       * <ul>
       *   <li>className: CSS class name of the canvas element (default 'WireIt-Wire')</li>
       *   <li>coeffMulDirection: Parameter for bezier style</li>
       *   <li>cap: default 'round'</li>
       *   <li>bordercap: default 'round'</li>
       *   <li>width: Wire width (default to 3)</li>
       *   <li>borderwidth: Border Width (default to 1)</li>
       *   <li>color: Wire color (default to rgb(173, 216, 230) )</li>
       *   <li>bordercolor: Border color (default to #0000ff )</li>
       * </ul>
       * @property options
       */
      this.options = {};
      this.options.className = options.className || 'WireIt-Wire';
      this.options.coeffMulDirection = YAHOO.lang.isUndefined(options.coeffMulDirection) ? 100 : options.coeffMulDirection;

      this.options.drawingMethod = options.drawingMethod || 'bezier';
      this.options.cap = options.cap || 'round';
      this.options.bordercap = options.bordercap || 'round';
      this.options.width = options.width || 5;
      this.options.borderwidth = options.borderwidth || 1;
      this.options.color = options.color || '#BD1550';
      this.options.bordercolor = options.bordercolor || '#000000';
      this.options.fields = options.fields || {
       'name': 'flow',
       'width': this.options.width,
       'color': 'color2'
      };
   },

   /**
    * Remove a Wire from the Dom
    * @method remove
    */
   remove: function() {

      this.parentEl.removeChild(this.element);

      if(this.terminal1 && this.terminal1.removeWire) {
         this.terminal1.removeWire(this);
      }
      if(this.terminal2 && this.terminal2.removeWire) {
         this.terminal2.removeWire(this);
      }

      this.terminal1 = null;
      this.terminal2 = null;
   },

   /**
    * Redraw the Wire
    * @method drawBezierCurve
    */
   drawBezierCurve: function() {

      var p1 = this.terminal1.getXY();
      var p2 = this.terminal2.getXY();

      var coeffMulDirection = this.options.coeffMulDirection;


      var distance=Math.sqrt(Math.pow(p1[0]-p2[0],2)+Math.pow(p1[1]-p2[1],2));
      if(distance < coeffMulDirection){
         coeffMulDirection = distance/2;
      }

      var d1 = [this.terminal1.options.direction[0]*coeffMulDirection,
                this.terminal1.options.direction[1]*coeffMulDirection];
      var d2 = [this.terminal2.options.direction[0]*coeffMulDirection,
                this.terminal2.options.direction[1]*coeffMulDirection];

      var bezierPoints=[];
      bezierPoints[0] = p1;
      bezierPoints[1] = [p1[0]+d1[0],p1[1]+d1[1]];
      bezierPoints[2] = [p2[0]+d2[0],p2[1]+d2[1]];
      bezierPoints[3] = p2;
      var min = [p1[0],p1[1]];
      var max = [p1[0],p1[1]];
      for(var i=1 ; i<bezierPoints.length ; i++){
         var p = bezierPoints[i];
         if(p[0] < min[0]){
            min[0] = p[0];
         }
         if(p[1] < min[1]){
            min[1] = p[1];
         }
         if(p[0] > max[0]){
            max[0] = p[0];
         }
         if(p[1] > max[1]){
            max[1] = p[1];
         }
      }
      var margin = [4,4];
      min[0] = min[0]-margin[0];
      min[1] = min[1]-margin[1];
      max[0] = max[0]+margin[0];
      max[1] = max[1]+margin[1];
      var lw = Math.abs(max[0]-min[0]);
      var lh = Math.abs(max[1]-min[1]);

      this.SetCanvasRegion(min[0],min[1],lw,lh);

      var ctxt = this.getContext();

      for(var i = 0 ; i<bezierPoints.length ; i++){
         bezierPoints[i][0] = bezierPoints[i][0]-min[0];
         bezierPoints[i][1] = bezierPoints[i][1]-min[1];
      }


      ctxt.lineCap = this.options.bordercap;
      ctxt.strokeStyle = this.options.bordercolor;
      ctxt.lineWidth = this.options.width+this.options.borderwidth*2;
      ctxt.beginPath();
      ctxt.moveTo(bezierPoints[0][0],bezierPoints[0][1]);
      ctxt.bezierCurveTo(bezierPoints[1][0],bezierPoints[1][1],bezierPoints[2][0],bezierPoints[2][1],bezierPoints[3][0],bezierPoints[3][1]);
      ctxt.stroke();

      ctxt.lineCap = this.options.cap;
      ctxt.strokeStyle = this.options.color;
      ctxt.lineWidth = this.options.width;
      ctxt.beginPath();
      ctxt.moveTo(bezierPoints[0][0],bezierPoints[0][1]);
      ctxt.bezierCurveTo(bezierPoints[1][0],bezierPoints[1][1],bezierPoints[2][0],bezierPoints[2][1],bezierPoints[3][0],bezierPoints[3][1]);
      ctxt.stroke();

   },



   /**
    * This function returns terminal1 if the first argument is terminal2 and vice-versa
    * @method getOtherTerminal
    * @param   {WireIt.Terminal} terminal
    * @return  {WireIt.Terminal} terminal    the terminal that is NOT passed as argument
    */
   getOtherTerminal: function(terminal) {
      return (terminal == this.terminal1) ? this.terminal2 : this.terminal1;
   },


   /**
    * Attempted bezier drawing method for arrows
    * @method drawBezierArrows
    */
   drawBezierArrows: function() {
     var ctxt = this.getContext();
     CanvasTextFunctions.enable(ctxt);
     if (null == this.terminal1 || null == this.terminal2) {
       debug("Missing terminal for WireIt Wire: " + this);
       return;
     }
	 	var arrowWidth = Math.round(this.options.width * 1.5 + 20);
		var arrowLength = Math.round(this.options.width * 1.2 + 20);
	  	var d = arrowWidth/2; // arrow width/2
      var redim = d+3; //we have to make the canvas a little bigger because of arrows
      var margin=[4+redim,4+redim];

      var p1 = this.terminal1.getXY();
      var p2 = this.terminal2.getXY();

      var coeffMulDirection = this.options.coeffMulDirection;


      var distance=Math.sqrt(Math.pow(p1[0]-p2[0],2)+Math.pow(p1[1]-p2[1],2));
      if(distance < coeffMulDirection){
         coeffMulDirection = distance/2;
      }

      var d1 = [this.terminal1.options.direction[0]*coeffMulDirection,
                this.terminal1.options.direction[1]*coeffMulDirection];
      var d2 = [this.terminal2.options.direction[0]*coeffMulDirection,
                this.terminal2.options.direction[1]*coeffMulDirection];

      var bezierPoints=[];
      bezierPoints[0] = p1;
      bezierPoints[1] = [p1[0]+d1[0],p1[1]+d1[1]];
      bezierPoints[2] = [p2[0]+d2[0],p2[1]+d2[1]];
      bezierPoints[3] = p2;
      var min = [p1[0],p1[1]];
      var max = [p1[0],p1[1]];
      for(var i=1 ; i<bezierPoints.length ; i++){
         var p = bezierPoints[i];
         if(p[0] < min[0]){
            min[0] = p[0];
         }
         if(p[1] < min[1]){
            min[1] = p[1];
         }
         if(p[0] > max[0]){
            max[0] = p[0];
         }
         if(p[1] > max[1]){
            max[1] = p[1];
         }
      }
      min[0] = min[0]-margin[0];
      min[1] = min[1]-margin[1];
      max[0] = max[0]+margin[0];
      max[1] = max[1]+margin[1];
      var lw = Math.abs(max[0]-min[0]);
      var lh = Math.abs(max[1]-min[1]);

      this.SetCanvasRegion(min[0],min[1],lw,lh);


      for(var i = 0 ; i<bezierPoints.length ; i++){
         bezierPoints[i][0] = bezierPoints[i][0]-min[0];
         bezierPoints[i][1] = bezierPoints[i][1]-min[1];
      }

      if (this.options.selected) {
        ctxt.lineCap = this.options.bordercap;
        ctxt.strokeStyle = this.options.bordercolor;
        ctxt.lineWidth = this.options.width+this.options.borderwidth*2;
        ctxt.beginPath();
        ctxt.moveTo(bezierPoints[0][0],bezierPoints[0][1]);
        ctxt.bezierCurveTo(bezierPoints[1][0],bezierPoints[1][1],bezierPoints[2][0],bezierPoints[2][1],bezierPoints[3][0],bezierPoints[3][1]+arrowLength/2*this.terminal2.options.direction[1]);
        ctxt.stroke();
      }

      ctxt.lineCap = this.options.cap;
      ctxt.strokeStyle = this.options.color;
      ctxt.lineWidth = this.options.width;
      ctxt.beginPath();
      ctxt.moveTo(bezierPoints[0][0],bezierPoints[0][1]);
      ctxt.bezierCurveTo(bezierPoints[1][0],bezierPoints[1][1],bezierPoints[2][0],bezierPoints[2][1],bezierPoints[3][0],bezierPoints[3][1]+arrowLength/2*this.terminal2.options.direction[1]);
      ctxt.stroke();

      if (this.options.fields.name) {
        CanvasTextFunctions.enable(ctxt);
        var center = {x:0,y:0};
        var x1 = bezierPoints[0][0];
        var x2 = bezierPoints[3][0];
        var y1 = bezierPoints[0][1];
        var y2 = bezierPoints[3][1]

        var fontSize=14;
        center.x =  (x1 + x2) / 2;
        center.y =  ((y1 + y2) / 2) + (60 * this.terminal2.options.direction[1]);
        var padding = 8;
        var hp = padding/2;
        var tWidth = ctxt.measureText("sans", fontSize,this.options.fields.name) + padding;
        var desc = ctxt.fontDescent("sans",fontSize) + hp;
        var asc = ctxt.fontAscent("sans",fontSize) + hp;
        var tHeight = desc+asc;

        var lastFillStyle = ctxt.fillStyle;
        var lastWidth = ctxt.lineWidth;
        var lastStrokeStyle = ctxt.strokeStyle;

        ctxt.lineWidth=1;
        ctxt.fillStyle = "rgba(255,255,255,0.85)";
        ctxt.fillRect(center.x - hp - (tWidth/2),center.y - hp - tHeight + desc, tWidth, tHeight);

        ctxt.fillStyle = this.options.color;
        ctxt.strokeRect(center.x - hp - (tWidth/2),center.y - hp - tHeight + desc, tWidth, tHeight);
        ctxt.drawTextCenter("sans", fontSize, center.x-hp, center.y-hp, this.options.fields.name);

        ctxt.fillStyle = lastFillStyle;
        ctxt.lineWidth = lastWidth;
        ctxt.strokeStyle = lastStrokeStyle;
      }

		var t1 = bezierPoints[2]
   	var t2 = p2;

   	var z = [0,0]; //point on the wire with constant distance (dlug) from terminal2
   	var dlug = arrowLength; //arrow length
   	var t = 1-(dlug/distance);
   	z[0] = Math.abs( t1[0] +  t*(t2[0]-t1[0]) );
   	z[1] = Math.abs( t1[1] + t*(t2[1]-t1[1]) );

   	var W = t1[0] - t2[0];
   	var Wa = t1[1] - t2[1];
   	var Wb = t1[0]*t2[1] - t1[1]*t2[0];
   	if (W != 0)
   	{
   		a = Wa/W;
   		b = Wb/W;
   	}
   	else
   	{
   		a = 0;
   	}
   	if (a == 0)
   	{
   		aProst = 0;
   	}
   	else
   	{
   		aProst = -1/a;
   	}
   	bProst = z[1] - aProst*z[0]; //point z lays on this line

   	var A = 1 + Math.pow(aProst,2);
   	var B = 2*aProst*bProst - 2*z[0] - 2*z[1]*aProst;
   	var C = -2*z[1]*bProst + Math.pow(z[0],2) + Math.pow(z[1],2) - Math.pow(d,2) + Math.pow(bProst,2);
   	var delta = Math.pow(B,2) - 4*A*C;
   	if (delta < 0) { return; }

   	var x1 = (-B + Math.sqrt(delta)) / (2*A);
   	var x2 = (-B - Math.sqrt(delta)) / (2*A);
   	var y1 = aProst*x1 + bProst;
   	var y2 = aProst*x2 + bProst;

   	if(t1[1] == t2[1]) {
   	      var o = (t1[0] > t2[0]) ? 1 : -1;
      	   x1 = t2[0]+o*dlug;
      	   x2 = x1;
      	   y1 -= d;
      	   y2 += d;
   	}

   	ctxt.fillStyle = this.options.color;
   	ctxt.beginPath();
   	ctxt.moveTo(t2[0],t2[1]);
   	ctxt.lineTo(x1,y1);
   	ctxt.lineTo(x2,y2);
   	ctxt.fill();

    if (this.options.selected) {
      ctxt.strokeStyle = this.options.bordercolor;
      ctxt.lineWidth = this.options.borderwidth;
      ctxt.beginPath();
      ctxt.moveTo(t2[0],t2[1]);
      ctxt.lineTo(x1,y1);
      ctxt.lineTo(x2,y2);
      ctxt.lineTo(t2[0],t2[1]);
      ctxt.stroke();
    }

   },

 /**
    * Drawing methods for arrows
    * @method drawArrows
    */
   drawArrows: function()
   {
   	var d = 7; // arrow width/2
      var redim = d+3; //we have to make the canvas a little bigger because of arrows
      var margin=[4+redim,4+redim];

      var p1 = this.terminal1.getXY();
      var p2 = this.terminal2.getXY();

      var distance=Math.sqrt(Math.pow(p1[0]-p2[0],2)+Math.pow(p1[1]-p2[1],2));

      var min=[ Math.min(p1[0],p2[0])-margin[0], Math.min(p1[1],p2[1])-margin[1]];
      var max=[ Math.max(p1[0],p2[0])+margin[0], Math.max(p1[1],p2[1])+margin[1]];


      var lw=Math.abs(max[0]-min[0])+redim;
      var lh=Math.abs(max[1]-min[1])+redim;

      p1[0]=p1[0]-min[0];
      p1[1]=p1[1]-min[1];
      p2[0]=p2[0]-min[0];
      p2[1]=p2[1]-min[1];

      this.SetCanvasRegion(min[0],min[1],lw,lh);

      var ctxt=this.getContext();

      ctxt.lineCap=this.options.bordercap;
      ctxt.strokeStyle=this.options.bordercolor;
      ctxt.lineWidth=this.options.width+this.options.borderwidth*2;
      ctxt.beginPath();
      ctxt.moveTo(p1[0],p1[1]);
      ctxt.lineTo(p2[0],p2[1]);
      ctxt.stroke();

      ctxt.lineCap=this.options.cap;
      ctxt.strokeStyle=this.options.color;
      ctxt.lineWidth=this.options.width;
      ctxt.beginPath();
      ctxt.moveTo(p1[0],p1[1]);
      ctxt.lineTo(p2[0],p2[1]);
      ctxt.stroke();

   	/* start drawing arrows */

   	var t1 = p1;
   	var t2 = p2;

   	var z = [0,0]; //point on the wire with constant distance (dlug) from terminal2
   	var dlug = 20; //arrow length
   	var t = 1-(dlug/distance);
   	z[0] = Math.abs( t1[0] +  t*(t2[0]-t1[0]) );
   	z[1] = Math.abs( t1[1] + t*(t2[1]-t1[1]) );

   	var W = t1[0] - t2[0];
   	var Wa = t1[1] - t2[1];
   	var Wb = t1[0]*t2[1] - t1[1]*t2[0];
   	if (W != 0)
   	{
   		a = Wa/W;
   		b = Wb/W;
   	}
   	else
   	{
   		a = 0;
   	}
   	if (a == 0)
   	{
   		aProst = 0;
   	}
   	else
   	{
   		aProst = -1/a;
   	}
   	bProst = z[1] - aProst*z[0]; //point z lays on this line

   	var A = 1 + Math.pow(aProst,2);
   	var B = 2*aProst*bProst - 2*z[0] - 2*z[1]*aProst;
   	var C = -2*z[1]*bProst + Math.pow(z[0],2) + Math.pow(z[1],2) - Math.pow(d,2) + Math.pow(bProst,2);
   	var delta = Math.pow(B,2) - 4*A*C;
   	if (delta < 0) { return; }

   	var x1 = (-B + Math.sqrt(delta)) / (2*A);
   	var x2 = (-B - Math.sqrt(delta)) / (2*A);
   	var y1 = aProst*x1 + bProst;
   	var y2 = aProst*x2 + bProst;

   	if(t1[1] == t2[1]) {
   	      var o = (t1[0] > t2[0]) ? 1 : -1;
      	   x1 = t2[0]+o*dlug;
      	   x2 = x1;
      	   y1 -= d;
      	   y2 += d;
   	}

   	ctxt.fillStyle = this.options.color;
   	ctxt.beginPath();
   	ctxt.moveTo(t2[0],t2[1]);
   	ctxt.lineTo(x1,y1);
   	ctxt.lineTo(x2,y2);
   	ctxt.fill();

   	ctxt.strokeStyle = this.options.bordercolor;
   	ctxt.lineWidth = this.options.borderwidth;
   	ctxt.beginPath();
   	ctxt.moveTo(t2[0],t2[1]);
   	ctxt.lineTo(x1,y1);
   	ctxt.lineTo(x2,y2);
   	ctxt.lineTo(t2[0],t2[1]);
   	ctxt.stroke();

   },

   /**
    * Drawing method for arrows
    * @method drawStraight
    */
   drawStraight: function()
   {
      var margin = [4,4];

      var p1 = this.terminal1.getXY();
      var p2 = this.terminal2.getXY();

      var min=[ Math.min(p1[0],p2[0])-margin[0], Math.min(p1[1],p2[1])-margin[1]];
      var max=[ Math.max(p1[0],p2[0])+margin[0], Math.max(p1[1],p2[1])+margin[1]];

      var lw=Math.abs(max[0]-min[0]);
      var lh=Math.abs(max[1]-min[1]);

      p1[0] = p1[0]-min[0];
      p1[1] = p1[1]-min[1];
      p2[0] = p2[0]-min[0];
      p2[1] = p2[1]-min[1];

      this.SetCanvasRegion(min[0],min[1],lw,lh);

      var ctxt=this.getContext();

      ctxt.lineCap=this.options.bordercap;
      ctxt.strokeStyle=this.options.bordercolor;
      ctxt.lineWidth=this.options.width+this.options.borderwidth*2;
      ctxt.beginPath();
      ctxt.moveTo(p1[0],p1[1]);
      ctxt.lineTo(p2[0],p2[1]);
      ctxt.stroke();

      ctxt.lineCap=this.options.cap;
      ctxt.strokeStyle=this.options.color;
      ctxt.lineWidth=this.options.width;
      ctxt.beginPath();
      ctxt.moveTo(p1[0],p1[1]);
      ctxt.lineTo(p2[0],p2[1]);
      ctxt.stroke();
   },

   /**
    * @method redraw
    */
   redraw: function() {
      if(this.options.drawingMethod == 'straight') {
         this.drawStraight();
      }
      else if(this.options.drawingMethod == 'arrows') {
         this.drawArrows();
      }
	  else if(this.options.drawingMethod == 'bezierArrows') {
         this.drawBezierArrows();
	  }
      else if(this.options.drawingMethod == 'bezier') {
         this.drawBezierCurve();
      }
      else {
         throw new Error("WireIt.Wire unable to find '"+this.drawingMethod+"' drawing method.");
      }
   },

   /**
    * @method wireDrawnAt
    * @return {Boolean} true if the wire is at x,y
    */
   wireDrawnAt: function(x,y) {
     var ctxt = this.getContext();
	   var imgData = ctxt.getImageData(x,y,1,1);
	   var pixel = imgData.data;
	   return !( pixel[0] == 0 && pixel[1] == 0 && pixel[2] == 0 && pixel[3] == 0 );
   },

   /**
    * Called by the Layer when the mouse moves over the canvas element.
    * Note: the event is not listened directly, to receive the event event if the wire is behind another wire
    * @method onWireMove
    * @param {Integer} x left position of the mouse (relative to the canvas)
    * @param {Integer} y top position of the mouse (relative to the canvas)
    */
   onMouseMove: function(x,y) {

      if(typeof this.mouseInState === undefined) {
         this.mouseInState = false;
      }

	   if( this.wireDrawnAt(x,y) ) {
			if(!this.mouseInState) {
			   this.mouseInState=true;
			   this.onWireIn(x,y);
			}
			this.onWireMove(x,y);
	   }
	   else {
	      if(this.mouseInState) {
	         this.mouseInState=false;
	         this.onWireOut(x,y);
	      }
	   }

   },

   /**
    * When the mouse moves over a wire
    * Note: this will only work within a layer
    * @method onWireMove
    * @param {Integer} x left position of the mouse (relative to the canvas)
    * @param {Integer} y top position of the mouse (relative to the canvas)
    */
   onWireMove: function(x,y) {
   },

   updateFields: function() {
     var new_width = parseInt(this.options.fields.width);
     if ((new_width!= NaN) && new_width > 0 && new_width < 50) {
       this.options.width = new_width;
       this.options.fields.width = new_width;
     }
     else {
       this.options.fields.width = this.options.width;
     }
     this.options.name = this.options.fields.name;
     if ($(this.options.fields.color)) {
       var color = $(this.options.fields.color).getStyle('background-color').parseColor("#00000");
       this.options.color = color;
     }
     this.redraw();
   },

   /**
    * When the mouse comes into the wire
    * Note: this will only work within a layer
    * @method onWireIn
    * @param {Integer} x left position of the mouse (relative to the canvas)
    * @param {Integer} y top position of the mouse (relative to the canvas)
    */
   onWireIn: function(x,y) {
      this.options.last_color = this.options.color;
      this.options.color = "#FF0000";
      this.redraw();
   },

   /**
    * When the mouse comes out of the wire
    * Note: this will only work within a layer
    * @method onWireOut
    * @param {Integer} x left position of the mouse (relative to the canvas)
    * @param {Integer} y top position of the mouse (relative to the canvas)
    */
   onWireOut: function(x,y) {
      this.options.color = this.options.last_color || "#FF00000";
      this.redraw();
   },

   /**
    * When the mouse clicked on the canvas
    * Note: this will only work within a layer
    * @method onClick
    * @param {Integer} x left position of the mouse (relative to the canvas)
    * @param {Integer} y top position of the mouse (relative to the canvas)
    */
   onClick: function(x,y) {
 	   if( this.wireDrawnAt(x,y) ) {
 	      this.onWireClick(x,y);
      }
   },

	onDblClick: function(x,y) {
		if( this.wireDrawnAt(x,y) ) {
			this.onWireDblClick(x,y);
		}
	},
   /**
    * When the mouse clicked on the wire
    * Note: this will only work within a layer
    * @method onWireClick
    * @param {Integer} x left position of the mouse (relative to the canvas)
    * @param {Integer} y top position of the mouse (relative to the canvas)
    */
   onWireClick: function(x,y) {
     debug('clicked');
     WireIt.Wire.openPropEditorFor.fire(this);
     this.redraw;
   },

   onWireDblClick: function(x,y) {
 	  debug('dbl-clicked');
    WireIt.Wire.openPropEditorFor.fire(this);
		this.redraw;
   }
});


WireIt.Wire.openPropEditorFor  = new YAHOO.util.CustomEvent("OpenWireEditorFor");
(function() {

   var util = YAHOO.util;
   var Event = util.Event, lang = YAHOO.lang, Dom = util.Dom, CSS_PREFIX = "WireIt-";


   /**
    * Scissors widget to cut wires
    * @class Scissors
    * @namespace WireIt
    * @extends YAHOO.util.Element
    * @constructor
    * @param {WireIt.Terminal} terminal Associated terminal
    * @param {Object} oConfigs
    */
   WireIt.Scissors = function(terminal, oConfigs) {
      WireIt.Scissors.superclass.constructor.call(this, document.createElement('div'), oConfigs);

      /**
       * The terminal it is associated to
       * @property _terminal
       * @type {WireIt.Terminal}
       */
      this._terminal = terminal;

      this.initScissors();
   };
   lang.extend(WireIt.Scissors, util.Element, {

      /**
       * Init the scissors
       * @method initScissors
       */
      initScissors: function() {

         this.hideNow();
         this.addClass(CSS_PREFIX+"Wire-scissors");

         this.appendTo(this._terminal.container ? this._terminal.container.layer.el : this._terminal.el.parentNode.parentNode);

         this.on("mouseover", this.show, this, true);
         this.on("mouseout", this.hide, this, true);
         this.on("click", this.scissorClick, this, true);

         Event.addListener(this._terminal.el, "mouseover", this.mouseOver, this, true);
         Event.addListener(this._terminal.el, "mouseout", this.hide, this, true);
      },

      /**
       * @method setPosition
       */
      setPosition: function() {
         var pos = this._terminal.getXY();
         this.setStyle("left", (pos[0]+this._terminal.options.direction[0]*30-8)+"px");
         this.setStyle("top", (pos[1]+this._terminal.options.direction[1]*30-8)+"px");
      },
      /**
       * @method mouseOver
       */
      mouseOver: function() {
         if(this._terminal.wires.length > 0)  {
            this.show();
         }
      },

      /**
       * @method scissorClick
       */
      scissorClick: function() {
         this._terminal.removeAllWires();
         if(this.terminalTimeout) { this.terminalTimeout.cancel(); }
         this.hideNow();
      },
      /**
       * @method show
       */
      show: function() {
         this.setPosition();
         this.setStyle('display','');
         if(this.terminalTimeout) { this.terminalTimeout.cancel(); }
      },
      /**
       * @method hide
       */
      hide: function() {
         this.terminalTimeout = lang.later(700,this,this.hideNow);
      },
      /**
       * @method hideNow
       */
      hideNow: function() {
         this.setStyle('display','none');
      }

   });






/**
 * This class is used for wire edition. It inherits from YAHOO.util.DDProxy and acts as a "temporary" Terminal.
 * @class TerminalProxy
 * @namespace WireIt
 * @extends YAHOO.util.DDProxy
 * @constructor
 * @param {WireIt.Terminal} terminal Parent terminal
 * @param {Object} options Configuration object (see "termConfig" property for details)
 */
WireIt.TerminalProxy = function(terminal, options) {

   /**
    * Reference to the terminal parent
    */
   this.terminal = terminal;

   /**
    * Object containing the configuration object
    * <ul>
    *   <li>type: 'type' of this terminal. If no "allowedTypes" is specified in the options, the terminal will only connect to the same type of terminal</li>
    *   <li>allowedTypes: list of all the allowed types that we can connect to.</li>
    *   <li>{Integer} terminalProxySize: size of the drag drop proxy element. default is 10 for "10px"</li>
    * </ul>
    * @property termConfig
    */
   this.termConfig = options || {};

   this.terminalProxySize = options.terminalProxySize || 10;

   /**
    * Object that emulate a terminal which is following the mouse
    */
   this.fakeTerminal = null;

   WireIt.TerminalProxy.superclass.constructor.call(this,this.terminal.el, undefined, {
      dragElId: "WireIt-TerminalProxy",
      resizeFrame: false,
      centerFrame: true
   });
};

util.DDM.mode = util.DDM.INTERSECT;

lang.extend(WireIt.TerminalProxy, util.DDProxy, {

   /**
    * Took this method from the YAHOO.util.DDProxy class
    * to overwrite the creation of the proxy Element with our custom size
    * @method createFrame
    */
   createFrame: function() {
        var self=this, body=document.body;
        if (!body || !body.firstChild) {
            setTimeout( function() { self.createFrame(); }, 50 );
            return;
        }
        var div=this.getDragEl(), Dom=YAHOO.util.Dom;
        if (!div) {
            div    = document.createElement("div");
            div.id = this.dragElId;
            var s  = div.style;
            s.position   = "absolute";
            s.visibility = "hidden";
            s.cursor     = "move";
            s.border     = "2px solid #aaa";
            s.zIndex     = 999;
            var size = this.terminalProxySize+"px";
            s.height     = size;
            s.width      = size;
            var _data = document.createElement('div');
            Dom.setStyle(_data, 'height', '100%');
            Dom.setStyle(_data, 'width', '100%');
            Dom.setStyle(_data, 'background-color', '#ccc');
            Dom.setStyle(_data, 'opacity', '0');
            div.appendChild(_data);
            body.insertBefore(div, body.firstChild);
        }
    },

   /**
    * @method startDrag
    */
   startDrag: function() {

      if(this.terminal.options.nMaxWires == 1 && this.terminal.wires.length == 1) {
         this.terminal.wires[0].remove();
      }
      else if(this.terminal.wires.length >= this.terminal.options.nMaxWires) {
         return;
      }

      var halfProxySize = this.terminalProxySize/2;
      this.fakeTerminal = {
         options: {direction: this.terminal.options.fakeDirection},
         pos: [200,200],
         addWire: function() {},
         removeWire: function() {},
         getXY: function() {
            var layers = Dom.getElementsByClassName('WireIt-Layer');
            if(layers.length > 0) {
               var orig = Dom.getXY(layers[0]);
               return [this.pos[0]-orig[0]+halfProxySize, this.pos[1]-orig[1]+halfProxySize];
            }
            return this.pos;
         }
      };

      var parentEl = this.terminal.parentEl.parentNode;
      if(this.terminal.container) {
         parentEl = this.terminal.container.layer.el;
      }
      this.editingWire = new WireIt.Wire(this.terminal, this.fakeTerminal, parentEl, this.terminal.options.editingWireConfig);
      Dom.addClass(this.editingWire.element, CSS_PREFIX+'Wire-editing');
   },

   /**
    * @method onDrag
    */
   onDrag: function(e) {

      if(!this.editingWire) { return; }

      if(this.terminal.container) {
         var obj = this.terminal.container.layer.el;
         var curleft = curtop = 0;
        	if (obj.offsetParent) {
        		do {
        			curleft += obj.offsetLeft;
        			curtop += obj.offsetTop;
        			obj = obj.offsetParent ;
        		} while ( obj = obj.offsetParent );
        	}
         this.fakeTerminal.pos = [e.clientX-curleft+this.terminal.container.layer.el.scrollLeft,
                                  e.clientY-curtop+this.terminal.container.layer.el.scrollTop];
      }
      else {
         this.fakeTerminal.pos = (YAHOO.env.ua.ie) ? [e.clientX, e.clientY] : [e.clientX+window.pageXOffset, e.clientY+window.pageYOffset];
      }
      this.editingWire.redraw();
   },


   /**
    * @method endDrag
    */
   endDrag: function(e) {
      if(this.editingWire) {
         this.editingWire.remove();
         this.editingWire = null;
      }
   },

   /**
    * @method onDragEnter
    */
   onDragEnter: function(e,ddTargets) {

      if(!this.editingWire) { return; }

      for(var i = 0 ; i < ddTargets.length ; i++) {
         if( this.isValidWireTerminal(ddTargets[i]) ) {
            ddTargets[i].terminal.setDropInvitation(true);
         }
      }
   },

   /**
    * @method onDragOut
    */
   onDragOut: function(e,ddTargets) {

      if(!this.editingWire) { return; }

      for(var i = 0 ; i < ddTargets.length ; i++) {
         if( this.isValidWireTerminal(ddTargets[i]) ) {
            ddTargets[i].terminal.setDropInvitation(false);
         }
      }
   },

   /**
    * @method onDragDrop
    */
   onDragDrop: function(e,ddTargets) {
      var nodeFrom;
      var nodeTo;

      if(!this.editingWire) { return; }

      this.onDragOut(e,ddTargets);

      var targetTerminalProxy = null;
      for(var i = 0 ; i < ddTargets.length ; i++) {
         if( this.isValidWireTerminal(ddTargets[i]) ) {
            targetTerminalProxy =  ddTargets[i];
            nodeTo = ddTargets[i].terminal.container;
            break;
         }
      }

      if( !targetTerminalProxy ) {
         return;
      }

      this.editingWire.remove();
      this.editingWire = null;

      var termAlreadyConnected = false;
      for(var i = 0 ; i < this.terminal.wires.length ; i++) {
         if(this.terminal.wires[i].terminal1 == this.terminal) {
            if( this.terminal.wires[i].terminal2 == targetTerminalProxy.terminal) {
               termAlreadyConnected = true;
               break;
            }
         }
         else if(this.terminal.wires[i].terminal2 == this.terminal) {
            if( this.terminal.wires[i].terminal1 == targetTerminalProxy.terminal) {
               termAlreadyConnected = true;
               break;
            }
         }
      }

      if(termAlreadyConnected) {
         return;
      }

      var parentEl = this.terminal.parentEl.parentNode;
      if(this.terminal.container) {
         parentEl = this.terminal.container.layer.el;
      }

      var term1 = this.terminal;
      var term2 = targetTerminalProxy.terminal;
      if(term2.options.alwaysSrc) {
         term1 = targetTerminalProxy.terminal;
         term2 = this.terminal;
      }

      var tgtTerm = targetTerminalProxy.terminal;
      if( tgtTerm.options.nMaxWires == 1) {
         if(tgtTerm.wires.length > 0) {
            tgtTerm.wires[0].remove();
         }
         var w = new WireIt.Wire(term1, term2, parentEl, term1.options.wireConfig);
         w.redraw();
      }
      else if(tgtTerm.wires.length < tgtTerm.options.nMaxWires) {
         var w = new WireIt.Wire(term1, term2, parentEl, term1.options.wireConfig);
         w.redraw();
      }


      nodeFrom = this.terminal.container;

			console.log( 'You connected: "' + nodeFrom.options.name + '" to: "' + nodeTo.options.name + '"' );


      /*else {
      }*/

   },


   isWireItTerminal: true,


   /**
    * @method isValidWireTerminal
    */
   isValidWireTerminal: function(DDterminal) {

      if( !DDterminal.isWireItTerminal ) {
         return false;
      }

      if(this.termConfig.type) {
         if(this.termConfig.allowedTypes) {
            if( WireIt.indexOf(DDterminal.termConfig.type, this.termConfig.allowedTypes) == -1 ) {
               return false;
            }
         }
         else {
            if(this.termConfig.type != DDterminal.termConfig.type) {
               return false;
            }
         }
      }
      else if(DDterminal.termConfig.type) {
         if(DDterminal.termConfig.allowedTypes) {
            if( WireIt.indexOf(this.termConfig.type, DDterminal.termConfig.allowedTypes) == -1 ) {
               return false;
            }
         }
         else {
            if(this.termConfig.type != DDterminal.termConfig.type) {
               return false;
            }
         }
      }

      if(this.terminal.container) {
         if(this.terminal.container.options.preventSelfWiring) {
            if(DDterminal.terminal.container == this.terminal.container) {
               return false;
            }
         }
      }

      return true;
   }

});



/**
 * Terminals represent the end points of the "wires"
 * @class Terminal
 * @constructor
 * @param {HTMLElement} parentEl Element that will contain the terminal
 * @param {Object} options Configuration object
 * @param {WireIt.Container} container (Optional) Container containing this terminal
 */
WireIt.Terminal = function(parentEl, options, container) {

   /**
    * DOM parent element
    * @property parentEl
    * @type {HTMLElement}
    */
   this.parentEl = parentEl;

   /**
    * Container (optional). Parent container of this terminal
    * @property container
    * @type {WireIt.Container}
    */
   this.container = container;

   /**
    * List of the associated wires
    * @property wires
    * @type {Array}
    */
    this.wires = [];


   this.setOptions(options);

   /**
    * Event that is fired when a wire is added
    * You can register this event with myTerminal.eventAddWire.subscribe(function(e,params) { var wire=params[0];}, scope);
    * @event eventAddWire
    */
   this.eventAddWire = new util.CustomEvent("eventAddWire");

   /**
    * Event that is fired when a wire is removed
    * You can register this event with myTerminal.eventRemoveWire.subscribe(function(e,params) { var wire=params[0];}, scope);
    * @event eventRemoveWire
    */
   this.eventRemoveWire = new util.CustomEvent("eventRemoveWire");

   /**
    * DIV dom element that will display the Terminal
    * @property el
    * @type {HTMLElement}
    */
   this.el = null;


   this.render();

   if(this.options.editable) {
      this.dd = new WireIt.TerminalProxy(this, this.options.ddConfig);
      this.scissors = new WireIt.Scissors(this);
   }
};

WireIt.Terminal.prototype = {

   /**
    * @method setOptions
    * @param {Object} options
    */
   setOptions: function(options) {

      /**
       * <p>Object that contains the terminal configuration:</p>
       *
       * <ul>
       *   <li><b>name</b>: terminal name</li>
       *   <li><b>direction</b>: direction vector of the wires when connected to this terminal (default [0,1])</li>
       *   <li><b>fakeDirection</b>: direction vector of the "editing" wire when it started from this terminal (default to -direction)</li>
       *   <li><b>editable</b>: boolean that makes the terminal editable (default to true)</li>
       *   <li><b>nMaxWires</b>: maximum number of wires for this terminal (default to Infinity)</li>
       *   <li><b>offsetPosition</b>: offset position from the parentEl position. Can be an array [top,left] or an object {left: 100, bottom: 20} or {right: 10, top: 5} etc... (default to [0,0])</li>
       *   <li><b>ddConfig</b>: configuration of the WireIt.TerminalProxy object (only if editable)</li>
       *   <li><b>alwaysSrc</b>: alwaysSrc forces this terminal to be the src terminal in the wire config (default false, only if editable)</li>
       *   <li><b>className</b>: CSS class name of the terminal (default to "WireIt-Terminal")</li>
       *   <li><b>connectedClassName</b>: CSS class added to the terminal when it is connected (default to "WireIt-Terminal-connected")</li>
       *   <li><b>dropinviteClassName</b>: CSS class added for drop invitation (default to "WireIt-Terminal-dropinvite")</li>
       * </ul>
       * @property options
       */
      this.options = {};
      this.options.name = options.name;
      this.options.direction = options.direction || [0,1];
      this.options.fakeDirection = options.fakeDirection || [-this.options.direction[0],-this.options.direction[1]];
      this.options.className = options.className || CSS_PREFIX+'Terminal';
      this.options.connectedClassName = options.connectedClassName || CSS_PREFIX+'Terminal-connected';
      this.options.dropinviteClassName = options.dropinviteClassName || CSS_PREFIX+'Terminal-dropinvite';
      this.options.editable = lang.isUndefined(options.editable) ? true : options.editable;
      this.options.nMaxWires = options.nMaxWires || Infinity;
      this.options.wireConfig = options.wireConfig || {};
      this.options.editingWireConfig = options.editingWireConfig || this.options.wireConfig;
      this.options.offsetPosition = options.offsetPosition;
      this.options.alwaysSrc = lang.isUndefined(options.alwaysSrc) ? false : options.alwaysSrc;
      this.options.ddConfig = options.ddConfig || {};
   },

   /**
    * Show or hide the drop invitation. (by adding/removing this.options.dropinviteClassName CSS class)
    * @method setDropInvitation
    * @param {Boolean} display Show the invitation if true, hide it otherwise
    */
   setDropInvitation: function(display) {
      if(display) {
         Dom.addClass(this.el, this.options.dropinviteClassName);
      }
      else {
         Dom.removeClass(this.el, this.options.dropinviteClassName);
      }
   },

   /**
    * Render the DOM of the terminal
    * @method render
    */
   render: function() {

      this.el = WireIt.cn('div', {className: this.options.className} );
      if(this.options.name) { this.el.title = this.options.name; }

      var pos = this.options.offsetPosition;
      if(pos) {
         if( lang.isArray(pos) ) {
            this.el.style.left = pos[0]+"px";
            this.el.style.top = pos[1]+"px";
         }
         else if( lang.isObject(pos) ) {
            for(var key in pos) {
               if(pos.hasOwnProperty(key) && pos[key] != ""){
                  this.el.style[key] = pos[key]+"px";
               }
            }
         }
      }

      this.parentEl.appendChild(this.el);
   },


   /**
    * Add a wire to this terminal.
    * @method addWire
    * @param {WireIt.Wire} wire Wire instance to add
    */
   addWire: function(wire) {

      this.wires.push(wire);

      Dom.addClass(this.el, this.options.connectedClassName);

      this.eventAddWire.fire(wire);
   },

   /**
    * Remove a wire
    * @method removeWire
    * @param {WireIt.Wire} wire Wire instance to remove
    */
   removeWire: function(wire) {
      var index = WireIt.indexOf(wire, this.wires), w;
      if( index != -1 ) {

         this.wires[index].destroy();

         this.wires[index] = null;
         this.wires = WireIt.compact(this.wires);

         if(this.wires.length == 0) {
            Dom.removeClass(this.el, this.options.connectedClassName);
         }

         this.eventRemoveWire.fire(wire);
      }
   },


   /**
    * This function is a temporary test. I added the border width while traversing the DOM and
    * I calculated the offset to center the wire in the terminal just after its creation
    * @method getXY
    */
   getXY: function() {

      var layerEl = this.container && this.container.layer ? this.container.layer.el : document.body;

      var obj = this.el;
      var curleft = curtop = 0;
     	if (obj.offsetParent) {
     		do {
     			curleft += obj.offsetLeft;
     			curtop += obj.offsetTop;
     			obj = obj.offsetParent;
     		} while ( !!obj && obj != layerEl);
     	}

     	return [curleft+15,curtop+15];
   },



   /**
    * Remove the terminal from the DOM
    * @method remove
    */
   remove: function() {
      while(this.wires.length > 0) {
         this.wires[0].remove();
      }
      this.parentEl.removeChild(this.el);

      Event.purgeElement(this.el);

      if(this.scissors) {
         Event.purgeElement(this.scissors.get('element'));
      }

   },



   /**
    * Returns a list of all the terminals connecter to this terminal through its wires.
    * @method getConnectedTerminals
    * @return  {Array}  List of all connected terminals
    */
   getConnectedTerminals: function() {
      var terminalList = [];
      if(this.wires) {
         for(var i = 0 ; i < this.wires.length ; i++) {
            terminalList.push(this.wires[i].getOtherTerminal(this));
         }
      }
      return terminalList;
   },


   /**
    * Redraw all the wires connected to this terminal
    * @method redrawAllWires
    */
   redrawAllWires: function() {
      if(this.wires) {
         for(var i = 0 ; i < this.wires.length ; i++) {
            this.wires[i].redraw();
         }
      }
   },

   /**
    * Remove all wires
    * @method removeAllWires
    */
   removeAllWires: function() {
      while(this.wires.length > 0) {
         this.wires[0].remove();
      }
   }

};

 /**
  * Class that extends Terminal to differenciate Input/Output terminals
  * @class WireIt.util.TerminalInput
  * @extends WireIt.Terminal
  * @constructor
  * @param {HTMLElement} parentEl Parent dom element
  * @param {Object} options configuration object
  * @param {WireIt.Container} container (Optional) Container containing this terminal
  */
WireIt.util.TerminalInput = function(parentEl, options, container) {
   WireIt.util.TerminalInput.superclass.constructor.call(this,parentEl, options, container);
};
lang.extend(WireIt.util.TerminalInput, WireIt.Terminal, {

   /**
    * Override setOptions to add the default options for TerminalInput
    * @method setOptions
    */
   setOptions: function(options) {

      WireIt.util.TerminalInput.superclass.setOptions.call(this,options);

      this.options.direction = options.direction || [0,-1];
      this.options.fakeDirection = options.fakeDirection || [0,1];
      this.options.ddConfig = {
         type: "input",
         allowedTypes: ["output"]
      };
      this.options.nMaxWires = options.nMaxWires || 1;
   }

});




 /**
  * Class that extends Terminal to differenciate Input/Output terminals
  * @class WireIt.util.TerminalOutput
  * @extends WireIt.Terminal
  * @constructor
  * @param {HTMLElement} parentEl Parent dom element
  * @param {Object} options configuration object
  * @param {WireIt.Container} container (Optional) Container containing this terminal
  */
WireIt.util.TerminalOutput = function(parentEl, options, container) {
   WireIt.util.TerminalOutput.superclass.constructor.call(this,parentEl, options, container);
};
lang.extend(WireIt.util.TerminalOutput, WireIt.Terminal, {

   /**
    * Override setOptions to add the default options for TerminalOutput
    * @method setOptions
    */
   setOptions: function(options) {

      WireIt.util.TerminalOutput.superclass.setOptions.call(this,options);

      this.options.direction = options.direction || [0,1];
      this.options.fakeDirection = options.fakeDirection || [0,-1];
      this.options.ddConfig = {
         type: "output",
         allowedTypes: ["input"]
      };
      this.options.alwaysSrc = true;
   }

});


})();
/**
 * WireIt.util.DD is a wrapper class for YAHOO.util.DD, to redraw the wires associated with the given terminals while drag-dropping
 * @class DD
 * @namespace WireIt.util
 * @extends YAHOO.util.DD
 * @constructor
 * @param {Array} terminals List of WireIt.Terminal objects associated within the DragDrop element
 * @param {String} id Parameter of YAHOO.util.DD
 * @param {String} sGroup Parameter of YAHOO.util.DD
 * @param {Object} config Parameter of YAHOO.util.DD
 */
WireIt.util.DD = function( terminals, id, sGroup, config) {
   if(!terminals) {
      throw new Error("WireIt.util.DD needs at least terminals and id");
   }
   /**
    * List of the contained terminals
    * @property _WireItTerminals
    * @type {Array}
    */
   this._WireItTerminals = terminals;

   WireIt.util.DD.superclass.constructor.call(this, id, sGroup, config);
};

YAHOO.extend(WireIt.util.DD, YAHOO.util.DD, {

   /**
    * Override YAHOO.util.DD.prototype.onDrag to redraw the wires
    * @method onDrag
    */
   onDrag: function(e) {
      var terminalList = YAHOO.lang.isArray(this._WireItTerminals) ? this._WireItTerminals : (this._WireItTerminals.isWireItTerminal ? [this._WireItTerminals] : []);
      for(var i = 0 ; i < terminalList.length ; i++) {
         if(terminalList[i].wires) {
            for(var k = 0 ; k < terminalList[i].wires.length ; k++) {
               terminalList[i].wires[k].redraw();
            }
         }
      }
   },

   /**
    * In case you change the terminals since you created the WireIt.util.DD:
    * @method setTerminals
    */
   setTerminals: function(terminals) {
      this._WireItTerminals = terminals;
   }

});
/**
 * Make a container resizable
 * @class DDResize
 * @namespace WireIt.util
 * @extends YAHOO.util.DragDrop
 * @constructor
 * @param {WireIt.Container} container The container that is to be resizable
 * @param {Object} config Configuration object
 */
WireIt.util.DDResize = function(container, config) {

   /**
    * Configuration object
    * <ul>
    *   <li>minWidth: minimum width (default 50)</li>
    *   <li>minHeight: minimum height (default 50)</li>
    * </ul>
    * @property myConf
    */
   this.myConf = config || {};
   this.myConf.container = container;
   this.myConf.minWidth = this.myConf.minWidth || 50;
   this.myConf.minHeight = this.myConf.minHeight || 50;

   WireIt.util.DDResize.superclass.constructor.apply(this, [container.el, container.ddResizeHandle]);

   this.setHandleElId(container.ddResizeHandle);

   /**
    * The event fired when the container is resized
    * @event eventResize
    */
   this.eventResize = new YAHOO.util.CustomEvent("eventResize");
};

YAHOO.extend(WireIt.util.DDResize, YAHOO.util.DragDrop, {

   /**
    * @method onMouseDown
    */
   onMouseDown: function(e) {
        var panel = this.getEl();
        this.startWidth = panel.offsetWidth;
        this.startHeight = panel.offsetHeight;

        this.startPos = [YAHOO.util.Event.getPageX(e), YAHOO.util.Event.getPageY(e)];
    },

    /**
     * @method onDrag
     */
    onDrag: function(e) {
        var newPos = [YAHOO.util.Event.getPageX(e),  YAHOO.util.Event.getPageY(e)];

        var offsetX = newPos[0] - this.startPos[0];
        var offsetY = newPos[1] - this.startPos[1];

        var newWidth = Math.max(this.startWidth + offsetX, this.myConf.minWidth);
        var newHeight = Math.max(this.startHeight + offsetY, this.myConf.minHeight);

        var panel = this.getEl();
        panel.style.width = newWidth + "px";
        panel.style.height = newHeight + "px";

        this.eventResize.fire([newWidth, newHeight]);
    }
});
(function() {
   var util = YAHOO.util;
   var Dom = util.Dom;
   var Event = util.Event;
   var CSS_PREFIX = "WireIt-";

/**
 * Visual module that contains terminals. The wires are updated when the module is dragged around.
 * @class Container
 * @namespace WireIt
 * @constructor
 * @param {Object}   options      Configuration object (see properties)
 * @param {WireIt.Layer}   layer The WireIt.Layer (or subclass) instance that contains this container
 */
WireIt.Container = function(options, layer) {

   this.setOptions(options);

   /**
    * the WireIt.Layer object that schould contain this container
    * @property layer
    * @type {WireIt.Layer}
    */
   this.layer = layer;

   /**
    * List of the terminals
    * @property terminals
    * @type {Array}
    */
   this.terminals = [];

   /**
    * List of all the wires connected to this container terminals
    * @property wires
    * @type {Array}
    */
   this.wires = [];

   /**
    * Container DOM element
    * @property el
    * @type {HTMLElement}
    */
   this.el = null;

   /**
    * Body element
    * @property bodyEl
    * @type {HTMLElement}
    */
   this.bodyEl = null;

   /**
    * Event that is fired when a wire is added
    * You can register this event with myTerminal.eventAddWire.subscribe(function(e,params) { var wire=params[0];}, scope);
    * @event eventAddWire
    */
   this.eventAddWire = new YAHOO.util.CustomEvent("eventAddWire");;

   /**
    * Event that is fired when a wire is removed
    * You can register this event with myTerminal.eventRemoveWire.subscribe(function(e,params) { var wire=params[0];}, scope);
    * @event eventRemoveWire
    */
   this.eventRemoveWire = new util.CustomEvent("eventRemoveWire");

   this.render();

   this.initTerminals( this.options.terminals);

	if(this.options.draggable) {

	   if(this.options.resizable) {
      	this.ddResize = new WireIt.util.DDResize(this);
      	this.ddResize.eventResize.subscribe(this.onResize, this, true);
	   }

	   this.dd = new WireIt.util.DD(this.terminals,this.el);

	   if(this.options.ddHandle) {
   	   this.dd.setHandleElId(this.ddHandle);
	   }

	   if(this.options.resizable) {
   	   this.dd.addInvalidHandleId(this.ddResizeHandle);
      	this.ddResize.addInvalidHandleId(this.ddHandle);
	   }
   }

};

WireIt.Container.prototype = {

   /**
    * set the options
    * @method setOptions
    */
   setOptions: function(options) {

      /**
       * Main options object
       * <ul>
       *    <li>terminals: list of the terminals configuration</li>
       *    <li>draggable: boolean that enables drag'n drop on this container (default: true)</li>
       *    <li>className: CSS class name for the container element (default 'WireIt-Container')</li>
       *    <li>position: initial position of the container</li>
       *    <li>ddHandle: (only if draggable) boolean indicating we use a handle for drag'n drop (default true)</li>
       *    <li>ddHandleClassName: CSS class name for the drag'n drop handle (default 'WireIt-Container-ddhandle')</li>
       *    <li>resizable: boolean that makes the container resizable (default true)</li>
       *    <li>resizeHandleClassName: CSS class name for the resize handle (default 'WireIt-Container-resizehandle')</li>
       *    <li>width: initial width of the container (no default so it autoadjusts to the content)</li>
       *    <li>height: initial height of the container (default 100)</li>
       *    <li>close: display a button to close the container (default true)</li>
       *    <li>closeButtonClassName: CSS class name for the close button (default "WireIt-Container-closebutton")</li>
       *    <li>title</li>
       *    <li>icon</li>
       *    <li>preventSelfWiring: option to prevent connections between terminals of this same container</li>
       * </ul>
       * @property options
       * @type {Object}
       */
      this.options = {};
      this.options.terminals = options.terminals || [];
      this.options.draggable = (typeof options.draggable == "undefined") ? true : options.draggable ;
      this.options.position = options.position || [100,100];
      this.options.className = options.className || CSS_PREFIX+'Container';

      this.options.ddHandle = (typeof options.ddHandle == "undefined") ? true : options.ddHandle;
      this.options.ddHandleClassName = options.ddHandleClassName || CSS_PREFIX+"Container-ddhandle";

      this.options.resizable = (typeof options.resizable == "undefined") ? true : options.resizable;
      this.options.resizeHandleClassName = options.resizeHandleClassName || CSS_PREFIX+"Container-resizehandle";

      this.options.width = options.width; // no default
      this.options.height = options.height;

      this.options.close = (typeof options.close == "undefined") ? true : options.close;
      this.options.closeButtonClassName = options.closeButtonClassName || CSS_PREFIX+"Container-closebutton";

      this.options.title = options.title; // no default

      this.options.icon = options.icon;

      this.options.preventSelfWiring = (typeof options.preventSelfWiring == "undefined") ? true : options.preventSelfWiring;
   },

   /**
    * Function called when the container is being resized.
    * It doesn't do anything, so please override it.
    * @method onResize
    */
   onResize: function(event, args) {
      var size = args[0];
      WireIt.sn(this.bodyEl, null, {width: (size[0]-10)+"px", height: (size[1]-44)+"px"});
   },

   /**
    * Render the dom of the container
    * @method render
    */
   render: function() {

      this.el = WireIt.cn('div', {className: this.options.className});

      if(this.options.width) {
         this.el.style.width = this.options.width+"px";
      }
      if(this.options.height) {
         this.el.style.height = this.options.height+"px";
      }

      Event.addListener(this.el, "mousedown", this.onMouseDown, this, true);

      if(this.options.ddHandle) {
      	this.ddHandle = WireIt.cn('div', {className: this.options.ddHandleClassName});
      	this.el.appendChild(this.ddHandle);

         if(this.options.title) {
            this.ddHandle.appendChild( WireIt.cn('span', null, null, this.options.title) );
         }

         if (this.options.icon) {
            var iconCn = WireIt.cn('img', {src: this.options.icon, className: 'WireIt-Container-icon'});
            this.ddHandle.appendChild(iconCn);
         }

      }

      this.bodyEl = WireIt.cn('div', {className: "body"});
      this.el.appendChild(this.bodyEl);

      if(this.options.resizable) {
      	this.ddResizeHandle = WireIt.cn('div', {className: this.options.resizeHandleClassName} );
      	this.el.appendChild(this.ddResizeHandle);
      }

      if(this.options.close) {
         this.closeButton = WireIt.cn('div', {className: this.options.closeButtonClassName} );
         this.el.appendChild(this.closeButton);
         Event.addListener(this.closeButton, "click", this.onCloseButton, this, true);
      }

      this.layer.el.appendChild(this.el);

   	this.el.style.left = this.options.position[0]+"px";
   	this.el.style.top = this.options.position[1]+"px";
   },

   /**
    * Sets the content of the body element
    * @method setBody
    * @param {String or HTMLElement} content
    */
   setBody: function(content) {
      if(typeof content == "string") {
         this.bodyEl.innerHTML = content;
      }
      else {
         this.bodyEl.innerHTML = "";
         this.bodyEl.appendChild(content);
      }
   },

   /**
    * Called when the user made a mouse down on the container and sets the focus to this container (only if within a Layer)
    * @method onMouseDown
    */
   onMouseDown: function() {
      if(this.layer) {
         if(this.layer.focusedContainer && this.layer.focusedContainer != this) {
            this.layer.focusedContainer.removeFocus();
         }
         this.setFocus();
         this.layer.focusedContainer = this;
      }
   },

   /**
    * Adds the class that shows the container as "focused"
    * @method setFocus
    */
   setFocus: function() {
      Dom.addClass(this.el, CSS_PREFIX+"Container-focused");
   },

   /**
    * Remove the class that shows the container as "focused"
    * @method removeFocus
    */
   removeFocus: function() {
      Dom.removeClass(this.el, CSS_PREFIX+"Container-focused");
   },

   /**
    * Called when the user clicked on the close button
    * @method onCloseButton
    */
   onCloseButton: function(e, args) {
      Event.stopEvent(e);
      this.layer.removeContainer(this);
   },

   /**
    * Remove this container from the dom
    * @method remove
    */
   remove: function() {

      this.removeAllTerminals();

      this.layer.el.removeChild(this.el);

      Event.purgeElement(this.el);
   },


   /**
    * Call the addTerminal method for each terminal configuration.
    * @method initTerminals
    */
   initTerminals: function(terminalConfigs) {
      for(var i = 0 ; i < terminalConfigs.length ; i++) {
         this.addTerminal(terminalConfigs[i]);
      }
   },


   /**
    * Instanciate the terminal from the class pointer "xtype" (default WireIt.Terminal)
    * @method addTerminal
    * @return {WireIt.Terminal}  terminal Created terminal
    */
   addTerminal: function(terminalConfig) {

      var type = eval(terminalConfig.xtype || "WireIt.Terminal");

      var term = new type(this.el, terminalConfig, this);

      this.terminals.push( term );

      term.eventAddWire.subscribe(this.onAddWire, this, true);
      term.eventRemoveWire.subscribe(this.onRemoveWire, this, true);

      return term;
   },

   /**
    * This method is called when a wire is added to one of the terminals
    * @method onAddWire
    * @param {Event} event The eventAddWire event fired by the terminal
    * @param {Array} args This array contains a single element args[0] which is the added Wire instance
    */
   onAddWire: function(event, args) {
      var wire = args[0];
      if( WireIt.indexOf(wire, this.wires) == -1 ) {
         this.wires.push(wire);
         this.eventAddWire.fire(wire);
         WireIt.Wire.openPropEditorFor.fire(wire);
      }
   },

   /**
    * This method is called when a wire is removed from one of the terminals
    * @method onRemoveWire
    * @param {Event} event The eventRemoveWire event fired by the terminal
    * @param {Array} args This array contains a single element args[0] which is the removed Wire instance
    */
   onRemoveWire: function(event, args) {
      var wire = args[0];
      var index = WireIt.indexOf(wire, this.wires);
      if( index != -1 ) {
         this.eventRemoveWire.fire(wire);
         this.wires[index] = null;
      }
      this.wires = WireIt.compact(this.wires);
   },

   /**
    * Remove all terminals
    * @method removeAllTerminals
    */
   removeAllTerminals: function() {
      for(var i = 0 ; i < this.terminals.length ; i++) {
         this.terminals[i].remove();
      }
      this.terminals = [];
   },

   /**
    * Redraw all the wires connected to the terminals of this container
    * @method redrawAllTerminals
    */
   redrawAllWires: function() {
      for(var i = 0 ; i < this.terminals.length ; i++) {
         this.terminals[i].redrawAllWires();
      }
   },

   /**
    * Return the config of this container.
    * @method getConfig
    */
   getConfig: function() {

      return this.options;
   },

   /**
    * @method getValue
    */
   getValue: function() {
      return {};
   },

   /**
    * @method setValue
    */
   setValue: function(val) {
   },


   /**
    * @method getTerminal
    */
   getTerminal: function(name) {
      var term;
      for(var i = 0 ; i < this.terminals.length ; i++) {
         term = this.terminals[i];
         if(term.options.name == name) {
            return term;
         }
      }
      return null;
   }

};

})();
/**
 * Container represented by an image
 * @class ImageContainer
 * @extends WireIt.Container
 * @constructor
 * @param {Object} options
 * @param {WireIt.Layer} layer
 */
WireIt.ImageContainer = function(options, layer) {
   WireIt.ImageContainer.superclass.constructor.call(this, options, layer);
};

YAHOO.lang.extend(WireIt.ImageContainer, WireIt.Container, {


   /**
    * @method setOptions
    * @param {Object} options the options object
    */
   setOptions: function(options) {
      WireIt.ImageContainer.superclass.setOptions.call(this, options);

      this.options.image = options.image;
      this.options.xtype = "WireIt.ImageContainer";

      this.options.className = options.className || "WireIt-Container WireIt-ImageContainer";

      this.options.resizable = (typeof options.resizable == "undefined") ? false : options.resizable;
      this.options.ddHandle = (typeof options.ddHandle == "undefined") ? false : options.ddHandle;
   },


   /**
    * @method render
    */
   render: function() {
      WireIt.ImageContainer.superclass.render.call(this);
      YAHOO.util.Dom.setStyle(this.bodyEl, "background-image", "url("+this.options.image+")");
   },

   /**
    * Called when the user made a mouse down on the container and sets the focus to this container (only if within a Layer)
    * @method onMouseDown
    */
   onMouseDown: function() {
      if (this.click) // huh? I swear it was like this!
      if(this.layer) {
         if(this.layer.focusedContainer && this.layer.focusedContainer != this) {
            this.layer.focusedContainer.removeFocus();
         }
         this.setFocus();
         this.layer.focusedContainer = this;
      }
   }

});
/**
 * A layer encapsulate a bunch of containers and wires
 * @class Layer
 * @namespace WireIt
 * @constructor
 * @param {Object}   options   Configuration object (see the properties)
 */
WireIt.Layer = function(options) {

   this.setOptions(options);

   /**
    * List of all the WireIt.Container (or subclass) instances in this layer
    * @property containers
    * @type {Array}
    */
   this.containers = [];

   /**
    * List of all the WireIt.Wire (or subclass) instances in this layer
    * @property wires
    * @type {Array}
    */
   this.wires = [];

   /**
    * Layer DOM element
    * @property el
    * @type {HTMLElement}
    */
   this.el = null;


   /**
    * Event that is fired when a wire is added
    * You can register this event with myTerminal.eventAddWire.subscribe(function(e,params) { var wire=params[0];}, scope);
    * @event eventAddWire
    */
   this.eventAddWire = new YAHOO.util.CustomEvent("eventAddWire");

   /**
    * Event that is fired when a wire is removed
    * You can register this event with myTerminal.eventRemoveWire.subscribe(function(e,params) { var wire=params[0];}, scope);
    * @event eventRemoveWire
    */
   this.eventRemoveWire = new YAHOO.util.CustomEvent("eventRemoveWire");


   /**
    * Event that is fired when a container is added
    * You can register this event with myTerminal.eventAddContainer.subscribe(function(e,params) { var container=params[0];}, scope);
    * @event eventAddContainer
    */
   this.eventAddContainer = new YAHOO.util.CustomEvent("eventAddContainer");

   /**
    * Event that is fired when a container is removed
    * You can register this event with myTerminal.eventRemoveContainer.subscribe(function(e,params) { var container=params[0];}, scope);
    * @event eventRemoveContainer
    */
   this.eventRemoveContainer = new YAHOO.util.CustomEvent("eventRemoveContainer");

   /**
    * Event that is fired when a container has been moved
    * You can register this event with myTerminal.eventContainerDragged.subscribe(function(e,params) { var container=params[0];}, scope);
    * @event eventContainerDragged
    */
   this.eventContainerDragged = new YAHOO.util.CustomEvent("eventContainerDragged");

   /**
    * Event that is fired when a container has been resized
    * You can register this event with myTerminal.eventContainerResized.subscribe(function(e,params) { var container=params[0];}, scope);
    * @event eventContainerResized
    */
   this.eventContainerResized = new YAHOO.util.CustomEvent("eventContainerResized");


   this.render();

   this.initContainers();

   this.initWires();

   if(this.options.layerMap) {
      this.layerMap = new WireIt.LayerMap(this, this.options.layerMapOptions);
   }

};

WireIt.Layer.prototype = {

   /**
    * @method setOptions
    */
   setOptions: function(options) {
      /**
       * Configuration object of the layer
       * <ul>
       *   <li>className: CSS class name for the layer element (default 'WireIt-Layer')</li>
       *   <li>parentEl: DOM element that schould contain the layer (default document.body)</li>
       *   <li>containers: array of container configuration objects</li>
       *   <li>wires: array of wire configuration objects</li>
       *   <li>layerMap: boolean</li>
       *   <li>layerMapOptions: layer map options</li>
       * </ul>
       * @property options
       */
      this.options = {};
      this.options.className = options.className || 'WireIt-Layer';
      this.options.parentEl = options.parentEl || document.body;
      this.options.containers = options.containers || [];
      this.options.wires = options.wires || [];
      this.options.layerMap = YAHOO.lang.isUndefined(options.layerMap) ? false : options.layerMap;
      this.options.layerMapOptions = options.layerMapOptions;
      this.options.enableMouseEvents = YAHOO.lang.isUndefined(options.enableMouseEvents) ? true : options.enableMouseEvents;
   },

   /**
    * Create the dom of the layer and insert it into the parent element
    * @method render
    */
   render: function() {
      this.el = WireIt.cn('div', {className: this.options.className} );
      this.options.parentEl.appendChild(this.el);
   },

   /**
    * Create all the containers passed as options
    * @method initContainers
    */
   initContainers: function() {
      for(var i = 0 ; i < this.options.containers.length ; i++) {
         this.addContainer(this.options.containers[i]);
      }
   },

   /**
    * Create all the wires passed in the config
    * @method initWires
    */
   initWires: function() {
      for(var i = 0 ; i < this.options.wires.length ; i++) {
         this.addWire(this.options.wires[i]);
      }
   },

   /**
    * Instanciate a wire given its "xtype" (default to WireIt.Wire)
    * @method addWire
    * @param {Object} wireConfig  Wire configuration object (see WireIt.Wire class for details)
    * @return {WireIt.Wire} Wire instance build from the xtype
    */
   addWire: function(wireConfig) {
      var type = eval(wireConfig.xtype || "WireIt.Wire");

      var src = wireConfig.src;
      var tgt = wireConfig.tgt;

      var terminal1 = this.containers[src.moduleId].getTerminal(src.terminal);
      var terminal2 = this.containers[tgt.moduleId].getTerminal(tgt.terminal);
      var wire = new type( terminal1, terminal2, this.el, wireConfig.options);
      wire.redraw();

      return wire;
   },

   /**
    * Instanciate a container given its "xtype": WireIt.Container (default) or a subclass of it.
    * @method addContainer
    * @param {Object} containerConfig  Container configuration object (see WireIt.Container class for details)
    * @return {WireIt.Container} Container instance build from the xtype
    */
   addContainer: function(containerConfig) {

      var type = eval('('+(containerConfig.xtype || "WireIt.Container")+')');
      if(!YAHOO.lang.isFunction(type)) {
         throw new Error("WireIt layer unable to add container: xtype '"+containerConfig.xtype+"' not found");
      }
      var container = new type(containerConfig, this);

      this.containers.push( container );

      container.eventAddWire.subscribe(this.onAddWire, this, true);
      container.eventRemoveWire.subscribe(this.onRemoveWire, this, true);

      if(container.ddResize) {
         container.ddResize.on('endDragEvent', function() {
            this.eventContainerResized.fire(container);
         }, this, true);
      }
      if(container.dd) {
         container.dd.on('endDragEvent', function() {
            this.eventContainerDragged.fire(container);
         }, this, true);
      }

      this.eventAddContainer.fire(container);

      return container;
   },

   /**
    * Remove a container
    * @method removeContainer
    * @param {WireIt.Container} container Container instance to remove
    */
   removeContainer: function(container) {
      var index = WireIt.indexOf(container, this.containers);
      if( index != -1 ) {
         container.remove();
         this.containers[index] = null;
         this.containers = WireIt.compact(this.containers);

         this.eventRemoveContainer.fire(container);
      }
   },

   /**
    * Update the wire list when any of the containers fired the eventAddWire
    * @method onAddWire
    * @param {Event} event The eventAddWire event fired by the container
    * @param {Array} args This array contains a single element args[0] which is the added Wire instance
    */
   onAddWire: function(event, args) {
      var wire = args[0];
      if( WireIt.indexOf(wire, this.wires) == -1 ) {
         this.wires.push(wire);

         if(this.options.enableMouseEvents) {
            YAHOO.util.Event.addListener(wire.element, "mousemove", this.onWireMouseMove, this, true);
            YAHOO.util.Event.addListener(wire.element, "click", this.onWireClick, this, true);
            YAHOO.util.Event.addListener(wire.element, "dblclick", this.onWireDblClick, this, true);
         }

         this.eventAddWire.fire(wire);
      }
   },

   /**
    * Update the wire list when a wire is removed
    * @method onRemoveWire
    * @param {Event} event The eventRemoveWire event fired by the container
    * @param {Array} args This array contains a single element args[0] which is the removed Wire instance
    */
   onRemoveWire: function(event, args) {
      var wire = args[0];
      var index = WireIt.indexOf(wire, this.wires);
      if( index != -1 ) {
         this.wires[index] = null;
         this.wires = WireIt.compact(this.wires);
         this.eventRemoveWire.fire(wire);
      }
   },

   /**
    * Remove all the containers in this layer (and the associated terminals and wires)
    * @method removeAllContainers
    */
   removeAllContainers: function() {
      while(this.containers.length > 0) {
         this.removeContainer(this.containers[0]);
      }
   },


   /**
    * Return an object that represent the state of the layer including the containers and the wires
    * @method getWiring
    * @return {Obj} layer configuration
    */
   getWiring: function() {
      var i;
      var obj = {containers: [], wires: []};

      for( i = 0 ; i < this.containers.length ; i++) {
         obj.containers.push( this.containers[i].getConfig() );
      }

      for( i = 0 ; i < this.wires.length ; i++) {
         var wire = this.wires[i];

         var wireObj = {
            src: {moduleId: WireIt.indexOf(wire.terminal1.container, this.containers), terminal: wire.terminal1.options.name },
            tgt: {moduleId: WireIt.indexOf(wire.terminal2.container, this.containers), terminal: wire.terminal2.options.name },
            options: wire.options
         };
         obj.wires.push(wireObj);
      }
      return obj;
   },

   /**
    * Load a layer configuration object
    * @method setWiring
    * @param {Object} wiring layer configuration
    */
   setWiring: function(wiring) {
      this.removeAllContainers();

      if(YAHOO.lang.isArray(wiring.containers)) {
         for(var i = 0 ; i < wiring.containers.length ; i++) {
            this.addContainer(wiring.containers[i]);
         }
      }
      if(YAHOO.lang.isArray(wiring.wires)) {
         for(var i = 0 ; i < wiring.wires.length ; i++) {
            this.addWire(wiring.wires[i]);
         }
       }
   },

   /**
    * Alias for removeAllContainers
    * @method clear
    */
   clear: function() {
      this.removeAllContainers();
   },

   /**
    * Returns a position relative to the layer from a mouse event
    * @method _getMouseEvtPos
    * @param {Event} e Mouse event
    * @return {Array} position
    */
   _getMouseEvtPos: function(e) {
   	var tgt = YAHOO.util.Event.getTarget(e);
   	var tgtPos = [tgt.offsetLeft, tgt.offsetTop];
   	return [tgtPos[0]+e.layerX, tgtPos[1]+e.layerY];
   },

   /**
    * Handles click on any wire canvas
    * Note: we treat mouse events globally so that wires behind others can still receive the events
    * @method onWireClick
    * @param {Event} e Mouse click event
    */
   onWireClick: function(e) {
      var p = this._getMouseEvtPos(e);
   	var lx = p[0], ly = p[1], n = this.wires.length, w;
   	for(var i = 0 ; i < n ; i++) {
   	   w = this.wires[i];
      	var elx = w.element.offsetLeft, ely = w.element.offsetTop;
   	   if( lx >= elx && lx < elx+w.element.width && ly >= ely && ly < ely+w.element.height ) {
   	      var rx = lx-elx, ry = ly-ely; // relative to the canvas
   			w.onClick(rx,ry);
   	   }
   	}
   },

   /**
    * Handles double click on any wire canvas
    * Note: we treat mouse events globally so that wires behind others can still receive the events
    * @method onWireDblClick
    * @param {Event} e Mouse click event
    */
   onWireDblClick: function(e) {
      var p = this._getMouseEvtPos(e);
   	var lx = p[0], ly = p[1], n = this.wires.length, w;
   	for(var i = 0 ; i < n ; i++) {
   	   w = this.wires[i];
      	var elx = w.element.offsetLeft, ely = w.element.offsetTop;
   	   if( lx >= elx && lx < elx+w.element.width && ly >= ely && ly < ely+w.element.height ) {
   	      var rx = lx-elx, ry = ly-ely; // relative to the canvas
   			w.onDblClick(rx,ry);
   	   }
   	}
   },

   /**
    * Handles mousemove events on any wire canvas
    * Note: we treat mouse events globally so that wires behind others can still receive the events
    * @method onWireMouseMove
    * @param {Event} e Mouse click event
    */
   onWireMouseMove: function(e) {
      var p = this._getMouseEvtPos(e);
   	var lx = p[0], ly = p[1], n = this.wires.length, w;
   	for(var i = 0 ; i < n ; i++) {
   	   w = this.wires[i];
      	var elx = w.element.offsetLeft, ely = w.element.offsetTop;
   	   if( lx >= elx && lx < elx+w.element.width && ly >= ely && ly < ely+w.element.height ) {
   	      var rx = lx-elx, ry = ly-ely; // relative to the canvas
   			w.onMouseMove(rx,ry);
   	   }
   	}
   },


   /**
    * Layer explosing animation
    * @method clearExplode
    */
   clearExplode: function(callback, bind) {

      var center = [ Math.floor(YAHOO.util.Dom.getViewportWidth()/2),
   		            Math.floor(YAHOO.util.Dom.getViewportHeight()/2)];
      var R = 1.2*Math.sqrt( Math.pow(center[0],2)+Math.pow(center[1],2));

      for(var i = 0 ; i < this.containers.length ; i++) {
          var left = parseInt(dbWire.layer.containers[i].el.style.left.substr(0,dbWire.layer.containers[i].el.style.left.length-2),10);
   	    var top = parseInt(dbWire.layer.containers[i].el.style.top.substr(0,dbWire.layer.containers[i].el.style.top.length-2),10);

   	    var d = Math.sqrt( Math.pow(left-center[0],2)+Math.pow(top-center[1],2) );

   	    var u = [ (left-center[0])/d, (top-center[1])/d];
   	    YAHOO.util.Dom.setStyle(this.containers[i].el, "opacity", "0.8");

   	    var myAnim = new WireIt.util.Anim(this.containers[i].terminals, this.containers[i].el, {
              left: { to: center[0]+R*u[0] },
              top: { to: center[1]+R*u[1] },
   	        opacity: { to: 0, by: 0.05},
   	        duration: 3
          });
          if(i == this.containers.length-1) {
             myAnim.onComplete.subscribe(function() { this.clear(); callback.call(bind);}, this, true);
          }
   	    myAnim.animate();
      }

   }


};
/**
 * Class used to build a container with inputEx forms
 * @class FormContainer
 * @namespace WireIt
 * @extends WireIt.Container
 * @constructor
 * @param {Object}   options  Configuration object (see properties)
 * @param {WireIt.Layer}   layer The WireIt.Layer (or subclass) instance that contains this container
 */
WireIt.FormContainer = function(options, layer) {
   WireIt.FormContainer.superclass.constructor.call(this, options, layer);
};

YAHOO.lang.extend(WireIt.FormContainer, WireIt.Container, {

   /**
    * @method setOptions
    */
   setOptions: function(options) {
      WireIt.FormContainer.superclass.setOptions.call(this, options);

      this.options.legend = options.legend;
      this.options.collapsible = options.collapsible;
      this.options.fields = options.fields;
   },

   /**
    * The render method is overrided to call renderForm
    * @method render
    */
   render: function() {
      WireIt.FormContainer.superclass.render.call(this);
      this.renderForm();
   },

   /**
    * Render the form
    * @method renderForm
    */
   renderForm: function() {
      for(var i = 0 ; i < this.options.fields.length ; i++) {
         this.options.fields[i].inputParams.container = this;
      }
      var groupParams = {parentEl: this.bodyEl, fields: this.options.fields, legend: this.options.legend, collapsible: this.options.collapsible};
      this.form = new YAHOO.inputEx.Group(groupParams);
   },

   /**
    * @method getValue
    */
   getValue: function() {
      return this.form.getValue();
   },

   /**
    * @method setValue
    */
   setValue: function(val) {
      this.form.setValue(val);
   }

});
(function() {

   var Dom = YAHOO.util.Dom, Event = YAHOO.util.Event;

/**
 * Widget to display a minimap on a layer
 * @class LayerMap
 * @namespace WireIt
 * @extends WireIt.CanvasElement
 * @constructor
 * @param {WireIt.Layer} layer the layer object it is attached to
 * @param {Obj} options configuration object
 */
WireIt.LayerMap = function(layer,options) {

   /**
    * @property layer
    */
   this.layer = layer;

   this.setOptions(options);

   WireIt.LayerMap.superclass.constructor.call(this, this.options.parentEl);

   this.element.className = this.options.className;

   this.initEvents();

   this.draw();
};

YAHOO.lang.extend(WireIt.LayerMap, WireIt.CanvasElement, {

   /**
    * @method setOptions
    * @param {Object} options
    */
   setOptions: function(options) {
      var options = options || {};
      /**
       * Options:
       * <ul>
       *    <li>parentEl: parent element (defaut layer.el)</li>
       *    <li>className: default to "WireIt-LayerMap"</li>
       *    <li>style: display style, default to "rgba(0, 0, 200, 0.5)"</li>
       *    <li>lineWidth: default 2</li>
       * </ul>
       * @property options
       */
      this.options = {};
      this.options.parentEl = Dom.get(options.parentEl || this.layer.el);
      this.options.className = options.className || "WireIt-LayerMap";
      this.options.style = options.style || "rgba(0, 0, 200, 0.5)";
      this.options.lineWidth = options.lineWidth || 2;
   },


   /**
    * Listen for various events that should redraw the layer map
    * @method initEvents
    */
   initEvents: function() {

      var layer = this.layer;

      Event.addListener(this.element, 'mousedown', this.onMouseDown, this, true);
      Event.addListener(this.element, 'mouseup', this.onMouseUp, this, true);
      Event.addListener(this.element, 'mousemove', this.onMouseMove, this, true);
      Event.addListener(this.element, 'mouseout', this.onMouseUp, this, true);

      layer.eventAddWire.subscribe(this.draw, this, true);
      layer.eventRemoveWire.subscribe(this.draw, this, true);
      layer.eventAddContainer.subscribe(this.draw, this, true);
      layer.eventRemoveContainer.subscribe(this.draw, this, true);
      layer.eventContainerDragged.subscribe(this.draw, this, true);
      layer.eventContainerResized.subscribe(this.draw, this, true);

      Event.addListener(this.layer.el, "scroll", this.onLayerScroll, this, true);
   },

   /**
    * When a mouse move is received
    * @method onMouseMove
    * @param {Event} e Original event
    * @param {Array} args event parameters
    */
   onMouseMove: function(e, args) {
      Event.stopEvent(e);
      if(this.isMouseDown)
         this.scrollLayer(e.clientX,e.clientY);
   },

   /**
    * When a mouseup or mouseout is received
    * @method onMouseUp
    * @param {Event} e Original event
    * @param {Array} args event parameters
    */
   onMouseUp: function(e, args) {
      Event.stopEvent(e);
      this.isMouseDown = false;
   },

   /**
    * When a mouse down is received
    * @method onMouseDown
    * @param {Event} e Original event
    * @param {Array} args event parameters
    */
   onMouseDown: function(e, args) {
      Event.stopEvent(e);
      this.scrollLayer(e.clientX,e.clientY);
      this.isMouseDown = true;
   },

   /**
    * Scroll the layer from mousedown/mousemove
    * @method scrollLayer
    * @param {Integer} clientX mouse event x coordinate
    * @param {Integer} clientY mouse event y coordinate
    */
   scrollLayer: function(clientX, clientY) {

      var canvasPos = Dom.getXY(this.element);
      var click = [ clientX-canvasPos[0], clientY-canvasPos[1] ];

      var canvasRegion = Dom.getRegion(this.element);
      var canvasWidth = canvasRegion.right-canvasRegion.left-4;
      var canvasHeight = canvasRegion.bottom-canvasRegion.top-4;

      var layerWidth = this.layer.el.scrollWidth;
      var layerHeight = this.layer.el.scrollHeight;
      var hRatio = Math.floor(100*canvasWidth/layerWidth)/100;
      var vRatio = Math.floor(100*canvasHeight/layerHeight)/100;

      var center = [ click[0]/hRatio, click[1]/vRatio ];

      var region = Dom.getRegion(this.layer.el);
      var viewportWidth = region.right-region.left;
      var viewportHeight = region.bottom-region.top;

      var topleft = [ Math.max(Math.floor(center[0]-viewportWidth/2),0) ,  Math.max(Math.floor(center[1]-viewportHeight/2), 0) ];
      if( topleft[0]+viewportWidth > layerWidth ) {
         topleft[0] = layerWidth-viewportWidth;
      }
      if( topleft[1]+viewportHeight > layerHeight ) {
         topleft[1] = layerHeight-viewportHeight;
      }

      this.layer.el.scrollLeft = topleft[0];
      this.layer.el.scrollTop = topleft[1];

   },

   /**
    * Redraw after a timeout
    * @method onLayerScroll
    */
   onLayerScroll: function() {

      if(this.scrollTimer) { clearTimeout(this.scrollTimer); }
      var that = this;
      this.scrollTimer = setTimeout(function() {
         that.draw();
      },50);

   },

   /**
    * Redraw the layer map
    * @method draw
    */
   draw: function() {
      var ctxt=this.getContext();

      var canvasRegion = Dom.getRegion(this.element);
      var canvasWidth = canvasRegion.right-canvasRegion.left-4;
      var canvasHeight = canvasRegion.bottom-canvasRegion.top-4;

      ctxt.clearRect(0,0, canvasWidth, canvasHeight);

      var layerWidth = this.layer.el.scrollWidth;
      var layerHeight = this.layer.el.scrollHeight;
      var hRatio = Math.floor(100*canvasWidth/layerWidth)/100;
      var vRatio = Math.floor(100*canvasHeight/layerHeight)/100;

      var region = Dom.getRegion(this.layer.el);
      var viewportWidth = region.right-region.left;
      var viewportHeight = region.bottom-region.top;
      var viewportX = this.layer.el.scrollLeft;
      var viewportY = this.layer.el.scrollTop;
      ctxt.strokeStyle= "rgb(200, 50, 50)";
      ctxt.lineWidth=1;
      ctxt.strokeRect(viewportX*hRatio, viewportY*vRatio, viewportWidth*hRatio, viewportHeight*vRatio);

      ctxt.fillStyle = this.options.style;
      ctxt.strokeStyle= this.options.style;
      ctxt.lineWidth=this.options.lineWidth;
      this.drawContainers(ctxt, hRatio, vRatio);
      this.drawWires(ctxt, hRatio, vRatio);
   },

   /**
    * Subroutine to draw the containers
    * @method drawContainers
    */
   drawContainers: function(ctxt, hRatio, vRatio) {
      var containers = this.layer.containers;
      var n = containers.length,i,gIS = WireIt.getIntStyle,containerEl;
      for(i = 0 ; i < n ; i++) {
         containerEl = containers[i].el;
         ctxt.fillRect(gIS(containerEl, "left")*hRatio, gIS(containerEl, "top")*vRatio,
                       gIS(containerEl, "width")*hRatio, gIS(containerEl, "height")*vRatio);
      }
   },

   /**
    * Subroutine to draw the wires
    * @method drawWires
    */
   drawWires: function(ctxt, hRatio, vRatio) {
      var wires = this.layer.wires;
      var n = wires.length,i,wire;
      for(i = 0 ; i < n ; i++) {
         wire = wires[i];
         var pos1 = wire.terminal1.getXY(),
             pos2 = wire.terminal2.getXY();

         ctxt.beginPath();
         ctxt.moveTo(pos1[0]*hRatio,pos1[1]*vRatio);
         ctxt.lineTo(pos2[0]*hRatio,pos2[1]*vRatio);
         ctxt.closePath();
         ctxt.stroke();
      }

   }


});

})();
/* 	mySystem 	- Engine Model 0.1
		License 	- Copyright Concord Constortium © 2009
		Developer - Alistair MacDonald, Hyper-Metrix.com */

(function(){

	var MyObject = function( len ){
		this.id =  len + new Date().getTime().toString();
		this.position = { x: 0, y: 0 };
		return this;
	};

	MyObject.prototype.set = function( args ){
		for( var i in args ){
			this[ i ] = args[ i ];
		}
		return this;
	};

	MyObject.prototype.get = function(){
		var props = {};
		var len = arguments.length;
		for( var i = 0; i < len; i++ ){
			var prop = arguments[ i ];
			props[ prop ] = this[ prop ];
		}
	};

	MyObject.prototype.kill = function(){}

	var Node = function(){};
	Node.prototype						= new MyObject;
	Node.prototype.name 			= 'un-named';
	Node.prototype.type 			= 'void';
	Node.prototype.energy 		= 0;
	Node.prototype.heatLoss		= 0;
	Node.prototype.cycles 		= 0;
	Node.prototype.inputRate 	= 1;
	Node.prototype.output 		= [];

	Node.prototype.transform = function(){
		this.cycles ++;

		var sumEfficient = 0;
		for( var i in this.efficiency ){
			sumEfficient += this.efficiency[ i ];
		}
		var sumLoss = 1 - sumEfficient;


		var sumInputRate = 0;
		var len = this.output.length;
		for( var i = 0; i < len; i++ ){
			var iNode = my.node( this.output[ i ] );
			sumInputRate += iNode.inputRate;
		}
		var ratio = 1 / sumInputRate;

		for( var i = 0; i < len; i++ ){
			var iNode = my.node( this.output[ i ] );
			var energyTransfer = ( this.energy * iNode.inputRate * ratio ) * sumEfficient;

			iNode.energy += energyTransfer;

			iNode.cycles < my.sourceCount ? iNode.transform() : 0 ;
		}

		this.heatLoss += this.energy * sumLoss || this.energy;
		if( this.type != 'source' ){
			this.energy -=  this.energy * ( sumEfficient + sumLoss );
		}

	}

	var System = function(){

		this.defaults = {
			entropy	: .987654321,
			arrows	: {
									width: { max: 30, min: .5 }
								},
			nodes		: {
								},
			AJAX		:	{ method: 'GET', async: true }
		};

		this.nodes 	= [];
		this.arrows = [];

		this.cycles = 0;
		this.cycle = function(){
			this.cycles ++;
			var sources = this.nodesWith( { type: 'source' } );
			var len = sources.length;
			this.sourceCount = len;
			for( var i = 0; i < len; i++ ){
					sources[ i ].transform();
			}
			console.log('-> cycled <-');
		}

		this.newNode = function( props ){
			var len = this.nodes.length;
			return this.nodes[ len ] =  ( new Node )
					.constructor( 'n' + len + '_' )
					.set( props );
		}

		this.loadNodes = function( file ){
			JSON = eval( this.AJAX.get( file ).responseText );
			for( var i in JSON ){
				this.newNode( JSON[ i ] );
			}
		},

		this.list = function(){
			var len = this.nodes.length;
			for( var i = 0; i < len; i++ ){
				var n = this.nodes[ i ]
				console.log([ n.name, n.type, n.heatLoss ]);
			}
		},


		this.nodesWith = function( props ){
			var collection = [];
			var len = this.nodes.length;
			for( var i = 0; i < len; i++ ){
				var iNode = this.nodes[ i ];
				for( var j in props ){
					if( iNode[ j ] == props[ j ] ){
						collection[ collection.length ] = iNode;
					};
				}
			}
			return collection;
		},

		this.node = function( id_or_name ){
			var len = this.nodes.length;
			for( var i = 0; i < len; i++ ){
				var iNode = this.nodes[ i ];
				if( id_or_name == iNode.id || id_or_name == iNode.name ){
					return iNode;
				}
			}
			return false;
		}

		this.AJAX = new Object();
		this.AJAX = {

			responseText: '',

			get: function( url, async, keyvals ){

				var async = ( async === 'undefined' ) ? this.defaults.AJAX.async : async ;

				var Get = new XMLHttpRequest;
				Get.open( 'GET', url, async );
				Get.send( keyvals || 'null' );

				if( async ){
					console.log("async", this);
					Get.onreadystatechange = function(){
						if( Get.readyState == 4 ){
							this.responseText = Get.responseText;
							return this;
						}
					}
				} else {
					this.responseText = Get.responseText;
					return this;
				}

			}

		}


	};

	this.my = new System();

})();
(function(){
  DSService = function(readKey,writeKey,_post_path){
    this.data = "";
    this.postPath = _post_path || "/models/"
    this.setKeys(readKey,writeKey);
  };

  DSService.prototype = {
    setKeys: function(read,write) {
      if (read) {
        this.load(this,function(){});// just load data
        this.readKey = read;
      }
      if (write) {
        this.writeKey = write;
      }
      else {
        this.writeKey= new UUID().toString();
      }
    },
    save: function(_data) {
        this.data = _data
        var post_to = this.postPath + "/" + this.writeKey;
        var xmlhttp = HTTP.newRequest();
        xmlhttp.open('PUT', post_to, false);
        xmlhttp.send(this.data);
        this.readKey = this.writeKey;
    },

    load: function(context,callback) {
      var get_from = this.getPath + "/" + this.writeKey;
      var self = this;
  	  if (this.readKey) {
  	    HTTP.getText(this.dataDir + "/" + this.options.modelId, self, this.load_callback(context,callback));
      }
      else {
        debug("load caleld, but no read key specified...");
      }
  	},

  	load_callback: function(_data,context,callback) {
  	  self.data = _data;
  	  callback(data,context,callback);
  	},

  	toString: function() {
  	  return "Data Service (" + this.postPath + "" + this.writeKey + ")";
  	}
  };
})();
(function() {
  VLEDSService = function(_vle){
    this.data = "";
    this.vle = _vle
  };

  VLEDSService.prototype = {
    save: function(_data) {
        this.vle.saveHtmlState(_data);
        this.data = _data;
    },

    load: function(context,callback) {
      this.data = this.vle.getLatestHtmlState();
      callback(this.data,context);
    },

    toString: function() {
      return "VLE Data Service (" + this.vle + ")";
    }
  };

})();
(function() {
  MocDSService = function(one,two){
    this.data = "";
    debug ("new " + this + " created")
  };

  MocDSService.prototype = {
    save: function(_data) {
        debug("Moc Saving ...")
        this.data = _data;
    },

    load: function(context,callback) {
      debug("Moc Loading ... ")
      callback(this.data,context);

  	},
  	toString: function() {
  	  var dataString = this.data.substr(0,50);
  	  return "Moc Data Service (" + dataString + ")";
  	}
  };
})();
/*

uuid.js - Version 0.3
JavaScript Class to create a UUID like identifier

Copyright (C) 2006-2008, Erik Giberti (AF-Design), All rights reserved.

This program is free software; you can redistribute it and/or modify it under
the terms of the GNU General Public License as published by the Free Software
Foundation; either version 2 of the License, or (at your option) any later
version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with
this program; if not, write to the Free Software Foundation, Inc., 59 Temple
Place, Suite 330, Boston, MA 02111-1307 USA

The latest version of this file can be downloaded from
http://www.af-design.com/resources/javascript_uuid.php

HISTORY:
6/5/06 	- Initial Release
5/22/08 - Updated code to run faster, removed randrange(min,max) in favor of
          a simpler rand(max) function. Reduced overhead by using getTime()
          method of date class (suggestion by James Hall).
9/5/08	- Fixed a bug with rand(max) and additional efficiencies pointed out
	  by Robert Kieffer http://broofa.com/

KNOWN ISSUES:
- Still no way to get MAC address in JavaScript
- Research into other versions of UUID show promising possibilities
  (more research needed)
- Documentation needs improvement

*/

function UUID(){
	this.id = this.createUUID();
}

UUID.prototype.valueOf = function(){ return this.id; }
UUID.prototype.toString = function(){ return this.id; }


UUID.prototype.createUUID = function(){
	var dg = new Date(1582, 10, 15, 0, 0, 0, 0);
	var dc = new Date();
	var t = dc.getTime() - dg.getTime();
	var h = '-';
	var tl = UUID.getIntegerBits(t,0,31);
	var tm = UUID.getIntegerBits(t,32,47);
	var thv = UUID.getIntegerBits(t,48,59) + '1'; // version 1, security version is 2
	var csar = UUID.getIntegerBits(UUID.rand(4095),0,7);
	var csl = UUID.getIntegerBits(UUID.rand(4095),0,7);

	var n = UUID.getIntegerBits(UUID.rand(8191),0,7) +
			UUID.getIntegerBits(UUID.rand(8191),8,15) +
			UUID.getIntegerBits(UUID.rand(8191),0,7) +
			UUID.getIntegerBits(UUID.rand(8191),8,15) +
			UUID.getIntegerBits(UUID.rand(8191),0,15); // this last number is two octets long
	return tl + h + tm + h + thv + h + csar + csl + h + n;
}




UUID.getIntegerBits = function(val,start,end){
	var base16 = UUID.returnBase(val,16);
	var quadArray = new Array();
	var quadString = '';
	var i = 0;
	for(i=0;i<base16.length;i++){
		quadArray.push(base16.substring(i,i+1));
	}
	for(i=Math.floor(start/4);i<=Math.floor(end/4);i++){
		if(!quadArray[i] || quadArray[i] == '') quadString += '0';
		else quadString += quadArray[i];
	}
	return quadString;
}

UUID.returnBase = function(number, base){
	return (number).toString(base).toUpperCase();
}

UUID.rand = function(max){
	return Math.floor(Math.random() * (max + 1));
}

function debug(message) {
  if (console && console.log) {
    console.log(message);
  }
}

WireIt.Layer.prototype.setOptions = function(options) {
  var defaults = {
    className: 'WireIt-Layer',
    parentEl: document.body,
    containers: [],
    wires: [],
    layerMap: false,
    enableMouseEvents: true
  }
  defaults = $H(defaults);
  this.options = defaults.merge($H(options)).toObject();
  debug("loaded defaults for wire-it layer");
  debug(this.options.parentEl);
};

/**
 * MySystemPropEditor
 * @class MySystemPropEditor
 * @constructor
 * @param {Object} options
 */
MySystemPropEditor = function(options) {
   this.domID = options.domID || "prop_editor";
   this.formName = options.formName || "prop_form_form";
   this.selected_color = "#000000"
};


MySystemPropEditor.prototype = {
  updateFields: function() {
    var subsTmpl = new Template ('<div class="inputBox"><label for="has_sub">sub systems?</label><input type="checkbox" #{checked} name="has_sub" value="1" id="has_sub"></div>')
    var fieldTmpl = new Template('<div class="inputBox"><label for="#{name}">#{name}</label><input type="text" name="#{name}" value="#{value}" id="#{name}"></div>');
    var fields = [];
    $H(this.node.options.fields).keys().each(function (field_name) {
      if(field_name !='color') {
        fields.push (fieldTmpl.evaluate({name: field_name, value: this.node.options.fields[field_name]}));
      }
    }.bind(this));
    fields.push (subsTmpl.evaluate({checked: (this.node.has_sub ? 'checked="true"' : '')}));
    var fieldText = fields.join("<br/>")
    if (this.node.title) {
      $('prop_name').update("properties for " + this.node.title);
    }
    else {
      $('prop_name').update("properties for wire");
    }
    $('prop_fields').update(fieldText);
    if ($('name')) {
      $('name').activate();
    }
  },
  save_values: function() {
    var theForm = $(this.formName);
    var fieldNames = $H(this.node.options.fields).keys();
    theForm.getInputs('text').each(function (fe) {
      this.node.options.fields[fe.name] = fe.value;
    }.bind(this));
    debug("set color "+ this.selected_color);
    if (this.node.options.fields.color) {
      this.node.options.fields.color = this.selected_color;
    }
    this.node.has_sub = $F('has_sub')
    this.node.updateFields();
  },
  deselect: function() {
    $$('.selected').each( function(elem) {
       elem.removeClassName('selected');
     });
  },

  show: function(node) {
    if(this.form_observer !=null) {
      this.form_observer.stop();
      this.form_observer = null;
      $('palette').stopObserving('click');
    }

    if (this.node) {
      if ($(this.node.bodyEl)) {
        $(this.node.bodyEl).removeClassName('selected');
      }
      if (this.node.options.selected) {
        this.node.options.selected=false;
        this.node.redraw();
      }
    }
    this.node = node;
    this.updateFields();

    this.selected_color = this.node.options.fields.color || "color2";
    var selected_pallete_item = $(this.selected_color);
    if (selected_pallete_item) {
      this.deselect();
      $(selected_pallete_item).addClassName('selected');
    }

    this.form_observer = new Form.Observer($(this.formName),0.3,this.save_values.bind(this));
    $('prop_form').show();
    if (this.node.options.fields.color) {
      $('palette').show();
      $('palette').observe('click', function (event) {
        this.deselect();
        var element = event.element();
        element.addClassName('selected');
        this.selected_color = element.identify();
        this.save_values();
      }.bind(this));
      this.node.options.selected=true;
    }
    else {
      $('palette').hide();
      $(this.node.bodyEl).addClassName('selected');
    }
    if (this.node.options.icon) {
      if($('icon_spot')) {
        $('icon_spot').update('<img src="' + this.node.options.icon + '" alt="icon" class="icon"/></br>');
      }
    }
    else {
      if($('icon_spot')) {
        $('icon_spot').update('');
      }
    }
  }

}












/**
 * WireLabel class used by the "mySystem" module
 * @class Container
 * @namespace mySystem
 * @constructor
 */
MySystemWireLabel = function(options, layer) {
    MySystemWireLabel.superclass.constructor.call(this, options, layer);
    this.buildTextArea(options.codeText || "Label me!");
};

YAHOO.extend(MySystemWireLabel, WireIt.Container, {
    /**
    * Create the textarea for the javascript code
    * @method buildTextArea
    * @param {String} codeText
    */
    buildTextArea: function(codeText) {
        this.textarea = WireIt.cn('textarea', null, {
            width: "70%",
            height: "20px",
            border: "0",
            padding: "5px"
        },
        codeText);
        this.setBody(this.textarea);
        YAHOO.util.Event.addListener(this.textarea, 'change', this.createTerminals, this, true);
    },

    /**
    * Extend the getConfig to add the "codeText" property
    * @method getConfig
    */
    getConfig: function() {
        var obj = MySystemWireLabel.superclass.getConfig.call(this);
        obj.codeText = this.textarea.value;
        return obj;
    }

});

/**
 * MySystem Container. Has an image. and double_click beahvor.
 * @class ImageContainer
 * @extends WireIt.Container
 * @constructor
 * @param {Object} options
 * @param {WireIt.Layer} layer
 */
MySystemContainer = function(options, layer) {
   MySystemContainer.superclass.constructor.call(this, options, layer);
   this.title = options.name || "MySystem Container";
   this.icon = options.icon;
   this.options.fields = options.fields || {'name': options.name, 'energy': 10};
   this.has_sub = options.has_sub || false;
   this.subSystem =  null;
   if (options.subsystem_options != null) {
     this.subSystem = new WireIt.Layer(options.subsystem_options);
     this.subSystem.setWiring(options.subsystem_wiring);
     MySystemContainer.openContextFor.fire(this);
   }
   this.options.xtype = "MySystemContainer";
   this.propEditor = null;

   if (this.options.position) {
     debug($(this.options.position).inspect());
     $(this.el).setStyle({
       position: 'absolute',
       left: this.options.position[0],
       top: this.options.position[1]
     });

    }
   YAHOO.util.Event.addListener(this.el, "dblclick", this.onDblClick, this, true);
   YAHOO.util.Event.addListener(this.el, "mouseup", this.onMouseUp, this, true);
   this.setTitle(this.options.fields.name);
};


YAHOO.lang.extend(MySystemContainer, WireIt.ImageContainer, {
  onMouseUp: function(source) {
    MySystemContainer.openPropEditorFor.fire(this);
  },

  onDblClick: function(source) {
    if (this.has_sub) {
      MySystemContainer.openContextFor.fire(this);
    }
  },

  setTitle: function(newTitle) {
    if(newTitle) {
      var this_el = this.el
      var title_el = $(this_el).down('.title')
      this.title = newTitle;
      this.options.name = this.title;
      if(!title_el) {
        title_el = this.createTitle()
        this_el.insert(title_el);
      }
      title_el.update(this.title);
    }
  },
  createTitle: function() {
    return new Element('div', {
      'class': 'title'
    });
  },
  render: function() {
    MySystemContainer.superclass.render.call(this);
    var this_el = this.el
    var title_el = $(this_el).down('.title')
    if(!title_el) {
      title_el = this.createTitle()
      this_el.insert(title_el);
      title_el.update(this.title);
    }

  },
  updateFields: function() {
    debug(($H(this.options.fields).inspect()));
    this.setTitle(this.options.fields.name);
  },

  getConfig: function() {
    var super_options = MySystemContainer.superclass.getConfig.call();
    this.options.name = this.title;
    this.options.has_sub = this.has_sub;
    if (this.subSystem != null) {
      this.options.subsystem_options = this.subSystem.options;
      this.options.subsystem_wiring = this.subSystem.getWiring();
    }
    this.options.position[0] = this.el.getStyle('left');
    this.options.position[1] = this.el.getStyle('top');
    return $H(super_options).merge($H(this.options));
  }
});

MySystemContainer.openPropEditorFor  = new YAHOO.util.CustomEvent("OpenEditorFor");
MySystemContainer.openContextFor = new YAHOO.util.CustomEvent("openContextFor");









/**
 *
 */
var MySystemData = Class.create({
  initialize:function() {
    this.modules = [];
  this.instances = [];
  },

  addModule: function(module,addTerminals) {
    if (addTerminals) {
      module.terminals = MySystemData.defaultTerminals();
    }
    this.modules.push(module)
  },

  setModules: function (modules,addTerminals) {
    this.modules = [];
    modules.each(function(m){
      this.addModule(m,addTerminals);
    }.bind(this));
  },

  setInstances: function(instances) {
    this.instances = [];
    instances.each(function(i){
      this.addInstance(i);
    }.bind(this))
  },

  addInstance : function(instance) {
    this.instances.push(instance);
  },

  setData: function (modules,instances,addTerminals) {
    this.setModules(modules,addTerminals);
    this.setInstances(instances);
  }
});


MySystemData.defaultTerminals = function() {
  return [{
       "wireConfig": {
         "drawingMethod": "bezierArrows"
       },
       "name": "Terminal1",
       "direction": [0, -1],
       "offsetPosition": {
       "left": 20,
       "top": -25
       },
       "ddConfig" : {
           "type": "input",
           "allowedTypes": ["input", "output"]
       }
   },{
       "wireConfig": {
           "drawingMethod": "bezierArrows"
       },
       "name": "Terminal2",
       "direction": [0, 1],
       "offsetPosition": {
           "left": 20,
           "bottom": -25
       },
       "ddConfig": {
           "type": "output",
           "allowedTypes": ["input", "output"]
       }
   }];
};


(function() {
    var util = YAHOO.util;
    var lang = YAHOO.lang;
    var Event = util.Event;
    var Dom = util.Dom;
    var Connect = util.Connect;
    var JSON = lang.JSON;
    var widget = YAHOO.widget;

    /**
   * Proxy to handle the drag/dropping from the module list to the layer
   * @class MySystemDragAndDropProxy
   * @constructor
   * @param {HTMLElement} el
   * @param {MySystemEditor} WiringEditor
   */
    MySystemDragAndDropProxy = function(el, MySysEditor) {
        this._MySysEditor = MySysEditor;
        MySystemDragAndDropProxy.superclass.constructor.call(this, el, "module", {
            dragElId: "moduleProxy"
        });
        this.isTarget = false;
    };

    YAHOO.extend(MySystemDragAndDropProxy, YAHOO.util.DDProxy, {

        /**
        * copy the html and apply selected classes
        * @method startDrag
        */
        startDrag: function(e) {
            MySystemDragAndDropProxy.superclass.startDrag.call(this, e);
            var del = this.getDragEl();
            var lel = this.getEl();
            del.innerHTML = lel.innerHTML;
            del.className = lel.className;
        },

        /**
        * Override default behavior of DDProxy
        * @method endDrag
        */
        endDrag: function(e) {},

        /**
        * Add the module to the WiringEditor on drop on layer
        * @method onDragDrop
        */
        onDragDrop: function(e, ddTargets) {
            var layerTarget = ddTargets[0];
            var layer = ddTargets[0]._layer;
            var del = this.getDragEl();
            var pos = YAHOO.util.Dom.getXY(del);
            var layerPos = YAHOO.util.Dom.getXY(layer.el);
            pos[0] = pos[0] - layerPos[0];
            pos[1] = pos[1] - layerPos[1];
            this._MySysEditor.addModule(this._module, pos);

            console.log( this._module );

            var energyForm = {};
            energyForm[ this._module.fields.form ] = this._module.fields.efficiency;

            my.newNode({
                name        : this._module.name,
                module      : this._module,
                type        : this._module.etype,
                energy      : this._module.fields.energy || 0,
                inputRate   : this._module.fields.inputRate,
                efficiency  : energyForm
            });

            my.cycle();
            my.list();

        }
    });

/**
 * The MySystemEditor class provides a full page interface
 * @class WiringEditor
 * @constructor
 * @param {Object} options
 */
    MySystemEditor = function(data) {
        this.setOptions(data);
        this._data = data;
        this.numLayers = 1;
        this.propEditor = new MySystemPropEditor({});

        /**
        * Container DOM element
        * @property el
        */
        this.el = Dom.get(data.parentEl);

      /**
       * @property helpPanel
       * @type {YAHOO.widget.Panel}
       */
        this.helpPanel = new widget.Panel('helpPanel', {
            fixedcenter: true,
            draggable: true,
            visible: false,
            modal: true
        });
        this.helpPanel.render();

        /**
       * @property layout
       * @type {YAHOO.widget.Layout}
       */
        this.layout = new widget.Layout(this.el, this.options.layoutOptions);
        this.layout.render();

        this.buildModulesList();

        this.renderButtons();
    };

    MySystemEditor.prototype = {
        /**
        * @method setOptions
        * @param {Object} options
        */
        setOptions: function(options) {
            this.options = {};
            this.modules = options.modules || ([]);
            this.modulesByName = {};
            for (var i = 0; i < this.modules.length; i++) {
                var m = this.modules[i];
                this.modulesByName[m.name] = m;
            }

            this.options.languageName = options.languageName || 'anonymousLanguage';
            this.options.smdUrl = options.smdUrl || 'WiringEditor.smd'; // eh?

            this.options.dataDir = "/models";
            this.options.propertiesFields = options.propertiesFields;
            this.options.layoutOptions = options.layoutOptions || {
                units: [
                {
                    position: 'top',
                    height: 50,
                    body: 'top'
                },
                {
                    position: 'left',
                    width: 225,
                    resize: true,
                    body: 'left',
                    gutter: '5px',
                    collapse: true,
                    collapseSize: 25,
                    header: 'Objects and Labels',
                    scroll: true,
                    animate: true
                },
                {
                    position: 'center',
                    body: 'center',
                    gutter: '5px'
                },
                {
                    position: 'right',
                    width: 320,
                    resize: true,
                    body: 'right',
                    gutter: '5px',
                    collapse: true,
                    collapseSize: 25,
                    header: 'Properties',
                    scroll: true,
                    animate: true
                }
                ]
            };

            this.options.layerOptions = {};
            var layerOptions = options.layerOptions || {};
            this.options.layerOptions.parentEl = layerOptions.parentEl ? layerOptions.parentEl: Dom.get('center');
            this.options.layerOptions.layerMap = YAHOO.lang.isUndefined(layerOptions.layerMap) ? true: layerOptions.layerMap;
            this.options.layerOptions.layerMapOptions = layerOptions.layerMapOptions || { parentEl: 'layerMap' };

            MySystemContainer.openPropEditorFor.subscribe(this.onOpenPropEditorFor,this,true);
            MySystemContainer.openContextFor.subscribe(this.onOpenContextFor,this,true);
            WireIt.Wire.openPropEditorFor.subscribe(this.onOpenPropEditorFor,this,true);
            this.resetLayers();
        },

        resetLayers: function() {
          if (this.layerStack && this.layerStack.size > 0) {
            for(var i = 0; i < this.layerStack.size();i++) {
              this.removeLayer(this.layerStack[i]);
            }
          }
          if (this.layer) {
            this.removeLayer(this.layer);
          }

          if (this.rootLayer) {
            this.removeLayer(this.rootLayer);
          }
          this.numLayers = 0;
          this.layerStack = [];
          this.rootLayer = this.addLayer();
          this.changeLayer(this.rootLayer);
         },

        onOpenPropEditorFor: function(type,args) {
          module = args[0];
          this.propEditor.show(module);
        },

        onOpenContextFor: function(type,args) {
            module = args[0];
            if (module.has_sub) {
              if (module.subSystem == null) {
                module.subSystem = this.addLayer();
              }
              this.changeLayer(module.subSystem);
            }
        },

        removeLayerMap: function(newLayer) {
          try {
            Event.removeListener(newLayer.layerMap.element, 'mouseup');
            newLayer.layerMap.options.parentEl.removeChild(newLayer.layerMap.element);
            if (this.layerStack.indexOf(newLayer)) {
              this.layerStack[this.layerStack.indexOf(newLayer)]= null;
            }
          }
          catch (e) {
            debug("error removing layer: " + e);
          }
        },

        removeLayer: function(newLayer) {
          this.numLayers = this.numLayers - 1;
          this.removeLayerMap(newLayer);
          newLayer.removeAllContainers();
          newLayer = null;
          return null;
        },

        addLayerMap: function(newLayer) {
          this.layerStack.push(newLayer);
          newLayer.layerMap.options.parentEl.appendChild(newLayer.layerMap.element);
          Event.addListener(newLayer.layerMap.element, 'mouseup', function (e,args) {
             Event.stopEvent(e);
             this.changeLayer(newLayer);
          }, this, true);
        },

      addLayer: function() {
          this.numLayers = this.numLayers + 1;
          var newOpts = Object.clone(this.options.layerOptions);
          newOpts.layerNumber = this.numLayers;
          var newLayer = new WireIt.Layer(newOpts);
          this.addLayerMap(newLayer);
          return newLayer;
        },

        changeLayer: function(newLayer) {
          var index = this.layerStack.indexOf(newLayer);
          if(index < 0) {
            this.addLayerMap(newLayer);
          }
          else {
            for(var i = index+1; i < this.layerStack.size();i++) {
              this.removeLayerMap(this.layerStack[i]);
            }
            this.layerStack = this.layerStack.compact();
          }
          this.setLayer(newLayer)
          this.updateLayerInfo();
        },

        setLayer:function(newLayer) {
          this.cleanWiring(newLayer);
          if (this.layer == null) { this.layer = this.rootLayer;}
          var parentDom = this.layer.options.parentEl;
          parentDom.replaceChild(newLayer.el,this.layer.el);
          this.layer.el.hide();

          this.layer = newLayer;
          this.layer.el.show();
          this.setDDLayer(this.layer);
          this.hidePropEditor();
        },
        cleanWiring: function(newLayer) {
          var i = 0;
          var size = newLayer.wires.length;
          var wire = null;
          var removed = 0;
          for (i=0; i <size; i++) {
            wire = newLayer.wires[i];
            if((!(wire.terminal1)) ||!(wire.terminal2)) {
              newLayer.wires[i] = null;
              removed +=1;
            }
          }
          if (removed > 0) {
            debug("removed " + removed + " wires");
            debug("array size pre: " + size);
            newLayer.wires = newLayer.wires.compact();
            debug("array size post: " + newLayer.wires.length);
          }
        },

        updateLayerInfo: function() {
        },

        hidePropEditor: function() {
          $('prop_form').hide();
        },

        setDDLayer: function(theLayer) {
            this.ddTarget = new YAHOO.util.DDTarget(this.layer.el, "module");
            this.ddTarget._layer = this.layer;
        },

        addModuleChoice: function(module) {

            var left = Dom.get('left');
            var div = WireIt.cn('div', {
                className: "WiringEditor-module"
            });

            if (module.icon) {
                var div = WireIt.cn('div', {
                    className: "WiringEditor-icon-module"
                });
                div.appendChild(WireIt.cn('img', {
                    src: module.icon
                }));
            } else {
                var div = WireIt.cn('div', {
                    className: "WiringEditor-module"
                });
                div.appendChild(WireIt.cn('span', null, null, module.name));
            }

            var ddProxy = new MySystemDragAndDropProxy(div, this);
            ddProxy._module = module;
            left.appendChild(div);

            this.setDDLayer(this.layer);
        },


        /**
        * Build the left menu on the left
        * @method buildModulesList
        */
        buildModulesList: function() {
            var modules = this.modules;
            for (var i = 0; i < modules.length; i++) {
                var module = modules[i];
                this.addModuleChoice(module);
            }
        },


        /**
        * add a module at the given pos
        * usually invoked by drag-and-drop callbac
        */
        addModule: function(module, pos) {
            try {
                module.position = pos;
                module.title = module.name;
                module.layer = this.layer;
                var container = this.layer.addContainer(module);
                container.setTitle(module.title);
                container.options.position = pos;
                Dom.addClass(container.el, "WiringEditor-module-" + module.name);
            }
            catch(ex) {
            }
        },


        /**
        * Toolbar
        * @method renderButtons
        */
        renderButtons: function() {
            var toolbar = Dom.get('toolbar');
            var newButton = new widget.Button({
                label: "Clear Diagram",
                id: "WiringEditor-newButton",
                container: toolbar
            });
            newButton.on("click", this.onNew, this, true);

            var loadButton = new widget.Button({
                label: "Load",
                id: "WiringEditor-loadButton",
                container: toolbar
            });
            loadButton.on("click", this.onLoad, this, true);

            var saveButton = new widget.Button({
                label: "Save",
                id: "WiringEditor-saveButton",
                container: toolbar
            });
            saveButton.on("click", this.onSave, this, true);

            var helpButton = new widget.Button({
                label: "More Info",
                id: "WiringEditor-helpButton",
                container: toolbar
            });
            helpButton.on("click", this.onHelp, this, true);
        },


        onSMDsuccess: function() { alert("Save successful."); },
        onSMDfailure: function() { alert("Save failed."); },

        /**
        * @method onSave
        */
        onSave: function() {
         if (this.dataService) {
           debug("calling save " + this.dataService);
           this.dataService.save([this.rootLayer.getWiring()].toJSON());
           debug("save has returned... ");
         }
         else {
           alert("No Data Service defined");
         }
        },

        /**
         * @method onSave
         */
         onLoad: function() {
           if (this.dataService) {
             this.dataService.load(this,this.load_callback);
           }
           else {
             alert("No Data Service defined");
           }
         },

         load_callback: function(text, context) {
            debug("===================================\n" + text);
            var obj = eval(text);
            context.resetLayers();
            context.rootLayer.setWiring(obj[0]);
         },



        /**
        * Create a help panel
        * @method onHelp
        */
        onHelp: function() {
            this.helpPanel.show();
        },

        /**
        * @method onNew
        */
        onNew: function() {
            if (confirm("Are you sure you want to erase your diagram and start fresh?")) {
                this.layer.removeAllContainers();
                this.resetLayers();
            }
        },

        /**
        * @method onDelete
        */
        onDelete: function() {
            if (confirm("Are you sure you want to delete this wiring??")) {
                var value = this.getValue();
                this.service.deleteWiring({
                    name: value.name,
                    language: this.options.languageName
                },
                {
                    success: function(result) {
                        alert("Deleted !");
                    }
                });
            }
        },

        /**
        * This method return a wiring within the given vocabulary described by the modules list
        * @method getValue
        */
        getValue: function() {
            var i;
            var obj = {
                modules: [],
                wires: [],
                properties: null
            };

            for (i = 0; i < this.layer.containers.length; i++) {
                obj.modules.push({
                    name: this.layer.containers[i].options.title,
                    value: this.layer.containers[i].getValue(),
                    config: this.layer.containers[i].getConfig()
                });
            }

            for (i = 0; i < this.layer.wires.length; i++) {
                var wire = this.layer.wires[i];
                var wireObj = {
                    src: {
                        moduleId: WireIt.indexOf(wire.terminal1.container, this.layer.containers),
                        terminal: wire.terminal1.options.name
                    },
                    tgt: {
                        moduleId: WireIt.indexOf(wire.terminal2.container, this.layer.containers),
                        terminal: wire.terminal2.options.name
                    }
                };
                obj.wires.push(wireObj);
            }

            obj.properties = this.propertiesForm.getValue();

            return {
                name: obj.properties.name,
                working: obj
            };
        }

    };

})();
(function(){
    var testData = [
  	{
  		'name'				: 'sun',
      'icon'				: "./images/sun.png",
      'image'				: "./images/sun.png",
      'xtype'				: "MySystemContainer",
  		'etype'				: 'source',
      'fields'			: {
      									'energy'			: 100,
      									'form'				: 'light',
      									'efficiency'	: 1
      								}
  	},
  	{
  		'name'				: 'space',
      'icon'				: "./images/space.jpg",
      'image'				: "./images/space.jpg",
      'xtype'				: "MySystemContainer",
  		'etype'				: 'node',
      'fields'			: {
      									'inputRate'		: 1
      								}
  	},
  	{
  		'name'				: 'earth',
      'icon'				: "./images/world.png",
      'image'				: "./images/world.png",
      'xtype'				: "MySystemContainer",
  		'etype'				: 'node',
      'fields'			: {
      									'inputRate'		: .5,
      									'form'				: 'light',
      									'efficiency'	: .2
      								}

  	},
  	{
  		'name'				: 'grass',
      'icon'				: "./images/grass.jpg",
      'image'				: "./images/grass.jpg",
      'xtype'				: "MySystemContainer",
  		'etype'				: 'node',
      'fields'			: {
      									'inputRate'		: .15,
      									'form'				: 'chemical',
      									'efficiency'	: .2
      								}
  	},
  	{
  		'name'				: 'bugs-fungi',
      'icon'				: "./images/bugs.jpg",
      'image'				: "./images/bugs.jpg",
      'xtype'				: "MySystemContainer",
  		'etype'				: 'node',
      'fields'			: {
      									'inputRate'		: .1,
      									'form'				: 'chemical',
      									'efficiency'	: .1
      								}
  	},
  	{
  		'name'				: 'rabbit',
      'icon'				: "./images/rabbit.jpg",
      'image'				: "./images/rabbit.jpg",
      'xtype'				: "MySystemContainer",
  		'etype'				: 'node',
      'fields'			: {
      									'inputRate'		: .2,
      									'form'				: 'chemical',
      									'efficiency'	: .15
      								}
  	},
  	{
  		'name'				: 'owl',
      'icon'				: "./images/owl.jpg",
      'image'				: "./images/owl.jpg",
      'xtype'				: "MySystemContainer",
  		'etype'				: 'node',
      'fields'			: {
      									'inputRate'		: .2,
      									'form'				: 'chemical',
      									'efficiency'	: .15,
      								}
  	},
  	{
  		'name'				: 'fox',
      'icon'				: "./images/fox.jpg",
      'image'				: "./images/fox.jpg",
      'xtype'				: "MySystemContainer",
  		'etype'				: 'node',
      'fields'			: {
      									'inputRate'		: .18,
      									'form'				: 'chemical',
      									'efficiency'	: .1
      								}
  	}
  ];

  MySystem = function(){
    this.init();
  };

  MySystem.prototype = {
    init: function() {
      try {
        this.data = new MySystemData();
        this.data.setData(testData,[],true);
        this.editor = new MySystemEditor(this.data);
      }
      catch (e){
        debug("error initializing MySystemDemo: " + e.name + " " + e.message)
      }
    },

    setDataService: function(ds) {
      this.editor.dataService=ds;
    },

    /**
    * Execute the module in the "ExecutionFrame" virtual machine
    * @method run
    * @static
    */
    run: function() {
        var ef = new ExecutionFrame(this.editor.getValue());
        ef.run();
    }
  }
})();
