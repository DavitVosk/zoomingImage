import resolveAssetSource from 'resolveAssetSource';

// calculate image height and width
let image =  require('../util/images/page-1.png');
let source = resolveAssetSource(image);
export const ORIGINAL_DIAGRAM_WIDTH = source.width;
export const ORIGINAL_DIAGRAM_HEIGHT = source.height;
