"use sctrict"

jQuery(document).ready(function() 
{	
    $.scrollify({
        section : ".section-class-name",
        sectionName : "section-name"});
});


var start_button = document.getElementById("start_button"),
	recognizing = false, // флаг идет ли распознование
	final_transcript = '';

// проверяем поддержку speach api
if (!('webkitSpeechRecognition' in window)) start_button.style.display = "none"
else /* инициализируем api */
{  
	var recognition = new webkitSpeechRecognition();
  
 	recognition.lang = 'ru'; 
 	recognition.continuous = true; 
	recognition.interimResults = true;  

 	recognition.onstart = function() 
 	{
		recognizing = true;
    	start_button.style = "background: url(mic-animate.gif)"
  	}

  	recognition.onend = function() 
  	{
 		recognizing = false;
		start_button.style.background = 'url(mic.gif)'
	}
  

  recognition.onresult = function(event) {
	  
	  var interim_transcript = '';
	  
	  /* 
	  	обход результирующего массива
	  */
	  for (var i = event.resultIndex; i < event.results.length; ++i) {
		
		/* если фраза финальная (уже откорректированная) сохраняем в конечный результат */
      	if (event.results[i].isFinal) {
        	final_transcript += event.results[i][0].transcript;
     	 } else { /* иначе сохраянем в промежуточный */
        	interim_transcript += event.results[i][0].transcript;
    	 }
     }
   
    final_span.innerHTML = final_transcript;
    // interim_span.innerHTML = interim_transcript;
    switch (final_transcript)
    {
    	case "свет включить":
    	{
    		req('13','0');
    		console.log(final_transcript);
    		break;
    	}
    }
  };
 
}

function startButton(event) 
{
  if (recognizing) return recognition.stop()
  recognition.start();
}

////////FETCH

// function status(response) {  
//   if (response.status >= 200 && response.status < 300) {  
//     return Promise.resolve(response)  
//   } else {  
//     return Promise.reject(new Error(response.statusText))  
//   }  
// }

function json(response) {  
  return response.json()  
}


function req(pin, value) 
{
	fetch('192.168.4.1:8081', {  
    method: 'post',  
    headers: {  
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"  
    },  
    body: 'pin=${pin}&value=${value}'  
  	})
  	.then(json)  
  	.then(function (response) {  
    console.log('Request succeeded with JSON response', response);  
  	})  
  	.catch(function (error) {  
    console.log('Request failed', error);  
  	});
}