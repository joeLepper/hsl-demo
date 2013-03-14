var recCnv = document.getElementById('rectangles')
  , recCtx = recCnv.getContext('2d')
  , allCols   = []

  , drawRectangles = function(){
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

  	recCnv.width        = canWidth;
  	recCnv.style.width  = canWidth + 'px'
  	recCnv.height       = canHeight;
  	recCnv.style.height = canHeight + 'px'
  	$('.canvas-container').offset({
  		top:$('.slider-list').offset().top
  	});


  	allCols = [];
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
  			drawRec(thisRec);

  			$('.list').append('<li class="links" data-column= "' + i + '"" data-row="' + j + '"">Column: ' + i + ' Row: ' + j + '</li>')

		  	curY += rowHeight;
		  	baseColor += increment;
  		}
  		allCols.push(column);
  		curX += colWidth;
  	}
  }

  , drawRec = function(recObj, sMod, lMod){
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

  , drawAll = function(){
  	var columns = allCols.length
  	  , rows    = allCols[0].length;

  	for (var i = 0; i < columns; i++){
  		for (var j = 0; j < rows; j++){
  			drawRec(allCols[i][j]);
  		};
  	};
  }
  , initLabels = function(){
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
  				drawRec(allCols[k][l], parseInt(getSatchModValue()), parseInt(getLiteModValue()));
  				lit = true;
  			}
  			else{
  				drawRec(allCols[k][l], (parseInt(getSatchModValue()) * -1), (parseInt(getLiteModValue()) * -1));
  			};
  		};
  	};
  	if (!lit){
  		for (var m = 0; m < columns; m++){
  			for (var n = 0; n < rows; n++){
  				drawRec(allCols[m][n]);
  			}
  		}
  	}
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
	$(window).on("resize", function(e){
		console.log("CHANGING SIZES");
		windowSize()
	})
})


