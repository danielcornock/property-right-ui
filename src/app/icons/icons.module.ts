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
  ChevronsRight,
  Mail,
  Phone,
  MessageSquare,
  Plus,
  Settings,
  Filter,
  Search,
  Users,
  Trash2,
  MoreVertical,
  Calendar,
  Edit,
  Upload,
  DollarSign,
  CheckCircle,
  XCircle,
  TrendingUp
} from 'angular-feather/icons';

const icons = {
  Layout,
  Home,
  User,
  CheckSquare,
  LogOut,
  ChevronsLeft,
  ChevronsRight,
  Mail,
  Phone,
  MessageSquare,
  Plus,
  Settings,
  Filter,
  Search,
  Users,
  Trash2,
  MoreVertical,
  Calendar,
  Edit,
  Upload,
  DollarSign,
  CheckCircle,
  XCircle,
  TrendingUp
};

@NgModule({
  imports: [FeatherModule.pick(icons)],
  exports: [FeatherModule]
})
export class IconsModule {}
