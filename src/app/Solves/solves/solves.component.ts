import { Component, OnInit } from '@angular/core';
import {StatsService} from "../../Services/stats.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-solves',
  templateUrl: './solves.component.html',
  styleUrls: ['./solves.component.scss']
})
export class SolvesComponent implements OnInit {

  displayedColumns: string[] = ['Date', 'Time', 'Solved', 'Scramble'];

  solves$: Observable<Solve[]> | undefined;

  constructor(private statsService: StatsService) { }

  ngOnInit(): void {
    this.solves$ = this.statsService.getSolves();
  }

  clearSolves(): void {
    this.statsService.clearSolves();
  }
}
