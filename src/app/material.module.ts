import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule} from "@angular/material/sidenav";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatBadgeModule } from "@angular/material/badge";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatListModule} from "@angular/material/list";
import { MatDividerModule } from "@angular/material/divider";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDatepickerModule} from "@angular/material/datepicker";
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';

const material = [
  MatSidenavModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatBadgeModule,
  MatToolbarModule,
  MatGridListModule,
  MatIconModule,
  MatMenuModule,
  MatListModule,
  MatDividerModule,
  MatExpansionModule,
  MatCardModule,
  MatInputModule,
  DragDropModule,
  MatDialogModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatSnackBarModule,
  MatTableModule,
  MatChipsModule
];

@NgModule({
  imports : [material],
  exports : [material]
})
export class MaterialModule {}
