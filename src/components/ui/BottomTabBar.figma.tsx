// figma.connect — publish with: npx @figma/code-connect publish
// File key : kMO3RdXXNoZrpHh24hQTl1  |  Node : 68:295

import figma from '@figma/code-connect';
import { BottomTabBar } from './BottomTabBar';
import { Home, Search, BookOpen, User } from 'lucide-react';

figma.connect(
  BottomTabBar,
  'https://www.figma.com/design/kMO3RdXXNoZrpHh24hQTl1/Sitka-Design-System?node-id=68-295',
  {
    props: {
      activeTab: figma.enum('ActiveTab', {
        Home:    'home',
        Search:  'search',
        Library: 'library',
        Profile: 'profile',
      }),
    },
    example: ({ activeTab }) => (
      <BottomTabBar
        value={activeTab}
        onChange={() => {}}
        items={[
          { value: 'home',    label: 'Home',    icon: <Home /> },
          { value: 'search',  label: 'Search',  icon: <Search /> },
          { value: 'library', label: 'Library', icon: <BookOpen /> },
          { value: 'profile', label: 'Profile', icon: <User /> },
        ]}
      />
    ),
  }
);
