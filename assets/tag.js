/* 九大突破塾 共通計測タグ
 * GA4: G-PTJK80BKV7 / Google広告: AW-754576649
 * 全ページの <head> から <script src="/assets/tag.js"></script> で読み込む
 */
(function () {
  var GA4 = 'G-PTJK80BKV7';
  var ADS = 'AW-754576649';

  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA4;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA4);
  gtag('config', ADS);

  // 埋め込みGoogleフォームの送信検知。
  // iframe は「表示時」と「送信後（完了画面への遷移）」の2回 load する。
  // 2回目 = 送信完了とみなし、サイト内の送信完了ページへ移動する。
  var formLoads = 0;
  window.kdtFormLoaded = function () {
    formLoads++;
    if (formLoads < 2) return;
    try { sessionStorage.setItem('kdt_form_sent', '1'); } catch (e) {}
    location.href = '/contact/thanks/';
  };

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    // 電話・メールのタップ = 問い合わせ行動（GA4標準イベント generate_lead）
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href]');
      if (!a) return;
      var href = a.getAttribute('href') || '';
      if (href.indexOf('tel:') === 0) {
        gtag('event', 'generate_lead', { method: 'phone', link_url: href });
        gtag('event', 'phone_click', { link_url: href });
      } else if (href.indexOf('mailto:') === 0) {
        gtag('event', 'generate_lead', { method: 'email', link_url: href });
        gtag('event', 'email_click', { link_url: href });
      } else if (href.indexOf('docs.google.com/forms') !== -1) {
        gtag('event', 'form_open', { link_url: href });
      }
    }, true);

    // 送信完了ページ到達 = フォーム送信（Google広告のコンバージョン計測対象）
    if (location.pathname.indexOf('/contact/thanks') === 0) {
      gtag('event', 'generate_lead', { method: 'form' });
      gtag('event', 'contact_form_submit', { form_name: 'contact' });
      return;
    }

    // 問い合わせページ到達
    if (location.pathname.indexOf('/contact') === 0) {
      gtag('event', 'contact_view');
      // 埋め込みGoogleフォームに触った（フォーム入力開始の目安）
      var fired = false;
      window.addEventListener('blur', function () {
        var el = document.activeElement;
        if (!fired && el && el.tagName === 'IFRAME' && (el.className || '').indexOf('gform') !== -1) {
          fired = true;
          gtag('event', 'form_start', { form_name: 'contact' });
        }
      });
    }
  });
})();
