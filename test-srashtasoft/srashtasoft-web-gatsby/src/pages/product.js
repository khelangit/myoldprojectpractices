import React from 'react';

export default function NotFound() {
  if (typeof window !== 'undefined') {
    window.location = '/services';
  }

  return null;
}