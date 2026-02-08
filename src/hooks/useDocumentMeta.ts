import { useEffect } from 'react';

export const useDocumentMeta = (title: string, description?: string) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    let metaDesc = document.querySelector('meta[name="description"]');
    const prevDescription = metaDesc?.getAttribute('content') || '';

    if (description) {
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', description);
    }

    return () => {
      document.title = prevTitle;
      if (metaDesc && prevDescription) {
        metaDesc.setAttribute('content', prevDescription);
      }
    };
  }, [title, description]);
};
