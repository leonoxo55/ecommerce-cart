import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DynamicHtmlRendererComponent } from './components/dynamic-html-renderer.component';
import { DemoComponent } from './components/demo.component';
import { UsageExampleComponent } from './examples/usage-example.component';

@NgModule({
  declarations: [
    AppComponent,
    DynamicHtmlRendererComponent,
    DemoComponent,
    UsageExampleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }