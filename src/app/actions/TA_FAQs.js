export default () => {
  var faqs = document.querySelectorAll('.faqs');
	
	for (var i = 0; i < faqs.length; i++) {
		var a = faqs[i];
		
		var hs = a.querySelectorAll('.faqs__heading a');
		
		for (var _h = 0; _h < hs.length; _h++) {
			var l = hs[_h];
			l.addEventListener("click",function(e){
				e.preventDefault();
				var el = this.parentElement.parentElement;
				
				if (el.classList.contains('active')) {
					el.classList.remove('active');
				}
				else {
					el.classList.add('active');
				}
				
			});
		}
	}
}
