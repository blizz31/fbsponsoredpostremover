function saveOptions(e) {
	
  if (document.getElementById("ConsoleLoggingYes").checked) {
	browser.storage.local.set({
		FARConsoleLogging: true
    }); 
  }
  else {
	browser.storage.local.set({
		FARConsoleLogging: false
    }); 	 	  
  }

  e.preventDefault();
}

function restoreOptions() {
  let storageItem = browser.storage.local.get('FARConsoleLogging');
  storageItem.then((res) => {	
		if (res.FARConsoleLogging) {
			document.getElementById("ConsoleLoggingYes").checked = true;
		}
		else {
			document.getElementById("ConsoleLoggingNo").checked = true;
		}
    
  });

}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);