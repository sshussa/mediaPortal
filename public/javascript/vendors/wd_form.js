
  $(document).ready(function() {

    // process the form
			$('form').submit(function(event) {
					 
							var data = {};
							data.firstName = $('input[name=fname]').val(),
							data.lastName = $('input[name=lname]').val(),
							data.email = $('input[name=email]').val(),
							data.company = $('input[name=company]').val(),
							data.phone = $('input[name=phone]').val()
							
							$.ajax({
								type: 'POST',
								data: JSON.stringify(data),
								contentType: 'application/json',
								url: 'http://localhost:5000/subscription',						
								success: function(data) {
									console.log('success');
									console.log(JSON.stringify(data));
								},
								error: function( jqXhr, textStatus, errorThrown ){
									console.log( errorThrown );
								}
							});
							
				
						});						
            });
