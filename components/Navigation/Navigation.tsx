'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
// eslint-disable-next-line import/no-extraneous-dependencies
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons/faArrowDown';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Avatar } from '@/components/ui/avatar';

export default function Navigation() {
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="flex items-center lg:px-16 xl:px-32 py-6 justify-between">
      <Link href="/" className="text-xl font-semibold font-serif leading-none">
        <h1 className="hover:text-gray-600 transition duration-300 ease-in-out">
          Plan Together
        </h1>
      </Link>
      <div>
        {session ? (
          <div className="flex gap-8">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link
                    href="/dashboard"
                    className={navigationMenuTriggerStyle()}
                  >
                    Dashboard
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link
                    href="/activities"
                    className={navigationMenuTriggerStyle()}
                  >
                    Événements
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link
                    href="/notifications"
                    className={navigationMenuTriggerStyle()}
                  >
                    Notifications
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <DropdownMenu
              onOpenChange={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <DropdownMenuTrigger className="focus-visible:outline-none hover:opacity-80 transition duration-300 ease-in-out">
                <div className="flex items-center rounded-full">
                  <Avatar className="flex justify-center items-center">
                    <AvatarImage src="https://avatars.githubusercontent.com/u/6728594?v=4" />
                    <AvatarFallback className="bg-blue-600 text-white text-xl p-2">
                      CN
                    </AvatarFallback>
                  </Avatar>
                  <FontAwesomeIcon
                    icon={faArrowDown}
                    className={
                      isDropdownOpen
                        ? 'px-4 rotate-180 transition duration-300 ease-in-out'
                        : 'px-4 transition duration-300 ease-in-out'
                    }
                  />
                  <DropdownMenuContent>
                    <DropdownMenuItem className="cursor-pointer">
                      <Link href="/profile">Profil</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer">
                      <Link href="/" onClick={() => signOut()}>
                        Se déconnecter
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </div>
              </DropdownMenuTrigger>
            </DropdownMenu>
          </div>
        ) : (
          <div>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/login" className={navigationMenuTriggerStyle()}>
                    Se connecter
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link
                    href="/register"
                    className={navigationMenuTriggerStyle()}
                  >
                    S&apos;inscrire
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        )}
      </div>
    </nav>
  );
}
