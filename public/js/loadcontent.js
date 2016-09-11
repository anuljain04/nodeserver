$(document).ready(function() {
	 $.get("/fileList", function(data, status){
        load(data);
    });
});

function load(data){
	var files = data.split(",");
	for(var index in files) {
		$("#gallery").append('<div> <img src= '+files[index]+' class="img-thumbnail" alt='+files[index]+' width="304" height="236" id = '+files[index]+'> </div>');
	}
}

$('#gallery').on('click','.img-thumbnail',function(event){
	if (confirm('Are you sure you want to delete this thing from the fileSystem?')) {
		// Save it!
		 $.get('delete',{filename : event.target.id}, function(data, status){
				location.reload();
		  });
	} else {
	// Do nothing!
	}
});