import { NgModule } from '@angular/core';
import {ToastModule} from 'primeng/toast';
import {CalendarModule} from 'primeng/calendar';
import {FileUploadModule} from 'primeng/fileupload';




@NgModule({
    declarations: [],
    imports: [
        ToastModule,
        CalendarModule,
        FileUploadModule
         
        ],
    exports: [
        ToastModule,
        CalendarModule,
        FileUploadModule
    ],
    providers: [],
})
export class PrimerNGModule {}