import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {StorageService} from "./storage.service";


@Injectable({
  providedIn: 'root'
})
export class StatsService {

  solves: Solve[] = [];
  solveBehaviorSubject: BehaviorSubject<Solve[]> = new BehaviorSubject<Solve[]>(this.solves);
  solves$: Observable<Solve[]> = this.solveBehaviorSubject.asObservable();

  constructor(private storageService: StorageService) {
    this.solves = storageService.getSolves();
    this.solveBehaviorSubject.next(this.solves);
  }

  addSolve(solve: Solve): void {
    this.solves.push(solve);
    this.storageService.saveSolves(this.solves);
    this.solveBehaviorSubject.next(this.solves);
  }

  getFastest(): Solve {
    return this.solves.reduce((prev, curr) => {
      return prev.solveTime < curr.solveTime ? prev : curr;
    });
  }

  getSlowest(): Solve {
    return this.solves.reduce((prev, curr) => {
      return prev.solveTime > curr.solveTime ? prev : curr;
    });
  }

  getAvg(): number {
    return this.solves.reduce((total, b) => {return total + b.solveTime}, 0)/this.solves.length;
  }

  getSolves(): Observable<Solve[]> {
    return this.solves$;
  }

  clearSolves(): void {
    this.storageService.clearSolves();
    this.solves = [];
    this.solveBehaviorSubject.next(this.solves);
  }
}
