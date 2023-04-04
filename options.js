var keywordsArray;

var defaultKeywords = [
	"buy",
	"sale",
	"limited time",
	"act now",
	"buy now",
	"limited time offer",
	"act fast",
	"special deal",
	"discount",
	"free",
	"save",
	"exclusive",
	"new",
	"today only",
	"call now",
	"don't miss out",
	"lowest price",
	"bargain",
	"offer",
	"promo",
	"click now",
	"limited quantity",
	"big savings",
	"best deal",
	"lowest price ever",
	"get it now",
	"hurry",
	"final sale",
	"while supplies last",
	"one day only",
	"clearance",
	"flash sale",
	"50% off",
	"free shipping",
	"only a few left",
	"unbeatable price",
	"last chance",
	"offer ends soon",
	"massive discount",
	"amazing offer",
	"incredible value",
	"lowest prices of the season",
	"instant savings",
	"samsung galaxy",
	"paid up to",
	"apply now!",
	"check out our",
	"lower prices",
	"products",
	"find out",
	"home loan",
	"new listing",
	"use code",
	"symptoms of",
	"Swisse",
	"mobile",
	"plan",
	"@",
	"bet",
	"betm",
	"sportsbet",
	"ladbrokes",
	"5%",
	"10%",
	"15%",
	"20%",
	"25%",
	"30%",
	"35%",
	"40%",
	"45%",
	"50%",
	"55%",
	"60%",
	"65%",
	"70%",
	"75%",
	"80%",
	"85%",
	"90%",
	"95%",
	"100%",
	"suzuki",
	"deals for you",
	"gift card",
	"shopping",
	"miss out",
	"don't miss out",
	".com.au",
	".org.au",
	"https://www.",
	"*T&Cs apply",
	"terms and conditions",
	"Click & Collect",
	"essential",
	"happening now",
	"Join the team",
	"join now",
	"No.1",
	"*",
	"indulge",
	"great outdoors",
	"Thinking of selling",
	"purchase",
	"buyers",
	"adventurous",
	"stocks last",
	"Discover",
	"you're",
	"live music",
	"Sign up today",
	"sign up",
	"sign",
	"manufacturing",
	"tailored",
	"package",
	"Learn More",
	"for more information",
	"more information",
	"more info",
	"call our team",
	"call us",
	"email us",
	"contact us",
	"There's no time",
	"don’t miss",
	"Check out",
	"our range",
	"Collection",
	"in store",
	"visit us",
	"NO SUGAR",
	"fresh ingredients",
	"CHANCE TO WIN",
	"could win",
	"streaming on",
	"now streaming",
	"Build up your skills",
	"world-class",
	"pointsbet",
	"Health insurance",
	"refreshing taste",
	"Spending a little time",
	"outdoor living spaces",
	"is made with",
	"Professional Staff",
	"Quality Equipment",
	"Affordable",
	"Best Services",
	"offers",
	"Customer satisfaction",
	"services",
	"Check it out",
	"satisfaction",
	"optimise",
	"Employment",
	"organise",
	"succeed",
	"workforce",
	"be a part of",
	"job",
	"organize",
	"commission",
	"DIG INTO",
	"your bank",
	"optimize",
	"shares",
	"invest",
	"Automation",
	"bit.ly",
	"#",
	"team",
	"opportunity",
	"lifetime",
	"hiring",
	"events",
	"waiting for",
	"stunning",
	"two-bedroom",
	"three-bedroom",
	"two-bathroom",
	"townhouse",
	"interior",
	"alfreso",
	"auction",
	"open home",
	"squarespace",
	"drag-and-drop",
	"confidence",
	"however",
	"superb",
	"single-bedroom",
	"dimensions",
	"woodards",
	"crafted",
	"signature",
	"award-winning",
	"watch",
	"collection",
	"today",
	"try",
	"sensational",
	"start your day",
	"cleansing",
	"are you ready",
	"range",
	"head over to",
	"available at",
	"go bigger",
	"dont miss",
	"our range",
	"you're going"
];


var defaultThreshold = 0.01;
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

keywordsArray = document.getElementById("keywordsarea").value.split(',');
browser.storage.local.set({ "keywordsArray": keywordsArray }, function() {
});

var threshold = document.getElementById("threshold").value;
browser.storage.local.set({ "threshold": threshold }, function() {
});

if(e) {
	e.preventDefault();
}

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
    
browser.storage.local.get("keywordsArray", function(result) {
  if (result.keywordsArray !== undefined) {
    document.getElementById("keywordsarea").value = result.keywordsArray.join(',');
  } else {
    document.getElementById("keywordsarea").value = defaultKeywords.join(',');
	saveOptions();
  }
});

browser.storage.local.get("threshold", function(result) {
  if (result.threshold !== undefined) {
    document.getElementById("threshold").value = result.threshold;
  } else {
    document.getElementById("threshold").value = defaultThreshold;
	saveOptions();
  }
});

}

function restoreDefaults() {
    document.getElementById("keywordsarea").value = defaultKeywords.join(',');
	document.getElementById("threshold").value = defaultThreshold;
	saveOptions();  
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
document.getElementById("restoredef").addEventListener("click", restoreDefaults);