
// Adopted from Wordpress 2.8.1-beta editor.js.

Drupal.wysiwyg.plugins.convert_linebreaks = {

  invoke: function(data, settings, instanceId) {
    alert('This button does nothing, it belongs to the convert linebreaks plugin.');
  },
  attach: function(content, settings, instanceId) {
    content = this.lbautop(content);
    return content;
  },
  detach: function(content, settings, instanceId) {
    // Don't need to do anything here.
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
