/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO: make real type for event

'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faHome,
  faCalendar,
  faBell,
  faDoorOpen,
} from '@fortawesome/free-solid-svg-icons';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '@/components/Button/button';

export default function Header() {
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: any) {
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
    <header className="mx-10 my-5">
      <div className="flex justify-between items-center">
        <div className="flex-none">
          <span>
            <Link href="/">Plan Together</Link>
          </span>
        </div>
        {session ? (
          <div className="flex justify-between items-center w-full">
            <div className="flex justify-center w-full">
              <div className="flex space-x-4">
                {/* Le contenu pour les utilisateurs authentifiés */}

                <Link
                  href="/dashboard"
                  className="hover:border-b-2 border-transparent hover:border-black transition duration-300 ease-in-out"
                >
                  <FontAwesomeIcon
                    icon={faHome}
                    style={{ paddingRight: '8px' }}
                  />
                  Dashboard
                </Link>

                <Link
                  href="/plan-it/activities"
                  className="hover:border-b-2 border-transparent hover:border-black transition duration-300 ease-in-out"
                >
                  <FontAwesomeIcon
                    icon={faCalendar}
                    style={{ paddingRight: '8px' }}
                  />
                  Evènements
                </Link>

                <Link
                  href="/notifications"
                  className="hover:border-b-2 border-transparent hover:border-black transition duration-300 ease-in-out"
                >
                  <FontAwesomeIcon
                    icon={faBell}
                    style={{ paddingRight: '8px' }}
                  />
                  Notifications
                </Link>
              </div>
            </div>
            <div className="flex space-x-4 items-center">
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded flex-none whitespace-nowrap"
              >
                {' '}
                <FontAwesomeIcon
                  icon={faPlus}
                  style={{ paddingRight: '8px' }}
                />
                Créer un évènement
              </button>
              <div className="flex-none whitespace-nowrap relative">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span
                    className="bg-primary p-2.5 rounded-full text-white"
                    id="monDropdown"
                  >
                    DL
                    {/* TODO: Implémenter l'avatar si il est stocké sinon les initiales de l'utilisateur */}
                  </span>
                </button>
                {isDropdownOpen && (
                  <div className="absolute top-[40px] left-[-20px] z-10 bg-white border border-gray-300 p-2 rounded">
                    <Link
                      href="/profile"
                      className="block px-2 py-1 hover:bg-gray-200"
                    >
                      Profile
                    </Link>
                    <Button
                      buttonType="warning"
                      content=""
                      icon={faDoorOpen}
                      onClick={() => signOut()}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div>
            {/* Le contenu pour les utilisateurs non authentifiés */}
            <Link href="/register" style={{ paddingRight: '10px' }}>
              Register
            </Link>
            <Button
              buttonType="primary"
              content="Se connecter"
              onClick={() => signIn()}
            />
          </div>
        )}
      </div>
    </header>
  );
}
