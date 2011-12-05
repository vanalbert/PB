
-- SUMMARY --

This module allows you to use WYSIWYG editors on legacy content that may not
already have HTML formatting applied, and also allows you to keep your nodes
free of extraneous HTML formatting, instead relying on Drupal's input formats
to format your code properly.

Basically, this module adds two Buttons / Plugins you can use in your WYSIWYG
profiles:

1. Force linebreaks

Using this plugin will make your content always have linebreaks instead of
paragraph and break tags. This means that if you disable your WYSIWYG editor,
your text will typically display with an extra line between each block of
text. This plugin is great for sites that often toggle WYSIWYG editors on and
off, as it's much easier to edit content from a WYSIWYG by hand if it doesn't
have a ton of <p> and <br /> tags running together.

2. Convert linebreaks

Using this plugin will take content that has linebreaks, but no <p> and <br />
tags, and convert it so it still looks correct in WYSIWYG editors. If you are
dealing with legacy content, or want to start using a WYSIWYG editor after
you've already added lots of content to your site without one, this plugin
will help ease that transition.

The two plugins should NOT be used together (unfortunately, there's no way for
us to prevent you from doing that, though). Pick one method of conversion, and
stick with it. You can switch between the two, if you'd like, with no harmful
effect.


-- REQUIREMENTS --

* Wysiwyg API


-- INSTALLATION --

* Install as usual, see http://drupal.org/node/70151 for further information.


-- CONFIGURATION --

* Enable either the Force linebreaks button or the Convert linebreaks button
  in the plugins/buttons configuration of the wysiwyg profiles of your choice.
  (See 'Summary' above for more information about what the buttons do).


-- TROUBLESHOOTING --

* No known issues yet.


-- FAQ --

* No known issues yet.


-- CONTACT --

Current maintainer:
* Jeff Geerling: http://drupal.org/user/389011

