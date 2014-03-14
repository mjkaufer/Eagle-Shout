/* ---------------------------------------------------- +/

## Main ##

Global client-side code. Loads last. 

/+ ---------------------------------------------------- */

//

Content = {};
Content._dep = new Deps.Dependency;

Handlebars.registerHelper('getClass',function(a){
  
	url = document.URL.split("/"); //e.g. http://test.com/, so 3rd value will have link thing
	url = "/" + url[3];
	val = Router.path(a);
	return url == val ? "active" : "";


});

$('a').click(function(){
	Content._dep.changed();
});

function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

// Handlebars.registerHelper('listMenus',function(){

	
// 	var url = "/" + document.URL.split("/")[3]; //e.g. http://test.com/, so 3rd value will have link thing
	
// 	var ret = "";
	

// 	for(var x = 0; x < Router.routes.length; x++)
// 	{

// 		var r = Router.routes[x];
// 		var cl = (r.originalPath == url ? "active" : "");
		
	
// 				console.log('abcd');
// 		ret += "<li class='" + cl + "'><a href='" + r.originalPath + "'>" + toTitleCase(r.name) + "</a></li>"
// 	}

// 	return ret;



// });

