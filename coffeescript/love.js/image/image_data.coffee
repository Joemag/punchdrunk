# TODO: this should probably be backed by the actual ImageData object
# https://developer.mozilla.org/en/docs/Web/API/ImageData
class ImageData
  constructor: (filedata) ->
    @contents = "data:image/#{filedata.getExtension(filedata)};base64,#{filedata.getString(filedata)}"
    @name = filedata.name

  getString: (self) ->
    @contents

  encode: (self) ->

  getDimensions: (self) ->

  getHeight: (self) ->

  getPixel: (self) ->

  getWidth: (self) ->

  mapPixel: (self) ->

  paste: (self) ->

  setPixel: (self) ->

