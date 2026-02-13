import {
  LayoutDashboard,
  Users,
  FileText,
  CalendarClock,
  Stethoscope,
  Bed,
  FlaskConical,
  Pill,
  CreditCard,
  ShieldCheck,
  Boxes,
  UserCog,
  Building2,
  Bell,
  Hospital,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type MenuSection = {
  type: "section";
  section: string;
};

export type MenuLink = {
  type: "item";
  label: string;
  path: string;
  icon: LucideIcon;
  roles?: string[];
};

export type MenuItem = MenuSection | MenuLink;

export const menuConfig: MenuItem[] = [
  { type: "item", label: "Dashboard", path: "/", icon: LayoutDashboard },

  { type: "section", section: "Clinical" },
  { type: "item", label: "Patients", path: "/patients", icon: Users },
  { type: "item", label: "Medical Records", path: "/medical-records", icon: FileText },
  { type: "item", label: "Appointments", path: "/appointments", icon: CalendarClock },
  { type: "item", label: "Visits", path: "/visits", icon: Stethoscope },
  { type: "item", label: "Admissions", path: "/admissions", icon: Bed },

  { type: "section", section: "Services" },
  { type: "item", label: "Laboratory", path: "/laboratory", icon: FlaskConical },
  { type: "item", label: "Pharmacy", path: "/pharmacy", icon: Pill },

  { type: "section", section: "Finance" },
  { type: "item", label: "Billing & Payments", path: "/billing", icon: CreditCard },
  { type: "item", label: "Insurance", path: "/insurance", icon: ShieldCheck },

  { type: "section", section: "Administration" },
  { type: "item", label: "Hospitals", path: "/hospitals", icon: Hospital },
  { type: "item", label: "Departments", path: "/departments", icon: Building2 },
  { type: "item", label: "Staff", path: "/staff", icon: UserCog },
  { type: "item", label: "Inventory", path: "/inventory", icon: Boxes },

  { type: "section", section: "System" },
  { type: "item", label: "Notifications", path: "/notifications", icon: Bell },
];

