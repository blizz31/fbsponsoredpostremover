var adKeywords = [
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

var consoleLogging;
var threshold = 0.01; // This will be changed if user has set a custom threshold in options

// apply is called at every interval specific in the setTimeout below.
function apply() {
	
	// <use> elements have been found to be unique to posts on the feed. We leverage this as a foundation to scanning each post.
	const useElements = document.querySelectorAll('use');
	useElements.forEach((useElement) => {
	  let parent = useElement.parentNode;
	  // At the time of writing, about 15 parent nodes upward will give us a node which contains the innerHTML 
	  // of the entire post (whether it be a sponsored post or not)
	  for (let i = 0; i < 16; i++) {
		parent = parent.parentNode;
		if (!parent) {
		  break;
		}
	  }
 	  if (parent && parent.firstChild.nextSibling && parent.firstChild.nextSibling.nextSibling) {
		// Strip the HTML tags from the innerHTML to give us a rough string of the Text components of the post.
		var str = stripString(parent.firstChild.nextSibling.nextSibling.innerHTML);
		// Run the text through the comparison algorithm to see if it is considered a sponsored post and if so, remove it.
		if (isAdvertisement(str, threshold)) {
			if (consoleLogging) {
				console.log("[Facebook Sponsored post remover] Removed post: " + str);
			}
			parent.parentNode.removeChild(parent);	
		}
	  }  
	});
}

setTimeout(function() {
let storageItem = browser.storage.local.get('FARConsoleLogging');
storageItem.then((res) => {
consoleLogging = res.FARConsoleLogging;
});

browser.storage.local.get("keywordsArray", function(result) {
  if (result.keywordsArray !== undefined) {
    adKeywords = result.keywordsArray;
  } 
});

browser.storage.local.get("threshold", function(result) {
  if (result.threshold !== undefined) {
    threshold = result.threshold;
  } 
});

  apply();
  setInterval(apply, 2500);
}, 5000);

function nodeToString ( node ) {
   var tmpNode = document.createElement( "div" );
   tmpNode.appendChild( node.cloneNode( true ) );
   var str = tmpNode.innerHTML;
   tmpNode = node = null; // prevent memory leaks in IE
   return str;
}

function stripString(s) {
	return s.replace(/<[^>]*>/g, "");
}

/* isAdvertisement() takes an input string and a threshold value as arguments. The threshold value determines the minimum ratio of advertisement keywords required for the string to be classified as an advertisement.

The function tokenizes the input string into lowercase words using a regular expression, then calculates the frequency of each advertisement keyword. Finally, it computes the ratio of advertisement keywords to total words and returns true if the ratio is above the threshold.

Note that this approach has limitations and may produce false positives or false negatives, especially for more complex or subtle advertisements. Additionally, advertisements can take many different forms and may not always contain explicit keywords.
*/

function isAdvertisement(inputString, threshold) {
  // hard coded match for the ® symbol. I can't think of a reason why a regular post would contain one, can you? 
  if (inputString.includes("®")) {
	  return true;
  }
  const words = inputString.toLowerCase().split(/[^\w']+/);
  const freqs = {};
  words.forEach((word) => {
    if (adKeywords.includes(word)) {
      freqs[word] = (freqs[word] || 0) + 1;
    }
  });
  const adFreq = Object.values(freqs).reduce((a, b) => a + b, 0);
  const totalFreq = words.length;
  const adRatio = adFreq / totalFreq;
  return adRatio >= threshold;
}