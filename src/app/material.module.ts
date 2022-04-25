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
import { MatExpansionModule} from "@angular/material/expansion";

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
  MatExpansionModule
];

@NgModule({
  imports : [material],
  exports : [material]
})
export class MaterialModule {}
