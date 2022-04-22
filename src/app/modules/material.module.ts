import { NgModule } from "@angular/core";
import{
    MatButtonModule,
    MatButtonToggleModule,
    MatSliderModule 
} from '@angular/material';

const material = [
    MatButtonModule,
    MatButtonToggleModule,
    MatSliderModule
];

@NgModule({
    
    imports : [material]
})
export class MaterialModule{ }