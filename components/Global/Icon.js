import { createIconSetFromIcoMoon } from '@expo/vector-icons';
import icoMoonConfig from '../../assets/fonts/selection.json';
const expoAssetId = require('../../assets/fonts/TodoListIcons.ttf');
const Icon = createIconSetFromIcoMoon(icoMoonConfig, 'TodoListIcons', expoAssetId);

export default Icon;
