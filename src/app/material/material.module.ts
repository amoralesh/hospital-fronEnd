import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule,MAT_DATE_LOCALE } from '@angular/material/core';






@NgModule({
    declarations: [],
    imports: [
         CommonModule,
         BrowserAnimationsModule,
         MatButtonModule,
         MatSelectModule,
         MatTableModule,
         MatPaginatorModule,
         MatInputModule,
         MatDatepickerModule,
         MatNativeDateModule
        ],
    exports: [ 
        MatButtonModule,
        MatSelectModule,
        MatTableModule,
        MatPaginatorModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule
    ],
    providers: [],
})
export class MaterialModule {}