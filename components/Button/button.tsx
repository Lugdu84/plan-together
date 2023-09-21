'use client';

/* eslint-disable import/prefer-default-export */

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface Props {
  content: string;
  buttonType: (typeof buttonTypes)[number];
  className?: string;
  onClick?: () => void;
  icon?: IconDefinition;
}

function getClassName(
  buttonType: (typeof buttonTypes)[number],
  className?: string,
) {
  let defaultClass =
    'rounded-md py-2 px-3 flex flex-row justify-start items-center gap-4 ';
  switch (buttonType) {
    case 'warning':
      defaultClass += `bg-red-500 text-neutral-100 ${className}`;
      break;
    case 'danger':
      defaultClass += `bg-red-500 text-neutral-100 ${className}`;
      break;
    case 'primary':
      defaultClass += `bg-primary text-neutral-100 ${className}`;
      break;
    case 'validate':
      defaultClass += `bg-green-500 text-neutral-100 ${className}`;
      break;
    case 'create':
      defaultClass += `bg-sky-500 text-neutral-100 ${className}`;
      break;
    case 'transparent':
      defaultClass += `bg-transparent border-2 border-black text-primary ${className}`;
      break;
    default:
      defaultClass += 'border-2 border-cyan-900';
      return defaultClass;
  }
  return defaultClass;
}

const buttonTypes = [
  'warning',
  'create',
  'danger',
  'primary',
  'validate',
  'transparent',
];

/**
 * @param content - Texte dans le boutton.
 * @param buttonType - Type de bouton 'warning', 'create', 'danger', 'primary', 'validate', 'transparent'.
 * @param className - Rajouter des classes (optionnel).
 * @param onClick - Ajouter un effet au clic en utilisant une fonction anonyme qui retournera l'effet.
 * @param icon Ajouter une icone en l'important avec fontAwesome.
 */
export function Button({
  content,
  buttonType,
  className,
  onClick,
  icon,
}: Props) {
  return (
    <button
      type="button"
      className={getClassName(buttonType, className)}
      onClick={onClick}
    >
      {icon && <FontAwesomeIcon icon={icon} width="20px" />}
      {content}
    </button>
  );
}
