/**
 * Copy text to clipboard Script
 * By Dynamic Drive (http://www.dynamicdrive.com)
 * Created: Oct 23rd, 15'  
 */

var copytextclipboard = {

	tooltipobj: null,
	hidetooltiptimer: null,

	createtooltip:function(){
		var tooltip = document.createElement('div')
		tooltip.style.cssText = 
			'position:absolute; background:black; color:white; padding:4px;z-index:10000;'
			+ 'border-radius:2px; font-size:12px;box-shadow:3px 3px 3px rgba(0,0,0,.4);'
			+ 'opacity:0;transition:opacity 0.3s'
		tooltip.innerHTML = 'Copied!'
		this.tooltipobj = tooltip
		document.body.appendChild(tooltip)
	},

	showtooltip:function(e){
		var evt = e || event
		clearTimeout(this.hidetooltiptimer)
		this.tooltipobj.style.left = evt.pageX - 10 + 'px'
		this.tooltipobj.style.top = evt.pageY + 15 + 'px'
		this.tooltipobj.style.opacity = 1
		this.hidetooltiptimer = setTimeout(function(){
			copytextclipboard.tooltipobj.style.opacity = 0
		}, 500)
	},
	
	copycommand:function(e, callback){
		var copysuccess // var to check whether execCommand successfully executed
		try{
			copysuccess = document.execCommand("copy")
		}catch(e){
			copysuccess = false
		}
		if (copysuccess){ // execute desired code whenever text has been successfully copied
			var copiedtext = (function(){
		    if (window.getSelection){
		        return window.getSelection().toString()
				}
				else if (document.selection){
					return document.selection.createRange().text	
				}			
			})()
			if (copiedtext.length > 0){
				this.showtooltip(e)
				callback(copiedtext) || {}
			}
		}
	},

	init:function(callback){
		if (document.addEventListener){
			this.createtooltip()
			document.addEventListener('mouseup', function(e){copytextclipboard.copycommand(e, callback)}, false)
		}
	}
}