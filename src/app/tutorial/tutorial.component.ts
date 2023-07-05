import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TutorialService } from '../tutorial.service';




@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss']
})
export class TutorialComponent {

  index: number = 0;
  tutorial;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<TutorialComponent>,
    private tutorialService: TutorialService
  ) {
    this.tutorial = this.tutorialService.getTutorial();
  }

  next() {
    if (this.index < this.tutorial.length - 1)
      this.index++;

    if (this.index == this.tutorial.length - 1)
      this.dialogRef.close();
  }

  previous() {
    this.index--;
  }


}