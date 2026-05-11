const CONSENT_DEFAULT_SCRIPT = `(function(){
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  window.gtag = gtag;
  var denied = {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'granted',
    personalization_storage: 'denied',
    security_storage: 'granted'
  };
  var stored = null;
  try {
    var raw = localStorage.getItem('flowroute_consent_v1');
    if (raw) stored = JSON.parse(raw);
  } catch (e) {}
  var initial = stored || denied;
  gtag('consent', 'default', Object.assign({ wait_for_update: 500 }, initial));
})();`

export function ConsentDefaultScript() {
  return (
    <script
      id="gtag-consent-default"
      dangerouslySetInnerHTML={{ __html: CONSENT_DEFAULT_SCRIPT }}
    />
  )
}
