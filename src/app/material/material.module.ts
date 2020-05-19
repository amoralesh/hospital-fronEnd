import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
    declarations: [],
    imports: [
         CommonModule,
         BrowserAnimationsModule,
         MatButtonModule,
         MatSelectModule
        ],
    exports: [ 
        MatButtonModule,
        MatSelectModule
    ],
    providers: [],
})
export class MaterialModule {}