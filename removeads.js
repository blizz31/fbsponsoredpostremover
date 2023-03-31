const adKeywords = [
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
  "#"
];

var consoleLogging;


function apply() {
	


	// Get all <use> elements in the DOM
	const useElements = document.querySelectorAll('use');

	// Loop through each <use> element
	useElements.forEach((useElement) => {
	  // Get the 15th parent node of the <use> element
	  let parent = useElement.parentNode;
	  for (let i = 0; i < 15; i++) {
		parent = parent.parentNode;
		if (!parent) {
		  break;
		}
	  }

 	  if (parent && parent.nextSibling) {
		var str = "";
		const sibling = parent.nextSibling;
		if (sibling.firstChild) {
			str =  stripString(sibling.firstChild.lastChild.innerHTML);		
		}
		else if (sibling.lastChild) {

			str =  stripString(sibling.lastChild.innerHTML);
		}
		
		if (isAdvertisement(str, 0.01)) {
			if (consoleLogging) {
				console.log("[Facebook Sponsored post remover] Removed post: " + str);
			}
			parent.parentNode.parentNode.removeChild(parent.parentNode);	
		}
	  }  
	});
}

setTimeout(function() {
let storageItem = browser.storage.local.get('FARConsoleLogging');
storageItem.then((res) => {
consoleLogging = res.FARConsoleLogging;
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