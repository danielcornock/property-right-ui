import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatherModule } from 'angular-feather';
import {
  Layout,
  Home,
  User,
  CheckSquare,
  LogOut,
  ChevronsLeft,
  ChevronsRight
} from 'angular-feather/icons';

const icons = {
  Layout,
  Home,
  User,
  CheckSquare,
  LogOut,
  ChevronsLeft,
  ChevronsRight
};

@NgModule({
  imports: [FeatherModule.pick(icons)],
  exports: [FeatherModule]
})
export class IconsModule {}
