'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faHome,
  faCalendar,
  faBell,
  faEllipsisV,
} from '@fortawesome/free-solid-svg-icons';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import { SignInButton, LogOutBtn } from '@/components/Button/button';

export default function Header() {
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

                <Link href="/dashboard">
                  <FontAwesomeIcon
                    icon={faHome}
                    style={{ paddingRight: '8px' }}
                  />
                  Dashboard
                </Link>

                <Link href="/plan-it/activities">
                  <FontAwesomeIcon
                    icon={faCalendar}
                    style={{ paddingRight: '8px' }}
                  />
                  Evènements
                </Link>

                <Link href="/notifications">
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
                Avatar{' '}
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <FontAwesomeIcon
                    icon={faEllipsisV}
                    style={{ paddingLeft: '8px' }}
                  />
                </button>
                {isDropdownOpen && (
                  <div className="absolute top-[40px] left-[-40px] z-10 bg-white border border-gray-300 p-2 rounded">
                    <Link
                      href="/profile"
                      className="block px-2 py-1 hover:bg-gray-200"
                    >
                      Profile
                    </Link>
                    <LogOutBtn />
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
            <SignInButton />
          </div>
        )}
      </div>
    </header>
  );
}
