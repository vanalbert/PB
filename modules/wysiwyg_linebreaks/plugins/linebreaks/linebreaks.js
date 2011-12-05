
// Adopted from Wordpress 2.8.1-beta editor.js.

Drupal.wysiwyg.plugins.linebreaks = {

  invoke: function(data, settings, instanceId) {
    alert('This button does nothing, it belongs to the linebreaks plugin.');
  },
  attach: function(content, settings, instanceId) {
    content = this.lbautop(content);
    return content;
  },
  detach: function(content, settings, instanceId) {
    content = this.pre_lbautop(content);
    return content;
  },

  // This function runs when the content is saved (or when WYSIWYG is disabled
  // manually).
  pre_lbautop : function(content) {
      var blocklist1, blocklist2;

      // Protect pre|script tags
      content = content.replace(/<(pre|script)[^>]*>[\s\S]+?<\/\1>/g, function(a) {
          a = a.replace(/<br ?\/?>[\r\n]*/g, '<lb_temp>');
          return a.replace(/<\/?p( [^>]*)?>[\r\n]*/g, '<lb_temp>');
      });

      // Pretty it up for the source editor
      blocklist1 = 'blockquote|ul|ol|li|hr|table|thead|tbody|tr|th|td|div|h[1-6]|p';
      content = content.replace(new RegExp('\\s*</('+blocklist1+')>\\s*', 'mg'), '</$1>\n');
      content = content.replace(new RegExp('\\s*<(('+blocklist1+')[^>]*)>', 'mg'), '\n<$1>');

      // Mark </p> if it has any attributes.
      content = content.replace(new RegExp('(<p [^>]+>.*?)</p>', 'mg'), '$1</p#>');

      // Sepatate <div> containing <p>
      content = content.replace(new RegExp('<div([^>]*)>\\s*<p>', 'mgi'), '<div$1>\n\n');

      // Remove <p> and <br />
      content = content.replace(new RegExp('\\s*<p>', 'mgi'), '');
      content = content.replace(new RegExp('\\s*</p>\\s*', 'mgi'), '\n\n');
      content = content.replace(new RegExp('\\n\\s*\\n', 'mgi'), '\n\n');
      content = content.replace(new RegExp('\\s*<br ?/?>\\s*', 'gi'), '\n');

      // Fix some block element newline issues
      content = content.replace(new RegExp('\\s*<div', 'mg'), '\n<div');
      content = content.replace(new RegExp('</div>\\s*', 'mg'), '</div>\n');
      content = content.replace(new RegExp('\\s*\\[caption([^\\[]+)\\[/caption\\]\\s*', 'gi'), '\n\n[caption$1[/caption]\n\n');
      content = content.replace(new RegExp('caption\\]\\n\\n+\\[caption', 'g'), 'caption]\n\n[caption');

      // Block elements which look nicer with two newlines before and after
      blocklist2 = 'blockquote|ul|ol|table|h[1-6]|pre';
      content = content.replace(new RegExp('\\s*<(('+blocklist2+') ?[^>]*)\\s*>', 'mg'), '\n\n<$1>');
      content = content.replace(new RegExp('\\s*</('+blocklist2+')>\\s*', 'mg'), '</$1>\n\n');
      content = content.replace(new RegExp('\\s*<(hr ?[^>]*)\\s*>', 'mg'), '\n\n<$1>\n\n');

      // Block elements which look nicer with one newline before and after
      blocklist3 = 'li|thead|tr|th|td';
      content = content.replace(new RegExp('\\s*<(('+blocklist3+') ?[^>]*)\\s*>', 'mg'), '\n<$1>');
      content = content.replace(new RegExp('\\s*</('+blocklist3+')>\\s*', 'mg'), '</$1>\n');
      content = content.replace(new RegExp('<li([^>]*)>', 'g'), '\t<li$1>');

      if ( content.indexOf('<object') != -1 ) {
          content = content.replace(/<object[\s\S]+?<\/object>/g, function(a){
              return a.replace(/[\r\n]+/g, '');
          });
      }

      if ( content.indexOf('<embed') != -1 ) {
          content = content.replace(/<embed[\s\S]+?<\/embed>/g, function(a){
              return a.replace(/[\r\n]+/g, '');
          });
      }

      // Unmark special paragraph closing tags
      content = content.replace(new RegExp('</p#>', 'g'), '</p>\n');
      content = content.replace(new RegExp('\\s*(<p [^>]+>.*</p>)', 'mg'), '\n$1');

      // Trim whitespace
      content = content.replace(new RegExp('^\\s*', ''), '');
      content = content.replace(new RegExp('[\\s\\u00a0]*$', ''), '');

      // put back the line breaks in pre|script
      content = content.replace(/<lb_temp>/g, '\n');
      // Hope.
      return content;
    },

    // This function runs when the content is turned over to WYSIWYG
    lbautop : function(lbvar) {

      var blocklist = 'table|thead|tfoot|caption|col|colgroup|tbody|tr|td|th|div|dl|dd|dt|ul|ol|li|hr|pre|select|form|blockquote|address|math|p|h[1-6]';

      // @TODO - Fix <hr /> elements. Right now an extra space is added to the following
      // block-level element...

      if(lbvar == "") return lbvar;

      if ( lbvar.indexOf('<object') != -1 ) {
          lbvar = lbvar.replace(/<object[\s\S]+?<\/object>/g, function(a){
              return a.replace(/[\r\n]+/g, '');
          });
      }

      if ( lbvar.indexOf('<embed') != -1 ) {
          lbvar = lbvar.replace(/<embed[\s\S]+?<\/embed>/g, function(a){
              return a.replace(/[\r\n]+/g, '');
          });
      }

      lbvar = lbvar.replace(/<[^<>]+>/g, function(a){
          return a.replace(/[\r\n]+/g, ' ');
      });

      lbvar = lbvar + "\n\n";
      lbvar = lbvar.replace(new RegExp('<br />\\s*<br />', 'gi'), "\n\n");
      lbvar = lbvar.replace(new RegExp('(<(?:'+blocklist+')[^>]*>)', 'gi'), "\n$1");
      lbvar = lbvar.replace(new RegExp('(</(?:'+blocklist+')>)', 'gi'), "$1\n\n");
      lbvar = lbvar.replace(new RegExp("\\r\\n|\\r", 'g'), "\n");
      lbvar = lbvar.replace(new RegExp("\\n\\s*\\n+", 'g'), "\n\n");
      lbvar = lbvar.replace(new RegExp('([\\s\\S]+?)\\n\\n', 'mg'), "<p>$1</p>\n");
      lbvar = lbvar.replace(new RegExp('<p>\\s*?</p>', 'gi'), '');
      lbvar = lbvar.replace(new RegExp('<p>\\s*(</?(?:'+blocklist+')[^>]*>)\\s*</p>', 'gi'), "$1");
      lbvar = lbvar.replace(new RegExp("<p>(<li.+?)</p>", 'gi'), "$1");
      lbvar = lbvar.replace(new RegExp('<p>\\s*<blockquote([^>]*)>', 'gi'), "<blockquote$1><p>");
      lbvar = lbvar.replace(new RegExp('</blockquote>\\s*</p>', 'gi'), '</p></blockquote>');
      lbvar = lbvar.replace(new RegExp('<p>\\s*(</?(?:'+blocklist+')[^>]*>)', 'gi'), "$1");
      lbvar = lbvar.replace(new RegExp('(</?(?:'+blocklist+')[^>]*>)\\s*</p>', 'gi'), "$1");
      lbvar = lbvar.replace(new RegExp('\\s*\\n', 'gi'), "<br />\n");
      lbvar = lbvar.replace(new RegExp('(</?(?:'+blocklist+')[^>]*>)\\s*<br />', 'gi'), "$1");
      lbvar = lbvar.replace(new RegExp('<br />(\\s*</?(?:p|li|div|dl|dd|dt|th|pre|td|ul|ol)>)', 'gi'), '$1');
      lbvar = lbvar.replace(new RegExp('(?:<p>|<br ?/?>)*\\s*\\[caption([^\\[]+)\\[/caption\\]\\s*(?:</p>|<br ?/?>)*', 'gi'), '[caption$1[/caption]');

      // Fix the pre|script tags
      lbvar = lbvar.replace(/<(pre|script)[^>]*>[\s\S]+?<\/\1>/g, function(a) {
          a = a.replace(/<br ?\/?>[\r\n]*/g, '\n');
          return a.replace(/<\/?p( [^>]*)?>[\r\n]*/g, '\n');
      });

      return lbvar;
    }
};
