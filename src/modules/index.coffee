'use strict'

###
browserify-shim dependencies (can be edited in package.json)
###

require 'angular'
global._ = require "lodash"
require 'angular-ui-router'
require 'restangular'
require 'angular-messages'
require 'select2'
require 'pixel-admin'
require 'youtube-modal'
##require 'masonry-package'
##require 'image-loaded'
require 'masonry'
require 'chardinjs'
###
app entry point
###
require './app'
