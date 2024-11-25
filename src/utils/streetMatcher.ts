import Fuse from 'fuse.js';
import { FellowshipCenter } from '../types';

export function findFellowshipByStreet(centers: FellowshipCenter[], street: string): FellowshipCenter | null {
  // First try exact match
  const exactMatch = centers.find(center => 
    center.streets.some(s => s.toLowerCase() === street.toLowerCase())
  );
  
  if (exactMatch) return exactMatch;

  // If no exact match, use fuzzy search
  const allStreets = centers.flatMap(center => 
    center.streets.map(street => ({ street, center }))
  );

  const fuse = new Fuse(allStreets, {
    keys: ['street'],
    threshold: 0.3,
    location: 0,
    distance: 100,
  });

  const result = fuse.search(street);
  return result.length > 0 ? result[0].item.center : null;
}