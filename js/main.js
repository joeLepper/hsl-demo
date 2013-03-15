var recCnv = document.getElementById('rectangles')
  , recCtx = recCnv.getContext('2d')
  , allCols   = []

  , drawRectangles = function(){
    if(parseInt($('.notation-buttons:checked').val())){
        console.log("RGB");
        RGB_createRectangles();
    }
    else{
        console.log("HSL");
        HSL_createRectangles();
    }
  }

/* --------------------------------------------------------------------------- *
 *                                                      HSL STUFF ------------ *
 * --------------------------------------------------------------------------- */

  , HSL_createRectangles = function(){
    var rows      = getRows()
      , columns   = getColumns()
      , baseColor = parseInt(getBaseColor())
      , increment = parseInt(getIncrement())
      , curX      = 0
      , curY      = 0
      , canWidth  = window.innerWidth - $('.slider-container').width() - 200
      , canHeight = $('.slider-container').height() - 18
      , colWidth  = canWidth / columns
      , rowHeight = canHeight / rows
      , thisRec
      , column;
    allCols = [];
    recCnv.width        = canWidth;
    recCnv.style.width  = canWidth + 'px'
    recCnv.height       = canHeight;
    recCnv.style.height = canHeight + 'px'
    $('.canvas-container').offset({
      top:$('.slider-list').offset().top
    });
    $('.list').empty();
    for (var i = 0; i < columns; i++){
      column = []
      curY = 0;
      for (var j = 0; j < rows; j++){

        thisRec       = {};
        thisRec.hugh  = baseColor;
        thisRec.satch = 50;
        thisRec.lite  = 50;
        thisRec.x     = curX;
        thisRec.y     = curY;
        thisRec.w     = colWidth;
        thisRec.h     = rowHeight;

        column.push(thisRec);
        HSL_drawRec(thisRec);

        $('.list').append('<li class="links" data-column= "' + i + '"" data-row="' + j + '"">Column: ' + i + ' Row: ' + j + '</li>')

        curY += rowHeight;
        baseColor += increment;
      }
      allCols.push(column);
      curX += colWidth;
    }
  }

  , HSL_drawRec = function(recObj, sMod, lMod){
  	if (typeof sMod === 'undefined'){
  		sMod = 0;
  	};
  	if (typeof lMod === 'undefined'){
  		lMod = 0;
  	};
		recCtx.beginPath()
		recCtx.fillStyle = 'hsl(' + recObj.hugh + ',' + (parseInt(recObj.satch) + sMod) + '%,' + (parseInt(recObj.lite) + lMod) + '%)';
		recCtx.fillRect(recObj.x,recObj.y,recObj.w,recObj.h);
		recCtx.closePath();
		recCtx.stroke();
  }


/* --------------------------------------------------------------------------- *
 *                                                      RGB STUFF ------------ *
 * --------------------------------------------------------------------------- */

  , RGB_createRectangles = function(){
    var rows      = getRows()
      , columns   = getColumns()
      , redVal    = parseInt(getRedValue())
      , greenVal  = parseInt(getGreenValue())
      , blueVal   = parseInt(getBlueValue())
      , increment = parseInt(getColorIncrValue())
      , curX      = 0
      , curY      = 0
      , canWidth  = window.innerWidth - $('.slider-container').width() - 200
      , canHeight = $('.slider-container').height() - 18
      , colWidth  = canWidth / columns
      , rowHeight = canHeight / rows
      , thisRec
      , column;

    allCols = [];
    recCnv.width        = canWidth;
    recCnv.style.width  = canWidth + 'px'
    recCnv.height       = canHeight;
    recCnv.style.height = canHeight + 'px'
    $('.canvas-container').offset({
      top:$('.slider-list').offset().top
    });
    $('.list').empty();
    for (var i = 0; i < columns; i++){
      column = [];
      curY = 0;
      for (var j = 0; j < rows; j++){

        thisRec        = {};
        thisRec.red    = redVal;
        thisRec.blue   = blueVal;
        thisRec.green  = greenVal;
        thisRec.x      = curX;
        thisRec.y      = curY;
        thisRec.w      = colWidth;
        thisRec.h      = rowHeight;

        column.push(thisRec);
        RGB_drawRec(thisRec);

        $('.list').append('<li class="links" data-column= "' + i + '"" data-row="' + j + '"">Column: ' + i + ' Row: ' + j + '</li>')

        curY     += rowHeight;
        redVal   += increment;
        if(redVal > 255){
          redVal -= 255;
        }
        greenVal += increment;
        if(greenVal > 255){
          greenVal -= 255;
        }
        blueVal  += increment;
        if(blueVal > 255){
          blueVal -= 255;
        }
      }
      allCols.push(column);
      curX += colWidth;
    }
  }

  , RGB_drawRec = function(recObj, cMod){
    var red
      , green
      , blue
      , rgb = [red,green,blue];

    if (typeof cMod === 'undefined'){
      cMod = 0;
    };

    red   = parseInt(recObj.red) + cMod;
    green = parseInt(recObj.green) + cMod;
    blue  = parseInt(recObj.blue) + cMod;

    for(var i = 0; i < rgb.length; i++){
      if(rgb[i] > 255){
        rgb[i] -= 255;
      };
    };


    recCtx.beginPath()
    recCtx.fillStyle = 'rgb(' + red + ',' + green + ',' + blue + ')';
    recCtx.fillRect(recObj.x,recObj.y,recObj.w,recObj.h);
    recCtx.closePath();
    recCtx.stroke();
  }



  , drawAll = function(){
  	var columns = allCols.length
  	  , rows    = allCols[0].length;

  	for (var i = 0; i < columns; i++){
  		for (var j = 0; j < rows; j++){
        if(parseInt($('.notation-buttons:checked').val())){
            RGB_drawRec(allCols[i][j])
        }
        else{
            HSL_drawRec(allCols[i][j]);
        };
  		};
  	};
  }
  , initLabels = function(){
    if(parseInt($('.notation-buttons:checked').val())){

        $('#hue-slider-container').hide();
        $('#incr-slider-container').hide();
        $('#satch-slider-container').hide();
        $('#lite-slider-container').hide();

        $('#red-slider-container').show();
        $('#green-slider-container').show();
        $('#blue-slider-container').show();
        $('#color-incr-slider-container').show();
        $('#color-mod-slider-container').show();

    }
    else{

        $('#red-slider-container').hide();
        $('#green-slider-container').hide();
        $('#blue-slider-container').hide();
        $('#color-incr-slider-container').hide();
        $('#color-mod-slider-container').hide();

        $('#hue-slider-container').show();
        $('#incr-slider-container').show();
        $('#satch-slider-container').show();
        $('#lite-slider-container').show();
    };
  	$('.slider').each(function(){
  		$(this).siblings('label').text($(this).data('controls') + ": " + $(this).val())
  	});
  }

  , highlightRec = function(data){
  	var columns = allCols.length
  	  , rows    = allCols[0].length
  	  , lit     = false;

  	for (var k = 0; k < columns; k++){
  		for (var l = 0; l < rows; l++){
  			if (k === data.column && l === data.row){
          if(parseInt($('.notation-buttons:checked').val())){
              RGB_drawRec(allCols[k][l], parseInt(getColorMod()))
          }
          else{
              HSL_drawRec(allCols[k][l], parseInt(getSatchModValue()), parseInt(getLiteModValue()));
          };
  				lit = true;
  			}
  			else{
          if(parseInt($('.notation-buttons:checked').val())){
              RGB_drawRec(allCols[k][l], (parseInt(getColorMod()) * -1))
          }
          else{
              HSL_drawRec(allCols[k][l], (parseInt(getSatchModValue()) * -1), (parseInt(getLiteModValue()) * -1));
          };
  			};
  		};
  	};
  	if (!lit){
  		for (var m = 0; m < columns; m++){
  			for (var n = 0; n < rows; n++){
          if(parseInt($('.notation-buttons:checked').val())){
              RGB_drawRec(allCols[m][n])
          }
          else{
              HSL_drawRec(allCols[m][n]);
          };
  			};
  		};
  	};
  }
  , slideChange = function(e){
  	var value = $(e.target).val();

  	if (value.length < 2){
  		value = "0" + value;
  	}
		$(e.target).siblings('label').text($(e.target).data('controls') + ": " + value);
		drawRectangles();
  }

  , onMouseOver = function(e){
		highlightRec($(e.target).data());
  }

  , getRows = function(){
  	return $('#row-slider').val();
  }

  , getColumns = function(){
  	return $('#column-slider').val();
  }

  , getBaseColor = function(){
  	return $('#color-slider').val();
  }

  , getIncrement = function(){
  	return $('#color-increment-slider').val();
  }

  , getSatchModValue = function(){
  	return $('#satch-mod-slider').val();
  }

  , getLiteModValue = function(){
  	return $('#lite-mod-slider').val();
  }

  , getRedValue = function(){
    return $('#red-mod-slider').val();
  }

  , getGreenValue = function(){
    return $('#green-mod-slider').val();
  }

  , getBlueValue = function(){
    return $('#blue-mod-slider').val();
  }

  , getColorIncrValue = function(){
    return $('#color-incr-slider').val();
  }

  , getColorMod = function(){
    return $('#color-mod-slider').val();
  }

  , windowSize = function(){
		$('.list-container').css('height', window.innerHeight - $('.slider-list').height() - 140);
			drawRectangles();
  };

$(document).ready(function(){
	$('.list').on('mouseover', function(e){
		onMouseOver(e);
	});
	$('.slider').on('change', function(e){
		slideChange(e);
	});
	windowSize()
	initLabels();
  $('.notation-buttons').on('change',function(){
    console.log("radio,radio");
    initLabels();
    drawRectangles();
  })
	$(window).on("resize", function(e){
		console.log("CHANGING SIZES");
		windowSize()
	})
})


