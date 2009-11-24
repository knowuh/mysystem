(function () {
  
  // A bit hackish: If we don't want to load the rest of MySystem,
  // we can create the namespace seperately:
  MySystem = typeof(MySystem) != 'undefined' ? MySystem : function() {};
  
  
  /**
  * Arrow 'plugin' for Raphael
  **/
  MySystem.arrow_path = function(startx,starty,endx,endy,len,angle) {    
    var theta = Math.atan2((endy-starty),(endx-startx));
    var baseAngleA = theta + angle * Math.PI/180;
    var baseAngleB = theta - angle * Math.PI/180;
    var tipX = endx + len * Math.cos(theta);
    var tipY = endy + len * Math.sin(theta);
    var baseAX = endx - len * Math.cos(baseAngleA);
    var baseAY = endy - len * Math.sin(baseAngleA);
    var baseBX = endx - len * Math.cos(baseAngleB);
    var baseBY = endy - len * Math.sin(baseAngleB);
    var pathData = " M " + tipX      + " " + tipY +
                   " L " + baseAX  + " " + baseAY +
                   " L " + baseBX  + " " + baseBY +
                   " Z ";
    return pathData;
  };
  

  Raphael.fn.zoomIn = function(x,y,scale) {
    var attributes = {
      fill: "#EEFFEE",
      stroke: "#004400",
      "stroke-width": scale * 1.25,
      "stroke-linecap" : "round",
      "stroke-linejoin" : "round",
      opacity: 0.7
    }
    var zoom = this.set();
    var glass = this.circle(x,y, (3 * scale));
    zoom.push(glass);
      
    var plus = this.set();
    plus.push(   this.path("M" + x      + " " + (y+scale)  + "L" +  x     + " " + (y-scale )));
    plus.push(   this.path("M" + (x+scale)  + " " +  y     + "L" + (x-scale)  + " " +  y   ));
    zoom.push(plus);

    zoom.attr(attributes);
    return {
      zoom: zoom,
      glass: glass,
      plus: plus,
    };
  };

  Raphael.fn.zoomOut = function(x,y,scale) {
    var attributes = {
      fill: "#EEFFEE",
      stroke: "#003300",
      "stroke-width": scale * 1.25,
      "stroke-linecap" : "round",
      "stroke-linejoin" : "round",
      opacity: 0.7
    }
    var zoom = this.set();
    var glass = this.circle(x,y, (3 * scale));
    zoom.push(glass);
    glass.attr({fill: "#EEFFEE"})
    var minus = this.path("M" + (x+scale)  + " " +  y     + "L" + (x-scale)  + " " +  y   );
    zoom.push(minus);
    zoom.attr(attributes);
    return {
      zoom: zoom,
      glass: glass,
      minus: minus
    };
  };
  
  /**
  * modification of Connection, taken from graffle.js:
  * http://raphaeljs.com/graffle.js  author not cited, part of 
  * rapheal project?  http://raphaeljs.com
  **/
  Raphael.fn.wire = function (wire, scale) {
      var line;
      var obj1 = wire.sourceNode.rep;
      var obj2 = wire.targetNode.rep;
      var name = wire.name;
      //wire.sourceNode.rep,wire.targetNode.rep,wire.color,wire.color + "|" + (wire.width * this.scale), wire.name);
      if (wire.rep && wire.rep.from && wire.rep.to) {
          line = wire.rep;
          obj1 = line.from;
          obj2 = line.to;
      }
      var bb1 = obj1.nodeImage.getBBox();
      var bb2 = obj2.nodeImage.getBBox();
      var border = 10;
      var p = [{x: bb1.x + bb1.width / 2, y: bb1.y - 1},
          {x: bb1.x + bb1.width / 2, y: bb1.y + bb1.height + border},
          {x: bb1.x - border, y: bb1.y + bb1.height / 2},
          {x: bb1.x + bb1.width + border, y: bb1.y + bb1.height / 2},
          {x: bb2.x + bb2.width / 2, y: bb2.y - border},
          {x: bb2.x + bb2.width / 2, y: bb2.y + bb2.height + border},
          {x: bb2.x - border, y: bb2.y + bb2.height / 2},
          {x: bb2.x + bb2.width + border, y: bb2.y + bb2.height / 2}];
      var d = {}, dis = [];
      for (var i = 0; i < 4; i++) {
          for (var j = 4; j < 8; j++) {
              var dx = Math.abs(p[i].x - p[j].x),
                  dy = Math.abs(p[i].y - p[j].y);
              if ((i == j - 4) || (((i != 3 && j != 6) || p[i].x < p[j].x) && ((i != 2 && j != 7) || p[i].x > p[j].x) && ((i != 0 && j != 5) || p[i].y > p[j].y) && ((i != 1 && j != 4) || p[i].y < p[j].y))) {
                  dis.push(dx + dy);
                  d[dis[dis.length - 1]] = [i, j];
              }
          }
      }
      if (dis.length == 0) {
          var res = [0, 4];
      } else {
          var res = d[Math.min.apply(Math, dis)];
      }
      var x1 = p[res[0]].x,
          y1 = p[res[0]].y,
          x4 = p[res[1]].x,
          y4 = p[res[1]].y,
          dx = Math.max(Math.abs(x1 - x4) / 2, 10),
          dy = Math.max(Math.abs(y1 - y4) / 2, 10),
          x2 = [x1, x1, x1 - dx, x1 + dx][res[0]].toFixed(3),
          y2 = [y1 - dy, y1 + dy, y1, y1][res[0]].toFixed(3),
          x3 = [0, 0, 0, 0, x4, x4, x4 - dx, x4 + dx][res[1]].toFixed(3),
          y3 = [0, 0, 0, 0, y1 + dy, y1 - dy, y4, y4][res[1]].toFixed(3);
      var path = ["M", x1.toFixed(3), y1.toFixed(3), "C", x2, y2, x3, y3, x4.toFixed(3), y4.toFixed(3)].join(",");
      
      if (line && line.line) {
          var lineWidth = line.lineWidth * scale;
          line.arrow.attr({path: MySystem.arrow_path(x3,y3,x4,y4, lineWidth * 1.5,50)});
          line.line.attr({path: path, "stroke-width": lineWidth, fill: "none"});
          var fontSize = 10 * scale;
          line.label.attr({x: x2, y: y4, "font-size": fontSize + "px"});
      } else {
          var color = typeof line == "string" ? line : "#000";
          var stroke_width = wire.width || 3;
          stroke_width = stroke_width * scale;
          var arrow_path = MySystem.arrow_path(x3,y3,x4,y4, stroke_width * 1.5,50);
          var fontSize = 10 * scale;
          return {
              line: this.path(path).attr({stroke: wire.color, fill: "none","stroke-width": stroke_width}),
              label: this.text(x2,y4, name).attr({fill: '#004400',"font-size": fontSize + "px", opacity: 0.8}),
              arrow: this.path(arrow_path).attr({fill: wire.color, stroke: "none"}),
              lineWidth: stroke_width,
              from: obj1,
              to: obj2
          };
      }
  };


  /**
  * MyNode a mysystem node implementation
  * http://raphaeljs.com/graffle.js  author not cited, part of 
  * rapheal project?  http://raphaeljs.com
  **/
  Raphael.fn.Node = function (node, scale) {
    var label;
    var nodeImage;
    if (node.rep) {
      var nodeImage = node.rep.nodeImage;
      var label = node.rep.label;
    }
    else {
      node.border = node.border ? node.border : 5;
      if (!node.loaded) {
        var image = new Image();
        image.src = node.icon;
        node.width = image.width;
        node.height = image.height;
        node.loaded = true;
      }
      var nodeImage = this.image(node.icon,node.x,node.y,node.width,node.height);
      var label = this.text(x,y,node.name).attr({fill: '#004400',opacity: 0.8});
    }
    var y =  (node.y + node.height + node.border) * scale;
    var x =  (node.x + (node.width  / 2.0)) * scale;
    nodeImage.scale(scale,scale,0,0);
    var fontSize = 12 * scale;
    label.attr({x: x, y:y, "font-size": fontSize + "px"});
    return {
        nodeImage: nodeImage,
        label: label
    };
  };
  
  
  
  /**
  * @constructor for Node
  **/
  MySystem.Node = function() {
    this.terminals = [];
    this.icon = [];
    this.x = 0;
    this.y = 0;
  };

  /**
  * @method terminal
  * finds the named terminal in this node
  * @param name of terminal to find
  * @returns 'undefined' or the terminal
  **/
  MySystem.Node.prototype.terminal = function(name) {
    var returnVal = null;
    this.terminals.each(function(term){
      if (term.name == name) {
        returnVal = term;
      }
    });
    return returnVal;
  };
  
  
  /**
  * @method importJson
  * creates Node from json text
  **/
  MySystem.Node.importJson = function(jsonText,contentBaseUrl) {
    var objs = eval(jsonText);
    var nodes = [];
    var wires = [];
    if (objs) {
      objs[0].containers.each(function(container) {
        var node = new MySystem.Node();
        if (typeof(contentBaseUrl) != 'undefined') {
          node.icon = contentBaseUrl + "/" + container.icon;
        }
        else {
          node.icon = container.icon;
        }
        node.x = (container.position[0].replace("px","")) / 1;
        node.y = (container.position[1].replace("px","")) / 1;
        node.name = container.name;
      
        node.terminals = container.terminals;
        nodes.push(node);
      });
    }
    return nodes;
  };
  
  
  
  /**
  * MySystem.Wire
  * @constructor 
  **/
  MySystem.Wire = function() {
    this.source = null;
    this.target = null;
    this.x = 0;
    this.y = 0;
  };

  /**
  * @method importJson
  * creates wires from json text
  **/
  MySystem.Wire.importJson = function(jsonText,nodes) {
    var objs = eval(jsonText);
    var wires = [];
    if (objs) {
      objs[0].wires.each(function(w) {
        var wire = new MySystem.Wire();
        wire.src = w.src;
        wire.sourceNode = nodes[w.src.moduleId];
        wire.sourceTerminal = wire.sourceNode.terminal(w.src.terminal);
        
        wire.tgt = w.tgt;
        wire.targetNode = nodes[w.tgt.moduleId];
        wire.targetTerminal = wire.targetNode.terminal(w.tgt.terminal);
        
        wire.options = w.options;
        wire.fields = w.options.fields;
        wire.width = wire.fields.width;
        wire.name = wire.fields.name;
        wire.color = w.options.color;
        wire.color.name = wire.fields.color;
        
        // do the drawing for the wire 
        wires.push(wire);
      });
    }
    return wires;
  };
  
    
  /**
  * MySystemPrint
  * @constructor
  **/
  MySystemPrint = function(_json,dom_id,contentBaseUrl,width,height,scale_factor) {
    this.data = _json;
    this.name = "my print";
    this.scale =typeof(scale_factor) != 'undefined' ? scale_factor : 1.6;
    this.nodes = MySystem.Node.importJson(_json,contentBaseUrl);
    this.wires = MySystem.Wire.importJson(_json,this.nodes);
    this.domId = dom_id;

    var container = $(this.domId);
    this.width = container.width;
    this.height = container.height;
    this.graphics = Raphael(this.domId,this.width,this.height);
    var self = this;

    
    this.nodes.each(function(node) {
      self.drawNode(node);
    });
  
    this.wires.each(function(wire) {
      self.drawWire(wire);
    });
    
    var self = this;
    this.zoomIn = this.graphics.zoomIn(10,10,2); 
    this.zoomOut = this.graphics.zoomOut(35,10,2); 
    
    this.zoomIn.zoom.mouseover(function(e) {
      self.zoomIn.glass.scale(1.5,1.5);
      self.zoomIn.plus.scale(1.5,1.5);
    });
    this.zoomIn.zoom.mouseout(function(e) {
      self.zoomIn.glass.scale(1,1);
      self.zoomIn.plus.scale(1,1);
    });
    this.zoomIn.zoom.click(function(e) {
      self.zoomIn.zoom.attr({stroke: "#002200"});
      self.scale = self.scale + 0.2;
      self.redraw();
    });

    this.zoomOut.zoom.mouseover(function(e) {
      self.zoomOut.glass.scale(1.5,1.5);
      self.zoomOut.minus.scale(1.5,1.5);
    });
    this.zoomOut.zoom.mouseout(function(e) {
      self.zoomOut.glass.scale(1,1);
      self.zoomOut.minus.scale(1,1);
    });
    this.zoomOut.zoom.click(function(e) {
      self.zoomOut.zoom.attr({stroke: "#002200"});
      self.scale = self.scale - 0.2;
      self.redraw();
    });
  };
  

  
  MySystemPrint.prototype.redraw = function() {
    var container = $(this.domId);
    var width = container.width;
    var height = container.height;
    var self = this;
    this.graphics.setSize(width, height);
    this.nodes.each(function(node) {
      self.graphics.Node(node,self.scale);
    });
    this.wires.each(function(wire){
      self.graphics.wire(wire,self.scale);
    })
  };
  
  /**
  * @method drawNode
  **/
  MySystemPrint.prototype.drawNode = function(node) {
    node.rep = this.graphics.Node(node,this.scale);
  };
  
  /**
  * @method drawWire
  * IMPORTANT!!!!! This must be called *after* a call to drawNode.
  **/
  MySystemPrint.prototype.drawWire = function(wire) {
    wire.rep = this.graphics.wire(wire,this.scale);
  };
  

}());
