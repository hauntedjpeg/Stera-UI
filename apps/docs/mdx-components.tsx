import type { MDXComponents } from "mdx/types"
import defaultComponents from "fumadocs-ui/mdx"
import { Steps } from "fumadocs-ui/components/steps"
import { Preview } from "@/components/preview"
import {
  ButtonAllVariants,
  ButtonAllSizes,
  ButtonWithIcon,
  ButtonDisabled,
} from "@/components/button-preview"
import {
  ButtonGroupDefault,
  ButtonGroupOrientation,
  ButtonGroupWithSeparator,
  ButtonGroupAllVariants,
  ButtonGroupSplit,
} from "@/components/button-group-preview"
import {
  BadgeAllVariants,
  BadgeAllSizes,
  BadgeWithIcon,
} from "@/components/badge-preview"
import {
  SeparatorDefault,
  SeparatorVertical,
} from "@/components/separator-preview"
import {
  KbdDefault,
  KbdSizes,
  KbdKeyCombination,
  KbdWithButton,
  KbdWithInput,
} from "@/components/kbd-preview"
import {
  LabelWithInput,
  LabelWithCheckbox,
  LabelDisabled,
} from "@/components/label-preview"
import {
  SkeletonAvatar,
  SkeletonCard,
  SkeletonText,
} from "@/components/skeleton-preview"
import {
  ProgressDefault,
  ProgressWithLabel,
} from "@/components/progress-preview"
import {
  ToggleDefault,
  ToggleOutline,
  ToggleWithText,
  ToggleSizes,
  ToggleDisabled,
} from "@/components/toggle-preview"
import {
  ChipAllVariants,
  ChipAllSizes,
  ChipWithIcons,
  ChipActiveState,
} from "@/components/chip-preview"
import {
  InputDefault,
  InputWithField,
  InputAllSizes,
  InputDisabled,
  InputInvalid,
} from "@/components/input-preview"
import {
  TextareaDefault,
  TextareaWithField,
  TextareaDisabled,
  TextareaInvalid,
  TextareaWithButton,
} from "@/components/textarea-preview"
import {
  SwitchDefault,
  SwitchWithDescription,
  SwitchSizes,
  SwitchDisabled,
} from "@/components/switch-preview"
import {
  CheckboxDefault,
  CheckboxWithDescription,
  CheckboxGroup,
  CheckboxDisabled,
} from "@/components/checkbox-preview"
import {
  RadioGroupDefault,
  RadioGroupWithDescription,
  RadioGroupFieldset,
  RadioGroupDisabled,
} from "@/components/radio-group-preview"
import {
  SelectDefault,
  SelectGroups,
  SelectAllSizes,
  SelectDisabled,
  SelectInvalid,
} from "@/components/select-preview"
import {
  NativeSelectDefault,
  NativeSelectWithField,
  NativeSelectWithOptGroup,
  NativeSelectSizes,
  NativeSelectDisabled,
} from "@/components/native-select-preview"
import {
  SliderDefault,
  SliderRange,
  SliderVertical,
  SliderDisabled,
} from "@/components/slider-preview"
import {
  AvatarDefault,
  AvatarFallbackOnly,
  AvatarAllSizes,
  AvatarShapes,
  AvatarWithBadge,
  AvatarIconFallbackPreview,
  AvatarGroupPreview,
} from "@/components/avatar-preview"
import {
  CardDefault,
  CardWithAction,
  CardSizes,
} from "@/components/card-preview"
import {
  CalloutDefault,
  CalloutWithIcon,
  CalloutWithAction,
  CalloutWithClose,
  CalloutAllVariants,
} from "@/components/callout-preview"
import {
  NoticeDefault,
  NoticeTypes,
} from "@/components/notice-preview"
import {
  EmptyDefault,
  EmptyWithAvatarGroup,
  EmptyNoResults,
} from "@/components/empty-preview"
import {
  BreadcrumbDefault,
  BreadcrumbCustomSeparator,
  BreadcrumbCollapsed,
} from "@/components/breadcrumb-preview"
import {
  TooltipDefault,
  TooltipSides,
  TooltipWithKbd,
} from "@/components/tooltip-preview"
import {
  ItemDefault,
  ItemAllVariants,
  ItemAllSizes,
  ItemWithActions,
  ItemNotificationList,
} from "@/components/item-preview"
import {
  AccordionDefault,
  AccordionMultiple,
  AccordionDefaultOpen,
} from "@/components/accordion-preview"
import {
  TabsDefault,
  TabsLine,
  TabsVertical,
  TabsDisabled,
  TabsSizes,
  TabsWithIcons,
} from "@/components/tabs-preview"
import {
  PaginationDefault,
  PaginationSimple,
  PaginationWithRowsPerPage,
} from "@/components/pagination-preview"
import {
  ToggleGroupDefault,
  ToggleGroupOutline,
  ToggleGroupSizes,
  ToggleGroupVertical,
  ToggleGroupDisabled,
  ToggleGroupCustom,
} from "@/components/toggle-group-preview"
import {
  InputGroupIcon,
  InputGroupTextAddon,
  InputGroupWithButton,
  InputGroupWithKbd,
  InputGroupSizes,
  InputGroupTextareaAddon,
  InputGroupWithLabel,
} from "@/components/input-group-preview"
import {
  FieldDefault,
  FieldHorizontal,
  FieldWithError,
  FieldMultipleErrors,
  FieldDisabled,
  FieldCheckboxGroup,
  FieldFormExample,
} from "@/components/field-preview"
import {
  DialogDefault,
  DialogConfirm,
  DialogScrollable,
} from "@/components/dialog-preview"
import {
  SheetDefault,
  SheetSides,
  SheetNoCloseButton,
} from "@/components/sheet-preview"
import {
  AlertDialogDefault,
  AlertDialogWithMedia,
  AlertDialogSmall,
  AlertDialogDestructive,
} from "@/components/alert-dialog-preview"
import {
  DropdownMenuDefault,
  DropdownMenuWithIcons,
  DropdownMenuWithShortcuts,
  DropdownMenuWithSubmenu,
  DropdownMenuDestructive,
  DropdownMenuCheckboxes,
  DropdownMenuRadioItems,
  DropdownMenuTitleDescription,
} from "@/components/dropdown-menu-preview"
import {
  CommandDefault,
  CommandDialogExample,
  CommandTitleDescription,
} from "@/components/command-preview"
import {
  ComboboxDefault,
  ComboboxMultiple,
  ComboboxGroups,
  ComboboxCustomItems,
  ComboboxPopup,
  ComboboxInvalid,
} from "@/components/combobox-preview"
import {
  TableDefault,
  TableWithFooter,
} from "@/components/table-preview"
import {
  CalendarDefault,
  CalendarRange,
  CalendarDropdown,
  CalendarWithPresets,
  CalendarWeekNumbers,
} from "@/components/calendar-preview"
import {
  SidebarDefault,
  SidebarWithBadge,
  SidebarVariants,
} from "@/components/sidebar-preview"

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...defaultComponents,
    Steps,
    Preview,
    ButtonAllVariants,
    ButtonAllSizes,
    ButtonWithIcon,
    ButtonDisabled,
    ButtonGroupDefault,
    ButtonGroupOrientation,
    ButtonGroupWithSeparator,
    ButtonGroupAllVariants,
    ButtonGroupSplit,
    BadgeAllVariants,
    BadgeAllSizes,
    BadgeWithIcon,
    SeparatorDefault,
    SeparatorVertical,
    KbdDefault,
    KbdSizes,
    KbdKeyCombination,
    KbdWithButton,
    KbdWithInput,
    LabelWithInput,
    LabelWithCheckbox,
    LabelDisabled,
    SkeletonAvatar,
    SkeletonCard,
    SkeletonText,
    ProgressDefault,
    ProgressWithLabel,
    ToggleDefault,
    ToggleOutline,
    ToggleWithText,
    ToggleSizes,
    ToggleDisabled,
    ChipAllVariants,
    ChipAllSizes,
    ChipWithIcons,
    ChipActiveState,
    InputDefault,
    InputWithField,
    InputAllSizes,
    InputDisabled,
    InputInvalid,
    TextareaDefault,
    TextareaWithField,
    TextareaDisabled,
    TextareaInvalid,
    TextareaWithButton,
    SwitchDefault,
    SwitchWithDescription,
    SwitchSizes,
    SwitchDisabled,
    CheckboxDefault,
    CheckboxWithDescription,
    CheckboxGroup,
    CheckboxDisabled,
    RadioGroupDefault,
    RadioGroupWithDescription,
    RadioGroupFieldset,
    RadioGroupDisabled,
    SelectDefault,
    SelectGroups,
    SelectAllSizes,
    SelectDisabled,
    SelectInvalid,
    NativeSelectDefault,
    NativeSelectWithField,
    NativeSelectWithOptGroup,
    NativeSelectSizes,
    NativeSelectDisabled,
    SliderDefault,
    SliderRange,
    SliderVertical,
    SliderDisabled,
    AvatarDefault,
    AvatarFallbackOnly,
    AvatarAllSizes,
    AvatarShapes,
    AvatarWithBadge,
    AvatarIconFallbackPreview,
    AvatarGroupPreview,
    CardDefault,
    CardWithAction,
    CardSizes,
    CalloutDefault,
    CalloutWithIcon,
    CalloutWithAction,
    CalloutWithClose,
    CalloutAllVariants,
    NoticeDefault,
    NoticeTypes,
    EmptyDefault,
    EmptyWithAvatarGroup,
    EmptyNoResults,
    BreadcrumbDefault,
    BreadcrumbCustomSeparator,
    BreadcrumbCollapsed,
    TooltipDefault,
    TooltipSides,
    TooltipWithKbd,
    ItemDefault,
    ItemAllVariants,
    ItemAllSizes,
    ItemWithActions,
    ItemNotificationList,
    AccordionDefault,
    AccordionMultiple,
    AccordionDefaultOpen,
    TabsDefault,
    TabsLine,
    TabsVertical,
    TabsDisabled,
    TabsSizes,
    TabsWithIcons,
    PaginationDefault,
    PaginationSimple,
    PaginationWithRowsPerPage,
    ToggleGroupDefault,
    ToggleGroupOutline,
    ToggleGroupSizes,
    ToggleGroupVertical,
    ToggleGroupDisabled,
    ToggleGroupCustom,
    InputGroupIcon,
    InputGroupTextAddon,
    InputGroupWithButton,
    InputGroupWithKbd,
    InputGroupSizes,
    InputGroupTextareaAddon,
    InputGroupWithLabel,
    FieldDefault,
    FieldHorizontal,
    FieldWithError,
    FieldMultipleErrors,
    FieldDisabled,
    FieldCheckboxGroup,
    FieldFormExample,
    DialogDefault,
    DialogConfirm,
    DialogScrollable,
    SheetDefault,
    SheetSides,
    SheetNoCloseButton,
    AlertDialogDefault,
    AlertDialogWithMedia,
    AlertDialogSmall,
    AlertDialogDestructive,
    DropdownMenuDefault,
    DropdownMenuWithIcons,
    DropdownMenuWithShortcuts,
    DropdownMenuWithSubmenu,
    DropdownMenuDestructive,
    DropdownMenuCheckboxes,
    DropdownMenuRadioItems,
    DropdownMenuTitleDescription,
    CommandDefault,
    CommandDialogExample,
    CommandTitleDescription,
    ComboboxDefault,
    ComboboxMultiple,
    ComboboxGroups,
    ComboboxCustomItems,
    ComboboxPopup,
    ComboboxInvalid,
    TableDefault,
    TableWithFooter,
    CalendarDefault,
    CalendarRange,
    CalendarDropdown,
    CalendarWithPresets,
    CalendarWeekNumbers,
    SidebarDefault,
    SidebarWithBadge,
    SidebarVariants,
    ...components,
  }
}
