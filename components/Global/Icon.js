import { createIconSetFromIcoMoon } from '@expo/vector-icons';
import icoMoonConfig from '../../assets/fonts/selection.json';
const expoAssetId = require('../../assets/fonts/AkkarIcons.ttf');
const Icon = createIconSetFromIcoMoon(icoMoonConfig, 'AkkarIcons', expoAssetId);

export default Icon;
