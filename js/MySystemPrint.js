(function() {


  /**
  *
  **/
  Node = function() {
    this.terminals = [];
    this.icon = [];
    this.x = 0;
    this.y = 0;
    
  };
  
  
  
  /**
  *
  **/
  Node.importJson = function(jsonText) {
    var objs = eval(jsonText);
    var nodes = [];
    var wires = [];
    if (objs) {
      objs[0].containers.each(function(container) {
        var node = new Node();
        node.icon = new Image();
        node.icon.src = container.icon;
        node.x = (container.position[0].replace("px","")) / 1;
        node.y = (container.position[1].replace("px","")) / 1;
        node.terminals = container.terminals;
        node.name = container.name;
        node.icon.onload = function() {
          debug("image loaded! for node " + node.name);
          node.terminals.each(function(terminal) {
            terminal.x = node.x;
            terminal.y = node.y;
            terminal.x += terminal.offsetPosition.left;
            if (terminal.offsetPosition.top) {
              terminal.y = terminal.y + terminal.offsetPosition.top;
            }
            else {
              terminal.y = terminal.y - (terminal.offsetPosition.bottom - node.icon.height);
            }
          });
          node.loaded = true;
        };
        var tryCount = 0;
        nodes.push(node);
      });
    }
    return nodes;
  };
  
  
  /**
  *
  **/
  Node.prototype.paint = function(context) {
      context.strokeStyle ='black';
      if (this.loaded) {
        context.drawImage(this.icon,this.x,this.y);
        this.terminals.each(function(terminal) {
          context.strokeRect(terminal.x,terminal.y,10,10);
        });
      }
      else {
        context.strokeRect(this.x,this.y,50,50);
      }
      context.drawText('whatever',7,this.x,this.y - 2,this.name);
  };
  
  
  /**
  *
  **/
  MySystemPrint = function(_ds) {
    this.dataService = _ds;
    this.data = [];
    this.name = "my print";
  };

  /**
  *
  **/
  MySystemPrint.prototype.drawBezierCurve = function(p1,p2,d1,d2,coeffMulDirection,ctxt) {
    // Calcul des vecteurs directeurs d1 et d2 :
    d1 = [d1[0]*coeffMulDirection, d1[1]*coeffMulDirection];
    d2 = [d2[0]*coeffMulDirection, d2[1]*coeffMulDirection];

    var bezierPoints=[];
    bezierPoints[0] = p1;
    bezierPoints[3] = p2;
    bezierPoints[1] = [p1[0]+d1[0],p1[1]+d1[1]];
    bezierPoints[2] = [p2[0]+d2[0],p2[1]+d2[1]];

    // Draw the inner bezier curve
    ctxt.lineCap = this.options.cap;
    ctxt.strokeStyle = this.options.color;
    ctxt.lineWidth = this.options.width;
    ctxt.beginPath();
    ctxt.moveTo(bezierPoints[0][0],bezierPoints[0][1]);
    ctxt.bezierCurveTo(
      bezierPoints[1][0],bezierPoints[1][1],
      bezierPoints[2][0],bezierPoints[2][1],
      bezierPoints[3][0],bezierPoints[3][1]
    );
    ctxt.stroke();
  };


  /**
  *
  **/
  MySystemPrint.prototype.load = function() {
    if (this.dataService) {
      this.dataService.load(this,this.loadCallback);
      setTimeout(this.show.bind(this),500);
    }
    else {
      alert("No Data Service defined");
    }
  };


  /**
  *
  **/
  MySystemPrint.prototype.loadCallback = function(_data,context) {
    context.nodes = Node.importJson(_data);
  };


  /**
  *
  **/
  MySystemPrint.prototype.show = function() {
    debug("show called for "+ this.name);
    if (this.data) {
      var canvas = $('printing_canvas');
      var context = canvas.getContext("2d");
      CanvasTextFunctions.enable (context);
      context.fillStyle = "rgb(200,200,200)";
      context.fillRect (0, 0, canvas.width, canvas.height);
      this.nodes.each(function(node){
        node.paint(context);
      });
    }
    else {
      alert("No data found to MySystemPrint");
    }
  }; 
})();