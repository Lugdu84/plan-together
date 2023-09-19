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
import { SignInButton, LogOutBtn } from '@/components/Button/button';

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="mx-10 my-5">
      <div className="flex justify-between items-center">
        <div className="flex-none">
          <span>Plan Together</span>
        </div>
        {session ? (
          <div className="flex justify-between items-center w-full">
            <div className="flex justify-center w-full">
              <div className="flex space-x-4">
                {/* Le contenu pour les utilisateurs authentifiés */}
                <span>
                  <FontAwesomeIcon
                    icon={faHome}
                    style={{ paddingRight: '8px' }}
                  />
                  Dashboard
                </span>
                <span>
                  <FontAwesomeIcon
                    icon={faCalendar}
                    style={{ paddingRight: '8px' }}
                  />
                  Evènements
                </span>
                <span>
                  <FontAwesomeIcon
                    icon={faBell}
                    style={{ paddingRight: '8px' }}
                  />
                  Notifications
                </span>
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
              <div className="flex-none whitespace-nowrap">
                Avatar{' '}
                <FontAwesomeIcon
                  icon={faEllipsisV}
                  style={{ paddingLeft: '8px' }}
                />
                <LogOutBtn />
              </div>
            </div>
          </div>
        ) : (
          <div>
            {/* Le contenu pour les utilisateurs non authentifiés */}
            <button type="button" style={{ paddingRight: '10px' }}>
              Register
            </button>
            <SignInButton />
          </div>
        )}
      </div>
    </header>
  );
}
