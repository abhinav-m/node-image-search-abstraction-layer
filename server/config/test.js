const API_KEY = 'AIzaSyB6Cc1znhN15xauf0KQXmwfFR0DNc3A0iY';
const SEARCH_ENGINE_KEY = '007526927458028151855:iwnag7-h3yi';
const QUERY = 'apples';

const TEMPLATE = `https://www.googleapis.com/customsearch/v1?q={searchTerms}
&num={count?}&start={startIndex?}&lr={language?}&safe={safe?}&cx={cx?}&
sort={sort?}&filter={filter?}&gl={gl?}&cr={cr?}&googlehost={googleHost?}
&c2coff={disableCnTwTranslation?}&hq={hq?}&hl={hl?}
&siteSearch={siteSearch?}&siteSearchFilter={siteSearchFilter?}
&exactTerms={exactTerms?}&excludeTerms={excludeTerms?}&
linkSite={linkSite?}&orTerms={orTerms?}&
relatedSite={relatedSite?}&dateRestrict={dateRestrict?}&
lowRange={lowRange?}&highRange={highRange?}&searchType={searchType}&fileType={fileType?}&rights={rights?}&imgSize={imgSize?}&imgType={imgType?}&imgColorType={imgColorType?}&imgDominantColor={imgDominantColor?}&alt=json`;

const https = require('https');

const IMAGE_SEARCH_URL = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${SEARCH_ENGINE_KEY}&q=${QUERY}&searchType=image&fileType=jpg&imgSize=xlarge&alt=json&start=1&num=2`;

https.get(IMAGE_SEARCH_URL, res => {
  res.on('data', data => {
    console.log(data.toString());
  });
  res.on('error', console.error);
});

// <script>
//   (function() {
//     var cx = '007526927458028151855:iwnag7-h3yi';
//     var gcse = document.createElement('script');
//     gcse.type = 'text/javascript';
//     gcse.async = true;
//     gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
//     var s = document.getElementsByTagName('script')[0];
//     s.parentNode.insertBefore(gcse, s);
//   })();
// </script>
// <gcse:search></gcse:search>
