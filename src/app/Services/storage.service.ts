import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  saveSolves(solves: Solve[]): void {
    localStorage.setItem('solves', JSON.stringify(solves));
  }

  getSolves(): Solve[] {
    const ls = localStorage.getItem('solves');
    if (ls) {
      return JSON.parse(ls) as Solve[];
    }
    return [];
  }

  clearSolves(): void {
    localStorage.clear();
  }
}
