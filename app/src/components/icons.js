import Vue from 'vue';

import * as icons from 'vue-feather-icons';

const iconNames = [
  'ArrowLeftIcon',
  'AtSignIcon',
  'BookOpenIcon',
  'CameraIcon',
  'CheckIcon',
  'CheckCircleIcon',
  'ChevronUpIcon',
  'ChevronRightIcon',
  'ChevronDownIcon',
  'ChevronLeftIcon',
  'ChevronsLeftIcon',
  'CopyIcon',
  'EditIcon',
  'FileIcon',
  'FileTextIcon',
  'FolderIcon',
  'HomeIcon',
  'InboxIcon',
  'LogOutIcon',
  'LinkIcon',
  'ListIcon',
  'MailIcon',
  'MaximizeIcon',
  'MinimizeIcon',
  'Maximize2Icon',
  'Minimize2Icon',
  'MenuIcon',
  { name: 'MoreHorizontalIcon', as: 'icon-more' },
  'PlayIcon',
  'PlusIcon',
  'SearchIcon',
  'SettingsIcon',
  'SlidersIcon',
  { name: 'Trash2Icon', as: 'icon-trash' },
  'UploadCloudIcon',
  'UserIcon',
  'UserPlusIcon',
  'UsersIcon',
  'XCircleIcon',
  'XIcon',
];

// Register all icons as Vue components
iconNames.forEach((icon) => {
  let importName;
  let componentName;

  // Object
  if (icon instanceof Object) {
    importName = icon.name;
    componentName = icon.as;
  // String
  } else {
    importName = icon;
    // Convert pascal case to kebab case
    componentName = icon[0].toLowerCase() + icon.substring(1).replace(/[A-Z0-9]/g, x => `-${x.toLowerCase()}`);
    // Change -icon suffix into an icon- prefix
    if (componentName.endsWith('-icon')) componentName = `icon-${componentName.slice(0, -5)}`;
  }

  Vue.component(componentName, icons[importName]);
});
