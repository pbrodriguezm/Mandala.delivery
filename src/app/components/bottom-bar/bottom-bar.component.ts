
import { Component, OnInit, Input, AfterViewInit, ContentChild, TemplateRef, ChangeDetectionStrategy } from '@angular/core';

export enum Fablocation {
  NONE = 'NONE',
  CENTER = 'CENTER',
  RIGHT_END = 'RIGHT-END',
  LEFT_END = 'LEFT-END'
}

export enum AppbarClassNames {
  NO_FAB = 'appbar-bottom-no-fab',
  CENTER_FAB = 'appbar-bottom-center',
  CENTER_FAB_INSET = 'appbar-bottom-center-cut',
  LEFT_END_FAB = 'appbar-bottom-left-end',
  LEFT_END_FAB_INSET = 'appbar-bottom-left-end-cut',
  RIGHT_END_FAB = 'appbar-bottom-right-end',
  RIGHT_END_FAB_INSET = 'appbar-bottom-left-end-cut'
}


@Component({
  selector: 'app-bottom-bar',
  templateUrl: './bottom-bar.component.html',
  styleUrls: ['./bottom-bar.component.css']
})

export class BottomBarComponent implements OnInit, AfterViewInit {

  @Input() 
  inset: boolean = false;

  @Input()
  fabPosition: Fablocation = Fablocation.NONE;

  @Input()
  color: string = 'primary';

  @Input()
  flat: boolean = false;

  @ContentChild('mat_inset_cutout', { static: false }) 
  cutOutTemplate: TemplateRef<any>;

  @ContentChild('mat_left_side_actions', { static: false }) 
  leftSideActions: TemplateRef<any>;

  @ContentChild('mat_right_side_actions', { static: false })
  rightSideActions: TemplateRef<any>;

  @ContentChild('mat_fab_area', { static: false }) 
  fabArea: TemplateRef<any>;

  get normalCenterFab() {
    return !this.inset && this.fabPosition === Fablocation.CENTER;
  }

  get normalRightEndFab() {
    return !this.inset && this.fabPosition === Fablocation.RIGHT_END;
  }

  get insetCenterFab() {
    return this.inset && this.fabPosition === Fablocation.CENTER;
  }

  get insetRightEndFab() {
    return this.inset && this.fabPosition === Fablocation.RIGHT_END;
  }

  get noFab() {
    return this.fabPosition === Fablocation.NONE || !this.fabArea;
  }

  get rightEndFab() {
    return this.fabPosition === Fablocation.RIGHT_END; 
  }

  get leftEndFab() {
    return this.fabPosition === Fablocation.LEFT_END; 
  }


  get centerFab() {
    return this.fabPosition === Fablocation.CENTER;
  }

  get isCenteredOrInsetRightBar() {
    if ( this.centerFab  ) {
      return true;
    } else if ( this.insetRightEndFab ) {
      return true;
    } else if ( this.noFab ) {
      return true;
    } else  {
      return false;
    }
  }

  constructor() { }

  ngOnInit() {}

  ngAfterViewInit() {}

}