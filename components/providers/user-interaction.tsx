"use client";

import { useEffect } from 'react';

export function UserInteractionProvider() {
  useEffect(() => {
    function handleInteraction() {
      document.documentElement.setAttribute('data-user-interacted', 'true');
      ['click', 'touchstart', 'keydown'].forEach(event => 
        document.removeEventListener(event, handleInteraction)
      );
    }

    ['click', 'touchstart', 'keydown'].forEach(event => 
      document.addEventListener(event, handleInteraction)
    );

    return () => {
      ['click', 'touchstart', 'keydown'].forEach(event => 
        document.removeEventListener(event, handleInteraction)
      );
    };
  }, []);

  return null;
} 