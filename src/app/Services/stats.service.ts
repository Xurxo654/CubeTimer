import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class StatsService {

  solves: Solve[] = [];
  solveBehaviorSubject: BehaviorSubject<Solve[]> = new BehaviorSubject<Solve[]>(this.solves);
  solves$: Observable<Solve[]> = this.solveBehaviorSubject.asObservable();

  constructor() {

  }

  addSolve(solve: Solve): void {
    this.solves.push(solve);
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
}
