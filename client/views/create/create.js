Template.create.events({
	"click #submitbutton": function(event, template) {
		var tablename = document.getElementsByName("tablename")[0].value;
		var password = document.getElementsByName("pword1")[0].value;
		var passwordConfirm = document.getElementsByName("pword2")[0].value;
		var threshholdSelect = document.getElementsByName("threshold")[0];
		var threshhold = threshholdSelect[threshholdSelect.selectedIndex].value;
		var lengthSelect = document.getElementsByName("new_length")[0];
		var redLength = lengthSelect[lengthSelect.selectedIndex].value;
		var staleSelect = document.getElementsByName("stale_length")[0];
		var stale = staleSelect[staleSelect.selectedIndex].value;
		var description = document.getElementsByName("description")[0].value;
		Meteor.call('create', tablename, threshhold, redLength, stale, description, passwordConfirm, function (error, result) {
			console.log(result);
			if(typeof result === 'object') {
				var errorString = "";
				for(var e = 0; e < result.length; e++) {
					errorString += "Error #" + (e + 1) + " : " + result[e].name + "\n";
				}
				alert(errorString);
			} else {
				Cookie.set('tablename', result);
				window.location.href = '/list';
			}
		});
	}
});

Template.create.onRendered(function() {
	document.title = "Live Question Tool Creation Area";
});