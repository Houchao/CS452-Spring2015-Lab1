
//Houchao Gan 0326471

var gl;
var points;
//var index = 0;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }


    
    var verticesT = new Float32Array([-0.5, -0.5, 0, 0.5, 0.5, -0.5]);
    
    var verticesC = circleVertex(0, 0, 0.5, 64)
    
    var verticesR =   new Float32Array(
    				 [ -0.5, -0.5,
                       -0.5,  0.5,
                        0.5, 0.5,
                        0.5, -0.5
                     ]);
    
    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
    
    //  Load shaders and initialize attribute buffers
    
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    // Load the data into the GPU
//    canvas.addEventListener("mousedown", function(event){
//    	
//    	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
//    	t = circleVertex(2*event.clientX/canvas.width-1, 2*(canvas.height-event.clientY)/canvas.height-1, 0.2, 64)
//    	gl.bufferSubData(gl.ARRAY_BUFFER, 0, t);
//        
//    } );
    
    canvas.onclick = function fun() {
    	
    		// random number generator
    		var randomIndex = Math.floor((Math.random() * 3));
    		//console.log(randomIndex);
    		var num = 0;
    		
	    	switch (randomIndex) 
	    	{
	    	// Associate our shader variables with our data buffer
		        case 0: 
		        	//console.log(randomIndex);
		            var bufferId = gl.createBuffer();
		            gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
		            gl.bufferData( gl.ARRAY_BUFFER, verticesT, gl.STATIC_DRAW );
		            num = 3;
		            
		            break;
		        case 1:
		        	//console.log(randomIndex);
		            var bufferId = gl.createBuffer();
		            gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
		            gl.bufferData( gl.ARRAY_BUFFER, verticesC, gl.STATIC_DRAW );
		            num = 64;
		            
		            break;
		        case 2:
		        	//console.log(randomIndex);
		            var bufferId = gl.createBuffer();
		            gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
		            gl.bufferData( gl.ARRAY_BUFFER, verticesR, gl.STATIC_DRAW );
		            num = 4;
		            
		        	break;
	    	}
	    	
	       //console.log(num);
		   var vPosition = gl.getAttribLocation( program, "vPosition" );
		   gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
		   gl.enableVertexAttribArray( vPosition );
		    
		    
		
		   render(num);
  
    }
    
};


function render(num) {
	//console.log(num);
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLE_FAN, 0, num);
    
    //window.requestAnimFrame(render);
}

function circleVertex(cx, cy, r, n)
{
	var temp = [];
    
    
    for(var i = 0; i < n; i++)
    {
        var theta = 2.0 * 3.1415926 * i / n;//get the current angle

        var x = cx + r * Math.cos(theta);//calculate the x component
        var y = cy + r * Math.sin(theta);//calculate the y component

        //glVertex2f(x + 1, y + 1);//output vertex
        temp.push(x);
        temp.push(y);
    }
    
    return new Float32Array(temp);

}

