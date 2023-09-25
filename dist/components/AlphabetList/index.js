"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlphabetList = void 0;
const React = __importStar(require("react"));
const react_1 = require("react");
const react_native_1 = require("react-native");
// @ts-ignore
const react_native_reanimated_1 = __importDefault(require("react-native-reanimated"));
const react_native_section_list_get_item_layout_1 = __importDefault(require("react-native-section-list-get-item-layout"));
const getSectionData_1 = require("../../utils/getSectionData");
const ListLetterIndex_1 = require("../ListLetterIndex");
const styles_1 = require("./styles");
const sizes_1 = require("../../values/sizes");
const consts_1 = require("../../values/consts");
exports.AlphabetList = (props) => {
    const { data, index = consts_1.DEFAULT_CHAR_INDEX, style, indexContainerStyle, indexLetterStyle, indexLetterContainerStyle, letterListContainerStyle, getItemHeight: onGetItemHeight = () => sizes_1.sizes.itemHeight, sectionHeaderHeight = sizes_1.sizes.itemHeight, listHeaderHeight = sizes_1.sizes.listHeaderHeight, uncategorizedAtTop = false, renderCustomSectionHeader, renderCustomItem, renderCustomListHeader, renderCustomIndexLetter } = props, sectionListProps = __rest(props, ["data", "index", "style", "indexContainerStyle", "indexLetterStyle", "indexLetterContainerStyle", "letterListContainerStyle", "getItemHeight", "sectionHeaderHeight", "listHeaderHeight", "uncategorizedAtTop", "renderCustomSectionHeader", "renderCustomItem", "renderCustomListHeader", "renderCustomIndexLetter"]);
    const sectionListRef = react_1.useRef(null);
    const [sectionData, setSectionData] = react_1.useState([]);
    react_1.useEffect(() => {
        setSectionData(getSectionData_1.getSectionData(data, index, uncategorizedAtTop));
    }, [data]);
    const onScrollToSection = (sectionIndex) => {
        const sectionList = sectionListRef.current;
        if (!sectionList)
            return;
        sectionList.scrollToLocation({
            sectionIndex,
            itemIndex: 0,
        });
    };
    const onGetItemLayout = react_native_section_list_get_item_layout_1.default({
        getItemHeight: (_rowData, sectionIndex, rowIndex) => {
            return onGetItemHeight(sectionIndex, rowIndex);
        },
        getSectionHeaderHeight: () => sectionHeaderHeight,
        getSectionFooterHeight: () => 0,
        listHeaderHeight,
    });
    const onRenderSectionHeader = ({ section, }) => {
        if (renderCustomSectionHeader)
            return renderCustomSectionHeader(section);
        return (<react_native_1.View testID="header" style={styles_1.styles.sectionHeaderContainer}>
        <react_native_1.Text testID="header__label" style={styles_1.styles.sectionHeaderLabel}>
          {section.title}
        </react_native_1.Text>
      </react_native_1.View>);
    };
    const onRenderItem = ({ item }) => {
        if (renderCustomItem)
            return renderCustomItem(item);
        return (<react_native_1.View testID="cell" style={styles_1.styles.listItemContainer}>
        <react_native_1.Text testID="cell__label" style={styles_1.styles.listItemLabel}>
          {item.value}
        </react_native_1.Text>
      </react_native_1.View>);
    };
    return (<react_native_1.View style={[styles_1.styles.container, style]}>
      <react_native_reanimated_1.default.SectionList {...sectionListProps} testID="sectionList" ref={sectionListRef} sections={sectionData} keyExtractor={(item) => item.key} renderItem={onRenderItem} renderSectionHeader={onRenderSectionHeader} ListHeaderComponent={renderCustomListHeader} getItemLayout={onGetItemLayout}/>

      <ListLetterIndex_1.ListLetterIndex sectionData={sectionData} onPressLetter={onScrollToSection} indexContainerStyle={indexContainerStyle} indexLetterStyle={indexLetterStyle} indexLetterContainerStyle={indexLetterContainerStyle} letterListContainerStyle={letterListContainerStyle} renderCustomIndexLetter={renderCustomIndexLetter}/>
    </react_native_1.View>);
};
