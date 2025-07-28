'use client';

import React, { useEffect } from 'react';

const GoogleTranslateWidget = () => {
  useEffect(() => {
    // Define the callback function that Google Translate will call
    (window as any).googleTranslateElementInit = () => {
      new (window as any).google.translate.TranslateElement({
        pageLanguage: 'es', // Set the default language of the page
        layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE
      }, 'google_translate_element');
    };

    // Check if the script already exists to avoid adding it multiple times
    if (!document.getElementById('google-translate-script')) {
      const addScript = document.createElement('script');
      addScript.id = 'google-translate-script';
      addScript.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      document.body.appendChild(addScript);
    }

  }, []);

  return <div id="google_translate_element"></div>;
};

export default GoogleTranslateWidget;
