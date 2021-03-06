import { async, ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from './app';
import { DebugElement, NO_ERRORS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";
import { ListPage } from "../pages/list/list";
import { BrowserDynamicTestingModule } from "@angular/platform-browser-dynamic/testing";
import { ItemDetailsPage } from "../pages/item-details/item-details";
import { ListComponent } from "../modules/list/components/list/list";

describe('MyApp Component', () => {
  let comp:    MyApp;
  let fixture: ComponentFixture<MyApp>;
  let de:      DebugElement;
  let el:      HTMLElement;

  // The test setup must give the Angular template compiler time to read the files.
  // The first beforeEach handles asynchronous compilation.
  beforeEach(async(() => {
    const mockedService = {};

    TestBed.configureTestingModule({
      declarations: [
        MyApp,
        //ItemDetailsPage,
        ListPage,
      ],
      imports: [
        IonicModule.forRoot(MyApp)
      ],
      schemas: [
        // suppress missing components, for the sake of testing
        NO_ERRORS_SCHEMA,
      ],
      providers: [
        StatusBar,
        SplashScreen,
        // automatic change detection
        // the ComponentFixtureAutoDetect service responds to asynchronous activities such as promise resolution,
        // timers, and DOM events. But a direct, synchronous update of the component property is invisible (e.g. setting a component's property)
        // The test must call fixture.detectChanges() manually to trigger another cycle of change detection.
        { provide: ComponentFixtureAutoDetect, useValue: true },
        // if we were to use a custom service ... let's mock it!
        // e.g. {provide: <actual service>, useValue: mockedService }
        // and then get the service via INJECTOR in test body ...
        // e.g. userService = fixture.debugElement.injector.get(UserService);
      ],
    });

    // add entryComponents to the dynamic moduled returned by Testbed
    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [
          MyApp,
          ListPage,
          //ItemDetailsPage,
        ]
      }
    });
  }));

  // The second beforeEach sets up fixtures
  beforeEach(() => {
    fixture = TestBed.createComponent(MyApp);
    comp = fixture.componentInstance;
  });

  it ('should be created', () => {
    expect(comp instanceof MyApp).toBe(true);
  });

  // with 'xit' the test is skipped ...
  it ('should have two pages', () => {
    expect(comp.pages.length).toBe(1);
  });

  it('should have a title button', () => {
    // Get the Twain quote element by CSS selector (e.g., by class name)
    de = fixture.debugElement.query(By.css('.title-button'));
    el = de.nativeElement;
    expect(el).toBeDefined();
  })

});
