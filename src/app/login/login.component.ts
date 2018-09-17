import { Component, AfterViewInit, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { GeneralService } from '../servicios/general/general.service';
import { Observable } from 'rxjs/Observable';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Subject } from 'rxjs/Subject';
import { FaceServices } from '../servicios/face.services';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { ViewChild } from '@angular/core';
import { APIResponse } from '../interfaces/api-response.interface';

@Component({
  selector: 'starter',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit, OnInit {
  ngAfterViewInit() { }


  @ViewChild('myInput')
  imagenInput: ElementRef;

  usuario;
  password;
  documento;

  constructor(public _generalServices: GeneralService, private _faceServices: FaceServices, private http: HttpClient) {

  }

  login() {
    this.checkImage()
    this._generalServices.autenticar(this.usuario, this.password)
      .subscribe((respuesta) => {

      }, (err: any) => console.log(err));
  }

  //webcam 
  // toggle webcam on/off
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public videoOptions: MediaTrackConstraints = {
    width: { ideal: 240 },
    height: { ideal: 320 }
  };
  public errors: WebcamInitError[] = [];

  // latest snapshot
  public webcamImage: WebcamImage = new WebcamImage("", "");

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();


  public ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }
  public sendImage(): void {
    this._faceServices.identificarEmpleado(this.webcamImage.imageAsBase64)
    .subscribe((response: any) => {
      console.log(response)
      if (response.estado.toLowerCase()=="ok"){
        this._generalServices.autenticar(response.usuario, response.usuario).subscribe((respuesta) => {
        }, (err: any) => console.log(err));
      }
      
    }, (err: any) => console.log(err));
    this.webcamImage = new WebcamImage("", "");
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public showNextWebcam(directionOrDeviceId: boolean | string): void {
    this.nextWebcam.next(directionOrDeviceId);
  }

  public handleImage(webcamImage: WebcamImage): void {
    // debugger;
    if (webcamImage.imageAsBase64 != null) {
      this.webcamImage = webcamImage;
    }
  }

  public checkImage(): boolean {
    if (this.webcamImage.imageAsBase64 != "") {
      this.sendImage();
      return true
    }
    return false;
  }

  public cameraWasSwitched(deviceId: string): void {
    // console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }


  fileChangeEvent(event) {
    let e = event.srcElement ? event.srcElement : event.target;
    this.documento = (e.files);

  }
}
