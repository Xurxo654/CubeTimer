import {Component, HostListener, OnInit} from '@angular/core';
import {CubeService} from "../../Services/cube.service";
import {MatDialog} from "@angular/material/dialog";
import {SolvedDialogComponent} from "../solved-dialog/solved-dialog.component";
import {StatsService} from "../../Services/stats.service";

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {

  scramble: string;

  timer: number = 0;  //time in hundredths of a second
  isStopWatchRunning = false;
  stopWatchInterval: any;

  selectedInspectionTime: number;
  inspectionTime = 10;
  isInspectionTime = false;
  inspectionInterval: any;

  @HostListener('window:keypress', ['$event'])
  handleSpaceKeyboardEvent(event: KeyboardEvent) {
    if(event.key === ' ') {
      if (this.isStopWatchRunning || this.isInspectionTime) {
        this.stopTimer();
      } else {
        this.startTimer();
      }
    }
  }

  constructor(private cubeService: CubeService, private statsService: StatsService, public dialog: MatDialog) {
    this.scramble = this.cubeService.scramble(20);
    this.selectedInspectionTime = 10;
  }

  ngOnInit(): void {
  }

  startTimer(): void {
    if (!this.isStopWatchRunning  && !this.isInspectionTime) {
      this.isInspectionTime = true;
      this.inspectionTime = this.selectedInspectionTime;
      this.inspectionInterval = setInterval(() => {
        this.inspectionTime--;

        if (this.inspectionTime <= 0) {
          clearInterval(this.inspectionInterval);
          this.isInspectionTime = false;
          this.inspectionTime = 10;
          this.isStopWatchRunning = true;
          this.stopWatchInterval = setInterval(() => {this.timer++}, 10);
        }
      }, 1000);

    }
  }

  stopTimer(): void {
    if (this.isStopWatchRunning) {
      clearInterval(this.stopWatchInterval);
      this.isStopWatchRunning = false;
      this.openDialog();
    }
    if (this.isInspectionTime) {
      clearInterval(this.inspectionInterval);
      this.isInspectionTime = false;
      this.inspectionTime = 10;
    }
  }

  reset():void {
    if (!this.isStopWatchRunning) {
      this.scramble = this.cubeService.scramble(20);
      this.timer = 0;
    }
  }

  openDialog() {
    let dialogRef = this.dialog.open(SolvedDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.statsService.addSolve({
        scramble: this.scramble,
        date: new Date(),
        solveTime: this.timer,
        complete: result
      })
      this.reset();
    })
  }

  countDown(): void {

  }
}
