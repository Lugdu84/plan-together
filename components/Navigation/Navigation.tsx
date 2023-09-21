'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons/faArrowUp';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Avatar } from '@/components/ui/avatar';
// import { Avatar } from '@radix-ui/react-avatar';

export default function Navigation() {
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const dropdown = document.getElementById('monDropdown');

      if (dropdown && !dropdown.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    // <nav className="px-10 my-5">
    //   <div className="flex justify-between items-center">
    //     <div className="flex-none">
    //       <Link href="/">Plan Together</Link>
    //     </div>
    //     {session ? (
    //       <div className="flex justify-between items-center w-full">
    //         <div className="flex justify-center w-full">
    //           <div className="flex gap-16">
    //             {/* Le contenu pour les utilisateurs authentifiés */}

    //             <Link
    //               href="/dashboard"
    //               className={` ${
    //                 currentRoute === '/dashboard'
    //                   ? 'font-extrabold border-b-2 border-black p-0 text-lg'
    //                   : 'border-b-2 border-transparent hover:border-gray-300 transition duration-300 ease-in-out
    // text-lg' }`} > <FontAwesomeIcon icon={faHome} style={{ paddingRight: '8px' }} /> Dashboard </Link>

    //             <Link
    //               href="/activities"
    //               className={` ${
    //                 currentRoute === '/plan-it/activities'
    //                   ? 'font-extrabold border-b-2 border-black text-lg'
    //                   : 'border-b-2 border-transparent hover:border-gray-300 transition duration-300 ease-in-out
    // text-lg' }`} > <FontAwesomeIcon icon={faCalendar} style={{ paddingRight: '8px' }} /> Evènements </Link>

    //             <Link
    //               href="/notifications"
    //               className={` ${
    //                 currentRoute === '/notifications'
    //                   ? 'font-extrabold border-b-2 border-black text-lg'
    //                   : 'border-b-2 border-transparent hover:border-gray-300 transition duration-300 ease-in-out
    // text-lg' }`} > <FontAwesomeIcon icon={faBell} style={{ paddingRight: '8px' }} /> Notifications </Link> </div>
    // </div> <div className="flex space-x-4 items-center"> <div className="w-52 flex justify-end"> <Button
    // buttonType="create" content="Créer un évènement" icon={faPlus} className="whitespace-nowrap flex
    // flex-row-reverse w-9 hover:opacity-80 hover:w-52 duration-300 ease-in-out hover:border-collapse" /> </div> <div
    // className="flex-none whitespace-nowrap relative"> <button type="button" onClick={() =>
    // setIsDropdownOpen(!isDropdownOpen)} > <span className="bg-primary hover:opacity-80 transition duration-300 p-2.5
    // rounded-full text-white" id="monDropdown" > DL {/* TODO: Implémenter l'avatar si il est stocké sinon les
    // initiales de l'utilisateur */} </span> </button> {isDropdownOpen && ( <div className="absolute top-[40px] flex
    // flex-col items-center left-[-100px] z-10 bg-white border border-gray-300 p-2 rounded"> <Link href="/profile"
    // className="block p-px py-1 w-full"> <Button buttonType="primary" content="Profil" className="hover:opacity-80
    // transition duration-300 w-full" icon={faUser} /> </Link> <div className="block p-px py-1 w-full"> <Button
    // buttonType="warning" content="Déconnexion" className="hover:opacity-80 transition duration-300 w-full"
    // icon={faDoorOpen} onClick={() => signOut()} /> </div> </div> )} </div> </div> </div> ) : ( <div> {/* Le contenu
    // pour les utilisateurs non authentifiés */} <Link href="/register" style={{ paddingRight: '10px' }}> Register
    // </Link> <Button buttonType="primary" content="Se connecter" onClick={() => signIn()} /> </div> )} </div> </nav>

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
                  <NavigationMenuLink
                    href="/dashboard"
                    className={navigationMenuTriggerStyle()}
                  >
                    Dashboard
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/activities"
                    className={navigationMenuTriggerStyle()}
                  >
                    Événements
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/notifications"
                    className={navigationMenuTriggerStyle()}
                  >
                    Notifications
                  </NavigationMenuLink>
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
                    icon={faArrowUp}
                    className={
                      isDropdownOpen
                        ? 'px-4 rotate-180 transition duration-300 ease-in-out'
                        : 'px-4 transition duration-300 ease-in-out'
                    }
                  />
                  <DropdownMenuContent>
                    <DropdownMenuItem className="cursor-pointer">
                      <Link href="/profil">Profil</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer">
                      <Link href="/signout">Se déconnecter</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </div>
              </DropdownMenuTrigger>
            </DropdownMenu>
          </div>
        ) : (
          <div>
            <Link href="/login">Se connecter</Link>
            <Button asChild>
              <Link href="/register" onClick={() => signOut()}>
                S&apos;inscrire
              </Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
